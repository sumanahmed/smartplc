export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = [
  // Fashion Category
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.5,
    reviews: 128,
    category: "Fashion",
    inStock: true,
    description: "Comfortable and stylish cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a modern fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Gray"]
  },
  {
    id: 2,
    name: "Designer Denim Jacket",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1456705/pexels-photo-1456705.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.8,
    reviews: 256,
    category: "Fashion",
    inStock: true,
    description: "Classic denim jacket with a modern twist. Features premium denim fabric and stylish design details.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Light Blue"]
  },
  {
    id: 3,
    name: "Casual Sneakers",
    price: 79.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.3,
    reviews: 89,
    category: "Fashion",
    inStock: true,
    description: "Comfortable casual sneakers perfect for everyday wear. Features cushioned sole and breathable material.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Gray", "Navy"]
  },
  {
    id: 4,
    name: "Elegant Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.7,
    reviews: 145,
    category: "Fashion",
    inStock: true,
    description: "Sophisticated timepiece with premium materials and Swiss movement. Perfect for both casual and formal occasions.",
    sizes: ["One Size"],
    colors: ["Silver", "Gold", "Rose Gold", "Black"]
  },

  // Electronics Category
  {
    id: 5,
    name: "Wireless Bluetooth Headphones",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.6,
    reviews: 312,
    category: "Electronics",
    inStock: true,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers.",
    sizes: ["One Size"],
    colors: ["Black", "White", "Blue", "Red"]
  },
  {
    id: 6,
    name: "Smart Phone Case",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.2,
    reviews: 78,
    category: "Electronics",
    inStock: true,
    description: "Protective case for your smartphone with shock absorption and premium materials. Available for most phone models.",
    sizes: ["iPhone 14", "iPhone 15", "Samsung S23", "Samsung S24"],
    colors: ["Clear", "Black", "Blue", "Pink"]
  },
  {
    id: 7,
    name: "Portable Speaker",
    price: 59.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.4,
    reviews: 156,
    category: "Electronics",
    inStock: true,
    description: "Compact portable speaker with powerful sound and waterproof design. Perfect for outdoor adventures.",
    sizes: ["One Size"],
    colors: ["Black", "Blue", "Red", "Green"]
  },
  {
    id: 8,
    name: "Gaming Mouse",
    price: 39.99,
    originalPrice: 49.99,
    image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.5,
    reviews: 203,
    category: "Electronics",
    inStock: true,
    description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons. Perfect for gamers.",
    sizes: ["One Size"],
    colors: ["Black", "White", "RGB"]
  },

  // Home Category
  {
    id: 9,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1251176/pexels-photo-1251176.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.3,
    reviews: 92,
    category: "Home",
    inStock: true,
    description: "Beautiful ceramic coffee mug set with modern design. Perfect for your morning coffee routine.",
    sizes: ["12oz", "16oz"],
    colors: ["White", "Black", "Blue", "Green"]
  },
  {
    id: 10,
    name: "Decorative Plant Pot",
    price: 19.99,
    image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1005059/pexels-photo-1005059.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.1,
    reviews: 67,
    category: "Home",
    inStock: true,
    description: "Stylish plant pot perfect for indoor plants. Made from high-quality ceramic with drainage holes.",
    sizes: ["Small", "Medium", "Large"],
    colors: ["White", "Terracotta", "Black", "Gray"]
  },
  {
    id: 11,
    name: "Throw Pillow",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.4,
    reviews: 123,
    category: "Home",
    inStock: true,
    description: "Comfortable throw pillow with soft fabric cover. Perfect for adding style to your living room.",
    sizes: ["16x16", "18x18", "20x20"],
    colors: ["Beige", "Gray", "Blue", "Green", "Pink"]
  },
  {
    id: 12,
    name: "Table Lamp",
    price: 79.99,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    rating: 4.6,
    reviews: 89,
    category: "Home",
    inStock: true,
    description: "Modern table lamp with adjustable brightness and elegant design. Perfect for any room.",
    sizes: ["One Size"],
    colors: ["Black", "White", "Gold", "Silver"]
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const categories = ['Fashion', 'Electronics', 'Home'];