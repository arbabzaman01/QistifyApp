"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
}

export function AuthGuard({ children, requireAuth = false, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)

  useEffect(() => {
    if (requireAuth && !currentUser) {
      router.push("/login")
    }
    if (requireAdmin && currentUser?.role !== "admin") {
      router.push("/")
    }
  }, [currentUser, requireAuth, requireAdmin, router])

  if (requireAuth && !currentUser) {
    return null
  }

  if (requireAdmin && currentUser?.role !== "admin") {
    return null
  }

  return <>{children}</>
}
