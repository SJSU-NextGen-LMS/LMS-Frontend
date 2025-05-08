'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

//type Course = { id: string; title: string; progress: number; price:number }
type ModuleStatus = {
  moduleId: string;
  completed: boolean;
};

type EnrolledCourses = {
  userId: string;
  courseId: string;
  courseTitle: string;
  progressPercentage: number;
  modules: ModuleStatus[];
};

type AllCourses = {
  courseId: string;
  teacherName: string;
  title: string;
  image: string;
  price: number;
  description: string;
  level: string;
};

export default function StudentPage() {
  const { user } = useUser();
  const [progresses, setProgresses] = useState<EnrolledCourses[]>([]);
  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState<AllCourses[]>([]);

  useEffect(() => {
    async function loadCourses() {
      const userId = '1d23';
      console.log('Current user id:', userId);
      try {
        const res = await fetch(
          `/api/student/assigned-courses?userId=${userId}` //get all enrolled courses
        );
        const res2 = await fetch(
          `/api/student/allCourses` //get all courses
        );
        // if (!res.ok) {
        //   throw new Error(`HTTP error! status: ${res.status}`);
        // }
        const data: EnrolledCourses[] = await res.json();
        const data2: AllCourses[] = await res2.json();
        setProgresses(data);
        setCourses(data2);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const enrolledIds = new Set(progresses.map((c) => c.courseId));
  const unenrolledCourses = courses.filter(
    (course) => !enrolledIds.has(course.courseId)
  ); //filter out enrolled courses
  async function handleEnroll(courseId: string) {
    try {
      const userId = '1d23'; //TODO: replace with user?.id in real use
      await fetch(`/api/student/enroll?userId=${userId}&courseId=${courseId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId }),
      });

      const res = await fetch(`/api/student/assigned-courses?userId=${userId}`);
      const data = await res.json();
      setProgresses(data);
    } catch (err) {
      console.error('Enroll failed:', err);
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="text-lg mb-6">Welcome, {user?.fullName}!</p>

      {loading ? (
        <p>Loading courses...</p>
      ) : progresses.length === 0 ? (
        <p>No assigned courses.</p>
      ) : (
        <>
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

          <h2 className="text-2xl font-bold mt-10 mb-4">Available Courses</h2>
          <ul className="space-y-4">
            {unenrolledCourses.map((course) => (
              <li key={course.courseId} className="p-4 border rounded shadow">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Teacher:</strong> {course.teacherName}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Level:</strong> {course.level}
                </p>
                <p className="text-sm text-gray-800 font-medium mb-3">
                  <strong>Price:</strong> ${course.price}
                </p>
                <div className="w-1/2 text-sm text-gray-600">
                  {course.description}
                </div>
                <button
                  onClick={() => handleEnroll(course.courseId)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Enroll
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
