"use client";
import React from 'react';
import { CreditCard, X } from 'lucide-react';

type PaymentMethod = {
	id: string;
	type: 'card' | 'bkash' | 'nagad';
	last4?: string;
	brand?: string;
	expiryDate?: string;
	isDefault: boolean;
};

type NewPayment = {
	paymentType: 'card' | 'bkash' | 'nagad';
	cardNumber: string;
	expiryDate: string;
	cvv: string;
	nameOnCard: string;
	phone: string;
	isDefault: boolean;
};

type PaymentMethodsProps = {
	paymentMethods: PaymentMethod[];
	showAddPayment: boolean;
	setShowAddPayment: (show: boolean) => void;
	newPayment: NewPayment;
	setNewPayment: (payment: NewPayment) => void;
	onAddPayment: () => void;
	onDeletePaymentMethod: (id: string) => void;
};

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
	paymentMethods,
	showAddPayment,
	setShowAddPayment,
	newPayment,
	setNewPayment,
	onAddPayment,
	onDeletePaymentMethod,
}) => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
				<button
					onClick={() => setShowAddPayment(true)}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					Add Payment Method
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{paymentMethods.map((method) => (
					<div key={method.id} className="bg-white rounded-lg shadow-md p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-3">
								<CreditCard className="h-8 w-8 text-gray-400" />
								<div>
									<p className="font-medium text-gray-900">
										{method.brand} {method.last4 ? `•••• ${method.last4}` : ''}
									</p>
									{method.expiryDate && (
										<p className="text-sm text-gray-600">Expires {method.expiryDate}</p>
									)}
								</div>
							</div>
							<div className="flex items-center space-x-2">
								{method.isDefault && (
									<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Default</span>
								)}
								<button
									onClick={() => onDeletePaymentMethod(method.id)}
									className="text-red-400 hover:text-red-600"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{showAddPayment && (
				<div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-md">
						<div className="flex justify-between items-center p-6 border-b">
							<h3 className="text-lg font-semibold text-gray-900">Add Payment Method</h3>
							<button
								onClick={() => setShowAddPayment(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="h-6 w-6" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
								<select
									value={newPayment.paymentType}
									onChange={(e) => setNewPayment({ ...newPayment, paymentType: e.target.value as NewPayment['paymentType'] })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="card">Card</option>
									<option value="bkash">bKash</option>
									<option value="nagad">Nagad</option>
								</select>
							</div>

							{newPayment.paymentType === 'card' && (
								<>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
										<input
											type="text"
											value={newPayment.cardNumber}
											onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
											placeholder="1234 5678 9012 3456"
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
											<input
												type="text"
												value={newPayment.expiryDate}
												onChange={(e) => setNewPayment({ ...newPayment, expiryDate: e.target.value })}
												placeholder="MM/YY"
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
											<input
												type="text"
												value={newPayment.cvv}
												onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
												placeholder="123"
												className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus-border-transparent"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
										<input
											type="text"
											value={newPayment.nameOnCard}
											onChange={(e) => setNewPayment({ ...newPayment, nameOnCard: e.target.value })}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										/>
									</div>
								</>
							)}

							{(newPayment.paymentType === 'bkash' || newPayment.paymentType === 'nagad') && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
									<input
										type="tel"
										value={newPayment.phone}
										onChange={(e) => setNewPayment({ ...newPayment, phone: e.target.value })}
										placeholder="01XXXXXXXXX"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							)}
							<div className="flex items-center">
								<input
									type="checkbox"
									id="defaultPayment"
									checked={newPayment.isDefault}
									onChange={(e) => setNewPayment({ ...newPayment, isDefault: e.target.checked })}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label htmlFor="defaultPayment" className="ml-2 text-sm text-gray-600">
									Set as default payment method
								</label>
							</div>
						</div>
						<div className="flex justify-end space-x-3 p-6 border-t">
							<button
								onClick={() => setShowAddPayment(false)}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={onAddPayment}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								Add Payment Method
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PaymentMethods;


