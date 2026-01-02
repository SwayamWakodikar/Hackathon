"use client";

import React from 'react';

interface StatsTabProps {
  title: string;
  value: string;
  footer: string;
}

const StatsTab: React.FC<StatsTabProps> = ({ title, value, footer }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Stats Card - Matches Resume Preview Card Dimensions */}
      <div className="bg-card rounded-2xl p-6 shadow-md w-56 h-80 border border-border overflow-hidden relative flex flex-col items-center justify-center text-center">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">
          {title}
        </div>
        
        <div className="text-4xl font-bold text-white mb-2">
          {value}
        </div>
        
        <div className="text-[10px] text-muted-foreground mt-4 px-2 italic">
          {footer}
        </div>

        {/* Decorative element to match the "tech" feel */}
        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-600/10 rounded-full blur-2xl" />
      </div>
      
      <button className="px-8 py-2 rounded-lg font-medium transition-all shadow-md w-full max-w-50 bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800">
        view report
      </button>
    </div>
  );
};

export default StatsTab;