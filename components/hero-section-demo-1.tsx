"use client";
import { ArrowRight, Sparkles, FileText, Zap, Shield } from 'lucide-react'
import { motion } from "framer-motion"; // Use framer-motion for stability

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'AI GENERATION',
    description: 'Professionally crafted resumes using advanced AI algorithms.'
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'MULTIPLE TEMPLATES',
    description: 'Choose from various high-end professional templates.'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'FAST & EFFICIENT',
    description: 'Generate a complete, elite resume in under 2 minutes.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'PRIVACY FOCUSED',
    description: 'Your data is secured with industrial-grade encryption.'
  }
]

export default function HeroSectionOne() {
  return (
    <div id='hero' className="relative flex items-center justify-center min-h-screen bg-transparent overflow-hidden">
      <div className="px-4 py-20 mt-10 w-full max-w-7xl z-10">
        
        {/* TYPOGRAPHY SECTION */}
        <div className="text-center mb-16 relative">
          <h2 className="text-8xl md:text-[12rem] font-black text-white/[0.01] absolute -top-24 left-1/2 -translate-x-1/2 uppercase italic select-none tracking-tighter">
            VPLACE
          </h2>
          
          <h1 className="relative z-10 mx-auto max-w-4xl text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            {"Land Your Dream Job with"
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
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-blue-500 font-black italic underline decoration-blue-500/30 underline-offset-8"
            >
              Vplace
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 mx-auto max-w-xl text-lg font-medium text-zinc-500 uppercase tracking-widest"
          >
            Deploy your professional identity with state-of-the-art AI tools.
          </motion.p>
        </div>

        {/* VANGUARD FEATURE CARDS */}
        <section id="features" className="mt-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + (index * 0.1) }}
                className="group relative p-8 rounded-[2rem] bg-[#080808] border border-white/5 transition-all duration-500 overflow-hidden cursor-default"
              >
                {/* BLUE RAINBOW BORDER */}
                <div className="absolute inset-0 rounded-[2rem] p-[1.5px] bg-gradient-to-br from-blue-600 via-cyan-400 to-indigo-800 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-full w-full bg-[#080808] rounded-[1.9rem]" />
                </div>

                {/* ATMOSPHERIC GLOW */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-xl bg-blue-600 p-3 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-white italic tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-sm text-zinc-500 leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA BUTTON - WITH HEAVY RIPPLE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="flex justify-center mt-20"
        >
          <button className="relative group/btn overflow-hidden px-12 py-5 rounded-2xl bg-transparent border border-white/10 text-zinc-400 font-black text-[12px] tracking-[0.5em] uppercase transition-all duration-300 active:scale-95 hover:border-blue-500/50">
            <span className="relative z-20 flex items-center justify-center gap-3 group-hover/btn:text-white transition-colors duration-700">
              Get Started <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
            </span>
            <div 
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <div 
                className="w-0 h-0 bg-blue-600 rounded-full group-hover/btn:w-[300%] group-hover/btn:pt-[300%] transition-all duration-[900ms]" 
                style={{ transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)' }} 
              />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}