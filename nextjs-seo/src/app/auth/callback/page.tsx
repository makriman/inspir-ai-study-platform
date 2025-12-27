'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

function CallbackHandler() {
    const router = useRouter();
    const [error, setError] = useState('');

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                // Get the hash fragment from URL (Supabase returns tokens in hash)
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);

                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');
                const providerToken = params.get('provider_token');

                if (!accessToken) {
                    throw new Error('No access token received from OAuth provider');
                }

                // Exchange Supabase session for our JWT token
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://inspir.uk/api';
                const response = await fetch(`${apiUrl}/auth/parent/oauth-callback`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        provider_token: providerToken
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'OAuth login failed');
                }

                // Save our JWT token
                localStorage.setItem('inspir_parent_token', data.token);

                // Redirect to dashboard
                router.push('/dashboard');
            } catch (err: any) {
                console.error('OAuth callback error:', err);
                setError(err.message || 'Authentication failed');

                // Redirect back to login after 3 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            }
        };

        handleOAuthCallback();
    }, [router]);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Authentication Failed</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <p className="text-sm text-gray-500">Redirecting to login page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-4"></div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Completing Sign In</h1>
                <p className="text-gray-600">Please wait while we log you in...</p>
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
        }>
            <CallbackHandler />
        </Suspense>
    );
}
