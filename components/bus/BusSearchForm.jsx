"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BusLocationDropdown from "@/components/BusLocationDropdown";
import BusPassengerDropdown from "@/components/BusPassengerDropdown";
import FlightDatePicker from "@/components/FlightDatePicker";
import { busLocations } from "./busLocations";

function fmtVn(d) {
  return `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}`;
}

function toIso(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseIsoDate(s) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export default function BusSearchForm({ initialToId = null, initialFromId = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFromId = searchParams?.get("from") || null;
  const queryToId = searchParams?.get("to") || null;
  const queryDepartureDate = searchParams?.get("departureDate") || null;
  const queryReturnDate = searchParams?.get("returnDate") || null;
  const querySeats = searchParams?.get("seats") || null;

  const resolvedFromId = initialFromId || queryFromId;
  const resolvedToId = initialToId || queryToId;

  const initialTo = useMemo(
    () => (resolvedToId ? busLocations.find((l) => l.id === resolvedToId) || null : null),
    [resolvedToId]
  );
  const initialFrom = useMemo(
    () => (resolvedFromId ? busLocations.find((l) => l.id === resolvedFromId) || null : null),
    [resolvedFromId]
  );

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [activeField, setActiveField] = useState(null);
  const [query, setQuery] = useState("");
  const locationWrapperRef = useRef(null);

  const [departureDate, setDepartureDate] = useState(
    parseIsoDate(queryDepartureDate) || new Date(2026, 3, 16)
  );
  const [returnDate, setReturnDate] = useState(
    parseIsoDate(queryReturnDate) || new Date(2026, 3, 18)
  );
  const [openCalendarFor, setOpenCalendarFor] = useState(null);
  const dateWrapperRef = useRef(null);

  const [seats, setSeats] = useState(() => {
    const n = Number(querySeats);
    return Number.isFinite(n) && n > 0 && n <= 10 ? n : 1;
  });
  const [isSeatsOpen, setIsSeatsOpen] = useState(false);
  const seatsWrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(e.target)
      ) {
        setActiveField(null);
        setQuery("");
      }
      if (
        dateWrapperRef.current &&
        !dateWrapperRef.current.contains(e.target)
      ) {
        setOpenCalendarFor(null);
      }
      if (
        seatsWrapperRef.current &&
        !seatsWrapperRef.current.contains(e.target)
      ) {
        setIsSeatsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setActiveField(null);
    setQuery("");
  };

  const handleDateSelect = (date) => {
    if (openCalendarFor === "departure") {
      setDepartureDate(date);
      if (returnDate && date.getTime() > returnDate.getTime()) {
        setReturnDate(date);
      }
    } else if (openCalendarFor === "return") {
      setReturnDate(date);
    }
    setOpenCalendarFor(null);
  };

  const handleSelect = (item) => {
    if (activeField === "from") setFrom(item);
    else if (activeField === "to") setTo(item);
    setActiveField(null);
    setQuery("");
  };

  const q = query.trim().toLowerCase();
  const filtered =
    q === ""
      ? busLocations
      : busLocations.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.subtitle.toLowerCase().includes(q) ||
            b.typeLabel.toLowerCase().includes(q)
        );

  const renderLocationValue = (field, value) => {
    if (activeField === field) {
      return (
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Nhập thành phố, nhà ga hoặc các điểm khác"
          className="flex-1 min-w-0 bg-transparent outline-none text-slate-800 text-sm placeholder-slate-400"
        />
      );
    }
    if (value) {
      return (
        <span className="flex-1 min-w-0 font-semibold text-slate-900 text-sm truncate">
          {value.name}
        </span>
      );
    }
    return (
      <span className="flex-1 min-w-0 text-slate-400 text-sm truncate">
        Nhập thành phố, nhà ga hoặc các điểm khác
      </span>
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (from?.id) params.set("from", from.id);
    if (to?.id) params.set("to", to.id);
    params.set("departureDate", toIso(departureDate));
    if (returnDate) params.set("returnDate", toIso(returnDate));
    params.set("seats", String(seats));
    router.push(`/bus/search?${params.toString()}`);
  };

  const fieldClasses =
    "flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-colors cursor-pointer";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4">
        Xe buýt & Xe đưa đón
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-3 items-end mb-3"
        ref={locationWrapperRef}
      >
        <div className="min-w-0 relative">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">Từ</div>
          <button
            type="button"
            onClick={() => {
              setActiveField("from");
              setQuery("");
            }}
            className={fieldClasses + " w-full text-left"}
          >
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
              <rect x="4" y="5" width="16" height="12" rx="2" />
              <path d="M4 11h16" />
              <circle cx="8" cy="18" r="1.5" fill="currentColor" />
              <circle cx="16" cy="18" r="1.5" fill="currentColor" />
            </svg>
            {renderLocationValue("from", from)}
          </button>
          {activeField === "from" && (
            <div className="absolute top-full mt-2 left-0 z-40">
              <BusLocationDropdown items={filtered} onSelect={handleSelect} />
            </div>
          )}
        </div>

        <div className="hidden md:flex pb-1 justify-center items-end">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Đổi chiều"
            className="w-10 h-10 rounded-full bg-sky-50 border border-slate-200 flex items-center justify-center hover:bg-sky-100 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-sky-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 20l-4-4 4-4" />
            </svg>
          </button>
        </div>

        <div className="min-w-0 relative">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">Đến</div>
          <button
            type="button"
            onClick={() => {
              setActiveField("to");
              setQuery("");
            }}
            className={fieldClasses + " w-full text-left"}
          >
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
              <rect x="4" y="5" width="16" height="12" rx="2" />
              <path d="M4 11h16" />
              <circle cx="8" cy="18" r="1.5" fill="currentColor" />
              <circle cx="16" cy="18" r="1.5" fill="currentColor" />
            </svg>
            {renderLocationValue("to", to)}
          </button>
          {activeField === "to" && (
            <div className="absolute top-full mt-2 right-0 z-40">
              <BusLocationDropdown items={filtered} onSelect={handleSelect} />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
        <div className="relative" ref={dateWrapperRef}>
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Ngày khởi hành
          </div>
          <button
            type="button"
            onClick={() =>
              setOpenCalendarFor((v) => (v === "departure" ? null : "departure"))
            }
            className={fieldClasses + " w-full"}
          >
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
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 9h18" />
              <path d="M8 3v4M16 3v4" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">
              {fmtVn(departureDate)}
            </span>
          </button>
          {openCalendarFor === "departure" && (
            <div className="absolute top-full mt-2 left-0 z-40">
              <FlightDatePicker
                selected={departureDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Khứ hồi
          </div>
          <button
            type="button"
            onClick={() =>
              setOpenCalendarFor((v) => (v === "return" ? null : "return"))
            }
            className={fieldClasses + " w-full"}
          >
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
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 9h18" />
              <path d="M8 3v4M16 3v4" />
            </svg>
            <span
              className={
                "text-sm font-semibold " +
                (returnDate ? "text-slate-800" : "text-slate-400")
              }
            >
              {returnDate ? fmtVn(returnDate) : "Chọn ngày về"}
            </span>
          </button>
          {openCalendarFor === "return" && (
            <div className="absolute top-full mt-2 left-0 z-40">
              <FlightDatePicker
                selected={returnDate}
                minDate={departureDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        <div className="relative" ref={seatsWrapperRef}>
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Số ghế
          </div>
          <button
            type="button"
            onClick={() => setIsSeatsOpen((v) => !v)}
            className={fieldClasses + " w-full"}
          >
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
              <circle cx="12" cy="7" r="3" />
              <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">
              {seats}
            </span>
          </button>
          {isSeatsOpen && (
            <div className="absolute top-full mt-2 left-0 z-40">
              <BusPassengerDropdown
                selected={seats}
                onSelect={(n) => {
                  setSeats(n);
                  setIsSeatsOpen(false);
                }}
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-colors shadow"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
