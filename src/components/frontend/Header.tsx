'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, ChevronDown } from 'lucide-react';
import CartSidebar from './CartSidebar';
import AuthModal from './AuthModal'; // Import AuthModal
import Image from 'next/image';
import logo from '../../../public/logo.png'

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  total: number;
  items: CartItem[];
  shippingAddress: any;
  trackingNumber?: string;
  timeline: Array<{
    status: string;
    date: string;
    location?: string;
    description: string;
  }>;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State for AuthModal
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const categories = [
    'Fashion', 'Electronics', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Automotive', 'Toys'
  ];

  const onCartClick = () => {
    setIsCartOpen(true);
  };

  const handleAddToCart = (product: any, quantity: number = 1, size?: string, color?: string) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          size,
          color,
        },
      ]);
    }
  };

  const handleUpdateCartQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    if (quantity === 0) {
      handleRemoveFromCart(id, size, color);
      return;
    }
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id: number, size?: string, color?: string) => {
    setCartItems(
      cartItems.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const handleAddToWishlist = (product: WishlistItem) => {
    const isAlreadyInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (!isAlreadyInWishlist) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
  };

  const showCustomerProfile = () => {
    router.push(`/customer`)
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">
                <a href="/">
                  <Image src={logo} width={300} height={300} alt="Smart PLC BD"/>
                </a>
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative flex items-center h-10">
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center px-4 h-10 border border-r-0 rounded-l-md bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-700"
                  aria-label="Toggle category menu"
                  aria-expanded={isCategoriesOpen}
                  aria-haspopup="true"
                >
                  <span className="text-sm font-medium">All Categories</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        onClick={() => {
                          setIsCategoriesOpen(false);
                          // Add category selection logic here if needed
                        }}
                        aria-label={`Select ${category}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 px-4 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
                  aria-label="Search products"
                />
                <button
                  className="absolute right-0 top-0 h-10 px-4 bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-md transition-colors"
                  aria-label="Search"
                  onClick={() => {
                    // Add search logic here
                    console.log('Searching for:', searchQuery);
                  }}
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative" role="navigation">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
                    aria-label="Toggle user menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline text-sm">Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="user-menu absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          showCustomerProfile();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsLoggedIn(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
                  onClick={() => setIsAuthModalOpen(true)} // Open AuthModal
                  aria-label="Login"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm">Login</span>
                </button>
              )}
            </div>
            
            <button className="relative text-gray-700 hover:text-gray-900 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlistItems.length}
              </span>
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </header>
  );
};

export default Header;