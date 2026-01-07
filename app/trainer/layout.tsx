"use client";

import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import {
  IconHome,
  IconDeviceLaptop,
  IconClipboardCheck,
  IconScoreboard,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

// Extracted Sidebar Component
const AppSidebar = () => {
  const { open } = useSidebar();
  const { data: session } = useSession();

  return (
    <SidebarBody className="h-screen justify-between overflow-hidden bg-blue-950/20 backdrop-blur-md border-r border-blue-500/20">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md bg-blue-600 shadow-lg shadow-blue-600/40">
            <a href="/welcome">
            <img src="/letter-v.svg" alt="VPlace Logo" className="h-5 w-5 invert brightness-0" />
            </a>
            
          </div>
          <a href="/welcome" className={`ml-2 text-lg font-semibold whitespace-nowrap text-white transition-all duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            Vplace
          </a>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <SidebarLink link={{ label: "Home", href: "/trainer", icon: <IconHome className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "Mock Test", href: "/trainer/mocktest", icon: <IconClipboardCheck className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "AI Interview", href: "/trainer/interview", icon: <IconDeviceLaptop className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "Logout", href: "/api/auth/signout?callbackUrl=/", icon: <IconLogout className="h-5 w-5 shrink-0" /> }} />
        </div>
      </div>

      <div className="flex items-center py-3 border-t border-blue-500/20 min-w-8">
        <div className="h-8 w-8 shrink-0 flex-none">
          {session?.user?.image ? (
            <img src={session.user.image} className="h-8 w-8 rounded-full border border-blue-500/50" alt="User" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-600/40">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        <span className={`ml-2 text-sm font-medium text-gray-200 transition-all ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
          {session?.user?.name || "User"}
        </span>
      </div>
    </SidebarBody>
  );
};

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Sidebar>
      <div className="flex min-h-screen bg-transparent">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </Sidebar>
    </SessionProvider>
    
  );
}