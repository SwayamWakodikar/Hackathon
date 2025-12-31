"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  // 1.5 Second Focus Protocol
  const startHideTimer = useCallback(() => {
    return setTimeout(() => {
      setIsVisible(false);
    }, 1500); 
  }, []);

  useEffect(() => {
    // Lock to Dark Mode
    document.documentElement.classList.add("dark");

    let timer = startHideTimer();

    const handleInteraction = () => {
      setIsVisible(true);
      clearTimeout(timer);
      timer = startHideTimer();
    };

    const handleScroll = () => {
      // Always show at the absolute top of the page for branding
      if (window.scrollY < 20) {
        setIsVisible(true);
      } else {
        handleInteraction();
      }
    };

    // Listeners for any sign of life
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      clearTimeout(timer);
    };
  }, [startHideTimer]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const anchor = document.getElementById(id);
    anchor?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.nav
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            fixed top-6 left-1/2
            w-[90%] max-w-5xl
            backdrop-blur-2xl
            rounded-2xl
            flex items-center justify-between
            px-8 py-3
            z-100
            border border-white/10
            bg-black/60
            shadow-[0_20px_50px_rgba(0,0,0,0.8)]
            select-none
          "
        >
          {/* Logo */}
          <button
            onClick={(e) => handleSmoothScroll(e, 'hero')}
            className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600"
          >
            Vplace
          </button>

          {/* Center Nav */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
              onClick={(e) => handleSmoothScroll(e, 'ResumeBuilder')}
            >
              Resume Enhancer
            </button>
            <button
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
              onClick={(e) => handleSmoothScroll(e, 'AI Trainer')}
            >
              AI Trainer
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-2 rounded-xl bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all active:scale-95"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Register</span>
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default NavBar;