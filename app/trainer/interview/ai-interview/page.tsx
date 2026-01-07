"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURATION ---
const MOUTH_SHAPES_COUNT = 8; 
const SENSITIVITY = 2.5;      
const MIN_VOLUME = 5;         

const AIInterviewPage = () => {
  const [mouthIndex, setMouthIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [errorLog, setErrorLog] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const logError = (msg: string) => {
    setErrorLog(prev => Array.from(new Set([...prev, msg])));
  };

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
      logError("Microphone Access Denied");
    }
  };

  const loop = () => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

    if (average > MIN_VOLUME) {
      let index = Math.floor((average * SENSITIVITY / 100) * MOUTH_SHAPES_COUNT);
      index = Math.min(index, MOUTH_SHAPES_COUNT - 1); 
      setMouthIndex(index);
    } else {
      setMouthIndex(0); 
    }
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      
      {/* ERROR HUD */}
      {errorLog.length > 0 && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg max-w-md">
          <h2 className="text-red-500 font-bold mb-2">⚠️ Asset Loading Errors:</h2>
          <ul className="text-xs font-mono space-y-1">
            {errorLog.map((err, i) => <li key={i}>• {err}</li>)}
          </ul>
        </div>
      )}

      <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl bg-zinc-900">
        
        {/* BASE FACE */}
        <img 
          src="/avatar/face_base.jpeg" 
          alt="Base"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 10 }}
          onError={() => logError("Missing: /public/avatar/face_base.jpeg")}
        />

        {/* DYNAMIC MOUTH */}
        {isStarted && (
          <img 
            key={mouthIndex} 
            src={`/avatar/mouth_${mouthIndex}.jpeg`} 
            alt="Mouth"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 20, pointerEvents: 'none' }}
            onError={() => logError(`Missing: /public/avatar/mouth_${mouthIndex}.jpeg`)}
          />
        )}

        {!isStarted && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <button 
              onClick={startInterview}
              className="px-8 py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all"
            >
              Start Session
            </button>
          </div>
        )}
      </div>
      
      <p className="mt-4 text-zinc-500 font-mono text-xs">
        Mouth Frame: {mouthIndex} | Active: {isStarted ? "YES" : "NO"}
      </p>
    </div>
  );
};

export default AIInterviewPage;