'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, CreditCard, Shield } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/authStore';
import { createOrder } from "@/lib/checkoutApi";
import toast from "react-hot-toast";

type ShippingState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type PaymentState = {
  method: 'cod' | 'bkash' | 'nagad' | 'card';
  // card
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
  // mobile banking tx id
  txId?: string;
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { token, isAuthenticated, user } = useAuthStore();

  // keep page layout same as your original design: two columns, steps on top
  const [step, setStep] = useState<number>(1); // 1 => Shipping, 2 => Payment
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shipping, setShipping] = useState<ShippingState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Bangladesh',
  });

  const [payment, setPayment] = useState<PaymentState>({
    method: 'cod',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    txId: '',
  });

  // totals
  const subtotal = useMemo(() => getSubtotal(), [getSubtotal, items]);
  const shippingCost = subtotal >= 1000 ? 0 : 60; // example rule; change if needed
  const tax = 0; // change if you have tax
  const total = subtotal + shippingCost + tax;

  // auth guard
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     // redirect to login if not logged in
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  // handlers
  const onShippingChange = (key: keyof ShippingState, value: string) =>
    setShipping(prev => ({ ...prev, [key]: value }));

  const onPaymentChange = (key: keyof PaymentState, value: string | PaymentState['method']) =>
    setPayment(prev => ({ ...prev, [key]: value } as PaymentState));

  // validation
  const validateShipping = (): { ok: boolean; msg?: string } => {
    const required: Array<keyof ShippingState> = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
    ];
    for (const k of required) {
      if (!shipping[k] || shipping[k].toString().trim() === '') {
        return { ok: false, msg: 'Please fill all shipping fields.' };
      }
    }
    return { ok: true };
  };

  const validatePayment = (): { ok: boolean; msg?: string } => {
    if (payment.method === 'bkash' || payment.method === 'nagad') {
      if (!payment.txId || payment.txId.trim().length < 3) {
        return { ok: false, msg: `Please provide ${payment.method.toUpperCase()} transaction ID.` };
      }
    } else if (payment.method === 'card') {
      if (!payment.cardNumber || !payment.expiryDate || !payment.cvv || !payment.nameOnCard) {
        return { ok: false, msg: 'Please provide card details.' };
      }
    }
    return { ok: true };
  };

  // Next from shipping to payment
  const goToPayment = () => {
    setError(null);
    const v = validateShipping();
    if (!v.ok) return setError(v.msg || 'Invalid shipping');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToShipping = () => {
    setError(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place order (final)
 const placeOrder = async () => {
  setError(null);
  const pv = validatePayment();
  if (!pv.ok) return setError(pv.msg || "Invalid payment");

  if (items.length === 0) {
    setError("Cart is empty.");
    return;
  }

  setLoading(true);
  try {
    const payload = {
      firstName: shipping.firstName,
      lastName: shipping.lastName,
      email: shipping.email,
      phone: shipping.phone,
      address: shipping.address,
      city: shipping.city,
      postal_code: shipping.zipCode, // rename field
      payment_method: payment.method,
      items: items.map(it => ({
        id: it.id, 
        name: it.name,
        price: it.price,
        quantity: it.quantity,
      })),
    };
    // ✅ call your API helper
    const data = await createOrder(payload);
    toast.success("Order placed successfully!");
    clearCart();
    const order_id = data?.order_id ?? data?.id ?? null;
    router.push(`/orderSuccess${order_id ? `?order_id=${order_id}` : ""}`);
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Order failed, try again.");
  } finally {
    setLoading(false);
  }
};

  // keep your previous layout almost identical: two columns, steps header
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => router.back()} className="text-blue-600 hover:text-blue-800 font-medium">← Back to Cart</button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Steps indicators (2 steps) */}
      <div className="mb-8">
        <div className="flex items-center justify-start gap-8">
          <div className={`flex items-center gap-3 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <MapPin /> <span>Shipping</span>
          </div>
          <div className={`flex items-center gap-3 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <CreditCard /> <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column (shipping or payment) */}
        <div className="lg:col-span-2">
          {/* Shipping Form */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" value={shipping.firstName} onChange={e => onShippingChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" value={shipping.lastName} onChange={e => onShippingChange('lastName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" value={shipping.email} onChange={e => onShippingChange('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" value={shipping.phone} onChange={e => onShippingChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input type="text" value={shipping.address} onChange={e => onShippingChange('address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input type="text" value={shipping.city} onChange={e => onShippingChange('city', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input type="text" value={shipping.state} onChange={e => onShippingChange('state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input type="text" value={shipping.zipCode} onChange={e => onShippingChange('zipCode', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input type="text" value={shipping.country} onChange={e => onShippingChange('country', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Back to Cart</button>
                <button onClick={goToPayment} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Proceed to Payment</button>
              </div>
              {error && <div className="mt-3 text-red-600">{error}</div>}
            </div>
          )}

          {/* Payment Form */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>

              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3 border rounded ${payment.method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={payment.method === 'cod'} onChange={() => onPaymentChange('method', 'cod')} />
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">Pay when you receive the order.</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 border rounded ${payment.method === 'bkash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={payment.method === 'bkash'} onChange={() => onPaymentChange('method', 'bkash')} />
                  <div>
                    <div className="font-medium">bKash</div>
                    <div className="text-sm text-gray-500">Send payment to merchant bKash number then enter TXID below.</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 border rounded ${payment.method === 'nagad' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={payment.method === 'nagad'} onChange={() => onPaymentChange('method', 'nagad')} />
                  <div>
                    <div className="font-medium">Nagad</div>
                    <div className="text-sm text-gray-500">Send payment to merchant Nagad number then enter TXID below.</div>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3 border rounded ${payment.method === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <input type="radio" name="payment" checked={payment.method === 'card'} onChange={() => onPaymentChange('method', 'card')} />
                  <div>
                    <div className="font-medium">Card (Visa / Master)</div>
                    <div className="text-sm text-gray-500">Enter card details. (Use a gateway in production)</div>
                  </div>
                </label>
              </div>

              {/* dynamic fields */}
              {payment.method === 'bkash' || payment.method === 'nagad' ? (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID (TXID)</label>
                  <input type="text" value={payment.txId} onChange={e => onPaymentChange('txId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter bKash/Nagad TXID" />
                </div>
              ) : null}

              {payment.method === 'card' && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Card number" value={payment.cardNumber} onChange={e => onPaymentChange('cardNumber', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  <input type="text" placeholder="MM/YY" value={payment.expiryDate} onChange={e => onPaymentChange('expiryDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  <input type="text" placeholder="CVV" value={payment.cvv} onChange={e => onPaymentChange('cvv', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  <input type="text" placeholder="Name on card" value={payment.nameOnCard} onChange={e => onPaymentChange('nameOnCard', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button onClick={goBackToShipping} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Previous</button>
                <button onClick={placeOrder} disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  {loading ? 'Placing order...' : 'Place Order'}
                </button>
              </div>
              {error && <div className="mt-3 text-red-600">{error}</div>}
            </div>
          )}
        </div>

        {/* Order Summary (right column) - dynamic */}
        <aside className="bg-white p-6 rounded-lg border h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-gray-500">Cart is empty</div>
            ) : (
              items.map(item => (
                <div key={`${item.id}-${item.quantity}`} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">Tk {(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">Tk {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="font-medium">{shippingCost === 0 ? 'Free' : `Tk ${shippingCost.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Tax</span><span className="font-medium">Tk {tax.toFixed(2)}</span></div>
            <div className="flex justify-between border-t pt-2"><span className="text-lg font-semibold">Total</span><span className="text-lg font-semibold">Tk {total.toFixed(2)}</span></div>
          </div>

          <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
            <Shield className="inline-block" />
            <span>Secure checkout & encrypted payment</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
