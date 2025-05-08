import { NextResponse, NextRequest } from 'next/server';
async function apiPost<T>(url: string): Promise<T> {
  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  try {
    const res = await fetch(`${backendBaseUrl}${url}`, {
      method: 'Post',
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
    console.error('API POST error:', error);
    throw error;
  }
}
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    // console.log('userId:', userId);
    // console.log('courseId:', courseId);

    if (!userId) {
      return NextResponse.json({ error: 'No userId' }, { status: 400 });
    }

    const newProgress = await apiPost(`/progress/${userId}/${courseId}`);
    console.log('new Progressses from backend:', newProgress);

    return NextResponse.json(newProgress);
  } catch (error) {
    console.error('Error update newProgress:', error);
    return NextResponse.json(
      { error: 'Failed to update newProgress' },
      { status: 500 }
    );
  }
}
