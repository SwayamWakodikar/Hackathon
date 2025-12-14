'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import LoginPage from '@/components/LoginPage'
const page = () => {
  return (
    <div className=''>
        <LoginPage/>
    </div>
  )
}
export default page
