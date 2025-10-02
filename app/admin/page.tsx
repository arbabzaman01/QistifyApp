"use client"

import { useState } from "react"
import Image from "next/image"
import { useStore } from "@/lib/store"
import { mockUsers } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingBag, Users, DollarSign, Calendar, CreditCard, CheckCircle2, Clock } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { format } from "date-fns"

function AdminDashboardContent() {
  const orders = useStore((state) => state.orders)
  const products = useStore((state) => state.products)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const totalUsers = mockUsers.filter((u) => u.role === "customer").length
  const ordersWithInstallments = orders.filter((o) => o.installmentPackage)
  const totalInstallmentRevenue = ordersWithInstallments.reduce((sum, order) => sum + order.total, 0)

  // Get orders with user and product details
  const ordersWithDetails = orders.map((order) => ({
    ...order,
    user: mockUsers.find((u) => u.id === order.userId),
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your e-commerce store and installment bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Installment Bookings</p>
                <p className="text-2xl font-bold">{ordersWithInstallments.length}</p>
                <p className="text-xs text-muted-foreground">${totalInstallmentRevenue.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customers</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="installments">Installment Bookings</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersWithDetails.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {ordersWithDetails.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{order.user?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} items
                            {order.installmentPackage && (
                              <span className="ml-2 text-blue-600">• {order.installmentPackage.months}mo plan</span>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total.toFixed(2)}</p>
                          <Badge variant={order.status === "completed" ? "default" : "secondary"} className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .filter((p) => p.featured)
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="flex items-center gap-3 border-b pb-3 last:border-0">
                        <div className="w-12 h-12 relative bg-slate-100 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <p className="font-semibold">${product.price}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersWithDetails.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ordersWithDetails.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">#{order.id.slice(0, 8)}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.user?.name}</p>
                              <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {order.items.map((item, idx) => (
                                <p key={idx} className="truncate max-w-xs">
                                  {item.quantity}x {item.productName}
                                </p>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            {order.installmentPackage ? (
                              <div className="flex items-center gap-1 text-sm">
                                <CreditCard className="h-3 w-3" />
                                <span>
                                  {order.installmentPackage.months} months
                                  {order.installmentPackage.interestRate > 0 &&
                                    ` (${order.installmentPackage.interestRate}%)`}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Full payment</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "completed"
                                  ? "default"
                                  : order.status === "processing"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Installments Tab */}
        <TabsContent value="installments">
          <Card>
            <CardHeader>
              <CardTitle>Installment Bookings</CardTitle>
              <CardDescription>View all orders with installment payment plans</CardDescription>
            </CardHeader>
            <CardContent>
              {ordersWithInstallments.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No installment bookings yet</p>
              ) : (
                <div className="space-y-6">
                  {ordersWithInstallments.map((order) => {
                    const user = mockUsers.find((u) => u.id === order.userId)
                    const totalPayments = order.paymentSchedule?.length || 0
                    const isExpanded = selectedOrder === order.id

                    return (
                      <Card key={order.id} className="border-2">
                        <CardHeader
                          className="cursor-pointer hover:bg-slate-50 transition-colors"
                          onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                              <CardDescription className="mt-1">
                                <span className="font-medium text-foreground">{user?.name}</span> • {user?.email}
                              </CardDescription>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge className="bg-blue-600">{order.installmentPackage?.months} Month Plan</Badge>
                                <span className="text-sm text-muted-foreground">
                                  {totalPayments} installments • ${order.paymentSchedule?.[0].amount.toFixed(2)}/month
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(order.createdAt), "MMM dd, yyyy")}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        {isExpanded && order.paymentSchedule && (
                          <CardContent className="border-t">
                            <div className="bg-blue-50 p-4 rounded-lg mb-4 mt-4">
                              <h4 className="font-semibold text-blue-900 mb-2">Installment Plan Details</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-blue-700">Total Amount:</p>
                                  <p className="font-bold text-blue-900">${order.total.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-blue-700">Monthly Payment:</p>
                                  <p className="font-bold text-blue-900">
                                    ${order.paymentSchedule[0].amount.toFixed(2)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-blue-700">Duration:</p>
                                  <p className="font-bold text-blue-900">{order.installmentPackage?.months} months</p>
                                </div>
                                <div>
                                  <p className="text-blue-700">Interest Rate:</p>
                                  <p className="font-bold text-blue-900">{order.installmentPackage?.interestRate}%</p>
                                </div>
                              </div>
                            </div>

                            <h4 className="font-semibold mb-3">Payment Schedule</h4>
                            <div className="space-y-3">
                              {order.paymentSchedule.map((payment) => (
                                <div
                                  key={payment.paymentNumber}
                                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    {payment.status === "paid" ? (
                                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : (
                                      <Clock className="h-5 w-5 text-slate-600" />
                                    )}
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
                                  <div className="text-right">
                                    <p className="text-lg font-bold">${payment.amount.toFixed(2)}</p>
                                    <Badge
                                      variant={payment.status === "paid" ? "default" : "outline"}
                                      className={
                                        payment.status === "paid" ? "bg-green-600" : "text-slate-600 border-slate-300"
                                      }
                                    >
                                      {payment.status === "paid" ? "Paid" : "Pending"}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
              <CardDescription>Manage your product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Featured</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative bg-slate-100 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-semibold">${product.price}</TableCell>
                        <TableCell>
                          <Badge variant={product.stock < 10 ? "destructive" : "secondary"}>{product.stock}</Badge>
                        </TableCell>
                        <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="text-muted-foreground">{user.phone || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <AuthGuard requireAuth requireAdmin>
      <AdminDashboardContent />
    </AuthGuard>
  )
}
