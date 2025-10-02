// Database types for Easy Qist E-commerce App

export interface User {
  id: string
  email: string
  password: string // In production, this would be hashed
  name: string
  phone?: string
  address?: string
  role: "customer" | "admin"
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  featured: boolean
  createdAt: string
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  addedAt: string
}

export interface InstallmentPackage {
  months: 3 | 6 | 12
  label: string
  interestRate: number // percentage
}

export interface InstallmentPayment {
  paymentNumber: number
  amount: number
  dueDate: string
  status: "pending" | "paid" | "overdue"
  paidAt?: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  installmentPackage?: InstallmentPackage
  paymentSchedule?: InstallmentPayment[]
  status: "pending" | "processing" | "completed" | "cancelled"
  shippingAddress: string
  createdAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  publishedAt: string
  category: string
}

export interface Notification {
  id: string
  message: string
  type: "success" | "error" | "info"
  timestamp: string
}
