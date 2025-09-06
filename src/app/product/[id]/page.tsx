'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductDetails from '@/components/frontend/ProductDetails';
import { getProductsByCategory } from '@/data/products';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const demoProduct = {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      images: [
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400"
      ],
      rating: 4.8,
      reviews: 324,
      category: "Electronics",
      inStock: true,
      description: "Experience premium sound quality with these wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, gamers, and professionals who demand the best audio experience.",
      sizes: [],
      colors: ["Black", "White", "Silver"]
    };
    
    setProduct(demoProduct);
    setLoading(false);

  }, [params.id]);

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductDetails
      product={product}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
    />
  );
}
