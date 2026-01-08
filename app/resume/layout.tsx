"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Particles from "@/components/Particles";

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={false}>
        {/* Background Particles */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[#030303]">
          <Particles
            particleColors={["#3b82f6", "#ffffff"]}
            particleCount={150}
            particleSpread={15}
            speed={0.005}
            particleBaseSize={80}
          />
        </div>

        <AppSidebar />

        <SidebarInset className="bg-transparent flex flex-col h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-4 bg-black/20 backdrop-blur-sm">
          </header>
          <div className="flex-1 overflow-y-auto bg-black/20 relative">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}