"use client";

import { motion } from "motion/react";

export default function SuggestionChips({ suggestions = [], onPick, disabled }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, idx) => (
        <motion.button
          key={s.id}
          type="button"
          onClick={() => onPick(s)}
          disabled={disabled}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="text-xs font-medium px-3 py-1.5 rounded-full bg-white text-sky-700 border border-sky-200 hover:bg-sky-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
}
