import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  purchase_price: number;
  originalPrice?: number;
  image: string;
  category: { id: number; name: string };
  brand?: { id: number; name: string };
  stock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.image.startsWith("http")
            ? product.image
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/products/${product.image}`}
          width={300}
          height={300}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {!product.stock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}

        {isHovered && product.stock && (
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
            <button
              onClick={() => onAddToCart(product)}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}

        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        {/* <p className="text-xs text-gray-500 mb-1">{product.category?.name || "No Category"}</p> */}
        <h3
          className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-500 ml-2">
            {product.brand?.name || "No Brand"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.purchase_price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          {!isHovered && product.stock && (
            <button
              onClick={() => onAddToCart(product)}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
