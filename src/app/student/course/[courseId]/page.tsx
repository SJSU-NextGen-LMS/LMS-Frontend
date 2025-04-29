'use client';

import { useParams } from 'next/navigation'; //the parameter from the other page
import { useState, useEffect } from 'react';
//import { useUser } from '@clerk/nextjs'
import Link from 'next/link';

export type Module = {
  moduleId: string;
  courseId: string;
  type: 'Text' | 'Video';
  title: string;
  content: string;
  moduleVideo?: string;
  order: number;
  completed: boolean;
};

export default function ModulesDetailPage() {
  const params = useParams() as { courseId: string };
  const { courseId } = params;
  const userId = '1d23';

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  useEffect(() => {
    async function loadModules() {
      if (!courseId) return;
      try {
        const res = await fetch(
          `/api/student/course/${courseId}/modules?userId=${userId}`
        );
        // if (!res.ok) {
        //   throw new Error(`HTTP error! status: ${res.status}`);
        // }
        const data: Module[] = await res.json();
        setModules(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadModules();
  }, []);
  const toggleExpand = (moduleId: string) => {
    if (expandedModuleId === moduleId) {
      setExpandedModuleId(null);
    } else {
      setExpandedModuleId(moduleId);
    }
  };

  const markAsCompleted = async (
    userId: string,
    courseId: string,
    moduleId: string
  ) => {
    try {
      const res = await fetch(
        `/api/student/progress/${userId}/${courseId}/${moduleId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            courseId,
            moduleId,
            completed: true,
          }),
        }
      );

      //   const errorText = await res.text();  // print error message
      //   console.error('❌ Server error:', errorText);

      if (!res.ok) {
        throw new Error('Failed to mark module as completed');
      }

      setModules((prevModules) =>
        prevModules.map((mod) =>
          mod.moduleId === moduleId
            ? { ...mod, completed: true } // update the state of the modules
            : mod
        )
      );

      console.log(`✅ Module ${moduleId} marked as completed!`);
    } catch (error) {
      console.error('❌ Error marking module as completed:', error);
    }
  };
  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Loading modules...</h1>
      </main>
    );
  }

  return (
    <main className="p-8 pb-32">
      <h1 className="text-3xl font-bold mb-6">Course Modules</h1>

      <ul className="space-y-4">
        {modules.map((mod) => (
          <li key={mod.moduleId}>
            <div
              onClick={() => toggleExpand(mod.moduleId)}
              className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
            >
              {mod.order + 1}.{mod.title}
              {expandedModuleId === mod.moduleId && (
                <div className="p-4 mt-2 ml-4 bg-gray-50 rounded">
                  <h2 className="text-lg font-semibold mb-2">Content:</h2>
                  <p>{mod.content}</p>

                  <h2 className="text-lg font-semibold mt-4 mb-2">
                    Video URL:
                  </h2>
                  <p>
                    {mod.moduleVideo
                      ? mod.moduleVideo
                      : 'No video for this module.'}
                  </p>
                  {!mod.completed ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); //avoid trigger parent div's onClick
                        markAsCompleted(userId, courseId, mod.moduleId);
                      }}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Press to Complete
                    </button>
                  ) : (
                    <button
                      disabled
                      className="mt-4 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
                    >
                      ✅ Completed
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Link href={'/student'}>
        <button className="px-4 py-2 mb-6 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back
        </button>
      </Link>
    </main>
  );
}
