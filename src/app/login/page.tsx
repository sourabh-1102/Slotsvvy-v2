'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { api } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect authenticated users
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/sender'); 
    }
  }, [status, router]);

  // Prevent flash of content while checking session
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  // If authenticated, don't show form (though useEffect will redirect)
  if (status === 'authenticated') {
    return null; 
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.auth.login({ email, password });
      
      if (data.success) {
        router.replace('/sender');
        router.refresh(); 
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center text-blue-600">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
            For demo use: <span className="font-mono text-gray-700">admin@slotsavvy.com</span> / <span className="font-mono text-gray-700">admin</span>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 font-medium">
                {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => signIn('google', {
                callbackUrl: `${window.location.origin}/sender`,
              })}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 20.45c4.656 0 8.169-3.235 8.169-8.107 0-.792-.081-1.535-.234-2.228h-7.935v4.27h4.536c-.206 1.143-1.266 2.058-2.556 2.058-2.126 0-3.858-1.748-3.858-3.906 0-2.158 1.732-3.906 3.858-3.906 1.095 0 2.094.417 2.844 1.107l3.033-3.033c-1.742-1.631-4.01-2.614-5.877-2.614-4.887 0-8.847 3.96-8.847 8.847s3.96 8.847 8.847 8.847z"
                  fill="#4285F4"
                />
                <path
                  d="M12.0001 5.43999c1.095 0 2.094.417001 2.844 1.107l3.033-3.033c-1.742-1.631-4.01-2.614-5.877-2.614-4.887 0-8.847 3.96-8.847 8.847h3.048c0-2.158 1.732-3.906 3.858-3.906z"
                  fill="#EA4335"
                />
                <path
                  d="M6.2001 12.34c-.039-.239-.06-.486-.06-.74 0-.254.021-.501.06-.74H3.1531C2.5501 12.071 2.2081 13.628 2.2081 12.34c0 .872.238 1.706.657 2.454l2.992-2.454h.343z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0001 20.45c1.867 0 4.135-.983 5.877-2.614l-2.909-2.593c-.633.447-1.564.767-2.968.767-2.126 0-3.858-1.748-3.858-3.906H5.1531c.882 1.954 2.868 3.322 5.097 3.322l1.75 1.024z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
