"use client";

import { useEffect, useState } from "react";

function useCountdown(initialSeconds = 55 * 60) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function PaymentCountdownBanner({
  variant = "filled",
  initialSeconds = 55 * 60,
}) {
  const clock = useCountdown(initialSeconds);

  const isFilled = variant === "filled";
  const bg = isFilled ? "bg-sky-600 text-white" : "bg-sky-50 text-sky-700";
  const highlight = isFilled ? "text-emerald-300" : "text-emerald-600";

  return (
    <div
      className={`${bg} rounded-2xl px-5 py-4 flex items-center justify-center gap-3`}
    >
      <p className="text-sm md:text-base font-medium">
        Đừng lo lắng, giá vẫn giữ nguyên. Hoàn tất thanh toán của bạn bằng{" "}
        <span className={`font-bold ${highlight}`}>{clock}</span>
      </p>
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </div>
  );
}
