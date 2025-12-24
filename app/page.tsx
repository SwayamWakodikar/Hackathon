'use client';
import React from 'react';
import Landingpage from '../components/Pages/landingpage';

const App = () => { 
  return (
    // We keep the main container transparent so the LandingPage's 
    // fixed background is always visible behind everything.
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white">
      
      <main>
        <Landingpage/>
      </main>

      {/* VANGUARD FOOTER: Minimalist, Transparent, and Italicized */}
      <footer className="relative z-10 py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] tracking-[0.5em] text-zinc-600 uppercase font-black italic">
              &copy; 2025 Vplace <span className="text-blue-500/40">//</span> All rights reserved.
            </p>
            
            <div className="flex gap-8">
              {['Twitter', 'Discord', 'GitHub'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-bold hover:text-blue-500 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;