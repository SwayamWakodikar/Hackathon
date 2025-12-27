"use client";

import React, { useState, useEffect } from "react";
import ResumeTab from "./ResumeTab";
import ResumePreviewModal from "./ResumePreviewModal";

import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "../ui/sidebar";
import {
  IconHome,
  IconScoreboard,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

import Particles from "../Particles";

/* ---------------- SIDEBAR ---------------- */

const AppSidebar = () => {
  const { open } = useSidebar();

  return (
    <SidebarBody className="h-screen justify-between">
      {/* Top */}
      <div className="flex flex-col gap-8">
        {/* Brand */}
        <div className="flex items-center">
          <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md bg-purple-600">
            <img src="/letter-v.svg" alt="VPlace Logo" className="h-5 w-5" />
          </div>

          <span
            className={`
              ml-2 text-lg font-semibold whitespace-nowrap
              transition-all duration-200 ease-out
              ${
                open
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 pointer-events-none"
              }
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
              label: "ATS",
              href: "/ats",
              icon: <IconScoreboard className="h-5 w-5" />,
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
        <img
          src="https://i.pravatar.cc/100"
          className="h-8 w-8 rounded-full"
          alt="user"
        />
        <span
          className={`
            ml-2 text-sm font-medium whitespace-nowrap
            transition-all duration-200 ease-out
            ${
              open
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none"
            }
          `}
        >
          Manu Arora
        </span>
      </div>
    </SidebarBody>
  );
};

/* ---------------- DASHBOARD ---------------- */

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [resumeMarkdown, setResumeMarkdown] = useState(""); // State for resume data

  useEffect(() => {
    // Fetch the generated resume from the API
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/generate-resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: {
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "123-456-7890",
              address: "123 Main St, City, Country",
              education: "B.Sc. in Computer Science",
              skills: "React, Node.js, AWS",
              experience: "5 years as a Full-Stack Developer",
            },
          }),
        });

        const data = await response.json();

        if (data.success) {
          setResumeMarkdown(data.resume); // Set the generated resume
        } else {
          console.error("Failed to fetch resume:", data.error);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, []);

  const hasResume = Boolean(resumeMarkdown);

  return (
    <>
      {/* Particles Background */}
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

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">
                <span className="text-purple-600 dark:text-purple-400">
                  VPlace
                </span>
              </h1>

              <div className="backdrop-blur-2xl bg-gray-300/5 rounded-3xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">
                  Your Generated Resume
                </h2>

                {hasResume ? (
                  /* ---------------- HAS RESUME ---------------- */
                  <div className="flex gap-6">
                    <ResumeTab
                      onView={() => setShowModal(true)}
                      resumeData={resumeMarkdown}
                      hasResume
                    />
                    <div className="flex-1" />
                  </div>
                ) : (
                  /* ---------------- NO RESUME ---------------- */
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      No Resume Found
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      You haven't generated a resume yet. Create one to see it
                      appear here.
                    </p>
                    <a
                      href="/resume/home"
                      className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
                    >
                      Generate Resume
                    </a>
                  </div>
                )}
              </div>

              {/* Modal */}
              <ResumePreviewModal
                open={showModal && hasResume}
                onClose={() => setShowModal(false)}
                markdown={resumeMarkdown}
              />
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Dashboard;
