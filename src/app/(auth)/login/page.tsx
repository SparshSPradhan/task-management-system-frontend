

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from '@/lib/context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      showToast('Login successful!', 'success');
      router.push('/tasks');
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="relative w-full max-w-md">
        {/* Animated color-changing border */}
        <div className="absolute -inset-1 pointer-events-none bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-sm opacity-75 animate-border-flow"></div>
        
        {/* Main login box */}
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Login
            </h2>
            <p className="text-gray-600">Welcome back! Please login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input with animated border */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute -inset-0.5 pointer-events-none bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-75 blur-sm transition-opacity duration-300 animate-border-flow"></div>
                


<input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      required
      className="relative z-10 w-full px-4 py-3 rounded-xl
                 bg-white text-gray-900 caret-purple-600
                 border-2 border-gray-300
                 focus:border-purple-500 focus:outline-none
                 focus:ring-2 focus:ring-purple-200
                 transition-all duration-300"
    />
              </div>
            </div>

            {/* Password Input with animated border */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute -inset-0.5 pointer-events-none bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-75 blur-sm transition-opacity duration-300 animate-border-flow"></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative z-10 w-full px-4 py-3 rounded-xl
                  bg-white text-gray-900 caret-purple-600
                  border-2 border-gray-300
                  focus:border-purple-500 focus:outline-none
                  focus:ring-2 focus:ring-purple-200
                  transition-all duration-300"                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button with animated border */}
            <div className="group">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-sm group-hover:opacity-100 opacity-75 transition-opacity duration-300 animate-border-flow"></div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

  
}