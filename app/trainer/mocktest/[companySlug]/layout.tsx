"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-transparent">
        {/* You can add a shared Quiz Header here if needed */}
        {children}
      </div>
    </SessionProvider>
  )
}