"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HotelDatePicker from "@/components/HotelDatePicker";
import GuestRoomDropdown from "@/components/GuestRoomDropdown";
import { vietnamDestinations } from "@/components/shared/hotelSearchData";

const VN_DAYS_SHORT = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

function formatLongDate(d) {
  if (!d) return "";
  return `${VN_DAYS_SHORT[d.getDay()]}, ${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}`;
}

function addDays(date, n) {
  const out = new Date(date);
  out.setDate(out.getDate() + n);
  return out;
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <polyline points="3 3 3 8 8 8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
function CalendarIcon({ className = "w-5 h-5 text-blue-600" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      <path d="M14.5 6.5l1 1M16 9l1.2.4" />
    </svg>
  );
}
function GuestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  );
}
function HotelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="10" width="18" height="11" rx="1.5" />
      <path d="M3 10l9-6 9 6" />
      <path d="M9 21v-5h6v5" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function VillaSearchCard({
  basePath = "/biet-thu",
  placeholder = "Thành phố, căn hộ, biệt thự, hoặc nơi đến",
}) {
  const router = useRouter();

  const [locationQuery, setLocationQuery] = useState("");
  const [isLocOpen, setIsLocOpen] = useState(false);
  const locWrapperRef = useRef(null);

  // Mặc định check-in hôm nay, 1 đêm.
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [checkIn, setCheckIn] = useState(today);
  const [nights, setNights] = useState(1);
  const checkOut = useMemo(() => addDays(checkIn, nights), [checkIn, nights]);

  const [isDateOpen, setIsDateOpen] = useState(false);
  const dateWrapperRef = useRef(null);
  const [isNightsOpen, setIsNightsOpen] = useState(false);
  const nightsWrapperRef = useRef(null);

  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const guestWrapperRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (locWrapperRef.current && !locWrapperRef.current.contains(e.target)) {
        setIsLocOpen(false);
      }
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(e.target)) {
        setIsDateOpen(false);
      }
      if (nightsWrapperRef.current && !nightsWrapperRef.current.contains(e.target)) {
        setIsNightsOpen(false);
      }
      if (guestWrapperRef.current && !guestWrapperRef.current.contains(e.target)) {
        setIsGuestOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filteredDestinations = useMemo(() => {
    const q = locationQuery.trim().toLowerCase();
    if (!q) return vietnamDestinations;
    return vietnamDestinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q)
    );
  }, [locationQuery]);

  const guestLabel = `${guests.adults} người lớn, ${guests.children} Trẻ em, ${guests.rooms} phòng`;
  const nightsOptions = [1, 2, 3, 4, 5, 6, 7, 10, 14];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (locationQuery.trim()) params.set("destination", locationQuery.trim());
    params.set("checkIn", checkIn.toISOString().slice(0, 10));
    params.set("nights", String(nights));
    params.set("adults", String(guests.adults));
    params.set("children", String(guests.children));
    params.set("rooms", String(guests.rooms));
    router.push(`${basePath}/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header nhỏ */}
      <div className="flex items-center gap-2 px-5 md:px-6 pt-5 pb-3 border-b border-slate-100">
        <HistoryIcon />
        <span className="text-sm md:text-base font-semibold text-sky-700">
          Các nơi lưu trú vừa xem
        </span>
      </div>

      <div className="p-5 md:p-6 space-y-4">
        {/* Điểm đến */}
        <div ref={locWrapperRef} className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Thành phố, điểm đến, hoặc tên nơi lưu trú
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <PinIcon />
            </span>
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                setIsLocOpen(true);
              }}
              onFocus={() => setIsLocOpen(true)}
              placeholder={placeholder}
              className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {isLocOpen ? (
            <div className="absolute top-full left-0 right-0 md:right-auto md:w-110 mt-2 bg-white rounded-2xl shadow-2xl z-50 border border-slate-100 overflow-hidden">
              <div className="p-3 max-h-90 overflow-y-auto">
                <h3 className="font-bold text-slate-900 px-2 mb-2 text-sm">
                  Điểm đến phổ biến
                </h3>
                {filteredDestinations.length === 0 ? (
                  <div className="text-slate-500 text-sm text-center py-8">
                    Không tìm thấy kết quả phù hợp
                  </div>
                ) : (
                  filteredDestinations.map((d) => (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => {
                        setLocationQuery(d.name);
                        setIsLocOpen(false);
                      }}
                      className="w-full flex justify-between items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900">{d.name}</div>
                        <div className="text-sm text-slate-500 truncate">{d.subtitle}</div>
                      </div>
                      <span className="shrink-0 bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {d.typeLabel}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Nhận phòng | Số đêm | Trả phòng */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Nhận phòng */}
          <div ref={dateWrapperRef} className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nhận phòng:
            </label>
            <button
              type="button"
              onClick={() => setIsDateOpen((v) => !v)}
              className="w-full flex items-center gap-3 pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-700 text-left hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 relative"
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <CalendarIcon />
              </span>
              <span className="truncate font-medium">{formatLongDate(checkIn)}</span>
            </button>
            {isDateOpen ? (
              <div className="absolute top-full left-0 mt-2 z-50">
                <HotelDatePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onChange={({ checkIn: ci, checkOut: co }) => {
                    if (ci) setCheckIn(ci);
                    if (ci && co) {
                      const msPerDay = 1000 * 60 * 60 * 24;
                      const n = Math.max(
                        1,
                        Math.round((co - ci) / msPerDay)
                      );
                      setNights(n);
                      setIsDateOpen(false);
                    }
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* Số đêm */}
          <div ref={nightsWrapperRef} className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Số đêm:
            </label>
            <button
              type="button"
              onClick={() => setIsNightsOpen((v) => !v)}
              className="w-full flex items-center gap-3 pl-10 pr-9 py-3 border border-slate-200 rounded-lg text-slate-700 text-left hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 relative"
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <MoonIcon />
              </span>
              <span className="font-medium">{nights} đêm</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronDown />
              </span>
            </button>
            {isNightsOpen ? (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-100 max-h-64 overflow-y-auto">
                {nightsOptions.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setNights(n);
                      setIsNightsOpen(false);
                    }}
                    className={
                      "w-full px-4 py-2.5 text-left text-sm hover:bg-sky-50 transition-colors " +
                      (n === nights ? "font-semibold text-sky-700" : "text-slate-700")
                    }
                  >
                    {n} đêm
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Trả phòng — read-only, computed */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Trả phòng:
            </label>
            <div className="w-full px-4 py-3 text-slate-700 font-medium">
              {formatLongDate(checkOut)}
            </div>
          </div>
        </div>

        {/* Khách và Phòng + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-4 items-end">
          <div ref={guestWrapperRef} className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Khách và Phòng
            </label>
            <button
              type="button"
              onClick={() => setIsGuestOpen((v) => !v)}
              className="w-full flex items-center gap-3 pl-10 pr-9 py-3 border border-slate-200 rounded-lg text-slate-700 text-left hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 relative"
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <GuestIcon />
              </span>
              <span className="font-medium truncate">{guestLabel}</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <ChevronDown />
              </span>
            </button>
            {isGuestOpen ? (
              <div className="absolute top-full left-0 mt-2 z-50">
                <GuestRoomDropdown
                  {...guests}
                  onChange={setGuests}
                  onDone={() => setIsGuestOpen(false)}
                />
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-lg shadow-md transition-colors w-full md:w-auto md:min-w-45"
          >
            <SearchIcon />
            Tìm kiếm
          </button>
        </div>

        {/* Tuỳ chọn nhỏ */}
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors"
        >
          <HotelIcon />
          Thanh Toán Tại Khách Sạn
        </button>
      </div>
    </div>
  );
}
