"use client";

import React, { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import Swal from "sweetalert2";

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
  role?: string;
  password: string;
  password_confirmation: string;
}

interface UserCreateFormProps {
  initial?: Partial<User> | null;
  onCancel: () => void;
  onSave: (payload: SavePayload) => Promise<void> | void;
}

const UserCreateForm: React.FC<UserCreateFormProps> = ({
  initial = null,
  onCancel,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    first_name: initial?.first_name ?? "",
    last_name: initial?.last_name ?? "",
    phone: initial?.phone?.toString() ?? "",
    email: initial?.email ?? "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ simple form validation
  const validateForm = () => {
    if (!formData.first_name.trim()) {
      Swal.fire("Error", "First name is required", "error");
      return false;
    }
    if (!formData.last_name.trim()) {
      Swal.fire("Error", "Last name is required", "error");
      return false;
    }
    if (!formData.phone.trim()) {
      Swal.fire("Error", "Phone number is required", "error");
      return false;
    }
    if (!formData.email.trim()) {
      Swal.fire("Error", "Email is required", "error");
      return false;
    }
    if (!formData.password.trim()) {
      Swal.fire("Error", "Password is required", "error");
      return false;
    }
    if (formData.password.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters", "error");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      Swal.fire("Error", "Passwords do not match", "error");
      return false;
    }
    return true;
  };

  // ✅ handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload: SavePayload = {
      name: `${formData.first_name} ${formData.last_name}`,
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      phone: Number(formData.phone),
      email: formData.email.trim(),
      password: formData.password.trim(),
      password_confirmation: formData.password_confirmation.trim(),
    };

    try {
      setSaving(true);
      await onSave(payload);
      Swal.fire("Success", "User saved successfully!", "success");
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Failed to save user",
        "error"
      );
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

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* First & Last Name */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                placeholder="First name"
                required
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                placeholder="Last name"
                required
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Buttons */}
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
