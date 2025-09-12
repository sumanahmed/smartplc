"use client";

import React, { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";
import RegisterModal from "./RegisterModal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);
  const [showRegister, setShowRegister] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await api.post("api/login", {
          email: formData.email,
          password: formData.password,
        });

        const role = res.data.user.role;

        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: `Logged in as ${role}`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Zustand 
       // loginStore(res.data.user, res.data.token);
        loginStore(res.data.token, res.data.user);

        //console.log("Login success:", res.data);

        if (role === "admin") {
          router.push("/admin");
        } else if (role === "customer") {
          router.push("/customer");
        } else {
          router.push("/");
        }
      }

      onClose();
    } catch (error: any) {
      console.error("Auth error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <>
    <div
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            {/* {isLogin ? "Sign In" : "Create Account"} */}
            Sign In
            
          </button>
          <p className="text-center text-sm text-gray-600">
            {/* {isLogin ? "Don't have an account?" : "Already have an account?"} */}
            Don't have an account? 
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
              >
               Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSuccess={() => setShowRegister(false)}
      />
    </>
  );
};

export default AuthModal;
