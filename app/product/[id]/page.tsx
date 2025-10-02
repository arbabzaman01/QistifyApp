"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Minus, Plus, ShoppingCart, Truck, Shield, CreditCard, Calendar } from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = useStore((state) => state.getProductById(productId))
  const addToCart = useStore((state) => state.addToCart)
  const currentUser = useStore((state) => state.currentUser)
  const [quantity, setQuantity] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!currentUser) {
      router.push("/login")
      return
    }
    addToCart(product.id, quantity)
  }

  const handleBookNow = () => {
    if (!currentUser) {
      router.push("/login")
      return
    }
    addToCart(product.id, quantity)
    router.push("/cart")
  }

  const installmentPlans = [
    { months: 3, amount: (product.price / 3).toFixed(2) },
    { months: 6, amount: (product.price / 6).toFixed(2) },
    { months: 12, amount: (product.price / 12).toFixed(2) },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative bg-slate-100 rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm text-muted-foreground">{product.category}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            <p className="text-4xl font-bold text-green-600">${product.price}</p>
            <p className="text-muted-foreground">or from ${(product.price / 12).toFixed(2)}/month</p>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 font-medium">In Stock ({product.stock} available)</p>
            ) : (
              <p className="text-sm text-red-600 font-medium">Out of Stock</p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="mb-6 border-2 border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-lg">Available Installment Plans</h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {installmentPlans.map((plan) => (
                  <button
                    key={plan.months}
                    onClick={() => setSelectedPlan(plan.months)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedPlan === plan.months
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-slate-200 bg-white hover:border-green-300"
                    }`}
                  >
                    <div className="font-bold text-lg">{plan.months}</div>
                    <div className="text-xs">Months</div>
                    <div className="font-semibold mt-1">${plan.amount}/mo</div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Select a plan and book now - قسطوں میں آسانی سے خریدیں
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-3 mb-6">
            <Button size="lg" onClick={handleBookNow} disabled={product.stock === 0} className="flex-1 gap-2">
              <Calendar className="h-5 w-5" />
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 gap-2 bg-transparent"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Flexible Payments</p>
                <p className="text-xs text-muted-foreground">3, 6, or 12-month installments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">Your data is protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
