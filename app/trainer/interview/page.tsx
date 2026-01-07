"use client";

import React from 'react'
import { SessionProvider } from "next-auth/react";
import InterviewDashboard from '@/components/Pages/InterviewDashboard';

const page = () => {
  return (
    <SessionProvider>
    <div>
      <InterviewDashboard/>
    </div>
    </SessionProvider>
  )
}

export default page