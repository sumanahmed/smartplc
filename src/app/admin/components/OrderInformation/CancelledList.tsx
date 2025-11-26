"use client";

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { getOrdersCancelled, updateOrderStatus } from "@/lib/ordersApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

type ApiOrderItem = {
  id: number;
  name: string;
};

type ApiOrder = {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  payment_status: string;
  total_amount: number | string;
  items: ApiOrderItem[];
};

export type OrderRow = {
  id: number;
  orderNumber: string;
  date: string;
  items: { name: string }[];
  status: "delivered" | "processing" | "shipped" | "cancelled" | string;
  paymentStatus: "Paid" | "Pending" | "Failed" | string;
  total_amount: number;
};

const mapApiOrderToRow = (order: ApiOrder): OrderRow => ({
  id: order.id,
  orderNumber: order.order_number,
  date: order.created_at,
  items: (order.items || []).map((i) => ({ name: i.name })),
  status: order.status,
  paymentStatus: order.payment_status as OrderRow["paymentStatus"],
  total_amount: Number(order.total_amount || 0),
});

const STATUSES: { key: OrderRow["status"]; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "complete", label: "Complete" },
  { key: "cancelled", label: "Cancelled" },
];


const statusBadgeClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "complete":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderList = () => {
  const router = useRouter();

  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 👉 view button click = go to order details page
  const onViewDetails = (orderId: number) => {
    router.push(`/admin/components/OrderInformation/${orderId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiData = await getOrdersCancelled();
        const mapped = (apiData as ApiOrder[]).map(mapApiOrderToRow);
        setOrders(mapped);
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);
        setError(err?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleChangeStatus = async (order: OrderRow, newStatus: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `Change order "${order.orderNumber}" status to ${newStatus}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it",
  });

  if (!result.isConfirmed) return;

  try {
    await updateOrderStatus(order.id, newStatus); // backend call

    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );

    toast.success("Order status updated!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update status");
  }
};

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-6">Cancelled Loading orders...</p>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Cancelled Order List
        </h2>
        <p className="text-red-500 text-sm mb-2">{error}</p>
        <p className="text-gray-500 text-sm">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Cancelled Order List
        </h2>
        <p className="text-gray-500 text-lg">
          No orders found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancelled Order List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.orderNumber}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadgeClass(order.status)}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ৳ {order.total_amount.toFixed(2)}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-3">
                    {/* 👁 View Button */}
                    <button
                      onClick={() => onViewDetails(order.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>

                    {/* 🟡 Status Change Dropdown */}

                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
