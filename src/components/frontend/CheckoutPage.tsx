import React, { useState } from 'react';
import { CreditCard, MapPin, Package, Shield } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CheckoutPageProps {
  cartItems: CartItem[];
  onOrderComplete: (order: any) => void;
  onBackToCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onOrderComplete, onBackToCart }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: 'shipping' | 'payment'
  ) => {
    const { name, value } = e.target;
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      status: 'processing' as const,
      orderDate: new Date().toLocaleDateString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      total,
      items: cartItems,
      shippingAddress: shippingInfo,
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timeline: [
        {
          status: 'processing',
          date: new Date().toLocaleDateString(),
          description: 'Order confirmed and being processed'
        }
      ]
    };
    onOrderComplete(order);
  };

  const steps = [
    { id: 1, title: 'Shipping', icon: MapPin },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: Package }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={onBackToCart}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Cart
        </button>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handleInputChange(e, 'payment')}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => handleInputChange(e, 'payment')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Review Order */}
            {currentStep === 3 && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <p className="text-gray-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-600">
                      **** **** **** {paymentInfo.cardNumber.slice(-4)}
                    </p>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="text-sm">Your payment information is secure</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Complete Order
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg border h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity}
                    {item.size && ` • Size: ${item.size}`}
                    {item.color && ` • Color: ${item.color}`}
                  </p>
                </div>
                <span className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;