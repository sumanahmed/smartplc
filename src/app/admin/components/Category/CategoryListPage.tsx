"use client";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import Modal from "../Modal";
import CategoryForm, { Category } from "./CategoryForm";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/categoriesApi";

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // initial load
    loadData("");
  }, []);

  // debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      loadData(search);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  async function loadData(query = "") {
    setLoading(true);
    try {
      const res = await fetchCategories(query);
      // Laravel returns paginator with data property
      const list: Category[] = Array.isArray(res) ? res : res.data ?? [];
      setItems(list);
    } catch (err) {
      console.error(err);
      alert("Could not load categories");
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

  async function handleSave(payload: { name: string; slug: string; status: Category["status"] }) {
    setSubmitting(true);
    try {
      if (editing) {
        const updated = await updateCategory(editing.id, payload);
        setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        alert("Category updated");
      } else {
        const created = await createCategory(payload);
        setItems((prev) => [created, ...prev]);
        alert("Category created");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      const msg = (err as any)?.response?.data?.message ?? "Save failed";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: Category) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteCategory(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  const getStatusBadge = (status: string) => {
    const style = status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${style}`}>{status}</span>;
  };

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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button title="View" className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"><Eye size={16} /></button>
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
