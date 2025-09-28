import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
}

interface CategorySectionProps {
  title: string;
  slug: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  products,
  slug, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // return (
  //   <div className="py-8">
  //     <div className="flex items-center justify-between mb-6">
  //       <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
  //       <div className="flex space-x-2">
  //         <button
  //           onClick={() => scroll('left')}
  //           className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
  //         >
  //           <ChevronLeft className="h-5 w-5" />
  //         </button>
  //         <button
  //           onClick={() => scroll('right')}
  //           className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
  //         >
  //           <ChevronRight className="h-5 w-5" />
  //         </button>
  //       </div>
  //     </div>
      
  //     <div
  //       ref={scrollContainerRef}
  //       className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
  //       style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
  //     >
  //       {products.map((product) => (
  //         <div key={product.id} className="flex-shrink-0 w-64">
  //           <ProductCard
  //             product={product}
  //             onAddToCart={onAddToCart}
  //             onAddToWishlist={onAddToWishlist}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        <div className="flex items-center space-x-4">
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
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64">
            <ProductCard product={product} 
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;