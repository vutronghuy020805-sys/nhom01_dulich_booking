"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ACTIVITY_DESTINATIONS,
  activitiesData,
} from "@/data/activitiesData";
import SearchSuggestionsDropdown from "@/components/search/SearchSuggestionsDropdown";
import { matchScore, normalizeVi } from "@/lib/searchUtils";
import { useDebouncedValue } from "@/lib/useDebouncedValue";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-sky-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function SearchIcon({ className = "w-5 h-5 text-slate-400" }) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function ActivitiesSearchBar({
  destination,
  onDestinationChange,
  keyword,
  onKeywordChange,
  onSearch,
}) {
  const [open, setOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const wrapperRef = useRef(null);

  const debouncedKeyword = useDebouncedValue(keyword, 200);

  const suggestions = useMemo(() => {
    const q = normalizeVi(debouncedKeyword);
    if (!q) return [];
    const items = [];

    ACTIVITY_DESTINATIONS.forEach((d) => {
      const s = matchScore(d, q);
      if (s >= 0) {
        items.push({
          id: `dest-${d}`,
          title: d,
          subtitle: "Điểm đến",
          kind: "destination",
          value: d,
          score: s + 10,
        });
      }
    });

    activitiesData.forEach((a) => {
      const s = Math.max(
        matchScore(a.title, q),
        matchScore(a.location, q),
        matchScore(a.destination, q)
      );
      if (s >= 0) {
        items.push({
          id: `act-${a.id}`,
          title: a.title,
          subtitle: `${a.destination} · ${a.location}`,
          kind: "activity",
          value: a.title,
          score: s,
        });
      }
    });

    items.sort((a, b) => b.score - a.score);
    return items.slice(0, 8);
  }, [debouncedKeyword]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setSuggestOpen(false);
    if (onSearch) onSearch();
  };

  const handleSelectSuggestion = (item) => {
    setSuggestOpen(false);
    if (item.kind === "destination") {
      onDestinationChange(item.value);
      onKeywordChange("");
    } else {
      onKeywordChange(item.value);
    }
    if (onSearch) onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch gap-3 bg-transparent"
    >
      <div className="relative flex-1 min-w-0" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full bg-white/95 backdrop-blur rounded-full shadow-lg border border-white/60 px-5 py-3.5 flex items-center gap-3 text-left"
        >
          <PinIcon />
          <span
            className={
              "flex-1 truncate text-sm md:text-base " +
              (destination ? "font-semibold text-slate-900" : "text-slate-500")
            }
          >
            {destination || "Chọn một điểm đến"}
          </span>
          <svg
            viewBox="0 0 24 24"
            className={
              "w-4 h-4 text-slate-500 transition-transform " +
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
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <button
              type="button"
              onClick={() => {
                onDestinationChange("");
                setOpen(false);
              }}
              className={
                "w-full text-left px-5 py-3 text-sm hover:bg-slate-50 " +
                (!destination ? "font-semibold text-sky-600" : "text-slate-700")
              }
            >
              Tất cả điểm đến
            </button>
            <div className="max-h-64 overflow-auto">
              {ACTIVITY_DESTINATIONS.map((d) => {
                const isSel = d === destination;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      onDestinationChange(d);
                      setOpen(false);
                    }}
                    className={
                      "w-full text-left px-5 py-3 text-sm hover:bg-slate-50 " +
                      (isSel ? "font-semibold text-sky-600" : "text-slate-700")
                    }
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex-[1.5] min-w-0 flex items-stretch gap-3">
        <div className="relative flex-1 min-w-0">
          <div className="bg-white/95 backdrop-blur rounded-full shadow-lg border border-white/60 px-5 py-3.5 flex items-center gap-3">
            <SearchIcon />
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                onKeywordChange(e.target.value);
                setSuggestOpen(true);
              }}
              onFocus={() => setSuggestOpen(true)}
              placeholder="Tìm kiếm địa điểm hoặc hoạt động"
              className="flex-1 min-w-0 bg-transparent outline-none text-sm md:text-base text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <SearchSuggestionsDropdown
            items={suggestions}
            query={keyword}
            open={suggestOpen && keyword.trim().length > 0}
            onClose={() => setSuggestOpen(false)}
            onSelect={handleSelectSuggestion}
          />
        </div>
        <button
          type="submit"
          className="shrink-0 px-6 md:px-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm md:text-base transition-colors shadow-lg"
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
}
