'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import LoginPage from '@/components/LoginPage'
import SignupFormDemo from '@/components/signup-form-demo'
const page = () => {
  return (
    <div className=''>
        <SignupFormDemo/>
    </div>
  )
} 
export default page
