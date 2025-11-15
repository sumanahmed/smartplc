"use client";
import React, { useEffect, useState } from "react";
import { Eye } from 'lucide-react';
import { getCustomerOrders } from "@/lib/ordersApi";

type OrderItem = { name: string };

export type OrderRow = {
	id: string;
	orderNumber: string;
	date: string;
	items: OrderItem[];
	status: 'delivered' | 'processing' | 'shipped' | 'cancelled' | string;
	paymentStatus: 'Paid' | 'Pending' | 'Failed' | string;
	total: number;
};

type OrderHistoryProps = {
	//orders: OrderRow[];
	onViewDetails: (orderId: string) => void;
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ onViewDetails }) => {
	const [orders, setOrders] = useState<OrderRow[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await getCustomerOrders(); // your Laravel API
				console.log(response.data.data)
				setOrders(response.data.data); // assuming API returns { data: [...] }
			} catch (error) {
				console.error("Failed to fetch orders:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);
	if (loading) return <p className="text-center text-gray-500">Loading orders...</p>;

	if (!orders.length)
		return (
		<div className="bg-white rounded-lg shadow-md p-6 text-center">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Order History</h2>
			<p className="text-gray-500 text-lg">You have no order history yet.</p>
		</div>
		);
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

 
