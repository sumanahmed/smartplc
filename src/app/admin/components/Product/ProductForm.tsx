import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface ProductFormProps {
  initial?: any;
  categories: Category[];
  brands: Brand[];
  onCancel: () => void;
  onSave: (data: any) => void;
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mt-4">
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
          />
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
          />
        </div>

        {/* Category */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="col-span-6">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select
            name="brand_id"
            value={form.brand_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Brand --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
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
          />
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
          />
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
          />
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
