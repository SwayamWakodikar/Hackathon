"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconDeviceLaptop, IconClipboardCheck } from "@tabler/icons-react";
import Particles from "@/components/Particles";

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

      <div className="flex-1 flex flex-col p-8">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            <span className="text-blue-500 italic uppercase">AI Trainer</span>
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center">
              {/* Card 1: AI Interview */}
              <div className="flex-1 max-w-md bg-transparent backdrop-blur-lg border hover:border-blue-500 rounded-2xl p-8 flex flex-col justify-between min-h-100 shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 group">
                {/* ... existing card content ... */}
                <div className="w-fit rounded-lg border border-blue-500/30 p-3 bg-blue-950/30 group-hover:border-blue-400 group-hover:bg-blue-900/40 transition-all">
                        <IconDeviceLaptop className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white tracking-tight">AI Interview</h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                          Master your communication and technical skills with our real-time AI interviewer. Get instant feedback on your performance.
                        </p>
                      </div>
                <button
                  onClick={() => router.push("/trainer/interview")}
                  className="w-full py-4 mt-8 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
                >
                  Start Session
                </button>
              </div>

              {/* Card 2: Mock Test */}
              <div className="flex-1 max-w-md bg-transparent backdrop-blur-lg border hover:border-blue-500 rounded-2xl p-8 flex flex-col justify-between min-h-100 shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 group">
                {/* ... existing card content ... */}
                <div className="space-y-6">
                      <div className="w-fit rounded-lg border border-blue-500/30 p-3 bg-blue-950/30 group-hover:border-blue-400 group-hover:bg-blue-900/40 transition-all">
                        <IconClipboardCheck className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
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
                  className="w-full py-4 mt-8 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
                >
                  Take Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrainerDashboard;