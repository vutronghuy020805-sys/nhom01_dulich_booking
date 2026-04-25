"use client";

import Image from "next/image";
import { ACTIVITY_CATEGORIES } from "@/data/activitiesData";

const ACTIVE_BG = "#F7F9C6";

export default function ActivitiesCategoryTabs({ activeCategory, onChange }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/60 px-2 py-2 flex items-center gap-1 overflow-x-auto">
      {ACTIVITY_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            aria-pressed={isActive}
            className={
              "shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors whitespace-nowrap " +
              (isActive
                ? "text-slate-900"
                : "text-slate-700 hover:bg-slate-50")
            }
            style={isActive ? { backgroundColor: ACTIVE_BG } : undefined}
          >
            <span className="relative w-5 h-5 md:w-6 md:h-6 shrink-0">
              <Image
                src={cat.icon}
                alt=""
                fill
                sizes="24px"
                className="object-contain brightness-0"
              />
            </span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
