"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import VillaHighlightCard from "./VillaHighlightCard";
import { villaHighlights as defaultItems } from "@/data/villaHighlights";
import { EASE_OUT } from "@/lib/motion";

function ChevronLeft({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function VillaHighlightsSection({
  title = "Bạn có thể đặt biệt thự trên VieGo!",
  description = "Bạn muốn có một kỳ nghỉ riêng tư với người thân yêu, hoặc với gia đình? Chúng tôi có rất nhiều lựa chọn biệt thự đáp ứng nhu cầu của bạn. Khám phá ngay!",
  items = defaultItems,
}) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const reduceMotion = useReducedMotion();

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    // Cuộn 1 "trang" theo chiều rộng card đầu tiên đang hiển thị.
    const first = el.querySelector("[data-villa-card]");
    const cardWidth = first ? first.getBoundingClientRect().width : el.clientWidth * 0.9;
    const gap = 24;
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-350 mx-auto px-4 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-900">
            {title}
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className="relative mt-10 md:mt-12">
          {/* Nút trái */}
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Xem biệt thự trước"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 items-center justify-center text-slate-700 hover:text-sky-600 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft />
          </button>

          {/* Track scroll-snap */}
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
            style={{ scrollPaddingInline: "1rem" }}
          >
            {items.map((v) => (
              <div
                key={v.id}
                data-villa-card
                className="snap-start shrink-0 w-[88%] sm:w-[60%] md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)]"
              >
                <VillaHighlightCard villa={v} />
              </div>
            ))}
          </div>

          {/* Nút phải */}
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Xem biệt thự tiếp theo"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 items-center justify-center text-slate-700 hover:text-sky-600 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight />
          </button>

          {/* Mobile: nút trái/phải gọn ở dưới */}
          <div className="md:hidden mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={!canPrev}
              aria-label="Xem biệt thự trước"
              className="w-10 h-10 rounded-full bg-white shadow border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={!canNext}
              aria-label="Xem biệt thự tiếp theo"
              className="w-10 h-10 rounded-full bg-white shadow border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
