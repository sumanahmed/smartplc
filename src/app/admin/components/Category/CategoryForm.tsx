"use client";
import React, { useEffect, useState } from "react";

export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: CategoryStatus;
}

interface SavePayload {
  name: string;
  slug: string;
  status: CategoryStatus;
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
  const [status, setStatus] = useState<CategoryStatus>((initial?.status as CategoryStatus) ?? "active");
  const [customSlugEdited, setCustomSlugEdited] = useState<boolean>(!!initial?.slug);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!customSlugEdited) {
      setSlug(slugify(name || ""));
    }
  }, [name, customSlugEdited]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    const payload: SavePayload = {
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      status,
    };

    try {
      setSaving(true);
      await onSave(payload);
    } catch (err) {
      // You can show nicer UI here based on error shape
      const message = (err as any)?.response?.data?.message ?? (err as Error).message ?? "Save failed";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Category name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setCustomSlugEdited(true);
          }}
          className="w-full border p-2 rounded"
          placeholder="category-slug"
        />
        <p className="text-xs text-gray-500 mt-1">Auto-generated from name, editable.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as CategoryStatus)}
          className="border p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-3 py-2 border rounded">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
