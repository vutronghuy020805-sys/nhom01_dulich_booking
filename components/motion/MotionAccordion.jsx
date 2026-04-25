"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

function ChevronIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function MotionAccordion({ items = [], className = "" }) {
  const [openIdx, setOpenIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className={"divide-y divide-slate-200 " + className}>
      {items.map((item, idx) => {
        const open = openIdx === idx;
        return (
          <div key={item.id || idx}>
            <button
              type="button"
              onClick={() => setOpenIdx(open ? -1 : idx)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 py-4 md:py-5 text-left"
            >
              <span className="text-base md:text-lg font-semibold text-slate-900">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="shrink-0 text-slate-500"
              >
                <ChevronIcon />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="content"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 md:pb-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
