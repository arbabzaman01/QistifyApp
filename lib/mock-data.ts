import type { Product, User, BlogPost, InstallmentPackage } from "./types"

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@easyqist.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "customer@example.com",
    password: "customer123",
    name: "John Doe",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    role: "customer",
    createdAt: new Date().toISOString(),
  },
]

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    price: 299.99,
    category: "Electronics",
    image: "/wireless-headphones.png",
    stock: 50,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor and GPS",
    price: 399.99,
    category: "Electronics",
    image: "/smartwatch-lifestyle.png",
    stock: 30,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Laptop Backpack",
    description: "Durable water-resistant backpack with laptop compartment",
    price: 79.99,
    category: "Accessories",
    image: "/laptop-backpack.png",
    stock: 100,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 360-degree sound",
    price: 149.99,
    category: "Electronics",
    image: "/bluetooth-speaker.jpg",
    stock: 75,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 49.99,
    category: "Accessories",
    image: "/wireless-mouse.png",
    stock: 150,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
    price: 59.99,
    category: "Accessories",
    image: "/usb-c-hub.jpg",
    stock: 80,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches",
    price: 129.99,
    category: "Accessories",
    image: "/mechanical-keyboard.png",
    stock: 45,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Webcam HD",
    description: "1080p HD webcam with built-in microphone",
    price: 89.99,
    category: "Electronics",
    image: "/hd-webcam.jpg",
    stock: 60,
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of E-commerce: Flexible Payment Options",
    slug: "future-of-ecommerce-flexible-payments",
    excerpt:
      "Discover how installment payments are revolutionizing online shopping and making premium products accessible to everyone.",
    content: "Full blog content here...",
    image: "/ecommerce-future.jpg",
    author: "Sarah Johnson",
    publishedAt: "2025-01-15",
    category: "E-commerce",
  },
  {
    id: "2",
    title: "5 Tips for Smart Online Shopping",
    slug: "smart-online-shopping-tips",
    excerpt: "Learn how to make the most of your online shopping experience with these expert tips.",
    content: "Full blog content here...",
    image: "/online-shopping-tips.jpg",
    author: "Michael Chen",
    publishedAt: "2025-01-20",
    category: "Shopping Tips",
  },
  {
    id: "3",
    title: "Understanding Installment Plans: A Complete Guide",
    slug: "understanding-installment-plans",
    excerpt: "Everything you need to know about choosing the right installment plan for your purchases.",
    content: "Full blog content here...",
    image: "/installment-payment-guide.jpg",
    author: "Emily Rodriguez",
    publishedAt: "2025-01-25",
    category: "Finance",
  },
]

// Installment Packages
export const installmentPackages: InstallmentPackage[] = [
  {
    months: 3,
    label: "3 Months",
    interestRate: 0,
  },
  {
    months: 6,
    label: "6 Months",
    interestRate: 5,
  },
  {
    months: 12,
    label: "12 Months",
    interestRate: 10,
  },
]
