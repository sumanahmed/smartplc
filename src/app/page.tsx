'use client'
import CategorySection from "@/components/frontend/CategorySection";
import HeroCarousel from "@/components/frontend/HeroCarousel";
import { categories, getProductsByCategory } from '@/data/products';
import { useState } from 'react';

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
  const [cartItems, setCartItems] = useState <CartItem[]>([]);
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
        price: product.price,
        quantity,
        image: product.image,
        size,
        color
      }]);
    }
  };

  const handleAddToWishlist = (product: any) => {
    const isAlreadyInWishlist = wishlistItems.some(item => item.id === product.id);
    if (!isAlreadyInWishlist) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  return (
    <>
      <div className="space-y-12">
        <HeroCarousel />
        <div className="max-w-7xl mx-auto px-4">
          {categories.map(category => (
            <CategorySection
              key={category}
              title={category}
              products={getProductsByCategory(category)}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      </div>
    </>
  );
}
