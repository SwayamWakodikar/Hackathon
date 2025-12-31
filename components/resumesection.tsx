"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, FileText, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { 
    icon: <Sparkles className="w-6 h-6" />, 
    title: "AI GENERATION", 
    description: "Original content, professionally refined for elite roles." 
  },
  { 
    icon: <FileText className="h-6 w-6" />, 
    title: "MULTIPLE TEMPLATES", 
    description: "Choose from various professional resume templates." 
  },
  { 
    icon: <Zap className="h-6 w-6" />, 
    title: "FAST & EFFICIENT", 
    description: "Generate a complete resume in under 2 minutes." 
  },
];

const ResumeEnhancerSection: React.FC = () => {
  return (
    <section id="ResumeBuilder" className="relative py-40 bg-transparent px-6 ">
      <div className="container mx-auto max-w-7xl">
        
        {/* Vanguard Ghost Header - FIXED */}
        <div className="mb-28 text-center relative">
          <h2 className="text-7xl md:text-[10rem] font-black text-white/3 absolute -top-20 left-1/2 -translate-x-1/2 uppercase italic select-none tracking-tighter w-full">
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter relative z-10">
            RESUME <span className="text-blue-500 font-black italic">ENHANCER</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col justify-between p-12 rounded-[2.5rem] bg-[#080808] border border-white/5 transition-all duration-500 overflow-hidden"
            >
              {/* Blue Rainbow Border */}
              <div className="absolute inset-0 rounded-[2.5rem] p-[1.5px] bg-linear-to-br from-blue-600 via-cyan-400 to-indigo-800 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-full w-full bg-[#080808] rounded-[2.4rem]" />
              </div>

              <div className="relative z-10">
                <div className="mb-12 inline-flex rounded-2xl bg-zinc-900 border border-white/10 p-4 text-zinc-500 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase italic">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-12 group-hover:text-zinc-300 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* REDIRECT BUTTON - LINKED TO DASHBOARD */}
              <Link 
                href="/resume/home" 
                className="relative group/btn overflow-hidden w-full py-5 rounded-2xl bg-transparent border border-white/10 text-zinc-400 font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-300 active:scale-95 hover:border-blue-500/50 block text-center"
              >
                <span className="relative z-20 flex items-center justify-center gap-2 transition-colors duration-700 group-hover/btn:text-white">
                  Initialize <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </span>
                
                {/* RIPPLE FILL */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeEnhancerSection;