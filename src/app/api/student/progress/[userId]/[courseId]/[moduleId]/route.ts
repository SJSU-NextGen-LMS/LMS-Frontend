import { NextRequest, NextResponse } from 'next/server';

async function apiPatch<T>(url: string, body: any): Promise<T> {
  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  const res = await fetch(`${backendBaseUrl}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Backend PATCH request failed: ${res.status}`);
  }

  const data = await res.json();
  return data as T;
}

// 处理前端PATCH请求
export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string; courseId: string; moduleId: string } }
) {
  try {
    const { userId, courseId, moduleId } = params;

    if (!userId || !courseId || !moduleId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const body = await req.json();

    // 🔥 调用真实后端 API，例如 /progress/:userId/:courseId/:moduleId
    const result = await apiPatch(
      `/progress/${userId}/${courseId}/${moduleId}`,
      body
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error marking module as completed:', error);
    return NextResponse.json(
      { error: 'Failed to mark module as completed' },
      { status: 500 }
    );
  }
}
