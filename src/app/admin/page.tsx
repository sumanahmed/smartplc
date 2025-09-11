'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import AdminDashboard from "./AdminDashboard";

const AdminPage = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // wait for Zustand persist
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.push("/"); 
    } else if (user?.role !== "admin") {
      router.push("/"); // not admin
    }
  }, [hydrated, isAuthenticated, user, router]);

  if (!hydrated || !isAuthenticated || user?.role !== "admin") return null;
  return <AdminDashboard />;
};

export default AdminPage;
