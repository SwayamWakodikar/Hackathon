
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import {
  IconHome,
  IconScoreboard,
  IconLogout,
  IconLayoutDashboardFilled,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Particles from "@/components/Particles";

const AppSidebar = () => {
  const { open } = useSidebar();
  const { data: session } = useSession();

  return (
    // Ensure SidebarBody is forced to take full height of the parent
    <SidebarBody className="h-full justify-between overflow-hidden">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md bg-purple-600">
            <a href="/welcome">
            <img src="/letter-v.svg" alt="VPlace Logo" className="h-5 w-5" /></a>
          </div>
          <a href="/welcome" className={`ml-2 text-lg font-semibold whitespace-nowrap text-white transition-all duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            Vplace
          </a>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <SidebarLink link={{ label: "Home", href: "/resume/home", icon: <IconHome className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "Dashboard", href: "/resume/generated-resume", icon: <IconLayoutDashboardFilled className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "ATS", href: "/resume/ats", icon: <IconScoreboard className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "Logout", href: "/api/auth/signout?callbackUrl=/", icon: <IconLogout className="h-5 w-5 shrink-0" /> }} />
        </div>
      </div>

      <div className="flex items-center py-3 border-t border-gray-800 min-w-8">
        <div className="h-8 w-8 shrink-0">
          {session?.user?.image ? (
            <img src={session.user.image} className="h-8 w-8 rounded-full border border-purple-500/50" alt="User" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
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

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Sidebar>
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Particles
            particleColors={["#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.01}
            particleBaseSize={100}
          />
        </div>
        <div className="flex h-screen bg-transparent overflow-hidden">
          <AppSidebar />
          <div className="flex-1 flex flex-col relative overflow-y-auto">
            {children}
          </div>
        </div>
      </Sidebar>
    </SessionProvider>
  );
}