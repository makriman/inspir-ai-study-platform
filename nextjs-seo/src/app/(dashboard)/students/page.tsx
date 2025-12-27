'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentsPage() {
    const router = useRouter();
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        display_name: '',
        study_level: ''
    });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const token = localStorage.getItem('inspir_parent_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/students`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to load students');

            const data = await response.json();
            setStudents(data.students || []);
        } catch (error) {
            console.error('Load students error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('inspir_parent_token');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/students`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            setShowCreateForm(false);
            setFormData({ username: '', password: '', display_name: '', study_level: '' });
            loadStudents();
        } catch (error: any) {
            alert(error.message || 'Failed to create student');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Manage Students</h1>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold"
                    >
                        {showCreateForm ? 'Cancel' : '+ Create New Student'}
                    </button>
                </div>

                {showCreateForm && (
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">Create New Student</h2>
                        <form onSubmit={handleCreateStudent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Username</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={formData.display_name}
                                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Study Level</label>
                                <select
                                    value={formData.study_level}
                                    onChange={(e) => setFormData({ ...formData, study_level: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Select level</option>
                                    <option value="Year 9">Year 9</option>
                                    <option value="GCSE">GCSE</option>
                                    <option value="A-Level">A-Level</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                            >
                                Create Student
                            </button>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow">
                    {loading ? (
                        <p className="p-6 text-center text-gray-600">Loading...</p>
                    ) : students.length > 0 ? (
                        <div className="divide-y">
                            {students.map((student) => (
                                <div key={student.id} className="p-6 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-lg">{student.display_name}</h3>
                                        <p className="text-gray-600">@{student.username}</p>
                                        <p className="text-sm text-gray-500">{student.study_level || 'No level set'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm">{student.total_messages || 0} messages</p>
                                        <p className="text-xs text-gray-500">{student.is_active ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="p-6 text-center text-gray-600">No students yet. Create your first student!</p>
                    )}
                </div>
            </main>
        </div>
    );
}
