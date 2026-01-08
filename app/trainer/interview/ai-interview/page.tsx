"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MOCK_QUESTIONS_DATA } from '@/lib/questions';
import Particles from "@/components/Particles";
import { IconMicrophone, IconPlayerPlay, IconChartBar, IconCpu, IconVideo, IconVideoOff, IconPhoneOff } from "@tabler/icons-react";

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

  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // 1. Initialize camera immediately for preview
    const initCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
        } catch (err) {
            console.error("Camera access denied:", err);
        }
    };
    initCamera();

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      stopMouthAnimation();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      window.speechSynthesis.cancel();
      // Cleanup stream on unmount
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Run only once on mount

  // Update video ref whenever stream changes (or ref re-attaches) for the preview box
  useEffect(() => {
     if (stream && videoRef.current) {
         videoRef.current.srcObject = stream;
     }
  }, [stream, isStarted]);


  const startInterview = async () => {
    // If we already have a stream, use it. Otherwise try to get it again.
    if (!stream) {
         try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
         } catch (err) {
             alert("Camera and Mic access are required.");
             return;
         }
    }
    
    setIsStarted(true);
    handleAiTurn("Namaste. I am Akash, your interviewer. Let's start. Could you please introduce yourself?");
  };

  const endInterview = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    if (stream) stream.getTracks().forEach(track => track.stop());
    window.location.reload();
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

  if (report) return <ScoreCard report={report} />;

  /* Camera Toggle Logic */
  const [isCameraOn, setIsCameraOn] = useState(true);

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#202124] overflow-hidden flex items-center justify-center p-4 lg:p-8">
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

      <div className="w-full max-w-7xl h-full max-h-[90vh] grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Video Feed & Avatar */}
        <div className="lg:col-span-2 relative h-full bg-blue-950/20 backdrop-blur-md rounded-[2rem] overflow-hidden border border-blue-500/20 shadow-2xl flex flex-col">
          <div className="relative flex-1 w-full bg-black/40">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* AI Avatar Overlay */}
            {isStarted && (
              <div className="absolute bottom-6 right-6 w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-2xl bg-black z-50 transition-all hover:scale-105 origin-bottom-right">
                <img src="/avatar/face_base.jpeg" className="absolute inset-0 w-full h-full object-cover" />
                {isAiSpeaking && (
                  <img key={mouthIndex} src={`/avatar/mouth_${mouthIndex}.jpeg`} className="absolute inset-0 w-full h-full object-cover z-20" />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                   <p className="text-white font-bold text-[10px] md:text-xs flex items-center gap-1">
                      <IconCpu className="w-3 h-3 text-blue-400" />
                      Akash (AI)
                   </p>
                </div>
              </div>
            )}
            
            {/* Listening Indicator */}
            {isStarted && !isAiSpeaking && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-blue-600/20 backdrop-blur-md px-6 py-2 rounded-full border border-blue-500/30 shadow-lg animate-pulse">
                  <IconMicrophone className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-100 text-xs font-bold uppercase tracking-widest">Listening...</span>
                </div>
            )}
            
            {!isCameraOn && (
               <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                   <IconVideoOff className="w-16 h-16 text-gray-600" />
               </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Instructions / Session Info */}
        <div className="h-full bg-blue-950/10 backdrop-blur-md rounded-[2rem] border border-blue-500/10 p-8 flex flex-col">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Interview <span className="text-blue-500">Session</span></h2>
                <p className="text-blue-200/60 text-sm">Follow instructions and speak clearly.</p>
            </div>

            <div className="flex-1 bg-black/20 rounded-2xl p-4 overflow-y-auto mb-6 custom-scrollbar border border-white/5 space-y-4">
                {!isStarted ? (
                    <div className="flex flex-col gap-4 text-gray-400 text-sm h-full">
                         {/* Camera Preview Box */}
                         <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-blue-500/30 shadow-inner relative group">
                            {stream && isCameraOn ? (
                                <video 
                                 autoPlay 
                                 playsInline 
                                 muted 
                                 className="w-full h-full object-cover scale-x-[-1]"
                                 ref={(ref) => {
                                     if (ref && stream) ref.srcObject = stream;
                                 }} 
                               />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                                    <IconVideoOff className="w-8 h-8 text-gray-600" />
                                </div>
                            )}
                            
                            {/* Camera Toggle Button */}
                            <button 
                                onClick={toggleCamera}
                                className="absolute bottom-2 left-2 p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/10"
                                title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
                            >
                                {isCameraOn ? <IconVideo className="w-4 h-4" /> : <IconVideoOff className="w-4 h-4 text-red-400" />}
                            </button>

                            <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-mono">
                                PREVIEW
                            </div>
                         </div>

                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                            <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                                <IconCpu className="w-4 h-4"/> Preparation
                            </h3>
                            <p>Ensure your camera and microphone are working. Find a quiet environment.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full justify-center items-center text-center opacity-70">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                            <IconChartBar className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-gray-400 text-sm">Analysis in progress...</p>
                        {userAnswersRef.current.map((_, i) => (
                             <div key={i} className="w-full h-1 bg-blue-500/20 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-blue-500 w-full animate-progress" />
                             </div>
                        ))}
                    </div>
                )}
            </div>

            {!isStarted && (
              <button 
                onClick={startInterview} 
                className="w-full group relative px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold text-white text-lg hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95"
              >
                <span className="flex items-center justify-center gap-3">
                  <IconPlayerPlay className="w-5 h-5 fill-current" />
                  Start Session
                </span>
              </button>
            )}

             {isStarted && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between">
                    <span className="text-red-400 text-sm font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        LIVE
                    </span>
                    <button 
                      onClick={endInterview}
                      className="group flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-lg shadow-red-500/20 active:scale-95"
                    >
                        <IconPhoneOff className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">End Call</span>
                    </button>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ report }: { report: any }) => (
  <div className="min-h-screen relative flex flex-col items-center justify-center p-8">
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

    <div className="w-full max-w-5xl bg-blue-950/20 backdrop-blur-xl border border-blue-500/20 rounded-[3rem] p-12 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white uppercase tracking-tight">
                Performance <span className="text-blue-500 italic block md:inline">Report</span>
            </h1>
            <p className="text-blue-200/60 text-lg">Here is a detailed breakdown of your interview performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <StatBox label="Confidence" value={report.confidence} icon={<IconChartBar />} delay={0} />
            <StatBox label="Technical" value={report.technical} icon={<IconCpu />} delay={100} />
            <StatBox label="Clarity" value={report.clarity} icon={<IconMicrophone />} delay={200} />
            <StatBox label="Communication" value={report.communication} icon={<IconChartBar />} delay={300} />
            <StatBox label="Depth" value={report.depth} icon={<IconCpu />} delay={400} />
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl border border-blue-400/30 flex flex-col items-center justify-center shadow-lg shadow-blue-900/40 scale-105 transform hover:-translate-y-1 transition-all">
                <p className="text-blue-100 uppercase text-xs font-bold mb-3 tracking-widest">Overall Score</p>
                <div className="text-7xl font-black text-white flex items-baseline gap-2">
                    {report.overall}
                    <span className="text-2xl text-blue-200 font-medium">/10</span>
                </div>
            </div>
        </div>
        
        <div className="mt-12 flex justify-center">
            <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
            >
                <IconPlayerPlay className="w-4 h-4" />
                Start New Interview
            </button>
        </div>
    </div>
  </div>
);

const StatBox = ({ label, value, icon, delay }: { label: string, value: number, icon?: React.ReactNode, delay: number }) => (
  <div 
    className="bg-blue-950/40 p-8 rounded-3xl border border-blue-500/10 text-center hover:border-blue-500/30 transition-all hover:-translate-y-1 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-center mb-4 text-blue-500/50 group-hover:text-blue-400 transition-colors">
        {icon && React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "w-8 h-8" })}
    </div>
    <p className="text-blue-200/60 uppercase text-xs font-bold mb-3 tracking-widest">{label}</p>
    <div className="text-5xl font-mono font-bold text-white group-hover:text-blue-200 transition-colors">
        {value}<span className="text-xl text-white/20">/10</span>
    </div>
    
     {/* Progress Bar */}
     <div className="w-full h-1.5 bg-blue-950 rounded-full mt-6 overflow-hidden">
        <div 
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${(value / 10) * 100}%` }}
        />
     </div>
  </div>
);

export default AIInterviewPage;