"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";

//export type BrandStatus = 1 | 2; // 1 = active, 2 = inactive

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  role: string;
}

interface SavePayload {
   name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  role: string;
  password: string;
  password_confirmation: string;
}

interface UserCreateFormProps {
  initial?: Partial<User> | null;
  onCancel: () => void;
  onSave: (payload: SavePayload) => Promise<void> | void;
}


const UserCreateForm: React.FC<UserCreateFormProps> = ({ initial = null, onCancel, onSave }) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [first_name, setFirstName] = useState(initial?.first_name ?? "");
  const [last_name, setLastName] = useState(initial?.last_name ?? "");
  const [phone, setPhoneName] = useState(initial?.phone ?? "");
  const [email, setEmailName] = useState(initial?.email ?? "");
  // const [status, setStatus] = useState<BrandStatus>((initial?.status as BrandStatus) ?? "active");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string, first_name?: string, last_name?: string, phone?: string, email?: string, password?: string, password_confirmation?: string }>({});
  
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const validateForm = () => {
    const newErrors: {name?: string, first_name?: string, last_name?: string, phone?: string, email?: string,  password?: string , password_confirmation?: string} = {};
    
    if (!name.trim()) {
        newErrors.name = "Name is required";
      }
      
    if (!first_name.trim()) {
        newErrors.first_name = "First Name is required";
      }
      
    if (!last_name.trim()) {
        newErrors.last_name = "Last Name is required";
      }
      
    if (!phone.trim()) newErrors.phone = "Phone is required";

    if (!email.trim()) newErrors.email = "Email is required";

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== passwordConfirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const payload: SavePayload = {
      name: name.trim(),
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password: password.trim(),
      password_confirmation: passwordConfirmation.trim(),
    };
    try {
      setSaving(true);
      const result = await onSave(payload);
      if (result) {
        toast.success("Saved successfully");
      }
      
    } catch (err) {
      const message = (err as any)?.response?.data?.message ?? (err as Error).message ?? "Save failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      {/* Loader Overlay */}
      {saving && (
        <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center z-10 rounded-lg">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 
                0 5.373 0 12h4zm2 5.291A7.962 7.962 
                0 014 12H0c0 3.042 1.135 5.824 3 
                7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

  
      <form onSubmit={handleSubmit} className="space-y-5 relative z-0">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            disabled={saving}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            value={first_name}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.first_name) setErrors({ ...errors, first_name: undefined });
            }}
            disabled={saving}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name"
          />
          {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
        </div>
              
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            value={last_name}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.last_name) setErrors({ ...errors, last_name: undefined });
            }}
            disabled={saving}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name"
          />
          {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
        </div>
              
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            value={phone}
            onChange={(e) => {
              setPhoneName(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            disabled={saving}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
              
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmailName(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            disabled={saving}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
  
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default UserCreateForm;