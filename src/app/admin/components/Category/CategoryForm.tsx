"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

//export type CategoryStatus = "active" | "inactive";
export type CategoryStatus = 1 | 2; // 1 = active, 2 = inactive

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: CategoryStatus;
}

interface SavePayload {
  name: string;
  slug: string;
}

interface CategoryFormProps {
  initial?: Partial<Category> | null;
  onCancel: () => void;
  onSave: (payload: SavePayload) => Promise<void> | void;
}

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, "-")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");

const CategoryForm: React.FC<CategoryFormProps> = ({ initial = null, onCancel, onSave }) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  // const [status, setStatus] = useState<CategoryStatus>((initial?.status as CategoryStatus) ?? "active");
  const [customSlugEdited, setCustomSlugEdited] = useState<boolean>(!!initial?.slug);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{name?: string, slug?: string}>({});

  useEffect(() => {
    if (!customSlugEdited) {
      setSlug(slugify(name || ""));
    }
  }, [name, customSlugEdited]);

  const validateForm = () => {
    const newErrors: {name?: string, slug?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9\-]+$/.test(slug)) {
      newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
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
      slug: slug.trim() || slugify(name)
    };
    try {
      setSaving(true);
      await onSave(payload);
      toast.success("Saved successfully");
      
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
            placeholder="Enter category name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setCustomSlugEdited(true);
              if (errors.slug) setErrors({ ...errors, slug: undefined });
            }}
            disabled={saving}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.slug ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="category-slug"
          />
          {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
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
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default CategoryForm;