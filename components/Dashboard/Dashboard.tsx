"use client";

import React, { useState } from "react";
import ResumeTab from "./ResumeTab";
import ResumePreviewModal from "./ResumePreviewModal";

import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "../ui/sidebar";

import {
  IconLayoutDashboard,
  IconUser,
  IconSettings,
  IconLogout,
  IconHome,
} from "@tabler/icons-react";
import { img } from "motion/react-client";
// import LetterV from "../../public/LetterV.png";

/* ---------------- Sidebar Content ---------------- */

const AppSidebar = () => {
  const { open } = useSidebar();

  return (
    <SidebarBody className="h-screen justify-between">
      {/* Top */}
      <div className="flex flex-col gap-8">
        
        {/* Brand */}
        <div className="flex items-center">
          {/* Static logo */}
          <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md bg-purple-600">
            <img
              src="/letter-v.svg"
              alt="VPlace Logo"
              className="h-5 w-5"
            />
          </div>

          {/* Animated text (no layout shift) */}
          <span
            className={`
              ml-2 text-lg font-semibold whitespace-nowrap
              transition-all duration-200 ease-out
              ${open
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none"}
            `}
          >
            Vplace
          </span>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <SidebarLink
            link={{
              label: "Home",
              href: "/resume/home",
              icon: <IconHome className="h-5 w-5" />,
            }}
          />
          <SidebarLink
            link={{
              label: "Profile",
              href: "/profile",
              icon: <IconUser className="h-5 w-5" />,
            }}
          />
          <SidebarLink
            link={{
              label: "Settings",
              href: "/settings",
              icon: <IconSettings className="h-5 w-5" />,
            }}
          />
          <SidebarLink
            link={{
              label: "Logout",
              href: "/logout",
              icon: <IconLogout className="h-5 w-5" />,
            }}
          />
        </div>
      </div>

      {/* Bottom User */}
      <div className="flex items-center py-3">
        <div className="h-8 w-8 shrink-0 flex items-center justify-center">
          <img
            src="https://i.pravatar.cc/100"
            className="h-8 w-8 rounded-full"
            alt="user"
          />
        </div>

        <span
          className={`
            ml-2 text-sm font-medium whitespace-nowrap
            transition-all duration-200 ease-out
            ${open
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 pointer-events-none"}
          `}
        >
          Manu Arora
        </span>
      </div>
    </SidebarBody>
  );
};

/* ---------------- Dashboard ---------------- */

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [resumeMarkdown, setResumeMarkdown] = useState("");

  return (
    <Sidebar>
      <div className="flex min-h-screen bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        {/* Sidebar */}
        <AppSidebar />

        {/* Dashboard Content (UNCHANGED) */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-foreground">
              <span className="text-purple-600 dark:text-purple-400">
                VPlace
              </span>
            </h1>

            <div className="bg-muted/50 dark:bg-muted/30 rounded-3xl p-8 shadow-lg border border-border">
              <h1 className="text-2xl font-semibold mb-6 text-foreground">
                Your Generated Resume
              </h1>

              <div className="flex gap-6">
                <ResumeTab
                  onView={() => setShowModal(true)}
                  resumeData={resumeMarkdown}
                  hasResume={!!resumeMarkdown}
                />
                <div className="flex-1" />
              </div>
            </div>

            <ResumePreviewModal
              open={showModal}
              onClose={() => setShowModal(false)}
              markdown={resumeMarkdown}
            />
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
