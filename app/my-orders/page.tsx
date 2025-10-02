"use client"

import { useStore } from "@/lib/store"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Package, CheckCircle2, Clock } from "lucide-react"
import { format } from "date-fns"

function MyOrdersContent() {
  const currentUser = useStore((state) => state.currentUser)
  const getUserOrders = useStore((state) => state.getUserOrders)

  const orders = getUserOrders(currentUser?.id || "")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-slate-500"
    }
  }

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-slate-600" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">View your orders and installment schedules</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
            <Button asChild>
              <a href="/shop">Browse Products</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const hasInstallments = !!order.paymentSchedule
            const paidPayments = order.paymentSchedule?.filter((p) => p.status === "paid").length || 0
            const totalPayments = order.paymentSchedule?.length || 0

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Order #{order.id}
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(order.createdAt), "MMM dd, yyyy")}
                        </span>
                        <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                      </CardDescription>
                    </div>
                    {hasInstallments && (
                      <div className="bg-blue-50 px-4 py-2 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">
                          {order.installmentPackage?.label} Installment Plan
                        </p>
                        <p className="text-xs text-blue-700">
                          {paidPayments} of {totalPayments} payments completed
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="items" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="items">Order Items</TabsTrigger>
                      <TabsTrigger value="schedule" disabled={!hasInstallments}>
                        Installment Schedule
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="items" className="space-y-4 mt-4">
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3">
                        <p className="text-sm text-muted-foreground mb-1">Shipping Address:</p>
                        <p className="text-sm">{order.shippingAddress}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="schedule" className="mt-4">
                      {order.paymentSchedule && (
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <h4 className="font-semibold text-blue-900 mb-1">Payment Plan Details</h4>
                            <p className="text-sm text-blue-700">
                              Total Amount: ${order.total.toFixed(2)} | Monthly Payment: $
                              {order.paymentSchedule[0].amount.toFixed(2)} | Duration:{" "}
                              {order.installmentPackage?.months} months
                            </p>
                          </div>
                          {order.paymentSchedule.map((payment) => (
                            <div
                              key={payment.paymentNumber}
                              className="flex items-center justify-between p-4 border rounded-lg bg-white"
                            >
                              <div className="flex items-center gap-3">
                                {getPaymentStatusIcon(payment.status)}
                                <div>
                                  <p className="font-medium">
                                    Installment {payment.paymentNumber} of {totalPayments}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Due Date: {format(new Date(payment.dueDate), "MMM dd, yyyy")}
                                  </p>
                                  {payment.paidAt && (
                                    <p className="text-xs text-green-600">
                                      Paid on {format(new Date(payment.paidAt), "MMM dd, yyyy")}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <p className="text-lg font-bold">${payment.amount.toFixed(2)}</p>
                                <Badge
                                  variant={payment.status === "paid" ? "default" : "outline"}
                                  className={
                                    payment.status === "paid"
                                      ? "bg-green-600 text-white"
                                      : "text-slate-600 border-slate-300"
                                  }
                                >
                                  {payment.status === "paid" ? "Paid" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function MyOrdersPage() {
  return (
    <AuthGuard requireAuth>
      <MyOrdersContent />
    </AuthGuard>
  )
}
