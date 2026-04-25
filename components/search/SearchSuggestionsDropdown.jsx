"use client";

import { useEffect, useRef, useState } from "react";
import HighlightedText from "./HighlightedText";

/**
 * Dropdown gợi ý cho ô search.
 * Props:
 * - items: [{ id, title, subtitle?, icon?, onSelect? }]
 * - query: từ khoá đang gõ (dùng để highlight)
 * - onSelect(item): callback khi user chọn 1 gợi ý
 * - open: boolean — control hiển thị
 * - onClose(): callback khi user click ngoài / ESC
 * - emptyMessage: text hiện khi list rỗng
 */
export default function SearchSuggestionsDropdown({
  items = [],
  query = "",
  onSelect,
  open,
  onClose,
  emptyMessage = "Không có gợi ý phù hợp.",
  anchorClassName = "absolute left-0 right-0 top-full mt-2 z-50",
}) {
  const wrapperRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveIdx(-1);
      return;
    }
    const onMouseDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(items.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        if (activeIdx >= 0 && items[activeIdx]) {
          e.preventDefault();
          onSelect?.(items[activeIdx]);
        }
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, items, activeIdx, onSelect, onClose]);

  if (!open) return null;

  return (
    <div ref={wrapperRef} className={anchorClassName}>
      <div
        role="listbox"
        className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden max-h-80 overflow-y-auto"
      >
        {items.length === 0 ? (
          <div className="px-4 py-3 text-sm text-slate-500">{emptyMessage}</div>
        ) : (
          <ul>
            {items.map((item, idx) => {
              const active = idx === activeIdx;
              return (
                <li key={item.id || `${idx}-${item.title}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => onSelect?.(item)}
                    className={
                      "w-full text-left flex items-start gap-3 px-4 py-2.5 transition-colors " +
                      (active ? "bg-slate-100" : "hover:bg-slate-50")
                    }
                  >
                    {item.icon ? (
                      <span className="shrink-0 mt-0.5 text-slate-500">
                        {item.icon}
                      </span>
                    ) : null}
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-slate-900 truncate">
                        <HighlightedText text={item.title} query={query} />
                      </span>
                      {item.subtitle ? (
                        <span className="block text-xs text-slate-500 truncate">
                          {item.subtitle}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
