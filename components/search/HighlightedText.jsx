import { findMatchRanges } from "@/lib/searchUtils";

/**
 * Render text với phần match keyword được bôi vàng.
 * Props:
 * - text: string cần render
 * - query: từ khoá đang tìm
 * - className: optional wrapper className
 */
export default function HighlightedText({ text, query, className = "" }) {
  const raw = String(text ?? "");
  if (!raw) return null;

  const ranges = findMatchRanges(raw, query);
  if (ranges.length === 0) {
    return <span className={className}>{raw}</span>;
  }

  const parts = [];
  let cursor = 0;
  ranges.forEach((r, idx) => {
    if (cursor < r.start) parts.push(raw.slice(cursor, r.start));
    parts.push(
      <mark
        key={`h-${idx}-${r.start}`}
        className="bg-amber-200/80 text-slate-900 rounded px-0.5 font-semibold"
      >
        {raw.slice(r.start, r.end)}
      </mark>
    );
    cursor = r.end;
  });
  if (cursor < raw.length) parts.push(raw.slice(cursor));

  return <span className={className}>{parts}</span>;
}
