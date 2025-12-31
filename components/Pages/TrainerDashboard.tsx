"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import {
  IconHome,
  IconDeviceLaptop,
  IconClipboardCheck,
  IconScoreboard,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import Particles from "@/components/Particles";

const AppSidebar = () => {
  const { open } = useSidebar();
  const { data: session } = useSession();

  return (
    <SidebarBody className="h-screen justify-between overflow-hidden">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md bg-purple-600">
            <img src="/letter-v.svg" alt="VPlace Logo" className="h-5 w-5" />
          </div>
          <span className={`ml-2 text-lg font-semibold whitespace-nowrap text-white transition-all duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            Vplace
          </span>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <SidebarLink link={{ label: "Home", href: "/resume/home", icon: <IconHome className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "Mock Test", href: "/trainer/mocktest", icon: <IconClipboardCheck className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "AI Interview", href: "/trainer/interview", icon: <IconDeviceLaptop className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "ATS", href: "/ats", icon: <IconScoreboard className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "Settings", href: "/settings", icon: <IconSettings className="h-5 w-5 shrink-0" /> }} />
          <SidebarLink link={{ label: "Logout", href: "/api/auth/signout", icon: <IconLogout className="h-5 w-5 shrink-0" /> }} />
        </div>
      </div>

      <div className="flex items-center py-3 border-t border-gray-800 min-w-8">
        <div className="h-8 w-8 shrink-0 flex-none">
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

const TrainerDashboard: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) setLoading(false);
  }, [session]);

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.01}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <Sidebar>
        <div className="flex min-h-screen bg-transparent">
          <AppSidebar />
          <div className="flex-1 flex flex-col p-8">
            {/* Heading in original top-left position */}
            <div className="w-full max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">
                <span className="text-purple-600">AI Trainer</span>
              </h1>
            </div>

            {/* Container div to center the cards */}
            <div className="flex-1 flex items-center justify-center">
              {loading ? (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
              ) : (
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
                  
                  {/* Card 1: AI Interview */}
                  <div className="flex-1 max-w-md bg-transparent backdrop-blur-lg border hover:border-purple-500 rounded-2xl p-8 flex flex-col justify-between min-h-100 shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300  group">
                    <div className="space-y-6">
                      <div className="w-fit rounded-lg border border-purple-500/30 p-3 bg-purple-950/30 group-hover:border-purple-400 group-hover:bg-purple-900/40 transition-all">
                        <IconDeviceLaptop className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white tracking-tight">AI Interview</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                          Master your communication and technical skills with our real-time AI interviewer. Get instant feedback on your performance.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push("/trainer/interview")}
                      className="w-full py-4 mt-8 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98] cursor-pointer"
                    >
                      Start Session
                    </button>
                  </div>

                  {/* Card 2: Mock Test */}
                  <div className="flex-1 max-w-md bg-transparent backdrop-blur-lg border hover:border-purple-500 rounded-2xl p-8 flex flex-col justify-between min-h-100 shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300  group">
                    <div className="space-y-6">
                      <div className="w-fit rounded-lg border border-purple-500/30 p-3 bg-purple-950/30 group-hover:border-purple-400 group-hover:bg-purple-900/40 transition-all">
                        <IconClipboardCheck className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Mock Test</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                          Test your aptitude and coding knowledge with placement-ready standardized tests designed by industry experts.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push("/trainer/mocktest")}
                      className="w-full py-4 mt-8 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98] cursor-pointer"
                    >
                      Take Test
                    </button>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default TrainerDashboard;