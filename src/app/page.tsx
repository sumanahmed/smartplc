'use client'
import { useEffect, useState } from 'react';
import HeroCarousel from "@/components/frontend/HeroCarousel";
import CategorySection from "@/components/frontend/CategorySection";
import { fetchAllActiveCategories, fetchProductsByCategorySlug } from '../lib/homeApi';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export default function Home() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await fetchAllActiveCategories();
        setCategories(cats);

        const productData: { [key: string]: any[] } = {};
        for (let cat of cats) {
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

  const handleAddToCart = (product: any, quantity: number = 1, size?: string, color?: string) => {
    const existingItem = cartItems.find(item =>
      item.id === product.id && item.size === size && item.color === color
    );
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.purchase_price,
        quantity,
        image: product.image,
        size,
        color
      }]);
    }
  };

  const handleAddToWishlist = (product: any) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  return (
    <div className="space-y-12">
      <HeroCarousel />
      <div className="max-w-7xl mx-auto px-4">
        {categories.map(category => (
          <CategorySection
            key={category.id}
            title={category.name}
            slug={category.slug}
            products={categoryProducts[category.slug] || []}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        ))}
      </div>
    </div>
  );
}
