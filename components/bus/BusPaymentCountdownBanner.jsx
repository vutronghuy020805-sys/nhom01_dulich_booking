"use client";

import { useEffect, useState } from "react";

const DEFAULT_DURATION_MS = 15 * 60 * 1000;

function formatClock(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function BusPaymentCountdownBanner({ tripId, durationMs = DEFAULT_DURATION_MS }) {
  const [secondsLeft, setSecondsLeft] = useState(Math.floor(durationMs / 1000));

  useEffect(() => {
    const storageKey = `bus-payment:expiresAt:${tripId || "default"}`;
    let expiresAt;
    try {
      const raw = sessionStorage.getItem(storageKey);
      const parsed = raw ? Number(raw) : NaN;
      if (Number.isFinite(parsed) && parsed > Date.now()) {
        expiresAt = parsed;
      } else {
        expiresAt = Date.now() + durationMs;
        sessionStorage.setItem(storageKey, String(expiresAt));
      }
    } catch {
      expiresAt = Date.now() + durationMs;
    }

    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tripId, durationMs]);

  const expired = secondsLeft <= 0;

  return (
    <div className="bg-sky-600 text-white rounded-2xl px-5 py-4 flex items-center justify-center gap-3">
      <p className="text-sm md:text-base font-medium text-center">
        {expired ? (
          <>Thời gian giữ giá đã hết. Vui lòng quay lại tìm kiếm để đặt lại chuyến xe.</>
        ) : (
          <>
            Đừng lo lắng, giá vẫn giữ nguyên. Hoàn tất thanh toán của bạn bằng{" "}
            <span className="font-bold text-emerald-300">
              {formatClock(secondsLeft)}
            </span>
          </>
        )}
      </p>
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </div>
  );
}
