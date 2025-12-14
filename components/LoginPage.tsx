import React from 'react';
import { signIn } from 'next-auth/react'
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-purple-500 to-purple-800">
      <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md text-center">
        <div className="text-5xl mb-3">🔐</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Login</h1>
        <p className="text-gray-600 text-sm mb-10">Sign in to continue to your account</p>
        
        <button
          onClick={()=> signIn('google')}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium text-base hover:bg-gray-50 hover:border-blue-500 hover:shadow-lg active:scale-98 transition-all duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <div className="mt-8 text-gray-500 text-xs">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}