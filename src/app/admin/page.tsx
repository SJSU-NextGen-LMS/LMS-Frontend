'use client'

import { useUser } from '@clerk/nextjs'

export default function AdminPage() {
  const { user } = useUser()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg">Welcome, {user?.fullName}!</p>
      {/* TODO: User & Role management */}
    </main>
  )
}
  