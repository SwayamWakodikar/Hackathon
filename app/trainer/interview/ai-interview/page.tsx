"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MOCK_QUESTIONS_DATA } from '@/lib/questions'; //

const MOUTH_SHAPES_COUNT = 8;
const MAX_QUESTIONS = 5;
const MOUTH_UPDATE_SPEED = 250; 

const AIInterviewPage = () => {
  const [mouthIndex, setMouthIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0); 
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // REFS: Keep data safe from re-renders and stale closures
  const questionIndexRef = useRef(0);
  const userAnswersRef = useRef<string[]>([]);
  const mouthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  // Load Google questions from your library
  const questions = MOCK_QUESTIONS_DATA.google.questions.slice(0, MAX_QUESTIONS);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      stopMouthAnimation();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const startInterview = () => {
    setIsStarted(true);
    const firstQ = `Namaste! I am your interviewer. Let's begin. Question 1: ${questions[0].question}`;
    handleAiTurn(firstQ);
  };

  const handleAiTurn = (text: string) => {
    setIsAiSpeaking(true);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Accent: Indian English
    const indianVoice = voices.find(v => v.lang === 'en-IN' || v.name.includes('India'));
    if (indianVoice) utterance.voice = indianVoice;
    
    utterance.rate = 0.85; 
    utterance.pitch = 1.0; 

    startMouthAnimation();

    utterance.onend = () => {
      stopMouthAnimation();
      setIsAiSpeaking(false);
      setTimeout(() => {
        if (questionIndexRef.current < MAX_QUESTIONS) {
          startUserListening();
        }
      }, 500);
    };

    synth.speak(utterance);
  };

  const startUserListening = () => {
    if (isListeningRef.current || isAiSpeaking) return; 

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-IN'; 
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => { isListeningRef.current = true; };
    recognition.onend = () => { isListeningRef.current = false; };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.length < 2) return;

      // STORE THE ANSWER FOR RATING
      userAnswersRef.current.push(transcript);

      questionIndexRef.current += 1;
      const nextIdx = questionIndexRef.current;
      setCurrentIdx(nextIdx);

      if (nextIdx < MAX_QUESTIONS) {
        const nextQ = questions[nextIdx].question;
        handleAiTurn(`Got it. Next question: ${nextQ}`);
      } else {
        setTimeout(generateActualRatings, 1500);
      }
    };

    recognition.onerror = (e: any) => {
      isListeningRef.current = false;
      if (e.error === 'no-speech' && !isAiSpeaking) {
        setTimeout(() => { if (!isListeningRef.current) startUserListening(); }, 600);
      }
    };

    try { recognition.start(); } catch (err) {}
  };

  const startMouthAnimation = () => {
    if (mouthTimerRef.current) clearInterval(mouthTimerRef.current);
    mouthTimerRef.current = setInterval(() => {
      setMouthIndex(Math.floor(Math.random() * MOUTH_SHAPES_COUNT));
    }, MOUTH_UPDATE_SPEED);
  };

  const stopMouthAnimation = () => {
    if (mouthTimerRef.current) {
      clearInterval(mouthTimerRef.current);
      mouthTimerRef.current = null;
    }
    setMouthIndex(0);
  };

  // --- ACTUAL RATING ENGINE ---
  const generateActualRatings = () => {
    const answers = userAnswersRef.current;
    
    // Logic: Calculate scores based on transcript depth and length
    const avgLength = answers.reduce((acc, val) => acc + val.length, 0) / answers.length;
    
    // Heuristic Scoring (Out of 10)
    const technical = Math.min(10, Math.floor(avgLength / 15) + 2);
    const confidence = answers.every(a => a.length > 10) ? 9 : 6;
    const clarity = answers.length >= MAX_QUESTIONS ? 8 : 5;
    const communication = Math.min(10, Math.floor(avgLength / 20) + 4);
    const depth = Math.min(10, Math.floor(avgLength / 25) + 3);

    const overall = ((technical + confidence + clarity + communication + depth) / 5).toFixed(1);

    setReport({
      confidence,
      technical,
      clarity,
      communication,
      depth,
      overall
    });
  };

  if (report) return <ScoreCard report={report} />;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl bg-zinc-900">
        <img src="/avatar/face_base.jpeg" className="absolute inset-0 w-full h-full object-cover z-10" />
        {isAiSpeaking && (
          <img key={mouthIndex} src={`/avatar/mouth_${mouthIndex}.jpeg`} className="absolute inset-0 w-full h-full object-cover z-20" />
        )}
        {!isStarted && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <button onClick={startInterview} className="px-8 py-4 bg-blue-600 rounded-xl font-bold hover:scale-105 transition-all">
              Begin Session
            </button>
          </div>
        )}
      </div>
      
      {isStarted && (
        <div className="mt-8 text-center">
          <p className={`font-mono uppercase tracking-widest text-sm ${!isAiSpeaking ? 'text-green-400 animate-pulse' : 'text-blue-400'}`}>
            {isAiSpeaking ? "Interviewer Speaking..." : "Ear Active: Answer Now"}
          </p>
          <p className="text-zinc-500 text-xs mt-2 uppercase tracking-[0.2em]">
            Step {currentIdx + 1} of {MAX_QUESTIONS}
          </p>
        </div>
      )}
    </div>
  );
};

const ScoreCard = ({ report }: { report: any }) => (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-10 text-white">
      <h1 className="text-4xl font-black mb-10 text-blue-500 italic">SESSION ASSESSMENT</h1>
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
      <div className="mt-12 text-center pt-8 border-t border-white/10 w-full max-w-md">
        <p className="text-7xl font-black text-blue-600">{report.overall}/10</p>
      </div>
    </div>
);

export default AIInterviewPage;