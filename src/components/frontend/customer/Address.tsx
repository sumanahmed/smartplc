"use client";
import React from 'react';
import { Edit2, X } from 'lucide-react';

type AddressType = 'home' | 'work' | 'other';

type AddressItem = {
	id: string;
	type: AddressType;
	name: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	isDefault: boolean;
};

type NewAddress = {
	type: AddressType;
	name: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	isDefault: boolean;
};

type AddressProps = {
	addresses: AddressItem[];
	showAddAddress: boolean;
	setShowAddAddress: (show: boolean) => void;
	newAddress: NewAddress;
	setNewAddress: (addr: NewAddress) => void;
	editingAddress: string | null;
	editingAddressData: NewAddress;
	setEditingAddressData: (addr: NewAddress) => void;
	onEditAddress: (addressId: string) => void;
	onDeleteAddress: (addressId: string) => void;
	onAddAddress: () => void;
	onUpdateAddress: () => void;
	onCancelEditAddress: () => void;
};

const Address: React.FC<AddressProps> = ({
	addresses,
	showAddAddress,
	setShowAddAddress,
	newAddress,
	setNewAddress,
	editingAddress,
	editingAddressData,
	setEditingAddressData,
	onEditAddress,
	onDeleteAddress,
	onAddAddress,
	onUpdateAddress,
	onCancelEditAddress,
}) => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
				<button
					onClick={() => setShowAddAddress(true)}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					Add New Address
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{addresses.map((address) => (
					<div key={address.id} className="bg-white rounded-lg shadow-md p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-2">
								<span className="capitalize font-medium text-gray-900">{address.type}</span>
								{address.isDefault && (
									<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Default</span>
								)}
							</div>
							<div className="flex space-x-2">
								<button
									onClick={() => onEditAddress(address.id)}
									className="text-gray-400 hover:text-gray-600"
								>
									<Edit2 className="h-4 w-4" />
								</button>
								<button
									onClick={() => onDeleteAddress(address.id)}
									className="text-red-400 hover:text-red-600"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
						</div>
						<div className="text-sm text-gray-600 space-y-1">
							<p className="font-medium text-gray-900">{address.name}</p>
							<p>{address.address}</p>
							<p>{address.city}, {address.state} {address.zipCode}</p>
						</div>
					</div>
				))}
			</div>

			{showAddAddress && (
				<div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-md">
						<div className="flex justify-between items-center p-6 border-b">
							<h3 className="text-lg font-semibold text-gray-900">Add New Address</h3>
							<button
								onClick={() => setShowAddAddress(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="h-6 w-6" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
								<select
									value={newAddress.type}
									onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as AddressType })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="home">Home</option>
									<option value="work">Work</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
								<input
									type="text"
									value={newAddress.name}
									onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
								<input
									type="text"
									value={newAddress.address}
									onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">City</label>
									<input
										type="text"
										value={newAddress.city}
										onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">State</label>
									<input
										type="text"
										value={newAddress.state}
										onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
								<input
									type="text"
									value={newAddress.zipCode}
									onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="defaultAddress"
									checked={newAddress.isDefault}
									onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-600">
									Set as default address
								</label>
							</div>
						</div>
						<div className="flex justify-end space-x-3 p-6 border-t">
							<button
								onClick={() => setShowAddAddress(false)}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={onAddAddress}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								Add Address
							</button>
						</div>
					</div>
				</div>
			)}

			{editingAddress && (
				<div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-md">
						<div className="flex justify-between items-center p-6 border-b">
							<h3 className="text-lg font-semibold text-gray-900">Edit Address</h3>
							<button
								onClick={onCancelEditAddress}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="h-6 w-6" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
								<select
									value={editingAddressData.type}
									onChange={(e) => setEditingAddressData({ ...editingAddressData, type: e.target.value as AddressType })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="home">Home</option>
									<option value="work">Work</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
								<input
									type="text"
									value={editingAddressData.name}
									onChange={(e) => setEditingAddressData({ ...editingAddressData, name: e.target.value })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
								<input
									type="text"
									value={editingAddressData.address}
									onChange={(e) => setEditingAddressData({ ...editingAddressData, address: e.target.value })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">City</label>
									<input
										type="text"
										value={editingAddressData.city}
										onChange={(e) => setEditingAddressData({ ...editingAddressData, city: e.target.value })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">State</label>
									<input
										type="text"
										value={editingAddressData.state}
										onChange={(e) => setEditingAddressData({ ...editingAddressData, state: e.target.value })}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
								<input
									type="text"
									value={editingAddressData.zipCode}
									onChange={(e) => setEditingAddressData({ ...editingAddressData, zipCode: e.target.value })}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									id="editDefaultAddress"
									checked={editingAddressData.isDefault}
									onChange={(e) => setEditingAddressData({ ...editingAddressData, isDefault: e.target.checked })}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label htmlFor="editDefaultAddress" className="ml-2 text-sm text-gray-600">
									Set as default address
								</label>
							</div>
						</div>
						<div className="flex justify-end space-x-3 p-6 border-t">
							<button
								onClick={onCancelEditAddress}
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={onUpdateAddress}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								Update Address
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Address;


