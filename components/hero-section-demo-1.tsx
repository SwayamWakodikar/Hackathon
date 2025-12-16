"use client";


import { motion } from "motion/react";

export default function HeroSectionOne() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      {/* <Navbar /> */}
      {/* <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div> */}
      <div className="px-4 py-10 md:py-20 mt-15">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-white">
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
            ? "text-9xl text-indigo-600 dark:text-indigo-400"
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
          className="mt-5 relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400 mb-60"
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
          <button className="w-60 h-16 text-2xl transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-300 hover:text-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
          onClick={(e) => handleSmoothScroll(e, "ResumeBuilder")}>
            Resume Builder
          </button>
          <button className="text-2xl w-60 h-16 transform rounded-lg border border-gray-300 bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-300 hover:text-black dark:border-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          onClick={(e) => handleSmoothScroll(e, "AI Trainer")}>
            AI Trainer
          </button>
        </motion.div>
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