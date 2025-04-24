import { NextResponse } from 'next/server'

export async function GET() {
  // Mock assigned courses data
  const courses = [
    { id: '1', title: 'Intro to React', progress: 20 },
    { id: '2', title: 'Advanced TypeScript', progress: 80 },
    { id: '3', title: 'LMS Fundamentals', progress: 50 },
  ]
  return NextResponse.json(courses)
} 