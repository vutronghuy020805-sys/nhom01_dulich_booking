"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MASCOT_IMAGE } from "./mascot";

// Một tin nhắn trong khung chat. Phân biệt rõ user vs bot qua màu + vị trí.
// `message.content` có thể là { paragraphs: [...], links: [...] } (từ FAQ)
// hoặc string (text user nhập).
export default function ChatMessage({ message }) {
  const isBot = message.role === "bot";

  const paragraphs = Array.isArray(message.content?.paragraphs)
    ? message.content.paragraphs
    : typeof message.content === "string"
    ? [message.content]
    : [];

  const links = Array.isArray(message.content?.links) ? message.content.links : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={
        "flex items-end gap-2 " +
        (isBot ? "justify-start" : "justify-end")
      }
    >
      {isBot ? (
        <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden bg-sky-100 border border-sky-200 self-start">
          <Image
            src={MASCOT_IMAGE}
            alt="VieGo bot"
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      <div
        className={
          "max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm " +
          (isBot
            ? "bg-slate-100 text-slate-800 rounded-2xl rounded-bl-md"
            : "bg-sky-500 text-white rounded-2xl rounded-br-md")
        }
      >
        {paragraphs.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            {p}
          </p>
        ))}

        {links.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-white text-sky-700 border border-sky-200 hover:bg-sky-50 transition-colors"
              >
                {l.label}
                <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
