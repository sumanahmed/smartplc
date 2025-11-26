"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAdminOrderById } from "@/lib/ordersApi";
import OrderDetails from "@/components/frontend/customer/OrderDetails";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const data = await getAdminOrderById(Number(id));
        setOrder(data);
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading Order Details...</p>;
  }

  if (!order) {
    return <p className="text-center text-red-600">Order not found</p>;
  }

  return (
    <OrderDetails 
      order={order} 
      onBack={() => router.push("/admin")}
    />
  );
}
