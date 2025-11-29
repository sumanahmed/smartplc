"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HeroCarousel from "@/components/frontend/HeroCarousel";
import CategorySection from "@/components/frontend/CategorySection";
import BrowseCategoriesPanel from "@/components/frontend/BrowseCategoriesPanel";

import {
  fetchAllActiveCategories,
  fetchProductsByCategorySlug,
} from "../lib/homeApi";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Home() {
  const router = useRouter();

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{
    [key: string]: any[];
  }>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await fetchAllActiveCategories();
        setCategories(cats);

        const productData: { [key: string]: any[] } = {};
        for (const cat of cats) {
          const products = await fetchProductsByCategorySlug(cat.slug);
          productData[cat.slug] = products.slice(0, 8);
        }
        setCategoryProducts(productData);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleAddToWishlist = (product: any) => {
    if (!wishlistItems.some((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-12">
      {/* TOP SECTION – screenshot style */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          <div className="flex gap-4 items-stretch">
            {/* LEFT: Browse Categories panel */}
            <div className="w-64 flex-shrink-0">
              <BrowseCategoriesPanel categories={categories} />
            </div>

            {/* RIGHT: nav + slider same card */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden h-full">
                {/* Top nav – Home / Shop / About Us / Contact Us */}
                <div className="flex items-center space-x-8 px-10 h-12 border-b text-sm">
                  <button
                    onClick={() => goTo("/")}
                    className="font-medium text-gray-900 border-b-2 border-gray-900 pb-0.5"
                  >
                    Home
                  </button>
                  {/* <button
                    onClick={() => goTo("/shop")}
                    className="font-medium text-gray-700 hover:text-gray-900 hover:border-gray-900 border-b-2 border-transparent pb-0.5"
                  >
                    Shop
                  </button> */}
                  <button
                    onClick={() => goTo("/about-us")}
                    className="font-medium text-gray-700 hover:text-gray-900 hover:border-gray-900 border-b-2 border-transparent pb-0.5"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => goTo("/contact-us")}
                    className="font-medium text-gray-700 hover:text-gray-900 hover:border-gray-900 border-b-2 border-transparent pb-0.5"
                  >
                    Contact Us
                  </button>
                </div>

                {/* Bottom: slider – width full */}
                <div className="p-0">
                  <HeroCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* category wise product section */}
      <div className="max-w-7xl mx-auto px-4">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            title={category.name}
            slug={category.slug}
            products={categoryProducts[category.slug] || []}
            onAddToWishlist={handleAddToWishlist}
          />
        ))}
      </div>
    </div>
  );
}
