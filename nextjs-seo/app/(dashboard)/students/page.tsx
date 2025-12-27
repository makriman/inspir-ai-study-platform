'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Users } from 'lucide-react'

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('inspir_parent_token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/students`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStudents(data.students || [])
      }
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter((student: any) =>
    student.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.username?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Students
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your student profiles and view their progress
          </p>
        </div>

        <Link
          href="/students/new"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-inspir-purple to-inspir-blue text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inspir-purple focus:border-transparent"
          />
        </div>
      </div>

      {/* Students Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inspir-purple"></div>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {searchTerm ? 'No students found' : 'No students yet'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm
              ? 'Try adjusting your search'
              : 'Get started by creating your first student profile'}
          </p>
          {!searchTerm && (
            <Link
              href="/students/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-inspir-purple to-inspir-blue text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-md"
            >
              <Plus className="w-5 h-5" />
              Create Student
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student: any) => (
            <div
              key={student.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-inspir-purple to-inspir-blue flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-2xl">
                    {student.display_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {student.display_name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  @{student.username}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {student.total_messages || 0}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Messages</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((student.study_time || 0) / 60)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {student.streak_days || 0}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Streak</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/students/${student.id}`}
                  className="block w-full px-4 py-2 bg-gradient-to-r from-inspir-purple to-inspir-blue text-white text-center font-semibold rounded-lg hover:scale-105 transition-transform"
                >
                  View Details
                </Link>
                <button
                  className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-center font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Reset Password
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
