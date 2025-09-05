"use client";
import React from 'react';
import Image from 'next/image';

export type WishlistItem = {
	id: string;
	name: string;
	price: number;
	image: string;
};

type WishlistProps = {
	items: WishlistItem[];
};

const Wishlist: React.FC<WishlistProps> = ({ items }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Wishlist</h2>
			{items.length === 0 ? (
				<p className="text-gray-600">Your saved items will appear here.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.map((item) => (
						<div key={item.id} className="border border-gray-200 rounded-lg p-4">
							<div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center mb-3">
								<Image src={item.image} alt={item.name} width={160} height={160} className="object-contain" />
							</div>
							<h3 className="font-medium text-gray-900">{item.name}</h3>
							<p className="text-sm text-gray-600">৳{item.price.toFixed(2)}</p>
							<div className="mt-3 flex gap-2">
								<button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Add to Cart</button>
								<button className="px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">Remove</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Wishlist;


