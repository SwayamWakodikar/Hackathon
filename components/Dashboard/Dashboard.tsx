"use client";

import React, { useState, useEffect } from "react";
import ResumeTab from "./ResumeTab";
import ResumePreviewModal from "./ResumePreviewModal";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ResumeDocument, COLLECTIONS } from "@/lib/resume";

import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "../ui/sidebar";
import {
  IconHome,
  IconScoreboard,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

import Particles from "../Particles";


const AppSidebar = () => {
  const { open } = useSidebar();
  const { data: session } = useSession();

  return (
    <SidebarBody className="h-screen justify-between overflow-hidden">
      {/* Top Navigation */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          {/* Static Logo Container */}
          <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md bg-purple-600">
            <img src="/letter-v.svg" alt="VPlace Logo" className="h-5 w-5" />
          </div>

          <span
            className={`
              ml-2 text-lg font-semibold whitespace-nowrap text-white
              transition-all duration-200 ease-out
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
            `}
          >
            Vplace
          </span>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <SidebarLink
            link={{
              label: "Home",
              href: "/resume/home",
              icon: <IconHome className="h-5 w-5 shrink-0" />, // Added shrink-0 to icons
            }}
          />
          <SidebarLink
            link={{
              label: "ATS",
              href: "/ats",
              icon: <IconScoreboard className="h-5 w-5 shrink-0" />,
            }}
          />
          <SidebarLink
            link={{
              label: "Settings",
              href: "/settings",
              icon: <IconSettings className="h-5 w-5 shrink-0" />,
            }}
          />
          <SidebarLink
            link={{
              label: "Logout",
              href: "/api/auth/signout",
              icon: <IconLogout className="h-5 w-5 shrink-0" />,
            }}
          />
        </div>
      </div>

      <div className="flex items-center py-3 border-t border-gray-800 min-w-8">
        <div className="h-8 w-8 shrink-0 flex-none"> {/* Added flex-none and shrink-0 */}
          {session?.user?.image ? (
            <img
              src={session.user.image}
              className="h-8 w-8 rounded-full object-cover border border-purple-500/50"
              alt={session.user.name || "User"}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>
        
        <span
          className={`
            ml-2 text-sm font-medium whitespace-nowrap text-gray-200
            transition-all duration-200 ease-out
            ${
              open
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden" // Force width 0 when closed
            }
          `}
        >
          {session?.user?.name || "User"}
        </span>
      </div>
    </SidebarBody>
  );
};

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [resumeMarkdown, setResumeMarkdown] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      if (session?.user?.email) {
        try {
          // Fetch existing resume from Firestore using the user's email as the ID
          const docRef = doc(db, COLLECTIONS.RESUMES, session.user.email);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data() as ResumeDocument;
            setResumeMarkdown(data.markdown);
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
        } finally {
          setLoading(false);
        }
      } else if (session === null) {
        // If session check finishes and there is no user, stop loading
        setLoading(false);
      }
    };

    fetchResume();
  }, [session]);

  const hasResume = Boolean(resumeMarkdown);

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

          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-8">
                <span className="text-purple-600 dark:text-purple-400">
                  VPlace
                </span>
              </h1>

              <div className="backdrop-blur-2xl bg-gray-300/5 rounded-3xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6 text-white">
                  Your Generated Resume
                </h2>

                {loading ? (
                  /* Loading State */
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-4"></div>
                    <p className="text-gray-400">Retrieving your data...</p>
                  </div>
                ) : hasResume ? (
                  /* Has Resume */
                  <div className="flex gap-6">
                    <ResumeTab
                      onView={() => setShowModal(true)}
                      resumeData={resumeMarkdown}
                      hasResume
                    />
                    <div className="flex-1" />
                  </div>
                ) : (
                  /* No Resume */
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      No Resume Found
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-md">
                      You haven't generated an AI resume yet. Create one to see it appear here.
                    </p>
                    <a 
                      href="/resume/home" 
                      className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition font-medium shadow-lg shadow-purple-600/20"
                    >
                      Generate Resume
                    </a>
                  </div>
                )}
              </div>

              {/* View Modal */}
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