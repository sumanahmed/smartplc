"use client";
import React, { useEffect, useRef, useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import Modal from "../Modal";
import UserCreteForm from "./UserCreateForm";
import Swal from "sweetalert2";

import {
  fetchusers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/userApi";

import toast from "react-hot-toast";

// Match the User interface with what UserCreteForm expects
interface User {
  id: number;
  name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: number; // Changed to number to match UserCreteForm
  status?: number;
  created_at?: string;
  updated_at?: string;
  role?: string;
}

export default function UsersPage() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);  

  useEffect(() => {
    loadData("");
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      loadData(search, 1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);
  
  async function loadData(query = "", page = 1) {
    setLoading(true);
    try {
      const res = await fetchusers(query, page, 10);
      
      // Transform the data to ensure proper types
      const transformedData: User[] = res.data.map((user: any) => ({
        ...user,
        id: Number(user.id),
        email: String(user.email || ""),
        phone: user.phone ? Number(user.phone) : undefined, // Convert to number
        name: String(user.name || ""),
        first_name: user.first_name ? String(user.first_name) : undefined,
        last_name: user.last_name ? String(user.last_name) : undefined,
        status: user.status ? Number(user.status) : undefined,
      }));
      
      setItems(transformedData);
  
      if (res.meta) {
        setCurrentPage(res.meta.current_page);
        setLastPage(res.meta.last_page);
      } else {
        setCurrentPage(1);
        setLastPage(1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(item: User) {
    setEditing(item);
    setOpen(true);
  }

  function goToPage(page: number) {
    if (page < 1 || page > lastPage) return;
    loadData(search, page);
  }

  async function handleSave(payload: any) {
    setSubmitting(true);
    try {
      if (editing) {
        const updated = await updateUser(editing.id, payload);
        // Transform the updated user data
        const transformedUser: User = {
          ...updated,
          id: Number(updated.id),
          email: String(updated.email || ""),
          phone: updated.phone ? Number(updated.phone) : undefined,
        };
        setItems((prev) => prev.map((p) => (p.id === transformedUser.id ? transformedUser : p)));
        toast.success("User updated successfully");
      } else {
        const created = await createUser(payload);
        // Transform the created user data
        const transformedUser: User = {
          ...created,
          id: Number(created.id),
          email: String(created.email || ""),
          phone: created.phone ? Number(created.phone) : undefined,
        };
        setItems((prev) => [transformedUser, ...prev]);
        toast.success("User created successfully");
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: User) {
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
        await deleteUser(item.id);
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        toast.success("User deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Delete failed");
      }
    }
  }

  // Format phone number for display (add this helper function)
  const formatPhoneForDisplay = (phone?: number): string => {
    if (!phone) return "-";
    return phone.toString();
  };

  return (
    <div className="p-6">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">All Users List</h2>

            <div className="flex items-center justify-end gap-3 mt-4">
              {/* Search box */}
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Add New button */}
              <button
                onClick={openAdd}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(currentPage - 1) * 10 + idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.first_name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.last_name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPhoneForDisplay(item.phone)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.role === "customer" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Customer
                          </span>
                        ) : item.role === "admin" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Unknown
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEdit(item)}
                            title="Edit"
                            className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50 transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            title="Delete"
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {lastPage}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        title={editing ? "Edit User" : "Create New User"}
      >
        <UserCreteForm
          initial={editing ?? undefined}
          onCancel={() => setOpen(false)}
          onSave={handleSave}
        />
        {submitting && (
          <div className="text-sm text-gray-500 mt-2 text-center">Saving...</div>
        )}
      </Modal>
    </div>
  );
}