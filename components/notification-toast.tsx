"use client"

import { useStore } from "@/lib/store"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

export function NotificationToast() {
  const { notifications, clearNotifications } = useStore()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm animate-in slide-in-from-top-5 ${
            notification.type === "success"
              ? "bg-green-50 border border-green-200 text-green-900"
              : notification.type === "error"
                ? "bg-red-50 border border-red-200 text-red-900"
                : "bg-blue-50 border border-blue-200 text-blue-900"
          }`}
        >
          {notification.type === "success" && <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />}
          {notification.type === "error" && <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />}
          {notification.type === "info" && <Info className="h-5 w-5 flex-shrink-0 text-blue-600" />}
          <p className="flex-1 text-sm font-medium">{notification.message}</p>
          <button
            onClick={() => {
              useStore.setState({
                notifications: notifications.filter((n) => n.id !== notification.id),
              })
            }}
            className="flex-shrink-0 hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
