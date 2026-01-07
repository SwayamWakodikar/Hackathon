"use client";
import { ArrowRight, Sparkles, FileText, Zap, Shield } from 'lucide-react'
import { motion } from "framer-motion";

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'AI GENERATION',
    description: 'Neural-drafted professional narratives built for elite placement.'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'ELITE TEMPLATES',
    description: 'ATS-optimized architectural layouts designed by recruiters.'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'INSTANT DEPLOY',
    description: 'Generate a complete, industry-ready profile in under 120 seconds.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'SECURE DATA',
    description: 'Industrial-grade encryption to protect your professional identity.'
  }
]

export default function HeroSectionOne() {
  return (
    <div id='hero' className="relative flex items-center justify-center min-h-screen bg-transparent overflow-hidden">
      <div className="px-4 w-full max-w-7xl z-10">
        
        {/* TYPOGRAPHY SECTION */}
        <div className="text-center mb-10 relative">
          <h2 className="text-6xl md:text-[12rem] font-black text-white/5 absolute -top-24 left-1/2 -translate-x-1/2 uppercase italic select-none tracking-tighter opacity-20">
            VPLACE
          </h2>
          
          <h1 className="relative z-10 mx-auto max-w-4xl text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            {"Engineer Your Future with"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            <br />
            {/* ENHANCED VPLACE TEXT */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1, 
                delay: 0.8,
                type: "spring",
                stiffness: 100 
              }}
              className="relative inline-block mt-2"
            >
              <span className="relative inline-block font-black italic uppercase tracking-tighter">
  <span
    className="
      relative z-10
      px-3
      text-transparent bg-clip-text
      bg-linear-to-r from-blue-400 via-blue-600 to-cyan-400
      drop-shadow-[0_0_30px_rgba(37,99,235,0.5)]
    "
    style={{ WebkitTextStroke: "0.5px transparent" }}
  >
    VPLACE
  </span>
</span>

              {/* Subtle underline glow */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute -bottom-2 left-0 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50"
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-6 mx-auto max-w-xl text-lg font-medium text-zinc-500 uppercase tracking-[0.3em]"
          >
            DEPLOY YOUR PROFESSIONAL IDENTITY WITH INDUSTRIAL AI.
          </motion.p>
        </div>

        <section id="features">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + (index * 0.1) }}
                className="group relative p-8 rounded-[2rem] bg-[#080808] border border-white/5 transition-all duration-500 overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 rounded-[2rem] p-[1.5px] bg-linear-to-br from-blue-600 via-cyan-400 to-indigo-800 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-full w-full bg-[#080808] rounded-[1.9rem]" />
                </div>
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-xl bg-blue-600 p-3 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-white italic tracking-tight uppercase">{feature.title}</h3>
                  <p className="mt-3 text-sm text-zinc-500 leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="flex justify-center mt-10"
        >
          <a href="/login" className="relative group/btn overflow-hidden px-12 py-5 rounded-2xl bg-transparent border border-white/10 text-zinc-400 font-black text-[12px] tracking-[0.5em] uppercase transition-all duration-300 active:scale-95 hover:border-blue-500/50">
            <span className="relative z-20 flex items-center justify-center gap-3 group-hover/btn:text-white transition-colors duration-700">
              Get Started <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
            </span>
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div 
                className="w-0 h-0 bg-blue-600 rounded-full group-hover/btn:w-[300%] group-hover/btn:pt-[300%] transition-all duration-900" 
                style={{ transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)' }} 
              />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}