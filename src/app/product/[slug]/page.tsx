'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductDetails from '@/components/frontend/ProductDetails';
import { getProductDetails } from '@/lib/productsApi';

interface CartItem {
  id: number;
  name: string;
  purchase_price: number;
  quantity: number;
  image: string;
  //size?: string;
  //color?: string;
  brand?: { id: number; name: string };
  category?: { id: number; name: string };
  description: string;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductDetails(String(params.slug));
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const handleAddToCart = (product: any, quantity: number = 1, size?: string, color?: string) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        purchase_price: product.purchase_price,
        quantity,
        image: product.image,
        brand: product.brand,
        description: product.description,
        category: product.category
      }]);
    }
  };

  const handleAddToWishlist = (product: any) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
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
