"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Calendar } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

function CartPageContent() {
  const router = useRouter()
  const cart = useStore((state) => state.cart)
  const products = useStore((state) => state.products)
  const updateCartQuantity = useStore((state) => state.updateCartQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const getCartTotal = useStore((state) => state.getCartTotal)

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }))

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-12 pb-12">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <Link href="/shop">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 relative bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                      <div>
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-semibold hover:text-green-600 text-balance">{item.product.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.product.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-lg font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">or from ${(total / 12).toFixed(2)}/month</p>
                </div>
              </div>

              <Card className="bg-green-50 border-green-200 mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Installment Options Available</h3>
                      <p className="text-xs text-muted-foreground">قسطوں میں ادائیگی کی سہولت</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">3 months:</span>
                      <span className="font-semibold">${(total / 3).toFixed(2)}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">6 months:</span>
                      <span className="font-semibold">${(total / 6).toFixed(2)}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">12 months:</span>
                      <span className="font-semibold">${(total / 12).toFixed(2)}/month</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Choose your preferred plan at checkout</p>
                </CardContent>
              </Card>

              <Button className="w-full gap-2" size="lg" onClick={() => router.push("/checkout")}>
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link href="/shop">
                <Button variant="outline" className="w-full mt-2 bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <AuthGuard requireAuth>
      <CartPageContent />
    </AuthGuard>
  )
}
