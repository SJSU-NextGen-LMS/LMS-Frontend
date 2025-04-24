'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

type Course = { id: string; title: string; enrolled: number }

export default function TeacherPage() {
  const { user } = useUser()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch('/api/teacher/courses')
        const data: Course[] = await res.json()
        setCourses(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <Link href="/teacher/courses/new" className="px-4 py-2 bg-green-500 text-white rounded">
          New Course
        </Link>
      </div>
      <p className="text-lg mb-4">Welcome, {user?.fullName}!</p>

      {loading ? (
        <p>Loading your courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="p-4 border rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600">Enrolled: {course.enrolled}</p>
              </div>
              <Link href={`/teacher/courses/${course.id}`} className="text-blue-600 hover:underline">
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
  