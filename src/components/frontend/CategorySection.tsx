import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  purchase_price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: { id: number; name: string };
  brand?: { id: number; name: string };
  stock: boolean;
  created_at?: string;
}

interface CategorySectionProps {
  title: string;
  slug: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, slug, products, onAddToCart, onAddToWishlist }) => {
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  // const scroll = (direction: 'left' | 'right') => {
  //   if (scrollContainerRef.current) {
  //     const scrollAmount = 300;
  //     scrollContainerRef.current.scrollBy({
  //       left: direction === 'left' ? -scrollAmount : scrollAmount,
  //       behavior: 'smooth'
  //     });
  //   }
  // };

  const latestProducts = [...products]
              .sort((a, b) => (b.created_at ? new Date(b.created_at).getTime() : 0) - (a.created_at ? new Date(a.created_at).getTime() : 0))
              .slice(0, 4);

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link
          href={`/category/${slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all"
        >
          View All
        </Link>
        {/* <div className="flex items-center space-x-4">
          <Link href={`/category/${slug}`} className="text-blue-600 hover:underline">
            See All →
          </Link>
          <div className="flex space-x-2">
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-100">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
