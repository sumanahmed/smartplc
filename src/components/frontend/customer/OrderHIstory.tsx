"use client";

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getCustomerOrders } from "@/lib/ordersApi";

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
  total: number | string;
  items: ApiOrderItem[];
};

export type OrderRow = {
  id: number;
  orderNumber: string;
  date: string;
  items: { name: string }[];
  status: "delivered" | "processing" | "shipped" | "cancelled" | string;
  paymentStatus: "Paid" | "Pending" | "Failed" | string;
  total: number;
};

type OrderHistoryProps = {
  onViewDetails: (orderId: number) => void;
};

const mapApiOrderToRow = (order: ApiOrder): OrderRow => ({
  id: order.id,
  orderNumber: order.order_number,
  date: order.created_at,
  items: (order.items || []).map((i) => ({ name: i.name })),
  status: order.status,
  paymentStatus: order.payment_status as OrderRow["paymentStatus"],
  total: Number(order.total || 0),
});

const OrderHistory: React.FC<OrderHistoryProps> = ({ onViewDetails }) => {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiData = await getCustomerOrders(); // res.data.data
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

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-6">Loading orders...</p>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Order History
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
          Order History
        </h2>
        <p className="text-gray-500 text-lg">
          You have no order history yet.
        </p>
      </div>
    );
  }
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Order History</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{orders?.map((order) => (
							<tr key={order.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderNumber}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items.map((item) => item.name).join(", ")}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
										{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
										{order.paymentStatus}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳{order.total.toFixed(2)}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<button onClick={() => onViewDetails(order.id)} className="text-blue-600 hover:text-blue-900 transition-colors">
										<Eye className="h-5 w-5" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderHistory;

 
