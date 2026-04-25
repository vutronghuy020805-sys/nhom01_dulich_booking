"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function VillaHighlightCard({ villa }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-100 overflow-hidden transition-shadow"
    >
      <div className="relative w-full aspect-[16/10] bg-slate-200 overflow-hidden">
        <Image
          src={villa.image}
          alt={villa.title}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 600px"
          className={
            "object-cover " +
            (reduceMotion
              ? ""
              : "transition-transform duration-500 group-hover:scale-[1.04]")
          }
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
          {villa.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{villa.location}</p>
      </div>
    </motion.article>
  );
}
