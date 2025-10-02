import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Heart, Users, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Easy Qist</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We're on a mission to make premium products accessible to everyone through flexible, transparent installment
          payment options.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Easy Qist was founded with a simple belief: everyone deserves access to quality products, regardless of
            their immediate financial situation. We understand that sometimes you need something now but prefer to pay
            over time.
          </p>
          <p>
            Our platform bridges the gap between desire and affordability by offering transparent, interest-free or
            low-interest installment plans. No hidden fees, no surprises – just honest, flexible payment options that
            work for you.
          </p>
          <p>
            Today, we're proud to serve thousands of customers who trust us to help them get what they need while
            managing their finances responsibly.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">Clear pricing with no hidden fees or surprises</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Customer First</h3>
              <p className="text-sm text-muted-foreground">Your satisfaction and trust are our top priorities</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">Making quality products available to everyone</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">Constantly improving our payment solutions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-900 text-white rounded-2xl p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold mb-2">10,000+</p>
            <p className="text-slate-300">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">$2M+</p>
            <p className="text-slate-300">Products Financed</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">98%</p>
            <p className="text-slate-300">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
