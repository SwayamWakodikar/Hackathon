import React, { useState, useEffect } from "react";

const HeroSection: React.FC = () => {
  return (
    <section className=" pt-20 pb-16 md:pt-32 md:pb-24 text-center min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4">
          Land Your Dream Job with <span className="text-primary">Vplace</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Expert resume analysis and AI-driven interview practice, structured
          for success.
        </p>

        <div className="mx-auto w-full max-w-2xl p-6 bg-card rounded-xl border border-border shadow-lg mb-8">
          <h3 className="text-xl font-bold text-card-foreground">
            Key Features at a Glance 
          </h3>
          <p className="text-muted-foreground text-sm mt-2">
            [Placeholder for the detailed Accordions component content.]
          </p>
        </div>

        <button
          className="inline-flex items-center px-8 py-3 text-lg font-semibold bg-primary text-primary-foreground rounded-lg transition duration-300 hover:opacity-90 shadow-xl"
          onClick={(e) => handleSmoothScroll(e, "ResumeBuilder")}
        >
          Explore Accelerators
          <svg
            className="w-5 h-5 ml-2"
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

// --- Card Helper Component (Used in Accelerator Section) ---
const Card = ({
  title,
  subtitle,
  iconClass,
}: {
  title: string;
  subtitle: string;
  iconClass: string;
}) => (
  <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border transition-transform duration-300 hover:shadow-primary/30 hover:-translate-y-1">
    <div className={`h-48 flex items-center justify-center p-6 ${iconClass}`}>
      <span className="text-6xl text-card-foreground/50 font-bold">VISUAL</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-card-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-4 text-xs font-semibold text-primary"></div>
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
