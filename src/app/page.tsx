'use client'

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  // Redirect signed-in users to their role dashboard
  useEffect(() => {
    if (isSignedIn) {
      // Assuming role stored in publicMetadata.role
      const role = (user as any)?.publicMetadata?.role as string | undefined;
      const destination = role ? `/${role}` : '/student';
      router.push(destination);
    }
  }, [isSignedIn, user, router]);

  if (!isSignedIn) {
    return (
      <main className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-4xl font-bold mb-4">Welcome to NEXTGen LMS</h1>
        <p className="text-lg">Please sign in to access your dashboard.</p>
      </main>
    );
  }

  // while redirecting, render nothing (or replace with a loader)
  return null;
}
