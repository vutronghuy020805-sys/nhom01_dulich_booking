"use client";

import { useState } from "react";

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function ProductGallery({ images = [], alt = "Ảnh sản phẩm" }) {
  const safeImages = images.filter(Boolean);
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (safeImages.length === 0) return null;

  const active = safeImages[activeIdx] || safeImages[0];

  return (
    <section className="space-y-3">
      <div className="relative aspect-[16/9] md:aspect-[16/8] rounded-2xl overflow-hidden bg-slate-100 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold shadow-sm border border-white/80"
        >
          <ExpandIcon />
          Xem ảnh lớn
        </button>
      </div>

      {safeImages.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`Ảnh ${idx + 1}`}
              className={
                "relative shrink-0 w-24 h-16 md:w-28 md:h-20 rounded-lg overflow-hidden border-2 transition-colors " +
                (idx === activeIdx
                  ? "border-sky-500"
                  : "border-transparent hover:border-slate-300")
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}

      {lightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow"
          >
            <CloseIcon />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active}
            alt={alt}
            className="max-h-[90vh] max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
