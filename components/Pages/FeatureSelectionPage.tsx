"use client";
import React from "react";
import Link from "next/link";
import { FileText, Mic, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
// import NavBar from "../navbar"; // Assuming you want the navbar included
import LightRays from  "../LightRays"; // Keeping the background effect


const FeatureSelectionPage = () => {
  return (
    <>
      {/* Background Effects */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-[#030303]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={0.6}
          followMouse={true}
          mouseInfluence={0}
          noiseAmount={0.1}
          distortion={0}
          className="custom-rays"
        />
      </div>

      <div className="min-h-screen relative overflow-hidden">
        {/* <NavBar /> */}

        <main className="container mx-auto px-6 py-32 max-w-7xl">
          {/* --- HERO SECTION --- */}
          <div className="mb-24 text-center relative z-10">
            {/* Ghost Text Layer */}
            <h2 className="text-7xl md:text-[10rem] font-black text-white/3 absolute -top-20 left-1/2 -translate-x-1/2 uppercase italic select-none tracking-tighter w-full">
              DOMINATE
            </h2>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter relative z-10"
            >
              CHOOSE YOUR <span className="text-blue-500 font-black italic">ADVANTAGE</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-zinc-500 mt-6 max-w-2xl mx-auto font-medium uppercase tracking-[0.2em]"
            >
              Select a module to begin your professional transformation
            </motion.p>
          </div>

          {/* --- CARDS SECTION --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* CARD 1: RESUME MAKER AI */}
            <FeatureCard 
              title="RESUME MAKER AI"
              description="Construct elite, ATS-optimized professional narratives using advanced neural drafting."
              icon={<FileText className="w-8 h-8" />}
              href="/resume/home" 
              buttonText="Initialize Builder"
              delay={0.2}
            />

            {/* CARD 2: AI INTERVIEWS */}
            <FeatureCard 
              title="AI INTERVIEW COACH"
              description="Simulate high-pressure interview scenarios with real-time biometric and vocal feedback."
              icon={<Mic className="w-8 h-8" />}
              href="/trainer" 
              buttonText="Start Simulation"
              delay={0.4}
            />

          </div>
        </main>
      </div>
    </>
  );
};

// Reusable Card Component to keep code clean and matching exact styles
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  buttonText: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, href, buttonText, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.6 }}
      className="group relative flex flex-col justify-between p-12 rounded-[2.5rem] bg-[#080808] border border-white/5 transition-all duration-500 overflow-hidden hover:shadow-[0_0_50px_rgba(37,99,235,0.15)]"
    >
      {/* Blue Rainbow Border Effect */}
      <div className="absolute inset-0 rounded-[2.5rem] p-[1.5px] bg-linear-to-br from-blue-600 via-cyan-400 to-indigo-800 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
        <div className="h-full w-full bg-[#080808] rounded-[2.4rem]" />
      </div>

      {/* Internal Glow Blob */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full group-hover:bg-blue-600/10 transition-all duration-700" />

      <div className="relative z-10">
        {/* Icon Box */}
        <div className="mb-10 inline-flex rounded-2xl bg-zinc-900 border border-white/10 p-5 text-zinc-500 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-3xl font-black text-white mb-5 tracking-tight uppercase italic">
          {title}
        </h3>

        {/* Description */}
        <p className="text-zinc-500 text-base leading-relaxed mb-16 group-hover:text-zinc-300 transition-colors">
          {description}
        </p>
      </div>

      {/* Action Button */}
      <Link 
        href={href} 
        className="relative group/btn overflow-hidden w-full py-6 rounded-2xl bg-transparent border border-white/10 text-zinc-400 font-black text-[11px] tracking-[0.4em] uppercase transition-all duration-300 active:scale-95 hover:border-blue-500/50 block text-center"
      >
        <span className="relative z-20 flex items-center justify-center gap-3 transition-colors duration-700 group-hover/btn:text-white">
          {buttonText} <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </span>
        
        {/* Ripple Fill Animation */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div 
            className="w-0 h-0 bg-blue-600 rounded-full group-hover/btn:w-[160%] group-hover/btn:pt-[160%] transition-all duration-850" 
            style={{ transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)' }} 
          />
        </div>
        
        {/* Secondary Shadow Wave */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div 
            className="w-0 h-0 bg-indigo-500/20 rounded-full group-hover/btn:w-[200%] group-hover/btn:pt-[200%] transition-all duration-1100 delay-100"
            style={{ transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)' }} 
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureSelectionPage;