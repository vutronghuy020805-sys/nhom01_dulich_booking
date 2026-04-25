"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HotelDatePicker from "../HotelDatePicker";
import GuestRoomDropdown from "../GuestRoomDropdown";
import {
  vietnamDestinations,
  formatShortDate,
  getNightsBetween,
} from "../shared/hotelSearchData";
import { findLocationByName } from "./popularLocations";

export default function HotelSearchPanel({ onLocationChange, externalLocation }) {
  const router = useRouter();
  const [locationQuery, setLocationQuery] = useState(externalLocation || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const locationWrapperRef = useRef(null);

  useEffect(() => {
    if (externalLocation !== undefined && externalLocation !== locationQuery) {
      setLocationQuery(externalLocation || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLocation]);

  const [checkIn, setCheckIn] = useState(new Date(2026, 3, 16));
  const [checkOut, setCheckOut] = useState(new Date(2026, 3, 17));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dateWrapperRef = useRef(null);

  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const guestWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        dateWrapperRef.current &&
        !dateWrapperRef.current.contains(e.target)
      ) {
        setIsDatePickerOpen(false);
      }
      if (
        guestWrapperRef.current &&
        !guestWrapperRef.current.contains(e.target)
      ) {
        setIsGuestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dateLabel =
    checkIn && checkOut
      ? `${formatShortDate(checkIn)} - ${formatShortDate(checkOut)}`
      : checkIn
      ? `${formatShortDate(checkIn)} - ?`
      : "Chọn ngày";

  const nights = getNightsBetween(checkIn, checkOut);
  const guestLabel = `${guests.adults} người lớn, ${guests.children} trẻ em, ${guests.rooms} phòng`;

  const q = locationQuery.trim().toLowerCase();
  const filtered =
    q === ""
      ? vietnamDestinations
      : vietnamDestinations.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.subtitle.toLowerCase().includes(q)
        );

  const handleSelect = (destination) => {
    setLocationQuery(destination.name);
    setIsDropdownOpen(false);
    if (onLocationChange) onLocationChange(destination.name);
  };

  const handleSearch = () => {
    const params = {
      destination: locationQuery,
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      adults: guests.adults,
      children: guests.children,
      rooms: guests.rooms,
    };
    console.log("[Hotels search]", params);

    const match = findLocationByName(locationQuery);
    if (match) {
      router.push(`/hotels/${match.slug}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div ref={locationWrapperRef} className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Thành phố, địa điểm hoặc tên khách sạn:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
            </span>
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => {
                const v = e.target.value;
                setLocationQuery(v);
                setIsDropdownOpen(true);
                if (onLocationChange) onLocationChange(v);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Thành phố, khách sạn, điểm đến"
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-slate-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-130 max-w-[90vw] mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100">
              <div className="p-3 max-h-90 overflow-y-auto">
                <h3 className="font-bold text-gray-900 px-2 mb-2 text-sm">
                  Điểm đến phổ biến
                </h3>
                {filtered.length === 0 ? (
                  <div className="text-gray-500 text-sm text-center py-8">
                    Không tìm thấy kết quả phù hợp
                  </div>
                ) : (
                  filtered.map((d) => (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => handleSelect(d)}
                      className="w-full flex justify-between items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900">
                          {d.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {d.subtitle}
                        </div>
                      </div>
                      <div className="shrink-0 flex flex-col items-end gap-1">
                        <span className="bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {d.typeLabel}
                        </span>
                        <span className="text-xs text-gray-500">
                          {d.hotelCount}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={dateWrapperRef} className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Ngày nhận phòng và trả phòng:
          </label>
          <button
            type="button"
            onClick={() => setIsDatePickerOpen((v) => !v)}
            className="w-full flex items-center gap-3 pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-slate-700 text-left hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 relative"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4" />
                <path d="M16 3v4" />
                <path d="M3 10h18" />
              </svg>
            </span>
            <span className="truncate">{dateLabel}</span>
          </button>
          <p className="text-xs text-gray-500 mt-1.5">
            Thời gian: {nights} đêm
          </p>

          {isDatePickerOpen && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <HotelDatePicker
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={({ checkIn: ci, checkOut: co }) => {
                  setCheckIn(ci);
                  setCheckOut(co);
                  if (ci && co) setIsDatePickerOpen(false);
                }}
              />
            </div>
          )}
        </div>

        <div ref={guestWrapperRef} className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Khách và phòng:
          </label>
          <button
            type="button"
            onClick={() => setIsGuestOpen((v) => !v)}
            className="w-full flex items-center gap-3 pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-slate-700 text-left hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 relative"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
              </svg>
            </span>
            <span className="truncate">{guestLabel}</span>
          </button>

          {isGuestOpen && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <GuestRoomDropdown
                adults={guests.adults}
                children={guests.children}
                rooms={guests.rooms}
                onChange={setGuests}
                onDone={() => setIsGuestOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSearch}
          className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold px-7 py-3 rounded-full shadow-md transition"
        >
          Tìm kiếm
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>
  );
}
