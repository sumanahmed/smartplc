export const sampleOrders = [
  {
    id: 'ORD-2024-001',
    status: 'delivered' as const,
    orderDate: 'March 15, 2024',
    estimatedDelivery: 'March 20, 2024',
    total: 159.97,
    items: [
      {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        quantity: 2,
        price: 29.99,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 5,
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 149.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    trackingNumber: 'TRK123456789',
    timeline: [
      {
        status: 'delivered',
        date: 'March 20, 2024 - 2:30 PM',
        location: 'New York, NY',
        description: 'Package delivered successfully'
      },
      {
        status: 'shipped',
        date: 'March 18, 2024 - 10:15 AM',
        location: 'Distribution Center, NJ',
        description: 'Package out for delivery'
      },
      {
        status: 'shipped',
        date: 'March 17, 2024 - 8:45 AM',
        location: 'Sorting Facility, PA',
        description: 'Package in transit'
      },
      {
        status: 'processing',
        date: 'March 15, 2024 - 3:20 PM',
        location: 'Warehouse, CA',
        description: 'Order confirmed and being processed'
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    status: 'shipped' as const,
    orderDate: 'March 22, 2024',
    estimatedDelivery: 'March 28, 2024',
    total: 89.99,
    items: [
      {
        id: 2,
        name: 'Designer Denim Jacket',
        quantity: 1,
        price: 89.99,
        image: 'https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    trackingNumber: 'TRK987654321',
    timeline: [
      {
        status: 'shipped',
        date: 'March 24, 2024 - 9:30 AM',
        location: 'Distribution Center, NJ',
        description: 'Package in transit to your location'
      },
      {
        status: 'processing',
        date: 'March 22, 2024 - 4:15 PM',
        location: 'Warehouse, CA',
        description: 'Order confirmed and being processed'
      }
    ]
  },
  {
    id: 'ORD-2024-003',
    status: 'processing' as const,
    orderDate: 'March 25, 2024',
    estimatedDelivery: 'April 2, 2024',
    total: 119.98,
    items: [
      {
        id: 3,
        name: 'Casual Sneakers',
        quantity: 1,
        price: 79.99,
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 8,
        name: 'Gaming Mouse',
        quantity: 1,
        price: 39.99,
        image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    timeline: [
      {
        status: 'processing',
        date: 'March 25, 2024 - 1:45 PM',
        location: 'Warehouse, CA',
        description: 'Order confirmed and being processed'
      }
    ]
  }
];