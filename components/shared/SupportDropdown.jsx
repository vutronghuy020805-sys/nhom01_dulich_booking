"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

function HelpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-slate-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 2" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-slate-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 5h16v11H8l-4 4z" />
      <text
        x="12"
        y="12.5"
        textAnchor="middle"
        fontSize="5"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
      >
        CS
      </text>
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-slate-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 7h12a4 4 0 0 1 4 4v8H4z" />
      <path d="M4 7V5a1 1 0 0 1 1-1h9" />
      <line x1="8" y1="11" x2="8" y2="15" />
      <line x1="16" y1="11" x2="20" y2="11" />
    </svg>
  );
}

function ChevronDownIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "w-3.5 h-3.5 transition-transform duration-200 " +
        (open ? "rotate-180" : "")
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const ITEMS = [
  { label: "Trợ giúp", href: "/help", icon: HelpIcon },
  { label: "Liên hệ chúng tôi", href: "/contact", icon: ContactIcon },
  { label: "Hộp thư của tôi", href: "/my-inbox", icon: InboxIcon },
];

export default function SupportDropdown({
  triggerClassName = "px-3 py-2 rounded-full transition-colors hover:bg-gray-100",
  align = "right",
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const alignClass = align === "left" ? "left-0" : "right-0";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={`${triggerClassName} inline-flex items-center gap-1`}
      >
        <span>Hỗ trợ</span>
        <ChevronDownIcon open={open} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className={`absolute top-full mt-2 ${alignClass} w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-50`}
        >
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-800 font-medium hover:bg-slate-100 focus:bg-slate-100 focus:outline-none transition-colors " +
                  (idx === 0 ? "bg-slate-100" : "")
                }
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
