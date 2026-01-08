"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MOCK_QUESTIONS_DATA } from '@/lib/questions'; //

const MOUTH_SHAPES_COUNT = 8;
const MAX_QUESTIONS = 5;
const MOUTH_UPDATE_SPEED = 300; 
const SILENCE_TIMEOUT = 7000; 

const AIInterviewPage = () => {
  const [mouthIndex, setMouthIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const questionIndexRef = useRef(0);
  const userAnswersRef = useRef<string[]>([]);
  const silenceCountRef = useRef(0);
  const mouthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  const techQuestions = MOCK_QUESTIONS_DATA.google.questions.slice(0, MAX_QUESTIONS - 1);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      stopMouthAnimation();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsStarted(true);
      handleAiTurn("Namaste. I am Akash, your interviewer. Let's start. Could you please introduce yourself?");
    } catch (err) {
      alert("Camera and Mic access are required.");
    }
  };

  const handleAiTurn = (text: string) => {
    window.speechSynthesis.cancel();
    setIsAiSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    const indianVoice = voices.find(v => v.lang === 'en-IN' || v.name.includes('India'));
    if (indianVoice) utterance.voice = indianVoice;
    utterance.rate = 0.82; 

    startMouthAnimation();
    utterance.onend = () => {
      stopMouthAnimation();
      setIsAiSpeaking(false);
      setTimeout(() => {
        if (questionIndexRef.current < MAX_QUESTIONS) startUserListening();
        else generateActualRatings();
      }, 1000);
    };
    window.speechSynthesis.speak(utterance);
  };

  const startUserListening = () => {
    if (isListeningRef.current || isAiSpeaking) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-IN';

    silenceTimerRef.current = setTimeout(() => {
      recognition.stop();
      proceedToNext("No response recorded.", true);
    }, SILENCE_TIMEOUT);

    recognition.onstart = () => { isListeningRef.current = true; };
    recognition.onend = () => { isListeningRef.current = false; };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.length > 1) proceedToNext(transcript, false);
    };
    try { recognition.start(); } catch (err) {}
  };

  const proceedToNext = (answer: string, isTimeout: boolean) => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    userAnswersRef.current.push(answer);
    if (isTimeout) silenceCountRef.current += 1;

    questionIndexRef.current += 1;
    const idx = questionIndexRef.current;

    if (idx < MAX_QUESTIONS) {
      const nextQ = techQuestions[idx - 1].question;
      const response = isTimeout ? "I didn't catch that." : "Understood.";
      handleAiTurn(`${response} Next, ${nextQ}`);
    } else {
      setTimeout(generateActualRatings, 1200);
    }
  };

  const startMouthAnimation = () => {
    mouthTimerRef.current = setInterval(() => {
      setMouthIndex(Math.floor(Math.random() * MOUTH_SHAPES_COUNT));
    }, MOUTH_UPDATE_SPEED);
  };

  const stopMouthAnimation = () => {
    if (mouthTimerRef.current) clearInterval(mouthTimerRef.current);
    setMouthIndex(0);
  };

  const generateActualRatings = () => {
    const answers = userAnswersRef.current;
    const avgLen = answers.reduce((a, b) => a + b.length, 0) / answers.length;
    
    // RESTORED 5-PARAMETER LOGIC
    const technical = Math.min(10, Math.floor(avgLen / 15) + 3);
    const confidence = Math.max(1, 10 - (silenceCountRef.current * 2));
    const clarity = answers.filter(a => a.length > 10).length >= 3 ? 9 : 6;
    const communication = Math.min(10, Math.floor(avgLen / 20) + 4);
    const depth = Math.min(10, Math.floor(avgLen / 25) + 3);

    const overall = ((technical + confidence + clarity + communication + depth) / 5).toFixed(1);

    setReport({ technical, confidence, clarity, communication, depth, overall });
  };

  if (report) return <ScoreCard report={report} />;

  return (
    <div className="relative min-h-screen bg-[#202124] flex items-center justify-center p-4">
      <div className="w-full h-full max-w-5xl aspect-video bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
        
        {!isStarted && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
            <button onClick={startInterview} className="px-12 py-5 bg-blue-600 rounded-full font-bold text-white hover:bg-blue-500 transition-all shadow-2xl">
              Start Interview with Akash
            </button>
          </div>
        )}

        {isStarted && (
          <div className="absolute bottom-8 right-8 w-56 h-56 rounded-3xl overflow-hidden border-2 border-blue-500/50 shadow-2xl bg-black z-50">
            <img src="/avatar/face_base.jpeg" className="absolute inset-0 w-full h-full object-cover" />
            {isAiSpeaking && (
              <img key={mouthIndex} src={`/avatar/mouth_${mouthIndex}.jpeg`} className="absolute inset-0 w-full h-full object-cover z-20" />
            )}
            <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">Akash (AI)</div>
          </div>
        )}
      </div>

      {isStarted && !isAiSpeaking && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-zinc-300 text-xs font-bold uppercase tracking-[0.2em]">Mic Active</span>
        </div>
      )}
    </div>
  );
};

const ScoreCard = ({ report }: { report: any }) => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center p-12 text-white">
    <h1 className="text-6xl font-black mb-16 text-blue-500 italic tracking-tighter">PERFORMANCE</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
      <StatBox label="Confidence" value={report.confidence} />
      <StatBox label="Technical" value={report.technical} />
      <StatBox label="Clarity" value={report.clarity} />
      <StatBox label="Communication" value={report.communication} />
      <StatBox label="Depth" value={report.depth} />
      <div className="bg-blue-600/20 p-8 rounded-3xl border border-blue-500/30 flex flex-col items-center justify-center">
        <p className="text-blue-400 uppercase text-[10px] font-bold mb-2">Overall Score</p>
        <p className="text-6xl font-black">{report.overall}</p>
      </div>
    </div>
  </div>
);

const StatBox = ({ label, value }: { label: string, value: number }) => (
  <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/10 text-center">
    <p className="text-zinc-500 uppercase text-[10px] font-bold mb-2">{label}</p>
    <p className="text-5xl font-mono">{value}/10</p>
  </div>
);

export default AIInterviewPage;