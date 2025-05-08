import { NextResponse, NextRequest } from 'next/server';

async function apiGet<T>(url: string): Promise<T> {
  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  try {
    const res = await fetch(`${backendBaseUrl}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error('API GET error:', error);
    throw error;
  }
}
export async function GET(req: NextRequest) {
  try {
    const courses = await apiGet(`/courses`);
    console.log('courses from backend:', courses);

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching progresses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progresses' },
      { status: 500 }
    );
  }
}
