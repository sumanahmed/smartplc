
'use client';
import React, { useState } from 'react'
import { User, MapPin, CreditCard, Package, Heart, Settings, Edit2, Save, X, Eye, Link, EyeOff  } from 'lucide-react';
import Image from 'next/image';
// import OrderDetails from '@/components/frontend/customer/OrderDetails';
import OrderDetails, { type Order } from '@/components/frontend/customer/OrderDetails';
import Address from '@/components/frontend/customer/Address';
import OrderHistory from '@/components/frontend/customer/OrderHIstory';
import PaymentMethods from '@/components/frontend/customer/PaymentMethods';
import type { WishlistItem } from '@/components/frontend/customer/Wishlist';
import Wishlist from '@/components/frontend/customer/Wishlist';
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { updateCustomerProfile, changePassword } from "@/lib/userApi";
import { getOrderDetails } from "@/lib/ordersApi";

const CustomerPage = () => {
  const { user, setUser } = useAuthStore();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
 const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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

      const handleViewOrderDetails = async (orderId: number) => {
        try {
          const apiOrder = await getOrderDetails(orderId); // res.data.data
          // Map apiOrder into your Order type if needed, or shape API to match Order.
          setSelectedOrder(apiOrder as Order);
          setShowOrderDetails(true);
        } catch (e) {
          console.error("Failed to load order details", e);
        }
      };
      

      const handleBackToOrders = () => {
        setShowOrderDetails(false);
        setSelectedOrder(null);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
   const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
     }

    try {
      setLoading(true);
      const res = await changePassword(oldPassword, newPassword, confirmPassword);
      toast.success(res.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to change password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

    const [activeTab, setActiveTab] = useState ('profile');
    // const [showOrderDetails, setShowOrderDetails] = useState(false);
    // const [selectedOrder, setSelectedOrder] = useState<any>(null);

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
            // <OrderHistory orders={orders as any} onViewDetails={handleViewOrderDetails} />
            <OrderHistory onViewDetails={handleViewOrderDetails} />
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
              <div className="grid grid-cols-2 gap-4">
                {/* Old Password */}
                <div className='relative col-span-2'>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                  <input
                    type={showOld ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-2 top-8 text-gray-500"
                  >
                    {showOld ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* New Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-2 top-8 text-gray-500"
                  >
                    {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-2 top-8 text-gray-500"
                  >
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-2 px-4 rounded-md text-white mt-4 ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Changing..." : "Change Password"}
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerPage