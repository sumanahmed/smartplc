"use client";
import React from "react";
import Image from "next/image";
import { downloadInvoice } from "@/lib/ordersApi";

type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  price: string;
  quantity: number;
  subtotal: string;
  created_at: string;
  updated_at: string;
};

type Payment = {
  id: number;
  order_id: number;
  method: string;
  transaction_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: number;
  user_id?: number;
  order_number: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  status: string;
  total_amount: string;
  created_at: string;
  updated_at?: string;
  items: OrderItem[];
  payment: Payment;
};

type OrderDetailsProps = {
  order: Order;
  onBack: () => void;
};

const formatCurrency = (value: number | string) => {
  const num = typeof value === "string" ? parseFloat(value) || 0 : value;
  return num.toFixed(2);
};

const capitalize = (s?: string) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack }) => {
  // Compute subtotal
  const subtotal = order.items.reduce((acc, it) => {
    const itemSubtotal =
      parseFloat(it.subtotal ?? "") ||
      parseFloat(it.price ?? "0") * (it.quantity ?? 0);
    return acc + itemSubtotal;
  }, 0);

  const total = parseFloat(order.total_amount ?? "0");
  const payment = order.payment;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="h-5 w-5">←</span>
            <span>Back to Orders</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Order #{order.order_number}</p>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* STATUS */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order Status
            </h3>
            <div className="flex items-center space-x-4 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {capitalize(order.status)}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  payment?.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : payment?.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : payment?.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Payment: {capitalize(payment?.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ITEMS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Items
          </h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500">No Image</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {item.product_name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Product ID: {item.product_id}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ৳{formatCurrency(item.subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">৳ {formatCurrency(subtotal)}</span>
            </div>

            <div className="border-t border-gray-300 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ৳{formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              Payment Information
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">
                  {payment?.method?.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-medium ${
                    payment?.status === "paid"
                      ? "text-green-600"
                      : payment?.status === "pending"
                      ? "text-yellow-600"
                      : payment?.status === "failed"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {capitalize(payment?.status)}
                </span>
              </div>

              {payment?.transaction_id && (
                <div className="mt-3">
                  <span className="text-gray-600">Transaction ID</span>
                  <div className="font-mono text-sm mt-1">
                    {payment.transaction_id}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Shipping Address
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-900">{order.name}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">
                {order.city} • {order.postal_code}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Email: {order.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
        onClick={() => downloadInvoice(order.id, order.order_number)}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Download Invoice
        </button>

        {order.status === "delivered" && (
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Reorder
          </button>
        )}

        {order.status === "processing" && (
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
