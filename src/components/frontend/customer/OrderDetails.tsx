"use client";
import React from 'react';
import Image from 'next/image';

type OrderItem = {
	id: string;
	name: string;
	quantity: number;
	price: number;
	image: string;
	category: string;
};

type ShippingAddress = {
	name: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	phone: string;
};

export type Order = {
	id: string;
	orderNumber: string;
	date: string;
	items: OrderItem[];
	status: string;
	paymentStatus: string;
	paymentMethod: string;
	total: number;
	subtotal: number;
	shipping: number;
	tax: number;
	shippingAddress: ShippingAddress;
	trackingNumber: string | null;
	estimatedDelivery: string | null;
	actualDelivery: string | null;
};

type OrderDetailsProps = {
	order: Order;
	onBack: () => void;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
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
					<p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
					<p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
				</div>
			</div>

			<div className="mb-6 p-4 bg-gray-50 rounded-lg">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
						<div className="flex items-center space-x-4 mt-2">
							<span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
								{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
							</span>
							<span className={`px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
								Payment: {order.paymentStatus}
							</span>
						</div>
					</div>
					{order.trackingNumber && (
						<div className="text-right">
							<p className="text-sm text-gray-500">Tracking Number</p>
							<p className="font-mono text-lg font-semibold">{order.trackingNumber}</p>
						</div>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
					<div className="space-y-4">
						{order.items.map((item) => (
							<div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
								<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
									{/* <Image src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" /> */}
								</div>
								<div className="flex-1">
									<h4 className="font-medium text-gray-900">{item.name}</h4>
									<p className="text-sm text-gray-500">{item.category}</p>
									<div className="flex items-center justify-between mt-2">
										<span className="text-sm text-gray-600">Qty: {item.quantity}</span>
										<span className="font-semibold text-gray-900">৳{(item.price * item.quantity).toFixed(2)}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
					<div className="bg-gray-50 rounded-lg p-4 space-y-3">
						<div className="flex justify-between">
							<span className="text-gray-600">Subtotal</span>
							<span className="font-medium">৳{order.subtotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Shipping</span>
							<span className="font-medium">৳{order.shipping.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Tax</span>
							<span className="font-medium">৳{order.tax.toFixed(2)}</span>
						</div>
						<div className="border-t border-gray-300 pt-3">
							<div className="flex justify-between">
								<span className="text-lg font-semibold text-gray-900">Total</span>
								<span className="text-lg font-bold text-gray-900">৳{order.total.toFixed(2)}</span>
							</div>
						</div>
					</div>

					<div className="mt-6">
						<h4 className="text-md font-semibold text-gray-900 mb-3">Payment Information</h4>
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex justify-between mb-2">
								<span className="text-gray-600">Payment Method</span>
								<span className="font-medium">{order.paymentMethod}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Status</span>
								<span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : order.paymentStatus === 'Pending' ? 'text-yellow-600' : order.paymentStatus === 'Failed' ? 'text-red-600' : 'text-gray-600'}`}>
									{order.paymentStatus}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
				<div className="bg-gray-50 rounded-lg p-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
							<p className="text-gray-600">{order.shippingAddress.address}</p>
							<p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
						</div>
						<div>
							<p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
							{order.estimatedDelivery && (
								<p className="text-gray-600">Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
							)}
							{order.actualDelivery && (
								<p className="text-green-600 font-medium">Delivered: {new Date(order.actualDelivery).toLocaleDateString()}</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex justify-end space-x-4">
				<button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Download Invoice</button>
				{order.status === 'delivered' && (
					<button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Reorder</button>
				)}
				{order.status === 'processing' && (
					<button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Cancel Order</button>
				)}
			</div>
		</div>
	);
};

export default OrderDetails;


