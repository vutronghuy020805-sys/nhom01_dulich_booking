"use client";

import { motion, useReducedMotion } from "motion/react";

// Hiệu ứng sáng tạo signature cho VieGo: tuyến đường từ sân bay về điểm đến
// với chấm sáng và icon xe chạy dọc theo nét đứt. Dùng SVG thuần nên nhẹ.
export default function RouteAnimation({ className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={"relative w-full " + className} aria-hidden>
      <svg
        viewBox="0 0 520 120"
        className="w-full h-auto"
        fill="none"
      >
        <defs>
          <linearGradient id="vg-route-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <filter id="vg-route-glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* nét đứt nền */}
        <path
          d="M 40 80 Q 200 10, 330 70 T 490 40"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />

        {/* nét sáng vẽ dần */}
        <motion.path
          d="M 40 80 Q 200 10, 330 70 T 490 40"
          stroke="url(#vg-route-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#vg-route-glow)"
          strokeDasharray="1 1"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 2.2,
            ease: [0.16, 1, 0.3, 1],
            delay: reduceMotion ? 0 : 0.3,
          }}
        />

        {/* điểm A — sân bay */}
        <g transform="translate(40 80)">
          <motion.circle
            r="10"
            fill="rgba(56,189,248,0.25)"
            animate={reduceMotion ? undefined : { r: [10, 18, 10], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity }}
          />
          <circle r="5" fill="#38bdf8" />
          <circle r="2" fill="#ffffff" />
        </g>

        {/* điểm B — điểm đến */}
        <g transform="translate(490 40)">
          <motion.circle
            r="10"
            fill="rgba(251,191,36,0.25)"
            animate={reduceMotion ? undefined : { r: [10, 18, 10], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 2.2,
              ease: "easeOut",
              repeat: Infinity,
              delay: 1.1,
            }}
          />
          <circle r="5" fill="#fbbf24" />
          <circle r="2" fill="#ffffff" />
        </g>

        {/* máy bay chạy dọc theo route */}
        {reduceMotion ? null : (
          <motion.g
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.6,
              times: [0, 0.08, 0.92, 1],
            }}
            style={{
              offsetPath: "path('M 40 80 Q 200 10, 330 70 T 490 40')",
              offsetRotate: "auto",
            }}
          >
            <g transform="translate(-12 -12)">
              <circle cx="12" cy="12" r="11" fill="#ffffff" />
              <path
                d="M12 5l2 5 5 1-4 2.5 1 5-4-3-4 3 1-5L5 11l5-1z"
                fill="#0284c7"
              />
            </g>
          </motion.g>
        )}
      </svg>
    </div>
  );
}
