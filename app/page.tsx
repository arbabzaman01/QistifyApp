import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CreditCard, Shield, Truck } from "lucide-react"

export default function HomePage() {
  const featuredProducts = [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 299.99,
      image: "/wireless-headphones.png",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 399.99,
      image: "/smartwatch-lifestyle.png",
    },
    {
      id: "3",
      name: "Laptop Backpack",
      price: 79.99,
      image: "/laptop-backpack.png",
    },
    {
      id: "4",
      name: "Bluetooth Speaker",
      price: 149.99,
      image: "/bluetooth-speaker.jpg",
    },
    {
      id: "5",
      name: "Wireless Mouse",
      price: 49.99,
      image: "/wireless-mouse.png",
    },
    {
      id: "6",
      name: "USB-C Hub",
      price: 89.99,
      image: "/usb-c-hub.jpg",
    },
    {
      id: "7",
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "/mechanical-keyboard.png",
    },
    {
      id: "8",
      name: "Webcam HD",
      price: 119.99,
      image: "/webcam-hd.png",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <p className="text-sm font-medium">Book Products on Easy Installments - آسان قسطوں پر</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              Shop Now, Pay Later
              <br />
              <span className="text-blue-200">قسطوں میں خریداری</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 text-pretty leading-relaxed max-w-3xl mx-auto">
              Choose your favorite products and pay in easy installments over 3, 6, or 12 months.
              <br />
              <span className="text-blue-200 font-semibold">No hidden charges</span> - Simple and transparent process
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6">
                  Start Shopping
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Easy Qist?</h2>
            <p className="text-lg text-muted-foreground">Smart shopping made simple</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Flexible Payment Plans</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choose from 3, 6, or 12-month installment plans that fit your budget perfectly
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">100% Secure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your information is completely safe with our trusted and secure platform
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Free shipping on orders over $100 with fast and reliable delivery service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-lg text-muted-foreground">Discover our popular collection</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-square relative bg-slate-100">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2 text-balance">{product.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-1">${product.price}</p>
                    <p className="text-sm text-muted-foreground">
                      or <span className="font-semibold text-blue-600">${(product.price / 12).toFixed(2)}/month</span>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/shop">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-transparent">
                View More Products
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Start Shopping?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of happy customers enjoying easy installment plans on their favorite products.
            <br />
            <span className="text-white font-semibold">Create your free account today</span> and experience smart
            shopping!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Create Free Account
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-6"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
