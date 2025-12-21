"use client";
import { ArrowRight, Sparkles, FileText, Zap, Shield } from 'lucide-react'
import { GlowingEffect } from './ui/glowing-effect';

import { motion } from "motion/react";
interface FeatureBlockProps {
  title: string;
  buttons: { label: string; action: string; style: "primary" | "secondary" }[];
  icon: string;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({
  title,
  buttons,
  icon,
}) => {
  // Determine the grid columns: 3 for resume, 2 for trainer
  const cols = buttons.length === 3 ? 3 : 2;

  return (
    <div  className="bg-card p-8 rounded-xl shadow-2xl border border-border">
      <div className="flex items-center mb-8">
        <span className="text-4xl mr-3">{icon}</span>
        <h2 className="text-3xl font-bold text-card-foreground">{title}</h2>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-4`}>
        {buttons.map((button, index) => (
          <a
            key={index}
            href={button.action}
            className={`flex flex-col items-center justify-center w-full min-h-25 p-4 rounded-lg font-medium text-center text-sm transition duration-200 
                  ${
                    button.style === "primary"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary/50"
                  }`}
          >
            <span>{button.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
export default function HeroSectionOne() {
  return (
    <div id='hero' className="relative flex items-center justify-center min-h-screen">
      <div className="px-4 py-10 md:py-20 mt-10 sm:mt-20 lg:mt-15 w-full">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-white">
          {"Land Your Dream Job with Vplace"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className={`mr-2 inline-block ${
                  word === "Vplace"
                    ? "text-7xl text-indigo-600 dark:text-indigo-400"
                    : ""
                }`}
              >
                {word}
                
              </motion.span>
            ))}
            
            
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="mt-5 relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          With AI, you can launch your website in hours, not days. Try our best
          in class, state of the art, cutting edge AI tools to get your website
          up.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
        </motion.div>
        <section id="features" className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
             
    </div>
    
  );
}
const handleSmoothScroll = (
  e: React.MouseEvent<HTMLButtonElement>,
  id: string
): void => {
  e.preventDefault();

  const anchor = document.getElementById(id);
  anchor?.scrollIntoView({ behavior: "smooth" });
};
const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI-Powered Generation',
      description: 'Get professionally crafted resumes using advanced AI algorithms'
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Multiple Templates',
      description: 'Choose from various professional resume templates'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Fast & Efficient',
      description: 'Generate a complete resume in under 2 minutes'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Privacy Focused',
      description: 'Your data is never stored or shared with third parties'
    }
  ]
