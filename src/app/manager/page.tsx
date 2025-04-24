'use client'

import { useUser } from '@clerk/nextjs'

export default function ManagerPage() {
  const { user } = useUser()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>
      <p className="text-lg">Welcome, {user?.fullName}!</p>
      {/* TODO: Assignment & tracking */}
    </main>
  )
}
  