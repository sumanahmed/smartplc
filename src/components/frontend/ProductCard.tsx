import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

interface Product {
  id: number;
  slug: string;
  name: string;
  purchase_price: number;
  description: string;
  specification: string;
  originalPrice?: number;
  image: string;
  category: { id: number; name: string };
  brand?: { id: number; name: string };
  stock: number;
}

interface ProductCardProps {
  product: Product;
  // onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();
  const addItem = useCartStore(state => state.addToCart);

  // 🩵 Toggle wishlist
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  // 🩵 Add to cart (don’t trigger navigation)
  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.stopPropagation(); // Prevent redirect
  //   onAddToCart(product);
  // };

 const handleAddToCart = (e: React.MouseEvent) => {
  e.stopPropagation();
  addItem({
    id: product.id,
    //slug: product.slug,
    name: product.name,
    price: product.purchase_price,
    image: product.image,
    stock: product.stock ? product.stock : 0,
    quantity: 1,
  });
};

  // 🩵 Navigate to product details page
  const handleProductClick = () => {
    if (!product.slug) return;
    router.push(`/product/${product.slug}`); // make sure your route is /products/[slug]
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ==== IMAGE SECTION ==== */}
      <div className="relative">
        <img
          src={
            product.image.startsWith("http")
              ? product.image
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/products/${product.image}`
          }
          width={300}
          height={300}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Out of stock overlay */}
        {!product.stock && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}

        {/* Hover Add to Cart */}
        {isHovered && product.stock && (
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* ==== PRODUCT INFO ==== */}
      <div className="p-4 text-center">
        <h3 className="font-bold text-gray-900 mb-1 text-lg line-clamp-1 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-1 line-clamp-2">
          {product.description}
        </p>

        <p className="text-sm font-bold mb-2">
          {product.brand?.name || "No Brand"}
        </p>

        <p className="text-xl font-bold text-gray-900">
          Tk {product.purchase_price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
