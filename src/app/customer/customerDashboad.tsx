
'use client';
import React, { useState } from 'react'
import { User, MapPin, CreditCard, Package, Heart, Settings, Edit2, Save, X, Eye, Link } from 'lucide-react';
import Image from 'next/image';
import OrderDetails from '@/components/frontend/customer/OrderDetails';
import Address from '@/components/frontend/customer/Address';
import OrderHistory from '@/components/frontend/customer/OrderHIstory';
import PaymentMethods from '@/components/frontend/customer/PaymentMethods';
import type { WishlistItem } from '@/components/frontend/customer/Wishlist';
import Wishlist from '@/components/frontend/customer/Wishlist';
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { updateCustomerProfile } from "@/lib/userApi";

// interface CustomerProfileProps {
//     user: {
//       id: string;
//       firstName: string;
//       lastName: string;
//       email: string;
//       phone: string;
//       avatar?: string;
//       joinDate: string;
//     };
//     addresses: Array<{
//       id: string;
//       type: 'home' | 'work' | 'other';
//       name: string;
//       address: string;
//       city: string;
//       state: string;
//       zipCode: string;
//       isDefault: boolean;
//     }>;
//     paymentMethods: Array<{
//       id: string;
//       type: 'card' | 'paypal';
//       last4?: string;
//       brand?: string;
//       expiryDate?: string;
//       isDefault: boolean;
//     }>;
//     onUpdateProfile: (data: any) => void;
//     onAddAddress: (address: any) => void;
//     onUpdateAddress: (id: string, address: any) => void;
//     onDeleteAddress: (id: string) => void;
//     onAddPaymentMethod: (method: any) => void;
//     onDeletePaymentMethod: (id: string) => void;
// }

const CustomerPage = () => {
  const { user, setUser } = useAuthStore();
  const u: any = user;
    // const [user, setUserDetails] = useState({
    //     firstName : 'Rahat',
    //     lastName: 'Khan',
    //     email: 'rahat@gmail.com',
    //     phone: '01290333333',
    //     avatar: '',
    //     joinDate: 'January 2024'
  // })
   const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAddress, setEditingAddress] = useState<string | null>(null);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [editingAddressData, setEditingAddressData] = useState({
        type: 'home' as 'home' | 'work' | 'other',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
    });
  
    const [profileData, setProfileData] = useState({
        firstName: u?.first_name || "",
        lastName: u?.last_name || "",
        email: u?.email || "",
        phone: u?.phone || "",
    });
    

    const [newAddress, setNewAddress] = useState({
        type: 'home' as 'home' | 'work' | 'other',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
    });

    const [newPayment, setNewPayment] = useState({
        paymentType: 'card' as 'card' | 'bkash' | 'nagad',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        phone: '',
        isDefault: false
    });

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
        { id: 'w1', name: 'Wireless Earbuds', price: 59.99, image: '/logo.png' },
        { id: 'w2', name: 'Smart Watch', price: 149.00, image: '/logo.png' },
        { id: 'w3', name: 'Laptop Stand', price: 39.50, image: '/logo.png' }
    ]);

    // const [activeTab, setActiveTab] = useState ('profile');

    const [orders, setOrders] = useState([
        {
            id: '1',
            orderNumber: 'ORD-2024-001',
            date: '2024-01-15',
            items: [
                { 
                    id: '1', 
                    name: 'Wireless Bluetooth Headphones', 
                    quantity: 1, 
                    price: 80,
                    image: '/logo.png',
                    category: 'Electronics'
                }
            ],
            status: 'delivered',
            paymentStatus: 'Paid',
            paymentMethod: 'Credit Card',
            total: 100,
            subtotal: 80,
            shipping: 15,
            tax: 5,
            shippingAddress: {
                name: 'Rahat Khan',
                address: '123 Main Street',
                city: 'Dhaka',
                state: 'Dhaka',
                zipCode: '1000',
                phone: '01290333333'
            },
            trackingNumber: 'TRK123456789',
            estimatedDelivery: '2024-01-20',
            actualDelivery: '2024-01-18'
        },
        {
            id: '2',
            orderNumber: 'ORD-2024-002',
            date: '2024-01-20',
            items: [
                { 
                    id: '2', 
                    name: 'Smart Watch Series 5', 
                    quantity: 1, 
                    price: 150,
                    image: '/logo.png',
                    category: 'Electronics'
                },
                { 
                    id: '3', 
                    name: 'Phone Case', 
                    quantity: 2, 
                    price: 25,
                    image: '/logo.png',
                    category: 'Accessories'
                }
            ],
            status: 'processing',
            paymentStatus: 'Pending',
            paymentMethod: 'Bkash',
            total: 200,
            subtotal: 200,
            shipping: 0,
            tax: 0,
            shippingAddress: {
                name: 'Rahat Khan',
                address: '456 Business Ave',
                city: 'Dhaka',
                state: 'Dhaka',
                zipCode: '1001',
                phone: '01290333333'
            },
            trackingNumber: null,
            estimatedDelivery: '2024-01-25',
            actualDelivery: null
        },
        {
            id: '3',
            orderNumber: 'ORD-2024-003',
            date: '2024-01-25',
            items: [
                { 
                    id: '4', 
                    name: 'Laptop Stand', 
                    quantity: 1, 
                    price: 45,
                    image: '/logo.png',
                    category: 'Office'
                },
                { 
                    id: '5', 
                    name: 'Wireless Mouse', 
                    quantity: 1, 
                    price: 30,
                    image: '/logo.png',
                    category: 'Electronics'
                },
                { 
                    id: '6', 
                    name: 'USB Cable', 
                    quantity: 3, 
                    price: 15,
                    image: '/logo.png',
                    category: 'Accessories'
                }
            ],
            status: 'shipped',
            paymentStatus: 'Paid',
            paymentMethod: 'Credit Card',
            total: 300,
            subtotal: 120,
            shipping: 20,
            tax: 10,
            shippingAddress: {
                name: 'Rahat Khan',
                address: '123 Main Street',
                city: 'Dhaka',
                state: 'Dhaka',
                zipCode: '1000',
                phone: '01290333333'
            },
            trackingNumber: 'TRK987654321',
            estimatedDelivery: '2024-01-30',
            actualDelivery: null
        },
        {
            id: '4',
            orderNumber: 'ORD-2024-004',
            date: '2024-02-01',
            items: [
                { 
                    id: '7', 
                    name: 'Gaming Keyboard', 
                    quantity: 1, 
                    price: 120,
                    image: '/logo.png',
                    category: 'Gaming'
                },
                { 
                    id: '8', 
                    name: 'Gaming Mouse', 
                    quantity: 1, 
                    price: 80,
                    image: '/logo.png',
                    category: 'Gaming'
                }
            ],
            status: 'delivered',
            paymentStatus: 'Failed',
            paymentMethod: 'Credit Card',
            total: 400,
            subtotal: 200,
            shipping: 25,
            tax: 15,
            shippingAddress: {
                name: 'Rahat Khan',
                address: '123 Main Street',
                city: 'Dhaka',
                state: 'Dhaka',
                zipCode: '1000',
                phone: '01290333333'
            },
            trackingNumber: 'TRK456789123',
            estimatedDelivery: '2024-02-05',
            actualDelivery: '2024-02-04'
        },
        {
            id: '5',
            orderNumber: 'ORD-2024-005',
            date: '2024-02-10',
            items: [
                { 
                    id: '9', 
                    name: 'Monitor 24 inch', 
                    quantity: 1, 
                    price: 300,
                    image: '/logo.png',
                    category: 'Electronics'
                },
                { 
                    id: '10', 
                    name: 'Monitor Stand', 
                    quantity: 1, 
                    price: 50,
                    image: '/logo.png',
                    category: 'Office'
                },
                { 
                    id: '11', 
                    name: 'HDMI Cable', 
                    quantity: 2, 
                    price: 25,
                    image: '/logo.png',
                    category: 'Accessories'
                }
            ],
            status: 'processing',
            paymentStatus: 'Failed',
            paymentMethod: 'Bank Transfer',
            total: 500,
            subtotal: 400,
            shipping: 30,
            tax: 20,
            shippingAddress: {
                name: 'Rahat Khan',
                address: '456 Business Ave',
                city: 'Dhaka',
                state: 'Dhaka',
                zipCode: '1001',
                phone: '01290333333'
            },
            trackingNumber: null,
            estimatedDelivery: '2024-02-15',
            actualDelivery: null
        }
    ]);

    // Sample data for addresses and payment methods
    const [addresses, setAddresses] = useState([
        {
            id: '1',
            type: 'home' as 'home' | 'work' | 'other',
            name: 'John Doe',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            isDefault: true
        },
        {
            id: '2',
            type: 'work' as 'home' | 'work' | 'other',
            name: 'John Doe',
            address: '456 Business Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10002',
            isDefault: false
        }
    ]);

    type PaymentMethodType = {
        id: string;
        type: 'card' | 'bkash' | 'nagad';
        last4?: string;
        brand?: string;
        expiryDate?: string;
        isDefault: boolean;
    };

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([
        {
            id: '1',
            type: 'card' as 'card' | 'bkash' | 'nagad',
            last4: '1234',
            brand: 'Visa',
            expiryDate: '12/25',
            isDefault: true
        }
    ]);
    
    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        //{ id: 'addresses', label: 'Addresses', icon: MapPin },
        //{ id: 'payments', label: 'Payment Methods', icon: CreditCard },
        { id: 'orders', label: 'Order History', icon: Package },
        //{ id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'change_password', label: 'Change Password', icon: Settings }
    ]

    // const handleSaveProfile = () => {
    //     setProfileData({
    //       ...user,
    //       ...profileData
    //     });
    //     setIsEditing(false);
  //   };
  
      const handleSaveProfile = async () => {
        try {
          setLoading(true);
          // call your API function from lib/userApi.ts
          const updatedUser = await updateCustomerProfile(u?.id, {
            name: `${profileData.firstName} ${profileData.lastName}`,
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            email: profileData.email,
            phone: profileData.phone,
          });

          toast.success("Profile updated successfully!");

          // update the local state with new info
          setProfileData({
            firstName: updatedUser.first_name,
            lastName: updatedUser.last_name,
            email: updatedUser.email,
            phone: updatedUser.phone,
          });

          setUser(updatedUser); 

          setIsEditing(false);
        } catch (error) {
          console.error("Update failed:", error);
          toast.error("Something went wrong while saving profile!");
        }finally {
          setLoading(false); // hide overlay
        }
      };
    
      const handleAddAddress = () => {
        const newId = (addresses.length + 1).toString();
        setAddresses([...addresses, { ...newAddress, id: newId }]);
        setNewAddress({
          type: 'home',
          name: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          isDefault: false
        });
        setShowAddAddress(false);
      };
    
      const handleAddPayment = () => {
        const newId = (paymentMethods.length + 1).toString();
        if (newPayment.paymentType === 'card') {
          setPaymentMethods([...paymentMethods, {
            id: newId,
            type: 'card' as 'card' | 'bkash' | 'nagad',
            last4: newPayment.cardNumber.slice(-4),
            brand: 'Visa',
            expiryDate: newPayment.expiryDate,
            isDefault: newPayment.isDefault
          }]);
        } else {
          const providerBrand = newPayment.paymentType === 'bkash' ? 'bKash' : 'Nagad';
          setPaymentMethods([...paymentMethods, {
            id: newId,
            type: newPayment.paymentType,
            last4: newPayment.phone.slice(-4),
            brand: providerBrand,
            expiryDate: undefined,
            isDefault: newPayment.isDefault
          }]);
        }
        setNewPayment({
          paymentType: 'card',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          nameOnCard: '',
          phone: '',
          isDefault: false
        });
        setShowAddPayment(false);
      };

      const handleDeleteAddress = (id: string) => {
        setAddresses(addresses.filter(address => address.id !== id));
      };

      const handleDeletePaymentMethod = (id: string) => {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
      };

      const handleEditAddress = (addressId: string) => {
        const address = addresses.find(addr => addr.id === addressId);
        if (address) {
          setEditingAddressData({
            type: address.type,
            name: address.name,
            address: address.address,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            isDefault: address.isDefault
          });
          setEditingAddress(addressId);
        }
      };

      const handleUpdateAddress = () => {
        if (editingAddress) {
          setAddresses(addresses.map(address => 
            address.id === editingAddress 
              ? { ...address, ...editingAddressData }
              : address
          ));
          setEditingAddress(null);
          setEditingAddressData({
            type: 'home',
            name: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            isDefault: false
          });
        }
      };

      const handleCancelEditAddress = () => {
        setEditingAddress(null);
        setEditingAddressData({
          type: 'home',
          name: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          isDefault: false
        });
      };

      const handleViewOrderDetails = (orderId: string) => {
        const order = orders.find(o => o.id === orderId);
        if (order) {
          setSelectedOrder(order);
          setShowOrderDetails(true);
        }
      };

      const handleBackToOrders = () => {
        setShowOrderDetails(false);
        setSelectedOrder(null);
      };

    const [activeTab, setActiveTab] = useState ('profile');
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const renderProfileTab = () => (
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-3">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <p className="text-gray-700 font-medium">Updating profile...</p>
            </div>
          </div>
        )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
              <span>{isEditing ? 'Save' : 'Edit'}</span>
            </button>
          </div>
    
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {u.avatar ? (
                <Image src={u.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{u.firstName} {u.lastName}</h3>
              <p className="text-gray-600">Member since {u.joinDate}</p>
              <button className="text-blue-600 hover:text-blue-800 text-sm mt-1">Change Photo</button>
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
    
          {isEditing && (
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setProfileData({
                    firstName: u?.first_name || "",
                    lastName: u?.last_name || "",
                    email: u?.email || "",
                    phone: u?.phone || "",
                  });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      );
    
  return (
    
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="bg-white rounded-lg shadow-md p-4 w-64">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'addresses' && (
            <Address
              addresses={addresses}
              showAddAddress={showAddAddress}
              setShowAddAddress={setShowAddAddress}
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              editingAddress={editingAddress}
              editingAddressData={editingAddressData}
              setEditingAddressData={setEditingAddressData}
              onEditAddress={handleEditAddress}
              onDeleteAddress={handleDeleteAddress}
              onAddAddress={handleAddAddress}
              onUpdateAddress={handleUpdateAddress}
              onCancelEditAddress={handleCancelEditAddress}
            />
          )}
          {activeTab === 'payments' && (
            <PaymentMethods
              paymentMethods={paymentMethods}
              showAddPayment={showAddPayment}
              setShowAddPayment={setShowAddPayment}
              newPayment={newPayment}
              setNewPayment={setNewPayment}
              onAddPayment={handleAddPayment}
              onDeletePaymentMethod={handleDeletePaymentMethod}
            />
          )}
          {activeTab === 'orders' && !showOrderDetails && (
            <OrderHistory orders={orders as any} onViewDetails={handleViewOrderDetails} />
          )}
          {activeTab === 'orders' && showOrderDetails && selectedOrder && (
            <OrderDetails order={selectedOrder} onBack={handleBackToOrders} />
          )}
          {activeTab === 'wishlist' && (
            <Wishlist items={wishlistItems} />
          )}
          {activeTab === 'change_password' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                  <input type="password" placeholder="Old Password" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input type="password" placeholder="New Password" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input type="password" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <button className="w-full p-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition-colors cursor-pointer">Change Password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerPage