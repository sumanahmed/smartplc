"use client";
import React from "react";
import Modal from "../ViewModal";
import { Product } from './ProductForm';

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  categoryList: Category[];
  brandList: Brand[];
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  open,
  onClose,
  product,
  categoryList,
  brandList,
}) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose} title="Product Details" size="xl">
      <div className="grid grid-cols-12 gap-6 p-4">
        {/* Left side - Image */}
        <div className="col-span-4 flex justify-center">
          {product.image ? (
            <img
              src={
                product.image.startsWith("http")
                  ? product.image
                  : `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/products/${product.image}`
              }
              width={300}
              height={300}
              alt={product.name}
              className="w-[400px] h-[267px] object-cover rounded-xl shadow-md border border-gray-200"
            />
          ) : (
            <div className="w-[400px] h-[267px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 border border-dashed">
              No image
            </div>
          )}
        </div>

        {/* Right side - Details */}
        <div className="col-span-8 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Category:</span>{" "}
              {product.category?.name ??
                categoryList.find((c) => c.id === product.category_id)?.name ??
                "-"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Brand:</span>{" "}
              {product.brand?.name ??
                brandList.find((b) => b.id === product.brand_id)?.name ??
                "-"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Price:</span> $
              {product.purchase_price}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Stock:</span>{" "}
              {product.stock}
            </p>
          </div>

          {product.description && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Description</h4>
              <p className="text-gray-700 leading-relaxed border p-3 rounded-lg bg-gray-50 shadow-sm">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
