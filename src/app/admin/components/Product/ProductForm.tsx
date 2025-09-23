import React, { useState } from "react";
import toast from "react-hot-toast";

export type ProductStatus = 1 | 2; // 1 = active, 2 = inactive

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

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
  status?: ProductStatus;
}

interface ProductFormProps {
  initial?: any;
  categories: Category[];
  brands: Brand[];
  onCancel: () => void;
  onSave: (data: FormData) => Promise<any>;
  
}

const ProductForm: React.FC<ProductFormProps> = ({
  initial,
  categories,
  brands,
  onCancel,
  onSave,
}) => {
  const [form, setForm] = useState({
    name: initial?.name || "",
    slug: initial?.slug || "",
    category_id: initial?.category_id || "",
    brand_id: initial?.brand_id || "",
    purchase_price: initial?.purchase_price || "",
    stock: initial?.stock || "",
    description: initial?.description || "",
    image: null as File | null,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      slug?: string;
      category_id?: string;
      brand_id?: string;
      purchase_price?: string;
      stock?: string;
      image?: string;
      description?: string;
    } = {};
  
    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
  
    // Slug
    if (!form.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9\-]+$/.test(form.slug)) {
      newErrors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
    }
  
    // Category
    if (!form.category_id || form.category_id === "") {
      newErrors.category_id = "Category is required";
    }
  
    // Brand
    if (!form.brand_id || form.brand_id === "") {
      newErrors.brand_id = "Brand is required";
    }
  
    // Purchase Price
    if (!form.purchase_price || Number(form.purchase_price) <= 0) {
      newErrors.purchase_price = "Purchase price must be greater than 0";
    }
  
    // Stock
    if (!form.stock || Number(form.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }
  
    // Description (optional, but can enforce min length)
    if (form.description && form.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }
  
    // Image (optional for edit, required for new)
    if (form.image instanceof File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(form.image.type)) {
        newErrors.image = "Only JPG, PNG, JPEG, or GIF images are allowed";
      }
    
      const maxSizeMB = 2; // max 2 MB
      if (form.image.size / 1024 / 1024 > maxSizeMB) {
        newErrors.image = `Image must be smaller than ${maxSizeMB} MB`;
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('slug', form.slug);
    formData.append('category_id', form.category_id.toString());
    formData.append('brand_id', form.brand_id.toString());
    formData.append('purchase_price', form.purchase_price.toString());
    formData.append('stock', form.stock.toString());
    formData.append('description', form.description);
  
    if (form.image instanceof File) {
      formData.append('image', form.image);
    }
  
    try {
      setSaving(true);
      await onSave(formData);
      // toast.success("Saved successfully");
    } catch (err) {
      const message = (err as any)?.response?.data?.message ?? (err as Error).message ?? "Save failed";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mt-4">
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
      <div className="grid grid-cols-12 gap-4">
        {/* Name */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Slug */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
        </div>

        {/* Category */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
        </div>

        {/* Brand */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select
            name="brand_id"
            value={form.brand_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          >
            <option value="">-- Select Brand --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          {errors.brand_id && <p className="text-red-500 text-sm">{errors.brand_id}</p>}
        </div>

        {/* Purchase Price */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Purchase Price</label>
          <input
            type="number"
            name="purchase_price"
            value={form.purchase_price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          />
          {errors.purchase_price && <p className="text-red-500 text-sm">{errors.purchase_price}</p>}
        </div>

        {/* Stock */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          />
           {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
        </div>

        {/* Description - full width */}
        <div className="col-span-12">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setForm({ ...form, image: e.target.files[0] });
              }
            }}
            className="w-full border rounded px-3 py-2"
          />
          {form.image && typeof form.image === "string" && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/products/${form.image}`}
              alt="Product"
              className="mt-2 h-20 w-20 object-cover rounded"
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
