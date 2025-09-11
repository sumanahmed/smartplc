'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import CustomerDashboard from "./customerDashboad";

const CustomerPage = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.push("/");
    } else if (user?.role !== "customer") {
      router.push("/"); // not customer
    }
  }, [hydrated, isAuthenticated, user, router]);

  if (!hydrated || !isAuthenticated || user?.role !== "customer") return null;
  return <CustomerDashboard />;
};

export default CustomerPage;
