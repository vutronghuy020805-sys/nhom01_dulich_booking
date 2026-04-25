"use client";

import { motion, useReducedMotion } from "motion/react";
import VillaBenefitItem from "./VillaBenefitItem";
import { villaBenefits as defaultBenefits } from "@/data/villaBenefits";
import { EASE_OUT } from "@/lib/motion";

export default function VillaBenefitsSection({
  title = "Tại sao bạn nên đặt biệt thự và căn hộ trên VieGo?",
  items = defaultBenefits,
}) {
  const reduceMotion = useReducedMotion();
  const topRow = items.slice(0, 3);
  const bottomRow = items.slice(3);

  return (
    <section className="bg-white py-14 md:py-20">
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

        {/* Hàng 1 — 3 item */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {topRow.map((b) => (
            <VillaBenefitItem key={b.id} benefit={b} />
          ))}
        </div>

        {/* Hàng 2 — 2 item, căn giữa */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 max-w-4xl mx-auto">
          {bottomRow.map((b) => (
            <VillaBenefitItem key={b.id} benefit={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
