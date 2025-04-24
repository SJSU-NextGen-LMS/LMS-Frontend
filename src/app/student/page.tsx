'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

type Course = { id: string; title: string; progress: number }

export default function StudentPage() {
  const { user } = useUser()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch('/api/student/assigned-courses')
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
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="text-lg mb-6">Welcome, {user?.fullName}!</p>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No assigned courses.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <div className="w-full bg-gray-200 rounded h-2 mb-2">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{course.progress}% complete</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
  