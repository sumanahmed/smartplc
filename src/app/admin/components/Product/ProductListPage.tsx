
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
// import Modal from "../Modal";
import Modal from "../ModalFormXl";
import ProductForm, { Product } from "./ProductForm";
import ProductDetailsModal from "./ProductDetailsModal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from "@/lib/productsApi";

import { getAllCategory, Category } from "@/lib/categoriesApi";
import { getAllBrand, Brand } from "@/lib/brandApi";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categoryList, setCategories] = useState<Category[]>([]);
  const [brandList, setBrands] = useState<Brand[]>([]);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const openView = (product: Product) => setViewProduct(product);
  const closeView = () => setViewProduct(null);

  async function loadLookups() {
    try {
      const [cats, brs] = await Promise.all([getAllCategory(), getAllBrand()]);
      
      const categoriesData = Array.isArray(cats) 
        ? cats 
        : (cats as any)?.data ?? [];
      
      const brandsData = Array.isArray(brs) 
        ? brs 
        : (brs as any)?.data ?? [];
      
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (err) {
      console.error("Failed to load categories/brands", err);
    }
  }

  useEffect(() => {
    loadData("", 1);
    loadLookups();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => loadData(search, 1), 350);
    return () => clearTimeout(t);
  }, [search]);

  async function loadData(query = "", page = 1) {
    setLoading(true);
    try {
      const res = await fetchProducts(query, page, 10);
      const productsData = (res as any)?.data ?? [];
      setItems(productsData);
      
      if ((res as any)?.meta) {
        setCurrentPage((res as any).meta.current_page);
        setLastPage((res as any).meta.last_page);
      } else {
        setCurrentPage(1);
        setLastPage(1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(item: Product) {
    const normalized: Product = {
      ...item,
      category_id: item.category_id ?? item.category?.id ?? 0,
      brand_id: item.brand_id ?? item.brand?.id ?? 0,
    };
    setEditing(normalized);
    setOpen(true);
  }

  function goToPage(page: number) {
    if (page < 1 || page > lastPage) return;
    loadData(search, page);
  }
  async function handleSave(formData: FormData): Promise<Product> {
    setSubmitting(true);
    try {
      if (editing && editing.id) {
        const updated = await updateProduct(editing.id, formData);
        
        // Create a complete Product object with all required properties
        const updatedWithRelations: Product = {
          id: updated.id,
          name: updated.name ?? editing.name,
          slug: updated.slug ?? editing.slug,
          category_id: (updated as any).category_id ?? editing.category_id,
          brand_id: (updated as any).brand_id ?? editing.brand_id,
          purchase_price: (updated as any).purchase_price ?? editing.purchase_price,
          stock: (updated as any).stock ?? editing.stock,
          description: (updated as any).description ?? editing.description,
          specification: (updated as any).specification ?? editing.specification,
          image: (updated as any).image ?? editing.image,
          image_url: (updated as any).image_url ?? editing.image_url,
          status: (updated as any).status ?? editing.status ?? 1,
          category: (updated as any).category ?? editing.category ?? categoryList.find(c => c.id === ((updated as any).category_id ?? editing.category_id)) ?? undefined,
          brand: (updated as any).brand ?? editing.brand ?? brandList.find(b => b.id === ((updated as any).brand_id ?? editing.brand_id)) ?? undefined,
        };
        
        setItems(prev => prev.map(p => (p.id === updatedWithRelations.id ? updatedWithRelations : p)));
        toast.success("Product updated successfully");
        setOpen(false);
        return updatedWithRelations;
      } else {
        const created = await createProduct(formData);
        
        // Create a complete Product object with all required properties
        const createdWithRelations: Product = {
          id: created.id,
          name: created.name,
          slug: created.slug,
          category_id: (created as any).category_id,
          brand_id: (created as any).brand_id,
          purchase_price: (created as any).purchase_price,
          stock: (created as any).stock,
          description: (created as any).description,
          specification: (created as any).specification,
          image: (created as any).image,
          image_url: (created as any).image_url,
          status: (created as any).status ?? 1,
          category: (created as any).category ?? categoryList.find(c => c.id === (created as any).category_id) ?? undefined,
          brand: (created as any).brand ?? brandList.find(b => b.id === (created as any).brand_id) ?? undefined,
        };
        
        setItems(prev => [createdWithRelations, ...prev]);
        toast.success("Product created successfully");
        setOpen(false);
        return createdWithRelations;
      }
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message ?? err?.message ?? "Save failed";
      toast.error(msg);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: Product) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${item.name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteProduct(item.id!);
      setItems(prev => prev.filter(p => p.id !== item.id));
      toast.success("Product Delete Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  }

  async function handleToggleStatus(item: Product) {
    try {
      const updated = await toggleProductStatus(item.id!);
      
      // Update the item with the new status while preserving all other properties
      setItems((prev: Product[]) =>
        prev.map((prod) => 
          prod.id === item.id 
            ? { ...prod, status: (updated as any).status ?? updated }
            : prod
        )
      );
  
      toast.success("Status updated Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        <div className="flex items-center gap-3">
          <input 
            ref={searchRef} 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by name" 
            className="border rounded px-3 py-2 w-64" 
          />
          <button 
            onClick={openAdd} 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={18} className="mr-2" /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sl</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purchase Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={8} className="p-6 text-center">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8} className="p-6 text-center">No products found</td></tr>
            ) : items.map((item, idx) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.category?.name ?? (categoryList.find(c => c.id === item.category_id)?.name ?? "-")}</td>
                <td className="px-6 py-4">{item.brand?.name ?? (brandList.find(b => b.id === item.brand_id)?.name ?? "-")}</td>
                <td className="px-6 py-4">{item.purchase_price}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={item.status === 1} 
                      onChange={() => handleToggleStatus(item)} 
                      className="sr-only peer" 
                    />
                    <div className="relative w-14 h-7 bg-gray-200 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openView(item)} title="View" className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye size={16}/></button>
                    <button onClick={() => openEdit(item)} title="Edit" className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(item)} title="Delete" className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => goToPage(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {lastPage}</span>
        <button 
          onClick={() => goToPage(currentPage + 1)} 
          disabled={currentPage === lastPage} 
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* create / edit modal */}
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Product" : "Add Product"}>
        <ProductForm 
          initial={editing ?? undefined} 
          categories={categoryList} 
          brands={brandList} 
          onCancel={() => setOpen(false)} 
          onSave={handleSave} 
        />
        {submitting && <div className="text-sm text-gray-500 mt-2">Saving...</div>}
      </Modal>

      {/* view modal */}
      {viewProduct && (
        <ProductDetailsModal
          open={!!viewProduct}
          onClose={closeView}
          product={viewProduct}
          categoryList={categoryList}
          brandList={brandList}
        />
      )}
    </div>
  );
}