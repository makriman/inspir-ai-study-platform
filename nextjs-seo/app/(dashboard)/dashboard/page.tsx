'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, MessageSquare, Clock, TrendingUp, Plus } from 'lucide-react'

export default function DashboardPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalMessages: 0,
    studyTime: 0,
    activeToday: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('inspir_parent_token')

      // Fetch students
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/students`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStudents(data.students || [])

        // Calculate stats
        setStats({
          totalStudents: data.students?.length || 0,
          totalMessages: data.students?.reduce((sum: number, s: any) => sum + (s.total_messages || 0), 0) || 0,
          studyTime: data.students?.reduce((sum: number, s: any) => sum + (s.study_time || 0), 0) || 0,
          activeToday: data.students?.filter((s: any) => {
            const lastActive = new Date(s.last_active_at || 0)
            const today = new Date()
            return lastActive.toDateString() === today.toDateString()
          }).length || 0,
        })
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Messages Sent', value: stats.totalMessages, icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { label: 'Study Time (hrs)', value: Math.round(stats.studyTime / 60), icon: Clock, color: 'from-green-500 to-teal-500' },
    { label: 'Active Today', value: stats.activeToday, icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your students
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Students List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Students
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-inspir-purple mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No students yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by creating your first student profile
            </p>
            <Link
              href="/students/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-inspir-purple to-inspir-blue text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-md"
            >
              <Plus className="w-5 h-5" />
              Create Student
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {students.map((student: any) => (
              <div
                key={student.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-inspir-purple to-inspir-blue flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {student.display_name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {student.display_name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        @{student.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {student.total_messages || 0}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Messages</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {student.streak_days || 0}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
                    </div>
                    <Link
                      href={`/students/${student.id}`}
                      className="px-4 py-2 border border-inspir-purple text-inspir-purple hover:bg-inspir-purple hover:text-white rounded-lg transition-colors font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
