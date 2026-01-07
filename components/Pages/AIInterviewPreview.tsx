"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  IconMicrophone, 
  IconVideo, 
  IconDeviceComputerCamera,
  IconPlayerPlay,
  IconCheck,
  IconAlertCircle
} from "@tabler/icons-react";
import Particles from "@/components/Particles";
import { useRouter } from "next/navigation";

const AIInterviewPreview: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    // Cleanup stream on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, cameraActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setPermissionGranted(true);
      setCameraActive(true);
      setMicActive(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      // Handle error state visually if needed
      setPermissionGranted(false);
    }
  };

  const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setCameraActive(false);
        setMicActive(false);
      }
  };

  return (
    <>
       {/* Background Particles */}
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

      <div className="flex-1 flex flex-col p-8 min-h-screen">
         {/* Title Section */}
        <div className="w-full max-w-7xl mx-auto mb-10">
             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                AI <span className="text-blue-500 italic">Interview Room</span>
            </h1>
            <p className="text-gray-400 text-lg">Check your audio and video settings before starting the AI-driven interview session.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto flex-1">
            
            {/* Left Column: Camera Preview */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="relative w-full aspect-video bg-blue-950/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group">
                    {cameraActive ? (
                         <video 
                            ref={videoRef} 
                            autoPlay 
                            muted 
                            playsInline
                            className="w-full h-full object-cover transform scale-x-[-1]" 
                         />
                    ) : (
                        <div className="flex flex-col items-center gap-4 text-gray-500">
                             <div className="p-6 rounded-full bg-blue-900/20 border border-blue-500/10">
                                <IconDeviceComputerCamera className="w-16 h-16 text-blue-500/50" />
                             </div>
                             <p>Camera is currently off</p>
                        </div>
                    )}

                    {/* Overlay Status info */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-1.5 ${cameraActive ? "bg-green-500/20 border-green-500/30 text-green-400" : "bg-red-500/20 border-red-500/30 text-red-400"}`}>
                             <div className={`w-2 h-2 rounded-full ${cameraActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                             Video
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-1.5 ${micActive ? "bg-green-500/20 border-green-500/30 text-green-400" : "bg-red-500/20 border-red-500/30 text-red-400"}`}>
                             <div className={`w-2 h-2 rounded-full ${micActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                             Audio
                        </span>
                    </div>
                </div>

                <div className="flex gap-4">
                     {!cameraActive ? (
                        <button 
                            onClick={startCamera}
                            className="flex-1 py-4 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-300 font-semibold hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                        >
                            <IconVideo className="w-5 h-5" /> Enable Camera & Mic
                        </button>
                     ) : (
                        <button 
                            onClick={stopCamera}
                            className="flex-1 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            Stop Preview
                        </button>
                     )}
                </div>
            </div>

            {/* Right Column: Instructions & Actions */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="bg-blue-950/20 backdrop-blur-md border border-blue-500/20 rounded-3xl p-8 shadow-xl h-full flex flex-col">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                         Ready to begin?
                    </h2>

                    <div className="space-y-6 flex-1">
                        <div className="flex gap-4 items-start">
                             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 font-bold border border-blue-500/30">1</div>
                             <div>
                                 <h3 className="text-white font-semibold mb-1">Check your environment</h3>
                                 <p className="text-gray-400 text-sm leading-relaxed">Ensure you are in a quiet, well-lit room with a stable internet connection for the best experience.</p>
                             </div>
                        </div>
                        <div className="flex gap-4 items-start">
                             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 font-bold border border-blue-500/30">2</div>
                             <div>
                                 <h3 className="text-white font-semibold mb-1">Permissions</h3>
                                 <p className="text-gray-400 text-sm leading-relaxed">Browser permissions for Camera and Microphone are mandatory to proceed with the AI assessment.</p>
                             </div>
                        </div>
                        <div className="flex gap-4 items-start">
                             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 font-bold border border-blue-500/30">3</div>
                             <div>
                                 <h3 className="text-white font-semibold mb-1">Be Natural</h3>
                                 <p className="text-gray-400 text-sm leading-relaxed">Speak clearly and naturally. The AI will analyze your communication skills, confidence, and technical accuracy.</p>
                             </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-blue-500/20">
                        {permissionGranted ? (
                             <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-4 flex items-center gap-3">
                                <IconCheck className="text-green-400 w-5 h-5" />
                                <span className="text-green-300 text-sm font-medium">System check passed. You are ready!</span>
                             </div>
                        ) : (
                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-4 flex items-center gap-3">
                                <IconAlertCircle className="text-yellow-400 w-5 h-5" />
                                <span className="text-yellow-300 text-sm font-medium">Please enable camera to continue.</span>
                            </div>
                        )}

                        <button 
                            disabled={!permissionGranted}
                            onClick={() => { /* Routing to actual interview session usually goes here */ }}
                            className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xl font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            Start Interview <IconPlayerPlay className="w-6 h-6 fill-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AIInterviewPreview;
