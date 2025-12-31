import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 text-center min-h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      
      {/* BACKGROUND LAYER 1: The "Deep Spotlight" */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#1e3a8a20_0%,transparent_50%)]" />
      
      {/* BACKGROUND LAYER 2: The Grid (Provides texture for Glass to blur) */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
          Next-Gen Career Accelerator
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
          Land Your Dream Job with <span className="text-blue-500">Vplace</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Expert resume analysis and AI-driven interview practice, structured
          for success.
        </p>

        {/* Feature Preview - Now with Glass Morphism to test contrast */}
        <div className="mx-auto w-full max-w-2xl p-8 bg-white/3 backdrop-blur-2xl rounded-[2rem] border border-white/8 shadow-2xl mb-12">
          <h3 className="text-xl font-bold text-white mb-2">
            Key Features at a Glance 
          </h3>
          <p className="text-zinc-500 text-sm">
            Automated Resume Scoring • Real-time Interview Feedback • Industry Specific Roadmap
          </p>
        </div>

        <button
          className="group relative inline-flex items-center px-10 py-4 text-lg font-bold bg-blue-600 text-white rounded-2xl transition-all duration-300 hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)]"
          onClick={(e) => handleSmoothScroll(e, "ResumeBuilder")}
        >
          Explore Accelerators
          <svg
            className="w-5 h-5 ml-3 transition-transform group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

// --- Updated Card Helper (Matching the Glass Theme) ---
const Card = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="bg-white/2 backdrop-blur-xl rounded-[2rem] border border-white/8 p-8 transition-all duration-500 hover:border-blue-500/40 hover:bg-white/4 group">
    <div className="h-48 flex items-center justify-center p-6 bg-zinc-900/50 rounded-2xl mb-6 border border-white/5 transition-colors group-hover:border-blue-500/20">
      <span className="text-4xl text-zinc-700 font-black tracking-tighter uppercase opacity-50">Visual</span>
    </div>
    <div className="">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

export default HeroSection;

const handleSmoothScroll = (
  e: React.MouseEvent<HTMLButtonElement>,
  id: string
): void => {
  e.preventDefault();
  const anchor = document.getElementById(id);
  anchor?.scrollIntoView({ behavior: "smooth" });
};