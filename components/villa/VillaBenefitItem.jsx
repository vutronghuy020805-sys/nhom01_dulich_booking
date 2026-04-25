"use client";

import { motion, useReducedMotion } from "motion/react";

// Bộ icon outline đồng nhất: viewBox 24x24, stroke 1.6, currentColor.
// Style nhất quán cho cả 5 benefit để section nhìn cohesive.
const iconStrokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function ChoicesIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 md:w-14 md:h-14" {...iconStrokeProps} aria-hidden>
      {/* Three overlapping cards */}
      <rect x="9" y="14" width="20" height="24" rx="3" fill="rgba(56,189,248,0.10)" />
      <rect x="14" y="10" width="20" height="24" rx="3" fill="rgba(56,189,248,0.18)" />
      <rect x="19" y="6" width="20" height="24" rx="3" fill="rgba(255,255,255,0.6)" />
      {/* Check mark on top card */}
      <path d="M25 18l3 3 6-6" stroke="currentColor" strokeWidth="2" />
      {/* Sparkle */}
      <path d="M40 30l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GuaranteeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 md:w-14 md:h-14" {...iconStrokeProps} aria-hidden>
      {/* Badge / shield */}
      <path
        d="M24 6l13 4v10c0 9-6 16-13 18-7-2-13-9-13-18V10z"
        fill="rgba(56,189,248,0.12)"
      />
      <path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="2.2" />
      {/* Key glint */}
      <circle cx="24" cy="13" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 md:w-14 md:h-14" {...iconStrokeProps} aria-hidden>
      {/* Back card */}
      <rect x="6" y="14" width="32" height="20" rx="3" fill="rgba(56,189,248,0.10)" />
      {/* Front card */}
      <rect x="12" y="18" width="30" height="20" rx="3" fill="rgba(255,255,255,0.7)" />
      <rect x="12" y="22" width="30" height="4" fill="currentColor" stroke="none" opacity="0.85" />
      <rect x="16" y="30" width="8" height="3" rx="0.6" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  );
}

function StayIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 md:w-14 md:h-14" {...iconStrokeProps} aria-hidden>
      {/* House */}
      <path
        d="M9 22l15-12 15 12v17a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z"
        fill="rgba(56,189,248,0.12)"
      />
      <path d="M9 22l15-12 15 12" />
      {/* People silhouettes */}
      <circle cx="20" cy="29" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="28" cy="29" r="2.4" fill="currentColor" stroke="none" />
      <path d="M16 38c0-2.6 1.8-4.4 4-4.4M28 33.6c2.2 0 4 1.8 4 4.4" />
      {/* Door */}
      <rect x="22" y="34" width="4" height="7" fill="rgba(56,189,248,0.4)" stroke="none" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 md:w-14 md:h-14" {...iconStrokeProps} aria-hidden>
      {/* Headphones band */}
      <path d="M11 26v-4a13 13 0 0 1 26 0v4" />
      {/* Earcups */}
      <rect x="8" y="24" width="8" height="11" rx="2" fill="rgba(56,189,248,0.18)" />
      <rect x="32" y="24" width="8" height="11" rx="2" fill="rgba(56,189,248,0.18)" />
      {/* Mic */}
      <path d="M36 35v3a4 4 0 0 1-4 4h-3" />
      <circle cx="27" cy="42" r="1.6" fill="currentColor" stroke="none" />
      {/* 24/7 chip */}
      <circle cx="38" cy="14" r="6" fill="rgba(251,191,36,0.95)" stroke="none" />
      <text
        x="38"
        y="16.5"
        textAnchor="middle"
        fontSize="6"
        fontWeight="800"
        fill="#0f172a"
        stroke="none"
        fontFamily="system-ui, sans-serif"
      >
        24/7
      </text>
    </svg>
  );
}

const ICONS = {
  choices: ChoicesIcon,
  guarantee: GuaranteeIcon,
  payment: PaymentIcon,
  stay: StayIcon,
  support: SupportIcon,
};

export default function VillaBenefitItem({ benefit }) {
  const reduceMotion = useReducedMotion();
  const Icon = ICONS[benefit.iconKey] || ChoicesIcon;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-4"
    >
      <div className="mb-5 md:mb-6 inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-sky-50 text-sky-600">
        <Icon />
      </div>
      <h3 className="text-base md:text-lg font-bold text-slate-900">
        {benefit.title}
      </h3>
      <p className="mt-2 text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-xs">
        {benefit.description}
      </p>
    </motion.div>
  );
}
