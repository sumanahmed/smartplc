"use client";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import Modal from "../Modal";
import CategoryForm, { Category } from "./CategoryForm";
import Swal from "sweetalert2";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus, 
} from "@/lib/categoriesApi";

import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);  

  useEffect(() => {
    // initial load
    loadData("");
  }, []);

  // debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      loadData(search, 1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);
  
  async function loadData(query = "", page = 1) {
    setLoading(true);
    try {
      const res = await fetchCategories(query, page, 10); // 10 items per page
      setItems(res.data);
  
      if (res.meta) {
        setCurrentPage(res.meta.current_page);
        setLastPage(res.meta.last_page);
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

  function openEdit(item: Category) {
    setEditing(item);
    setOpen(true);
  }

  function goToPage(page: number) {
    if (page < 1 || page > lastPage) return;
    loadData(search, page);
  }

  async function handleSave(payload: { name: string; slug: string;}) {
    setSubmitting(true);
    try {
      if (editing) {
        const updated = await updateCategory(editing.id, payload);
        setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        toast.success("Category updated successfully");
      } else {
        const created = await createCategory(payload);
        const categoryWithStatus = {
          ...created,
          status: created.status ?? 1,
        };
        setItems((prev) => [categoryWithStatus, ...prev]);
        toast.success("Category created successfully");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      const msg = (err as any)?.response?.data?.message ?? "Save failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }
  


  async function handleDelete(item: Category) {
      const result = await Swal.fire({
          title: "Are you sure?",
          text: `Do you really want to delete "${item.name}"? This action cannot be undone.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          await deleteCategory(item.id);
          setItems((prev) => prev.filter((i) => i.id !== item.id)); // remove from UI
          toast.success("Category deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error("Delete failed");
        }
      }
}

async function handleToggleStatus(item: Category) {
  try {
    const updatedToggleCategory = await toggleCategoryStatus(item.id);
    
    setItems((prev: Category[]) =>
      prev.map((cat) => (cat.id === item.id ? updatedToggleCategory : cat))
    );

    toast.success("Status updated Sucessfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update status");
  }
}



  return (
    <div className="p-6">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Category List</h2>

          <div className="flex items-center justify-end gap-3">
            {/* Search box (right side, first) */}
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or slug..."
              className="border rounded px-3 py-2 w-64"
            />

            {/* Add New button (right side, after search) */}
            <button
              onClick={openAdd}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={18} className="mr-2" /> Add New
            </button>
          </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                 <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sl
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center">Loading...</td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center">No categories found</td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{idx + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.status === 1}
                          onChange={() => handleToggleStatus(item)}
                          className="sr-only peer"
                        />
                        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">
                          {/* {item.status === 1 ? "Active" : "Inactive"} */}
                        </span>
                      </label>
                    </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {/* <button title="View" className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"><Eye size={16} /></button> */}
                          <button onClick={() => openEdit(item)} title="Edit" className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(item)} title="Delete" className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {lastPage}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>


      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit Category" : "Add Category"}>
        <CategoryForm
          initial={editing ?? undefined}
          onCancel={() => setOpen(false)}
          onSave={handleSave}
        />
        {submitting && <div className="text-sm text-gray-500 mt-2">Saving...</div>}
      </Modal>
    </div>
  );
}
