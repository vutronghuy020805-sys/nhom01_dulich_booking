"use client";

import { motion, useReducedMotion } from "motion/react";

export default function BotTyping() {
  const reduceMotion = useReducedMotion();
  const dots = [0, 1, 2];

  return (
    <div className="flex items-center gap-1.5 px-3.5 py-3 bg-slate-100 rounded-2xl rounded-bl-md">
      {dots.map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-500"
          animate={reduceMotion ? undefined : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
