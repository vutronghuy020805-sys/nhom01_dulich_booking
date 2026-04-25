"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import ChatbotWindow from "./ChatbotWindow";
import { MASCOT_IMAGE } from "./mascot";

const POS_STORAGE_KEY = "viego-chatbot-launcher-pos";
const DRAG_CLICK_THRESHOLD = 6; // px — drag dưới ngưỡng vẫn coi là click

function readSavedPos() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(POS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.x === "number" && typeof parsed?.y === "number") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function savePos(x, y) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(POS_STORAGE_KEY, JSON.stringify({ x, y }));
  } catch {
    // localStorage disabled — ignore
  }
}

export default function ChatbotLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [launcherRect, setLauncherRect] = useState(null);

  const constraintsRef = useRef(null);
  const buttonRef = useRef(null);
  const dragMovedRef = useRef(false);

  // Vị trí kéo lưu dưới dạng offset so với điểm cố định bottom-right.
  // Dùng motion value để drag trực tiếp DOM, không re-render React mỗi pixel.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Khôi phục vị trí đã lưu sau khi mount để không gây hydration mismatch
  // (server luôn render ở vị trí mặc định).
  useEffect(() => {
    const saved = readSavedPos();
    if (saved) {
      x.set(saved.x);
      y.set(saved.y);
    }
  }, [x, y]);

  const captureRect = () => {
    if (!buttonRef.current) return;
    setLauncherRect(buttonRef.current.getBoundingClientRect());
  };

  const toggle = () => {
    // Nếu user vừa kéo (chứ không phải click), bỏ qua toggle.
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    setHintDismissed(true);
    setIsOpen((v) => {
      if (!v) captureRect();
      return !v;
    });
  };

  return (
    <>
      {/* Boundary cho drag — phủ full viewport, không nhận sự kiện chuột */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-58"
        aria-hidden
      />

      <AnimatePresence>
        {isOpen ? (
          <ChatbotWindow
            onClose={() => setIsOpen(false)}
            launcherRect={launcherRect}
          />
        ) : null}
      </AnimatePresence>

      {/* Hint bubble — chỉ hiện 1 lần ở vị trí mặc định; biến mất khi user
          tương tác lần đầu (click hoặc drag) */}
      <AnimatePresence>
        {!isOpen && !hintDismissed ? (
          <motion.button
            key="hint"
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ delay: 1.2, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-55 bottom-24 right-4 md:right-6 max-w-55 bg-white border border-slate-200 text-slate-700 text-xs md:text-sm px-3.5 py-2.5 rounded-2xl rounded-br-md shadow-lg text-left"
          >
            <span className="font-semibold text-sky-700">Trợ lý VieGo:</span>{" "}
            Cần giúp gì không? Bấm mình nhé!
            <span className="block absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        style={{ x, y }}
        onDragStart={() => {
          dragMovedRef.current = false;
          setHintDismissed(true);
        }}
        onDrag={(_, info) => {
          if (
            Math.abs(info.offset.x) > DRAG_CLICK_THRESHOLD ||
            Math.abs(info.offset.y) > DRAG_CLICK_THRESHOLD
          ) {
            dragMovedRef.current = true;
          }
        }}
        onDragEnd={() => {
          savePos(x.get(), y.get());
          // Nếu chat đang mở, recompute vị trí khung chat theo launcher mới.
          if (isOpen) captureRect();
        }}
        onClick={toggle}
        onDoubleClick={(e) => {
          // Double-click để reset về góc phải dưới mặc định.
          e.preventDefault();
          x.set(0);
          y.set(0);
          savePos(0, 0);
          if (isOpen) captureRect();
        }}
        aria-label={isOpen ? "Đóng trợ lý VieGo" : "Mở trợ lý VieGo (kéo để di chuyển)"}
        title="Bấm để mở chat · Kéo để di chuyển · Double-click để về góc"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        whileDrag={{ scale: 1.08, cursor: "grabbing" }}
        className="fixed z-60 bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-linear-to-br from-sky-500 to-sky-600 text-white shadow-xl border-2 border-white/60 flex items-center justify-center overflow-hidden cursor-grab touch-none select-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.svg
              key="close"
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </motion.svg>
          ) : (
            <motion.div
              key="mascot"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full pointer-events-none"
            >
              <Image
                src={MASCOT_IMAGE}
                alt=""
                width={64}
                height={64}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen ? (
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white pointer-events-none" />
        ) : null}

        {!isOpen ? (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-sky-300 pointer-events-none"
            animate={{ scale: [1, 1.25, 1.4], opacity: [0.6, 0.1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
      </motion.button>
    </>
  );
}
