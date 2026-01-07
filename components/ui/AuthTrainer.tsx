import React from "react";
import { Mic, Code, ArrowRight } from "lucide-react";

const trainerFeatures = [
  { 
    icon: <Mic className="w-6 h-6" />, 
    title: "AI INTERVIEW COACH", 
    description: "Practice hyper-realistic mock interviews with instant AI feedback." 
  },
  { 
    icon: <Code className="w-6 h-6" />, 
    title: "MOCK TESTS", 
    description: "Battle-test your skills with hyper-curated coding round simulations." 
  },
];

const AuthTrainerSection: React.FC = () => {
  return (
    <section id="AI Trainer" className="relative py-34 px-6 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        
        {/* Vanguard Ghost Header */}
        <div className="mb-14 text-center relative">
          <h2 className="text-8xl md:text-9xl font-black text-white/5 absolute -top-16 left-1/2 -translate-x-1/2 uppercase italic select-none tracking-tighter">
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter relative z-10">
            AI-TRAINER <span className="text-blue-500 font-black italic"></span>
          </h2>
            <p className="text-lg text-zinc-500 mt-6 max-w-2xl mx-auto font-medium">
            Master your skills with AI-driven mock tests and human-based video conferencing interviews.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {trainerFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between p-12 rounded-[2.5rem] bg-[#080808] border border-white/5 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Blue Rainbow Border (Subtle) */}
              <div className="absolute inset-0 rounded-[2.5rem] p-[1.5px] bg-linear-to-br from-blue-600 via-cyan-400 to-indigo-800 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-full w-full bg-[#080808] rounded-[2.4rem]" />
              </div>

              {/* Static Internal Glow */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full group-hover:bg-blue-600/10 transition-all duration-700" />

              <div className="relative z-10">
                {/* Icon Box */}
                <div className="mb-12 inline-flex rounded-2xl bg-zinc-900 border border-white/10 p-5 text-zinc-500 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                  {feature.icon}
                </div>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tight uppercase italic">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-base leading-relaxed mb-16 group-hover:text-zinc-300 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* THE "HEAVY START" REVEAL RIPPLE BUTTON */}
              <button className="relative group/btn overflow-hidden w-full py-6 rounded-2xl bg-transparent border border-white/10 text-zinc-400 font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-300 active:scale-95 hover:border-blue-500/50">
                <a href="/trainer" className="relative z-20 flex items-center justify-center gap-2 transition-colors duration-700 group-hover/btn:text-white">
                  Begin Training <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                </a>
                
                {/* THE RIPPLE FILL: Slow start cubic-bezier */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div 
                    className="w-0 h-0 bg-blue-600 rounded-full group-hover/btn:w-[180%] group-hover/btn:pt-[180%] transition-all duration-[900ms]" 
                    style={{ transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)' }} 
                  />
                </div>
                
                {/* Secondary Shadow Wave */}
                <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                  <div 
                    className="w-0 h-0 bg-indigo-500/30 rounded-full group-hover/btn:w-[220%] group-hover/btn:pt-[220%] transition-all duration-[1200ms] delay-100"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)' }} 
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthTrainerSection;