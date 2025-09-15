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
  LogOut
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType;
  action?: () => void;       
}

import FormsPage from './components/FormsPage';
import DataTablePage from './components/DataTablePage';
import CategoryPage from './components/Category/CategoryListPage';
import BrandPage from './components/Brand/BrandListPage';
import ProductPage from './components/ProductPage';
import CustomerPage from './components/CustomerPage';
import OrderDetailsPage from './components/OrderDetailsPage';



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

  // ✅ hooks inside component body
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
    { id: "order-details-table", label: "Order Details", icon: ListOrdered, component: OrderDetailsPage },
    { id: "forms", label: "Forms", icon: FileText, component: FormsPage },
    { id: "data-table", label: "Data Table", icon: Table, component: DataTablePage },
    { id: "logout", label: "Logout", icon: LogOut, action: handleLogout},
  ];

  const ActiveComponent =
    sidebarItems.find((item) => item.id === activeTab)?.component || DashboardPage;

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
                      item.action(); // 👈 handle logout
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
        <div className="flex-1 ml-64 h-screen overflow-y-auto">
          <main className="p-6">
            {!sidebarItems.find((i) => i.id === activeTab)?.action && (
              <ActiveComponent />
            )}
          </main>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
