"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    IconBrain,
    IconPlayerPlay,
    IconArrowRight,
    IconRefresh,
    IconLoader2,
    IconCheck
} from "@tabler/icons-react";
import { getQuestions } from "./actions";
import { InterviewQuestion } from "@/lib/interview-questions";
import Particles from "@/components/Particles";

export default function AIInterviewPage() {
    const [topic, setTopic] = useState("");
    const [level, setLevel] = useState("Intermediate");
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);

    const handleStart = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        try {
            const q = await getQuestions(topic, level);
            setQuestions(q);
            setCurrentIndex(0);
            setStarted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setStarted(false);
        setQuestions([]);
        setCurrentIndex(0);
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev: number) => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev: number) => prev - 1);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
            <div className="fixed inset-0 -z-10 h-full w-full">
                <Particles
                    particleColors={["#ffffff", "#3b82f6"]}
                    particleCount={100}
                    particleSpread={10}
                    speed={0.05}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10 flex flex-col min-h-screen justify-center">

                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                            <IconBrain className="w-4 h-4" />
                            <span>AI Powered Interviewer</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 mb-6 drop-shadow-sm">
                            Tech Interview Coach
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Generate comprehensive interview questions for any technical role and master your skills with instant AI feedback logic.
                        </p>
                    </motion.div>
                </header>

                <AnimatePresence mode="wait">
                    {!started ? (
                        <motion.div
                            key="setup"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl ring-1 ring-white/5"
                        >
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Focus Area / Role</label>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g. React Native, Python Backend, System Design"
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Difficulty Level</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Beginner", "Intermediate", "Advanced"].map((l) => (
                                            <button
                                                key={l}
                                                onClick={() => setLevel(l)}
                                                className={`px-4 py-3 rounded-xl border font-medium transition-all ${level === l
                                                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                                                    : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-white"
                                                    }`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleStart}
                                    disabled={loading || !topic}
                                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <IconLoader2 className="animate-spin w-5 h-5" />
                                            Generating Questions...
                                        </>
                                    ) : (
                                        <>
                                            <IconPlayerPlay className="w-5 h-5" />
                                            Start Interview Session
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="interview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-3xl mx-auto"
                        >
                            {/* Progress Bar */}
                            <div className="mb-8 flex items-center gap-4">
                                <span className="text-sm font-medium text-blue-400 px-3 py-1 bg-blue-950/50 rounded-lg border border-blue-900/50">
                                    Question {currentIndex + 1} / {questions.length}
                                </span>
                                <div className="h-2 flex-grow bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>

                            {/* Question Card */}
                            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl min-h-[400px] flex flex-col relative overflow-hidden">
                                {/* Background accent */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <div className="flex-grow flex flex-col justify-center">
                                    <h3 className="text-xl text-slate-400 mb-6 font-medium tracking-wide uppercase">
                                        {topic} &bull; {level}
                                    </h3>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="mb-8"
                                        >
                                            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-6">
                                                {questions[currentIndex]?.question}
                                            </h2>

                                            {questions[currentIndex]?.context && (
                                                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-slate-300 text-lg italic">
                                                    " {questions[currentIndex]?.context} "
                                                </div>
                                            )}

                                            <div className="mt-6 flex items-center gap-2 text-indigo-300">
                                                <span className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md text-sm font-semibold">
                                                    {questions[currentIndex]?.difficulty || "Normal"} Difficulty
                                                </span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="flex items-center justify-between pt-8 border-t border-slate-800/50 mt-auto">
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors font-medium flex items-center gap-2"
                                    >
                                        <IconRefresh className="w-5 h-5" />
                                        <span>New Session</span>
                                    </button>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={prevQuestion}
                                            disabled={currentIndex === 0}
                                            className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-medium disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={nextQuestion}
                                            disabled={currentIndex === questions.length - 1}
                                            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50 disabled:bg-slate-700 disabled:shadow-none transition-all"
                                        >
                                            <span>Next Question</span>
                                            <IconArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
