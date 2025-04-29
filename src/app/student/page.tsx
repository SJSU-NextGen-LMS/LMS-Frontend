'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

//type Course = { id: string; title: string; progress: number; price:number }
type ModuleStatus = {
  moduleId: string;
  completed: boolean;
};

type UserCourse = {
  userId: string;
  courseId: string;
  courseTitle: string;
  progressPercentage: number;
  modules: ModuleStatus[];
};

export default function StudentPage() {
  const { user } = useUser();
  const [progresses, setCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      const userId = '1d23';
      console.log('Current user id:', userId);
      try {
        const res = await fetch(
          `/api/student/assigned-courses?userId=${userId}`
        );
        // if (!res.ok) {
        //   throw new Error(`HTTP error! status: ${res.status}`);
        // }
        const data: UserCourse[] = await res.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="text-lg mb-6">Welcome, {user?.fullName}!</p>

      {loading ? (
        <p>Loading courses...</p>
      ) : progresses.length === 0 ? (
        <p>No assigned courses.</p>
      ) : (
        <ul className="space-y-4">
          {progresses.map((course) => (
            <li key={course.courseId} className="p-4 border rounded shadow">
              <Link href={`/student/course/${course.courseId}`}>
                <h2 className="text-xl font-semibold mb-2">
                  {course.courseTitle}
                </h2>
              </Link>
              <div className="w-full bg-gray-200 rounded h-2 mb-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${course.progressPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {course.progressPercentage}% complete
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
