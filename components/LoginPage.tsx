import React from 'react';
import { signIn } from 'next-auth/react'
export default function LoginPage() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-5 ">
      <div className="bg-gray-700/50 rounded-2xl shadow-2xl p-12 w-full max-w-md text-center">
        {/* <div className="text-5xl mb-3">🔐</div> */}
        <h1 className="text-3xl font-bold text-white mb-3">Login</h1>
        <p className="text-gray-100 text-sm mb-10">Sign in to continue to your account</p>
        
        <button
          onClick={()=> signIn('google')}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium text-base hover:bg-gray-50 hover:border-blue-500 hover:shadow-lg active:scale-98 transition-all duration-300"
        >
          <img width="48" height="48" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
          Sign in with Google
        </button>

        <div className="mt-8 text-gray-500 text-xs">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}