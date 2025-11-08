'use client';
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
          <div className="animate-pulse">
            <div className="bg-gray-300 rounded-full w-16 h-16 mx-auto mb-4"></div>
            <div className="bg-gray-300 h-8 rounded mb-2"></div>
            <div className="bg-gray-300 h-4 rounded mb-4"></div>
            <div className="bg-gray-300 h-10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. We've received your order
          {orderId ? ` #${orderId}` : ""} and it's being processed.
        </p>
        <div className="space-x-3 mt-6">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}