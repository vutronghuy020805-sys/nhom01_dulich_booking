"use client";

import Image from "next/image";
import { ACTIVITY_CATEGORIES } from "@/data/activitiesData";

const ACTIVE_BG = "#F7F9C6";
const ACTIVE_TEXT = "#0f172a";
const INACTIVE_TEXT = "#334155";

export default function ActivitiesCategoryTabs({ activeCategory, onChange }) {
  return (
    <div
      className="backdrop-blur-sm rounded-full shadow-lg border px-2 py-2 flex items-center gap-1 overflow-x-auto"
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        borderColor: "rgba(255,255,255,0.6)",
      }}
    >
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
              (isActive ? "" : "hover:bg-slate-100")
            }
            style={{
              backgroundColor: isActive ? ACTIVE_BG : undefined,
              color: isActive ? ACTIVE_TEXT : INACTIVE_TEXT,
            }}
          >
            <span className="relative w-5 h-5 md:w-6 md:h-6 shrink-0">
              <Image
                src={cat.icon}
                alt=""
                fill
                sizes="24px"
                className="object-contain"
                style={{ filter: "brightness(0)" }}
              />
            </span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
