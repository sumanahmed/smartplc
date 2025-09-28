'use client'
import { useEffect, useState } from "react";
import { fetchProductBySlug } from "@/lib/homeApi";

export default function ProductDetails({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetchProductBySlug(slug);
      setProduct(res);
    };
    loadProduct();
  }, [slug]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-80 h-80 object-cover mb-4" />
      <p className="text-lg font-semibold text-gray-700">Price: {product.price}৳</p>
      <p className="mt-4 text-gray-600">{product.description}</p>
    </div>
  );
}
