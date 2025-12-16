import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
}

export default function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    once: false,
    margin: "-150px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
