import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

interface Order {
  id: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  total: number;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingNumber?: string;
  timeline: Array<{
    status: string;
    date: string;
    location?: string;
    description: string;
  }>;
}

interface OrderTrackingProps {
  orders: Order[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <Package className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => setSelectedOrder(null)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Orders
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Order Header */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.id}</h1>
                <p className="text-gray-600 mt-1">Placed on {selectedOrder.orderDate}</p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-2 capitalize">{selectedOrder.status}</span>
                </div>
                <p className="text-gray-600 mt-2">Total: ${selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Order Timeline */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h2>
              <div className="space-y-4">
                {selectedOrder.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {getStatusIcon(event.status)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.description}</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      {event.location && (
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Items */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{selectedOrder.shippingAddress.name}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                </div>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Tracking Number</h3>
                  <p className="text-sm font-mono text-blue-600">{selectedOrder.trackingNumber}</p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Estimated Delivery</h3>
                <p className="text-sm text-gray-600">{selectedOrder.estimatedDelivery}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>1-800-SHOP-NOW</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>support@shophub.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders found</p>
          <p className="text-gray-400 text-sm mt-2">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-gray-600">Placed on {order.orderDate}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2 capitalize">{order.status}</span>
                  </div>
                  <p className="text-gray-600 mt-2">${order.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                {order.items.slice(0, 3).map((item) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                ))}
                {order.items.length > 3 && (
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-600">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;