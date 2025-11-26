'use client';

import { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";

import { 
  LayoutDashboard, 
  FileText, 
  Table, 
  FileUser,
  ListOrdered,
  Aperture,
  ChevronsUp,
  Menu,
  X,
  ChevronRight,
  LogOut,
  MessageCircleX,
  BadgeCheck,
  PlaneTakeoff
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  component?: React.ComponentType; // Make component optional
  action?: () => void;       
}

// Your component imports...
import CategoryPage from './components/Category/CategoryListPage';
import BrandPage from './components/Brand/BrandListPage';
import ProductPage from './components/Product/ProductListPage';
import CustomerPage from './components/CustomerPage';
import UserPage from './components/User/AllUserPage';
import OrderDetailsPage from './components/OrderInformation/OrderList';
import OrderProcessingPage from './components/OrderInformation/ProcessingList';
import OrderCompletedPage from './components/OrderInformation/CompletedList';
import OrderCancelledPage from './components/OrderInformation/CancelledList';

const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="text-3xl font-bold text-green-600">5,678</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">$12,345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Products</h3>
          <p className="text-3xl font-bold text-orange-600">89</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: "success",
      title: "You are successfully logged out!",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/");
  };

  const sidebarItems: SidebarItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, component: DashboardPage },
    { id: "category-table", label: "Category", icon: Aperture, component: CategoryPage },
    { id: "brand-table", label: "Brand", icon: ChevronsUp, component: BrandPage },
    { id: "product-table", label: "Product", icon: Table, component: ProductPage },
    { id: "customer-table", label: "Customer", icon: FileUser, component: CustomerPage },
    { id: "user-table", label: "User", icon: FileUser, component: UserPage },
    { id: "order-details-table", label: "Order Details", icon: ListOrdered, component: OrderDetailsPage },
    { id: "order-processing", label: "Order Processing List", icon: PlaneTakeoff, component: OrderProcessingPage },
    { id: "order-completed", label: "Order Completed List", icon: BadgeCheck, component: OrderCompletedPage },
    { id: "order-Cancelled", label: "Order Cancelled List", icon: MessageCircleX , component: OrderCancelledPage },
    { id: "logout", label: "Logout", icon: LogOut, action: handleLogout }, // No component needed
  ];

  // Find the active component, fallback to DashboardPage
  const activeItem = sidebarItems.find((item) => item.id === activeTab);
  const ActiveComponent = activeItem?.component || DashboardPage;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 bg-blue-600 text-white">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id && !item.action
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : "text-gray-700"
                } ${item.id === "logout" ? "text-red-600 hover:bg-red-50" : ""}`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && !item.action && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300 h-screen overflow-y-auto`}>
        <main className="p-6">
          {/* Only render component if it exists and this is not an action item */}
          {!activeItem?.action && <ActiveComponent />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;