"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  villaInfoBlocks as defaultBlocks,
  villaInfoTitle as defaultTitle,
} from "@/data/villaInfoContent";
import { EASE_OUT } from "@/lib/motion";

function ChevronDown({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function VillaInfoBlock({ block }) {
  return (
    <div>
      <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
        {block.heading}
      </h3>
      <div className="mt-3 md:mt-4 space-y-4 text-sm md:text-[15px] text-slate-700 leading-relaxed">
        {block.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export default function VillaInfoContentSection({
  title = defaultTitle,
  blocks = defaultBlocks,
}) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const firstBlock = blocks[0];
  const restBlocks = blocks.slice(1);

  return (
    <section className="bg-white border-t border-slate-200 py-14 md:py-20">
      <div className="max-w-300 mx-auto px-4 lg:px-10">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center text-xl md:text-2xl lg:text-[28px] font-bold text-slate-900 leading-snug max-w-4xl mx-auto"
        >
          {title}
        </motion.h2>

        <div className="mt-10 md:mt-14 max-w-4xl mx-auto space-y-10 md:space-y-12">
          <VillaInfoBlock block={firstBlock} />

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key="rest"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <div className="space-y-10 md:space-y-12">
                  {restBlocks.map((block) => (
                    <VillaInfoBlock key={block.id} block={block} />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1.5 text-sm md:text-base font-bold text-slate-900 hover:text-sky-700 transition-colors"
            >
              {expanded ? "Thu gọn" : "Xem thêm"}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
                className="inline-flex"
              >
                <ChevronDown />
              </motion.span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
