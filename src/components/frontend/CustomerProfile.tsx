import React, { useState } from 'react';
import { User, MapPin, CreditCard, Package, Heart, Settings, Edit2, Save, X } from 'lucide-react';
import Image from 'next/image';

interface CustomerProfileProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;
    joinDate: string;
  };
  addresses: Array<{
    id: string;
    type: 'home' | 'work' | 'other';
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }>;
  paymentMethods: Array<{
    id: string;
    type: 'card' | 'paypal';
    last4?: string;
    brand?: string;
    expiryDate?: string;
    isDefault: boolean;
  }>;
  onUpdateProfile: (data: any) => void;
  onAddAddress: (address: any) => void;
  onUpdateAddress: (id: string, address: any) => void;
  onDeleteAddress: (id: string) => void;
  onAddPaymentMethod: (method: any) => void;
  onDeletePaymentMethod: (id: string) => void;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({
  user,
  addresses,
  paymentMethods,
  onUpdateProfile,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onAddPaymentMethod,
  onDeletePaymentMethod
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone
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
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    isDefault: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSaveProfile = () => {
    onUpdateProfile(profileData);
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    onAddAddress(newAddress);
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
    onAddPaymentMethod({
      type: 'card',
      last4: newPayment.cardNumber.slice(-4),
      brand: 'Visa', // This would be determined by card number
      expiryDate: newPayment.expiryDate,
      isDefault: newPayment.isDefault
    });
    setNewPayment({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
      isDefault: false
    });
    setShowAddPayment(false);
  };

  const renderProfileTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
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
          {user.avatar ? (
            <Image src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <User className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-600">Member since {user.joinDate}</p>
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
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
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

  const renderAddressesTab = () => (
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
                  onClick={() => setEditingAddress(address.id)}
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

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                  onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as 'home' | 'work' | 'other' })}
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
                onClick={handleAddAddress}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentMethodsTab = () => (
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
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-600">Expires {method.expiryDate}</p>
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

      {/* Add Payment Method Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                onClick={handleAddPayment}
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="bg-white rounded-lg shadow-md p-4">
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
          {activeTab === 'addresses' && renderAddressesTab()}
          {activeTab === 'payments' && renderPaymentMethodsTab()}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order History</h2>
              <p className="text-gray-600">Your recent orders will appear here.</p>
            </div>
          )}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Wishlist</h2>
              <p className="text-gray-600">Your saved items will appear here.</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Settings</h2>
              <p className="text-gray-600">Manage your account preferences and privacy settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;