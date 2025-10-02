"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Product, CartItem, Order, Notification, InstallmentPayment } from "./types"
import { mockProducts, mockUsers } from "./mock-data"

interface StoreState {
  // Auth
  currentUser: User | null
  login: (email: string, password: string) => boolean
  register: (email: string, password: string, name: string) => boolean
  logout: () => void

  // Products
  products: Product[]
  getProductById: (id: string) => Product | undefined

  // Cart
  cart: CartItem[]
  addToCart: (productId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  updateCartQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number

  // Orders
  orders: Order[]
  createOrder: (order: Omit<Order, "id" | "createdAt">) => void
  getUserOrders: (userId: string) => Order[]

  // Notifications
  notifications: Notification[]
  addNotification: (message: string, type: Notification["type"]) => void
  clearNotifications: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      currentUser: null,
      login: (email, password) => {
        const user = mockUsers.find((u) => u.email === email && u.password === password)
        if (user) {
          set({ currentUser: user })
          get().addNotification(`Welcome back, ${user.name}!`, "success")
          return true
        }
        get().addNotification("Invalid email or password", "error")
        return false
      },
      register: (email, password, name) => {
        const existingUser = mockUsers.find((u) => u.email === email)
        if (existingUser) {
          get().addNotification("Email already registered", "error")
          return false
        }
        const newUser: User = {
          id: Date.now().toString(),
          email,
          password,
          name,
          role: "customer",
          createdAt: new Date().toISOString(),
        }
        mockUsers.push(newUser)
        set({ currentUser: newUser })
        get().addNotification("Account created successfully!", "success")
        return true
      },
      logout: () => {
        set({ currentUser: null, cart: [] })
        get().addNotification("Logged out successfully", "info")
      },

      // Products
      products: mockProducts,
      getProductById: (id) => {
        return get().products.find((p) => p.id === id)
      },

      // Cart
      cart: [],
      addToCart: (productId, quantity) => {
        const { cart, currentUser, products } = get()
        if (!currentUser) {
          get().addNotification("Please login to add items to cart", "error")
          return
        }
        const product = products.find((p) => p.id === productId)
        if (!product) return

        const existingItem = cart.find((item) => item.productId === productId)
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          })
        } else {
          const newItem: CartItem = {
            id: Date.now().toString(),
            userId: currentUser.id,
            productId,
            quantity,
            addedAt: new Date().toISOString(),
          }
          set({ cart: [...cart, newItem] })
        }
        get().addNotification(`${product.name} added to cart!`, "success")
      },
      removeFromCart: (itemId) => {
        set({ cart: get().cart.filter((item) => item.id !== itemId) })
        get().addNotification("Item removed from cart", "info")
      },
      updateCartQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId)
          return
        }
        set({
          cart: get().cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        })
      },
      clearCart: () => {
        set({ cart: [] })
      },
      getCartTotal: () => {
        const { cart, products } = get()
        return cart.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId)
          return total + (product?.price || 0) * item.quantity
        }, 0)
      },

      // Orders
      orders: [],
      createOrder: (orderData) => {
        let paymentSchedule: InstallmentPayment[] | undefined

        if (orderData.installmentPackage) {
          const { months, interestRate } = orderData.installmentPackage
          const totalWithInterest = orderData.total * (1 + interestRate / 100)
          const monthlyAmount = totalWithInterest / months

          paymentSchedule = Array.from({ length: months }, (_, index) => {
            const dueDate = new Date()
            dueDate.setMonth(dueDate.getMonth() + index + 1)

            return {
              paymentNumber: index + 1,
              amount: monthlyAmount,
              dueDate: dueDate.toISOString(),
              status: "pending",
            }
          })
        }

        const newOrder: Order = {
          ...orderData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          paymentSchedule,
        }
        set({ orders: [...get().orders, newOrder] })
        get().clearCart()

        if (orderData.installmentPackage) {
          get().addNotification(
            `Order booked with ${orderData.installmentPackage.months}-month installment plan!`,
            "success",
          )
        } else {
          get().addNotification("Order placed successfully!", "success")
        }
      },
      getUserOrders: (userId) => {
        return get().orders.filter((order) => order.userId === userId)
      },

      // Notifications
      notifications: [],
      addNotification: (message, type) => {
        const notification: Notification = {
          id: Date.now().toString(),
          message,
          type,
          timestamp: new Date().toISOString(),
        }
        set({ notifications: [...get().notifications, notification] })
        // Auto-clear after 5 seconds
        setTimeout(() => {
          set({
            notifications: get().notifications.filter((n) => n.id !== notification.id),
          })
        }, 5000)
      },
      clearNotifications: () => {
        set({ notifications: [] })
      },
    }),
    {
      name: "easy-qist-storage",
      partialize: (state) => ({
        currentUser: state.currentUser,
        cart: state.cart,
        orders: state.orders,
      }),
    },
  ),
)
