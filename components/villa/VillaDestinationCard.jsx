"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function VillaDestinationCard({
  destination,
  basePath = "/biet-thu",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`${basePath}/search?destination=${encodeURIComponent(destination.name)}`}
        className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-shadow"
      >
        <div className="relative w-full aspect-square bg-slate-200 overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 320px"
            className={
              "object-cover " +
              (reduceMotion
                ? ""
                : "transition-transform duration-500 group-hover:scale-[1.06]")
            }
          />
        </div>
        <div className="px-4 py-3 md:px-5 md:py-4">
          <h3 className="text-sm md:text-base font-semibold text-slate-900">
            {destination.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
