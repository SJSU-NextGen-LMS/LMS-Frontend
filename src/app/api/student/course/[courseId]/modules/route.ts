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
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!courseId) {
      return NextResponse.json({ error: 'No courseId' }, { status: 400 });
    }

    const modules = await apiGet(`/progress/${userId}/${courseId}`);
    console.log('models from backend:', modules);

    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
