// ProductForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type ProductStatus = 1 | 2; 

export interface Category { id: number; name: string; }
export interface Brand { id: number; name: string; }

export interface Product {
  id?: number;
  name: string;
  slug: string;
  category_id: number;
  brand_id: number;
  purchase_price: number;
  stock: number;
  description?: string;
  image?: string;         
  image_url?: string;   
  status?: ProductStatus;
  category?: Category;
  brand?: Brand;
}

interface ProductFormProps {
  initial?: Partial<Product>;
  categories: Category[];
  brands: Brand[];
  onCancel: () => void;
  onSave: (data: FormData) => Promise<Product>; // returns created/updated product
}

const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];

const ProductForm: React.FC<ProductFormProps> = ({ initial, categories, brands, onCancel, onSave }) => {
  // initial values: prefer category_id if present, else initial.category?.id
  const initialCategoryId = initial?.category_id ?? initial?.category?.id ?? "";
  const initialBrandId = initial?.brand_id ?? initial?.brand?.id ?? "";

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    category_id: String(initialCategoryId),
    brand_id: String(initialBrandId),
    purchase_price: initial?.purchase_price ? String(initial.purchase_price) : "",
    stock: initial?.stock ? String(initial.stock) : "",
    description: initial?.description ?? "",
    image: null as File | string | null, // File for new upload, string for existing filename/url
  });

  // preview url (string) for image display
  const [preview, setPreview] = useState<string | null>(() => {
    if (initial?.image) {
      // if initial.image is already full url use it; else try to prefix with API base (optional)
      if (initial.image.startsWith("http")) return initial.image;
      const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
      return base ? `${base}/storage/products/${initial.image}` : initial.image;
    }
    return null;
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // cleanup created object URLs when unmount or new preview set
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    // validate quickly
    if (!allowedImageTypes.includes(f.type)) {
      setErrors((prev) => ({ ...prev, image: "Only JPG/PNG/WEBP/GIF are allowed" }));
      return;
    }
    const maxMB = 2;
    if (f.size / 1024 / 1024 > maxMB) {
      setErrors((prev) => ({ ...prev, image: `Image must be smaller than ${maxMB} MB` }));
      return;
    }
    // set the File and preview
    setForm((s) => ({ ...s, image: f }));
    const url = URL.createObjectURL(f);
    setPreview(url);
    // Clear image error if any
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });
    // revoke old blob later in cleanup
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    else if (!/^[a-z0-9\-]+$/.test(form.slug)) newErrors.slug = "Slug must be lowercase letters, numbers and hyphens";
    if (!form.category_id || form.category_id === "") newErrors.category_id = "Category is required";
    if (!form.brand_id || form.brand_id === "") newErrors.brand_id = "Brand is required";
    if (!form.purchase_price || Number(form.purchase_price) <= 0) newErrors.purchase_price = "Purchase price required";
    if (form.stock === "" || Number(form.stock) < 0) newErrors.stock = "Stock cannot be negative";
    // image required only for create
    const isEdit = !!initial?.id;
    if (!isEdit && !form.image) newErrors.image = "Product image is required";
    // If image is File, do additional checks (we already do in handleFileChange)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("category_id", String(form.category_id));
    fd.append("brand_id", String(form.brand_id));
    fd.append("purchase_price", String(form.purchase_price));
    fd.append("stock", String(form.stock));
    fd.append("description", form.description ?? "");
    // append image if it's a File
    if (form.image instanceof File) {
      fd.append("image", form.image);
    }
    try {
      setSaving(true);
      await onSave(fd); // parent returns created/updated product
      // parent handles updating list + toast
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? "Save failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-white p-6 rounded shadow-md mt-4">
      {/* overlay when saving */}
      {saving && (
        <div className="absolute inset-0 bg-gray-100/60 flex items-center justify-center z-20 rounded">
          <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" fill="none"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" className="opacity-75"></path>
          </svg>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={saving}/>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input name="slug" value={form.slug} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={saving}/>
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={saving}>
            <option value="">-- Select Category --</option>
            {categories.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
          </select>
          {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select name="brand_id" value={form.brand_id} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={saving}>
            <option value="">-- Select Brand --</option>
            {brands.map(b => <option key={b.id} value={String(b.id)}>{b.name}</option>)}
          </select>
          {errors.brand_id && <p className="text-red-500 text-sm mt-1">{errors.brand_id}</p>}
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Purchase Price</label>
          <input name="purchase_price" value={form.purchase_price} onChange={handleChange} type="number" step="0.01" className="w-full border rounded px-3 py-2" disabled={saving}/>
          {errors.purchase_price && <p className="text-red-500 text-sm mt-1">{errors.purchase_price}</p>}
        </div>

        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input name="stock" value={form.stock} onChange={handleChange} type="number" className="w-full border rounded px-3 py-2" disabled={saving}/>
          {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full border rounded px-3 py-2" disabled={saving}/>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium mb-1">Product Image {initial?.id ? "(leave blank to keep current)" : ""}</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" disabled={saving}/>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

          {preview && (
            <div className="mt-2">
              <img src={preview} alt="preview" className="h-28 w-28 object-cover rounded border" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded" disabled={saving}>Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={saving}>{initial?.id ? "Update" : "Create"}</button>
      </div>
    </form>
  );
};

export default ProductForm;