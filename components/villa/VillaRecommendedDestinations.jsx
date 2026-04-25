"use client";

import { motion, useReducedMotion } from "motion/react";
import VillaDestinationCard from "./VillaDestinationCard";
import { villaRecommendedDestinations as defaultDestinations } from "@/data/villaRecommendedDestinations";
import { EASE_OUT } from "@/lib/motion";

export default function VillaRecommendedDestinations({
  title = "Các điểm đến được đề xuất",
  items = defaultDestinations,
  basePath = "/biet-thu",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-50 border-t border-slate-200 py-14 md:py-20">
      <div className="max-w-300 mx-auto px-4 lg:px-10">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center text-2xl md:text-3xl lg:text-[32px] font-bold text-slate-900"
        >
          {title}
        </motion.h2>

        <div className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((d) => (
            <VillaDestinationCard
              key={d.id}
              destination={d}
              basePath={basePath}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
