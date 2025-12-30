// app/resume/dashboard/page.tsx
"use client";

import React from 'react';
import Dashboard from "@/components/Dashboard/Dashboard";
import { SessionProvider } from "next-auth/react";

const DashboardPage = () => {
  return ( 
    <SessionProvider>
      <div>
          <Dashboard/>
      </div>
    </SessionProvider>
  );
}
export default DashboardPage;