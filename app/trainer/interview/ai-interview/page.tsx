"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURATION ---
const MOUTH_SHAPES_COUNT = 8; // MATCH THIS TO YOUR 8 PHOTOS (0-7)
const SENSITIVITY = 2.5;      // How much the mouth reacts
const MIN_VOLUME = 5;         // Ignore background static noise

const AIInterviewPage = () => {
  const [mouthIndex, setMouthIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  
  // Refs for persistent data without re-renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  // Fixed Line 16: Initialized to null to satisfy TS Strict Mode
  const animationFrameRef = useRef<number | null>(null);

  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      setIsStarted(true);
      loop();
    } catch (err) {
      console.error("Mic Error:", err);
      alert("Microphone access is required for the AI to 'see' your speech.");
    }
  };

  const loop = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

    // Map volume to 0-7 index
    if (average > MIN_VOLUME) {
      let index = Math.floor((average * SENSITIVITY / 100) * MOUTH_SHAPES_COUNT);
      index = Math.min(index, MOUTH_SHAPES_COUNT - 1); 
      setMouthIndex(index);
    } else {
      setMouthIndex(0); // Neutral / Closed
    }

    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    return () => {
      // Safe Cleanup
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
      <h1 className="text-white text-3xl font-bold mb-10 italic uppercase">
        AI <span className="text-blue-600">Interviewer</span>
      </h1>

      <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-blue-600/20 shadow-2xl">
        {/* The Friend's Face */}
        <img 
          src="/avatar/face_base.jpg" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="AI Base"
        />

        {/* The 8 Mouth Shapes (Dynamic) */}
        {isStarted && (
          <img 
            src={`/avatar/mouth_${mouthIndex}.png`} 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-75"
            alt="Mouth Overlay"
            // If image 4.png is missing, it won't crash the UI
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}

        {!isStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <button 
              onClick={startInterview}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Start Interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInterviewPage;