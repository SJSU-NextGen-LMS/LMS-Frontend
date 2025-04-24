import { NextResponse } from 'next/server'

export async function GET() {
  // Mock teacher courses data
  const courses = [
    { id: '101', title: 'React 101', enrolled: 45 },
    { id: '102', title: 'TypeScript Deep Dive', enrolled: 32 },
    { id: '103', title: 'Node.js Best Practices', enrolled: 28 },
  ]
  return NextResponse.json(courses)
} 