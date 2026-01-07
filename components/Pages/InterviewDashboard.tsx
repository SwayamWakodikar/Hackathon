"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconDeviceLaptop, IconClipboardCheck } from "@tabler/icons-react";
import Particles from "@/components/Particles";

const InterviewDashboard: React.FC = () => {
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
          <h1 className="text-5xl font-bold mb-10">
            <span className="text-blue-500 italic uppercase">AI Trainer</span>
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          ) : (
            <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl justify-center">
              <div className="flex-1 max-w-lg bg-transparent backdrop-blur-lg border hover:border-blue-500 rounded-3xl p-8 flex flex-col justify-between min-h-[500px] shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 group">
                <div className="space-y-6">
                  <div className="w-fit rounded-xl border border-blue-500/30 p-3.5 bg-blue-950/30 group-hover:border-blue-400 group-hover:bg-blue-900/40 transition-all">
                    <IconDeviceLaptop className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white tracking-tight">AI Interview</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Master your communication and technical skills with our real-time AI interviewer. Experience a realistic simulation with instant feedback on your answers and delivery.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/trainer/interview/ai-interview")}
                  className="w-full py-5 mt-8 rounded-xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
                >
                  Start Session
                </button>
              </div>
              <div className="flex-1 max-w-lg bg-transparent backdrop-blur-lg border hover:border-blue-500 rounded-3xl p-8 flex flex-col justify-between min-h-[500px] shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 group">
                <div className="space-y-6">
                  <div className="w-fit rounded-xl border border-blue-500/30 p-3.5 bg-blue-950/30 group-hover:border-blue-400 group-hover:bg-blue-900/40 transition-all">
                    <IconClipboardCheck className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white tracking-tight">Human Mock Interview</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Schedule a one-on-one mock interview with our expert human team. Get personalized coaching, detailed critiques, and real-world placement insights.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/trainer/interview/mock-interview ")}
                  className="w-full py-5 mt-8 rounded-xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
                >
                  Schedule Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InterviewDashboard;