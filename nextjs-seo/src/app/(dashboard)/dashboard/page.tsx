'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const [dashboard, setDashboard] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const token = localStorage.getItem('inspir_parent_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/parent/dashboard`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to load dashboard');
            }

            const data = await response.json();
            setDashboard(data.dashboard);
        } catch (error) {
            console.error('Dashboard error:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('inspir_parent_token');
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        inspir Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Students</h3>
                        <p className="text-4xl font-bold text-purple-600">{dashboard?.students?.total || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500 text-sm font-semibold mb-2">Active Students</h3>
                        <p className="text-4xl font-bold text-blue-600">{dashboard?.students?.active || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Messages</h3>
                        <p className="text-4xl font-bold text-green-600">{dashboard?.usage?.total_messages || 0}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Your Students</h2>
                        <Link
                            href="/students"
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700"
                        >
                            Manage Students
                        </Link>
                    </div>

                    {dashboard?.students?.list?.length > 0 ? (
                        <div className="grid gap-4">
                            {dashboard.students.list.map((student: any) => (
                                <div key={student.id} className="border rounded-lg p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-lg">{student.display_name}</h3>
                                        <p className="text-gray-600 text-sm">@{student.username}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">{student.total_messages || 0} messages</p>
                                        <p className="text-xs text-gray-500">{student.is_active ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-8">No students yet. Create your first student to get started!</p>
                    )}
                </div>
            </main>
        </div>
    );
}
