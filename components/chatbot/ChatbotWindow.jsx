"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import ChatMessage from "./ChatMessage";
import SuggestionChips from "./SuggestionChips";
import BotTyping from "./BotTyping";
import { MASCOT_IMAGE } from "./mascot";
import {
  greetingMessage,
  quickSuggestions,
} from "@/data/chatbotFaq";
import { findTopicById, matchFaq } from "@/lib/chatbotMatcher";

const STORAGE_KEY = "viego-chatbot-history";

function createMessage(role, content) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
  };
}

function readHistory() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function SendIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

function CloseIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

// Tính vị trí khung chat dựa trên rect hiện tại của launcher.
// Ưu tiên: trên launcher; nếu không đủ chỗ thì xuống dưới. Căn cạnh phải/trái
// theo nửa màn hình mà launcher đang đứng.
function computeWindowStyle(launcherRect) {
  if (typeof window === "undefined" || !launcherRect) {
    return { bottom: "6rem", right: "1rem" };
  }
  const margin = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const winW = Math.min(vw * 0.92, 380);
  const winH = Math.min(vh * 0.8, 560);

  let top;
  if (launcherRect.top - winH - margin >= margin) {
    top = launcherRect.top - winH - margin;
  } else if (launcherRect.bottom + winH + margin <= vh - margin) {
    top = launcherRect.bottom + margin;
  } else {
    top = Math.max(margin, vh - winH - margin);
  }

  const launcherCenterX = launcherRect.left + launcherRect.width / 2;
  let left;
  if (launcherCenterX > vw / 2) {
    // Launcher ở nửa phải -> căn cạnh phải khung với cạnh phải launcher
    left = launcherRect.right - winW;
  } else {
    // Launcher ở nửa trái -> căn cạnh trái khung với cạnh trái launcher
    left = launcherRect.left;
  }
  left = Math.max(margin, Math.min(vw - winW - margin, left));

  return { top: `${top}px`, left: `${left}px` };
}

export default function ChatbotWindow({ onClose, launcherRect }) {
  const positionStyle = computeWindowStyle(launcherRect);
  const [messages, setMessages] = useState(() => {
    const saved = readHistory();
    if (saved && saved.length) return saved;
    return [createMessage("bot", greetingMessage)];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // localStorage full / disabled — bỏ qua, chat vẫn chạy trong session.
    }
  }, [messages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const remainingSuggestions = useMemo(() => {
    // Ẩn dần các suggestion đã hỏi để khung gọn hơn.
    const asked = new Set(
      messages
        .filter((m) => m.role === "bot" && m.content?.topicId)
        .map((m) => m.content.topicId)
    );
    return quickSuggestions.filter((s) => !asked.has(s.topicId)).slice(0, 6);
  }, [messages]);

  const sendQuestion = (text, opts = {}) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, createMessage("user", trimmed)]);
    setInput("");
    setIsTyping(true);

    const useTopic = opts.topicId ? findTopicById(opts.topicId) : null;
    const result = useTopic
      ? { topicId: useTopic.id, answer: useTopic.answer }
      : matchFaq(trimmed);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        createMessage("bot", { ...result.answer, topicId: result.topicId }),
      ]);
    }, 700 + Math.min(1200, trimmed.length * 15));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handlePick = (s) => sendQuestion(s.label, { topicId: s.topicId });

  const clearHistory = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsTyping(false);
    setMessages([createMessage("bot", greetingMessage)]);
  };

  return (
    <motion.div
      role="dialog"
      aria-label="Trợ lý VieGo"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={positionStyle}
      className="fixed z-60 w-[min(92vw,380px)] h-[min(80vh,560px)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-linear-to-br from-sky-500 to-sky-600 text-white px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 border border-white/40 shrink-0">
          <Image
            src={MASCOT_IMAGE}
            alt="Trợ lý VieGo"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight">Trợ lý VieGo</p>
          <p className="text-xs text-white/85 leading-tight flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Đang online · phản hồi nhanh
          </p>
        </div>
        <button
          type="button"
          onClick={clearHistory}
          className="text-xs font-semibold text-white/90 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
          title="Xoá lịch sử chat"
        >
          Xoá
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng chat"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          {isTyping ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden bg-sky-100 border border-sky-200">
                <Image
                  src={MASCOT_IMAGE}
                  alt=""
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
              <BotTyping />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {remainingSuggestions.length > 0 && !isTyping ? (
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 mb-2">
              Gợi ý nhanh
            </p>
            <SuggestionChips
              suggestions={remainingSuggestions}
              onPick={handlePick}
              disabled={isTyping}
            />
          </div>
        ) : null}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-200 bg-white p-3 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 px-3 py-2.5 text-sm rounded-full bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white text-slate-800 placeholder:text-slate-400"
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || isTyping}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Gửi"
        >
          <SendIcon />
        </motion.button>
      </form>
    </motion.div>
  );
}
