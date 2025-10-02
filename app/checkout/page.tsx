"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useStore } from "@/lib/store"
import { installmentPackages } from "@/lib/mock-data"
import type { InstallmentPackage } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, CreditCard } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

function CheckoutPageContent() {
  const router = useRouter()
  const cart = useStore((state) => state.cart)
  const products = useStore((state) => state.products)
  const currentUser = useStore((state) => state.currentUser)
  const getCartTotal = useStore((state) => state.getCartTotal)
  const createOrder = useStore((state) => state.createOrder)

  const [selectedInstallment, setSelectedInstallment] = useState<InstallmentPackage | null>(null)
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || "")
  const [isProcessing, setIsProcessing] = useState(false)

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }))

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  const calculateMonthlyPayment = (installment: InstallmentPackage) => {
    const totalWithInterest = total * (1 + installment.interestRate / 100)
    return totalWithInterest / installment.months
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!shippingAddress.trim()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    createOrder({
      userId: currentUser!.id,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      installmentPackage: selectedInstallment || undefined,
      status: "pending",
      shippingAddress,
    })

    setIsProcessing(false)
    router.push("/")
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Where should we deliver your order?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={currentUser?.name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={currentUser?.email} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue={currentUser?.phone} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Street address, city, state, zip code"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Plan Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Plan</CardTitle>
                <CardDescription>Choose how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedInstallment?.months.toString() || "full"}
                  onValueChange={(value) => {
                    if (value === "full") {
                      setSelectedInstallment(null)
                    } else {
                      const installment = installmentPackages.find((p) => p.months.toString() === value)
                      setSelectedInstallment(installment || null)
                    }
                  }}
                >
                  {/* Pay in Full */}
                  <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                    <RadioGroupItem value="full" id="full" className="mt-1" />
                    <Label htmlFor="full" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Pay in Full</p>
                          <p className="text-sm text-muted-foreground">One-time payment</p>
                        </div>
                        <p className="text-xl font-bold">${total.toFixed(2)}</p>
                      </div>
                    </Label>
                  </div>

                  {/* Installment Options */}
                  {installmentPackages.map((installment) => {
                    const monthlyPayment = calculateMonthlyPayment(installment)
                    const totalWithInterest = monthlyPayment * installment.months

                    return (
                      <div
                        key={installment.months}
                        className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <RadioGroupItem
                          value={installment.months.toString()}
                          id={installment.months.toString()}
                          className="mt-1"
                        />
                        <Label htmlFor={installment.months.toString()} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{installment.label} Installment</p>
                              <p className="text-sm text-muted-foreground">
                                {installment.interestRate === 0
                                  ? "Interest-free"
                                  : `${installment.interestRate}% interest`}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Total: ${totalWithInterest.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">${monthlyPayment.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">/month</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Enter your card details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 relative bg-slate-100 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                    </div>
                    {selectedInstallment && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              {selectedInstallment.label} Installment Plan
                            </p>
                            <p className="text-xs text-blue-700">
                              ${calculateMonthlyPayment(selectedInstallment).toFixed(2)}/month for{" "}
                              {selectedInstallment.months} months
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <AuthGuard requireAuth>
      <CheckoutPageContent />
    </AuthGuard>
  )
}
