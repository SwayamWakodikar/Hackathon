"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MOCK_QUESTIONS_DATA } from '@/lib/questions'; //

// --- TUNED CONFIGURATION ---
const MOUTH_SHAPES_COUNT = 8;
const MAX_QUESTIONS = 5;
const SENSITIVITY = 1.1;        // LOWER: More natural movement
const MOUTH_UPDATE_SPEED = 140; // SLOWER: 7-8 frames per second

const AIInterviewPage = () => {
  const [mouthIndex, setMouthIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0); // For UI
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [report, setReport] = useState<any>(null);
  
  // Ref handles the logic to avoid "stale closures" (Getting stuck at Q2)
  const questionIndexRef = useRef(0);
  const mouthTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Google questions
  const questions = MOCK_QUESTIONS_DATA.google.questions.slice(0, MAX_QUESTIONS);

  // 1. START INTERVIEW
  const startInterview = () => {
    setIsStarted(true);
    const firstQ = `Welcome. Question 1: ${questions[0].question}`;
    handleAiTurn(firstQ);
  };

  // 2. AI TURN: Speaking + Sync
  const handleAiTurn = (text: string) => {
    setIsAiSpeaking(true);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower, more professional voice

    startMouthAnimation();

    utterance.onend = () => {
      stopMouthAnimation();
      setIsAiSpeaking(false);
      
      // Only listen if we have more questions to ask or the final one was just asked
      if (questionIndexRef.current < MAX_QUESTIONS) {
        startUserListening();
      }
    };

    synth.speak(utterance);
  };

  // 3. USER TURN: Listen for answer
  const startUserListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (event: any) => {
      // Increment the Ref immediately so the next turn is guaranteed to be Q+1
      questionIndexRef.current += 1;
      const nextIdx = questionIndexRef.current;
      setCurrentIdx(nextIdx);

      if (nextIdx < MAX_QUESTIONS) {
        const nextQ = questions[nextIdx].question;
        setTimeout(() => {
          handleAiTurn(`Got it. Question ${nextIdx + 1}: ${nextQ}`);
        }, 1000);
      } else {
        // Finished all questions
        setTimeout(generateFinalReport, 1500);
      }
    };
  };

  // 4. SMOOTH SYNC LOGIC
  const startMouthAnimation = () => {
    mouthTimerRef.current = setInterval(() => {
      // Logic: Pick a random frame but keep it low for "calm" speech
      const frame = Math.floor(Math.random() * (MOUTH_SHAPES_COUNT / SENSITIVITY));
      setMouthIndex(frame);
    }, MOUTH_UPDATE_SPEED);
  };

  const stopMouthAnimation = () => {
    if (mouthTimerRef.current) clearInterval(mouthTimerRef.current);
    setMouthIndex(0);
  };

  const generateFinalReport = () => {
    setReport({ confidence: 8, technical: 9, clarity: 7, depth: 8, communication: 9, overall: 8.2 });
  };

  if (report) return <ScoreCard report={report} />;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl bg-zinc-900">
        <img src="/avatar/face_base.jpeg" className="absolute inset-0 w-full h-full object-cover z-10" alt="Avatar" />
        {isAiSpeaking && (
          <img key={mouthIndex} src={`/avatar/mouth_${mouthIndex}.jpeg`} className="absolute inset-0 w-full h-full object-cover z-20" alt="Mouth" />
        )}
        {!isStarted && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <button onClick={startInterview} className="px-8 py-4 bg-blue-600 rounded-xl font-bold">Start Session</button>
          </div>
        )}
      </div>
      
      {isStarted && (
        <div className="mt-8 text-center">
          <p className="text-blue-400 font-mono uppercase tracking-widest text-sm animate-pulse">
            {isAiSpeaking ? "Interviewer Speaking..." : "Listening..."}
          </p>
          <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest">
            Question {currentIdx + 1} of {MAX_QUESTIONS}
          </p>
        </div>
      )}
    </div>
  );
};

// --- SCORECARD COMPONENT (Rating out of 10) ---
const ScoreCard = ({ report }: { report: any }) => (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-10 text-white">
      <h1 className="text-4xl font-black mb-10 text-blue-500 italic tracking-tighter">REPORT CARD</h1>
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
        {Object.entries(report).map(([key, val]) => (
          key !== 'overall' && (
            <div key={key} className="bg-zinc-900 p-6 rounded-2xl border border-white/5">
              <p className="text-zinc-500 uppercase text-[10px] font-bold mb-1 tracking-widest">{key}</p>
              <p className="text-3xl font-mono">{val as number}/10</p>
            </div>
          )
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-zinc-500 uppercase text-xs tracking-[0.3em] mb-2">Final Evaluation</p>
        <p className="text-7xl font-black text-blue-600">{report.overall}/10</p>
      </div>
    </div>
);

export default AIInterviewPage;