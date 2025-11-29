"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

import CartSidebar from "./CartSidebar";
import AuthModal from "./AuthModal";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/useCartStore";
import { useModalStore } from "@/store/modalStore";

import logo from "../../../public/logo.png";

const Header: React.FC = () => {
  const router = useRouter();

  const { isAuthenticated, logout } = useAuthStore();
  const { items } = useCartStore();
  const { isAuthModalOpen, openAuthModal, closeAuthModal, setIsAuthModalOpen } =
    useModalStore();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  const showCustomerProfile = () => {
    router.push("/customer");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Success!",
      text: "You are successfully logged out",
      icon: "success",
      confirmButtonText: "OK",
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        logout();
        router.push("/");
      },
    });
  };

  // const handleLoginSuccess = () => {
  //   setIsAuthModalOpen(false);
  // };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: Logo + Search + Icons */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push("/")}
              className="flex items-center focus:outline-none"
            >
              <Image
                src={logo}
                alt="Smart PLC BD"
                className="w-40 h-auto"
                priority
              />
            </button>
          </div>

          {/* Search bar (no All Categories) */}
          <div className="flex-1 max-w-3xl mx-6">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="I'm shopping for ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 rounded-full border border-gray-300 px-4 pr-12 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
              <button
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors focus:outline-none focus:ring-0"
                aria-label="Search"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Icons: Wishlist + Cart + Account */}
          <div className="flex items-center space-x-5">
            {/* Wishlist */}
            <button className="relative text-gray-700 hover:text-gray-900 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px]">
                {wishlistItems.length}
              </span>
            </button>

            {/* Cart */}
            <button
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px]">
                  {items.length}
                </span>
              )}
            </button>

            {/* Account / Login */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 text-sm"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">Account</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      <button
                        onClick={() => {
                          showCustomerProfile();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogoutClick();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 text-sm"
                  onClick={openAuthModal}
                  aria-label="Login"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />

      {/* Cart sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
