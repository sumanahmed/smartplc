import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </div>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        
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
        
        {isHovered && product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
            <button
              onClick={() => onAddToCart(product)}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {!isHovered && product.inStock && (
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