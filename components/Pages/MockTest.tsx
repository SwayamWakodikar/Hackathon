"use client";

import React, { useState, useEffect } from "react";
import {
  IconClipboardCheck,
  IconChevronRight,
  IconRefresh,
  IconTrophy,
  IconClock,
} from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { MOCK_QUESTIONS_DATA } from "@/lib/questions";

type Props = {
  companySlug: string;
};

const MockTestPage = ({ companySlug }: Props) => {
  const router = useRouter();

  const companyData = MOCK_QUESTIONS_DATA[companySlug];
  // Default to empty array if data not found, to prevent crash before the "Not Found" check
  const QUESTIONS = companyData?.questions ?? [];

  const [gameState, setGameState] = useState<
    "start" | "playing" | "finished"
  >("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleNext();
    }

    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startQuiz = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedOption(null);
  };

  const handleNext = () => {
    // Check answer safely
    if (
      QUESTIONS[currentQuestion] &&
      selectedOption === QUESTIONS[currentQuestion].answer
    ) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setGameState("finished");
    }
  };

  if (!companyData) {
    return (
      <div className="bg-transparent min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Assessment Not Found</h1>
          <button
            onClick={() => router.push("/trainer/mocktest")}
            className="text-blue-400 font-bold hover:underline"
          >
            Back to selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex-1 bg-transparent flex flex-col relative min-h-screen">
      <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10">
        <h1 className="text-4xl font-bold mb-8 text-left">
          <span className="text-blue-600">{companyData.name}</span> Mock Test
        </h1>
      </div>

      <div className="flex-1 flex items-start justify-start z-10">
        <div className="w-full max-w-4xl">
          {/* START SCREEN */}
          {gameState === "start" && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col items-start text-left shadow-2xl transition-all duration-300 hover:border-blue-500/40">
              <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                <IconClipboardCheck className="text-blue-500 w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Placement Readiness Test
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
                {companyData.description} This test simulates a real technical
                screening. You have 30 seconds per question.
              </p>
              <button
                onClick={startQuiz}
                className="px-10 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
              >
                Start Assessment{" "}
                <IconChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* PLAYING SCREEN */}
          {gameState === "playing" && QUESTIONS[currentQuestion] && (
            <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-white">
                    Your Assessment
                  </h2>
                  <p className="text-sm text-gray-500">
                    Question{" "}
                    <span className="text-blue-400 font-bold">
                      {currentQuestion + 1}
                    </span>{" "}
                    of {QUESTIONS.length}
                  </p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                  <IconClock
                    size={20}
                    className={
                      timeLeft < 10
                        ? "text-red-500 animate-pulse"
                        : "text-blue-400"
                    }
                  />
                  <span
                    className={`text-lg font-mono font-bold ${
                      timeLeft < 10 ? "text-red-500" : "text-white"
                    }`}
                  >
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </span>
                </div>
              </div>

              <Progress
                value={((currentQuestion + 1) / QUESTIONS.length) * 100}
                className="mb-10 h-1.5 bg-white/5"
              />

              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-white leading-snug">
                  {QUESTIONS[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUESTIONS[currentQuestion].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedOption(option)}
                      className={`p-5 rounded-xl border text-left transition-all duration-200 group flex items-center justify-between ${
                        selectedOption === option
                          ? "bg-blue-600/20 border-blue-500 text-white shadow-[0_0_30px_rgba(147,51,234,0.1)]"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-lg">{option}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    disabled={!selectedOption}
                    onClick={handleNext}
                    className={`px-12 py-4 rounded-xl font-bold transition-all ${
                      selectedOption
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/40"
                        : "bg-white/10 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === QUESTIONS.length - 1
                      ? "Submit Assessment"
                      : "Next Question"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FINISHED SCREEN */}
          {gameState === "finished" && (
            <div className="max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col items-start text-left shadow-2xl">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
                <IconTrophy className="text-yellow-500 w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Assessment Completed
              </h2>
              <div className="flex items-center gap-12 mb-10 w-full bg-white/5 p-8 rounded-2xl border border-white/10">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                    Final Score
                  </div>
                  <div className="text-5xl font-black text-blue-500">
                    {score}
                    <span className="text-2xl text-gray-600">
                      /{QUESTIONS.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={startQuiz}
                  className="flex-1 py-4 rounded-xl border border-blue-600/50 text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <IconRefresh size={20} /> Retake Assessment
                </button>
                <button
                  onClick={() => router.push("/trainer/mocktest")}
                  className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                >
                  Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockTestPage;
