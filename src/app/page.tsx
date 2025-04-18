'use client'

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function HomePage() {
  const { user, isSignedIn } = useUser();

  return (
    <main className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-4xl font-bold mb-4">Welcome to NEXTGen LMS</h1>

      {!isSignedIn ? (
        <p className="text-lg">Please sign in to access your dashboard.</p>
      ) : (
        <div className="space-y-2">
          <p className="text-lg">Hi {user?.fullName}!</p>
          <Link className="underline" href="/student">Go to Student Dashboard</Link>
        </div>
      )}
    </main>
  );
}
