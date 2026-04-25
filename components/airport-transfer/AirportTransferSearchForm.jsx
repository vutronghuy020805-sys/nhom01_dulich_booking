"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AirportTransferLocationDropdown from "@/components/AirportTransferLocationDropdown";
import AirportTransferTimePicker from "@/components/AirportTransferTimePicker";
import FlightDatePicker from "@/components/FlightDatePicker";
import { AIRPORTS, DESTINATIONS } from "@/data/airportTransferData";

function PlaneIcon() {
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
      <path d="M10.5 15 5 19l-1.5-1.5L7 14l-4.5-4L4 8l5 2 4-4c1-1 3-.5 3.5 0s1 2.5 0 3.5l-4 4 2 5-1.5 1.5-4-4.5z" />
    </svg>
  );
}

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

function CalendarIcon() {
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
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

function SwapIcon() {
  return (
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
      <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 20l-4-4 4-4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function fmtDate(d) {
  return `${d.getDate()} thg ${d.getMonth() + 1}, ${d.getFullYear()}`;
}
function fmtTime(h, m) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
function toIsoDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AirportTransferSearchForm() {
  const router = useRouter();

  const [fromAirport, setFromAirport] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [query, setQuery] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const [pickupDate, setPickupDate] = useState(today);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [pickupHour, setPickupHour] = useState(21);
  const [pickupMinute, setPickupMinute] = useState(55);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const locationWrapperRef = useRef(null);
  const dateWrapperRef = useRef(null);
  const timeWrapperRef = useRef(null);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(event.target)
      ) {
        setActiveField(null);
        setQuery("");
      }
      if (
        dateWrapperRef.current &&
        !dateWrapperRef.current.contains(event.target)
      ) {
        setIsDateOpen(false);
      }
      if (
        timeWrapperRef.current &&
        !timeWrapperRef.current.contains(event.target)
      ) {
        setIsTimeOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setActiveField(null);
      setQuery("");
      setIsDateOpen(false);
      setIsTimeOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const qLower = query.trim().toLowerCase();
  const filterItems = (list) =>
    qLower === ""
      ? list
      : list.filter(
          (item) =>
            item.name.toLowerCase().includes(qLower) ||
            item.subtitle.toLowerCase().includes(qLower) ||
            item.typeLabel.toLowerCase().includes(qLower)
        );
  const filteredAirports = filterItems(AIRPORTS);
  const filteredDestinations = filterItems(DESTINATIONS);

  const handleSelect = (item) => {
    if (activeField === "from") {
      setFromAirport(item);
      setErrors((prev) => {
        const n = { ...prev };
        delete n.from;
        return n;
      });
    } else if (activeField === "to") {
      setToLocation(item);
      setErrors((prev) => {
        const n = { ...prev };
        delete n.to;
        return n;
      });
    }
    setActiveField(null);
    setQuery("");
  };

  const handleEnterSelect = () => {
    const list = activeField === "from" ? filteredAirports : filteredDestinations;
    if (list.length > 0) handleSelect(list[0]);
  };

  const handleSwap = () => {
    setFromAirport(toLocation);
    setToLocation(fromAirport);
    setActiveField(null);
    setQuery("");
  };

  const handleDateSelect = (date) => {
    setPickupDate(date);
    setIsDateOpen(false);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.date;
      return n;
    });
  };

  const handleTimeChange = ({ hour, minute }) => {
    setPickupHour(hour);
    setPickupMinute(minute);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.time;
      return n;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!fromAirport) nextErrors.from = "Vui lòng chọn sân bay đón.";
    if (!toLocation) nextErrors.to = "Vui lòng chọn điểm đến.";
    if (!pickupDate) nextErrors.date = "Vui lòng chọn ngày đón.";
    if (pickupHour == null || pickupMinute == null)
      nextErrors.time = "Vui lòng chọn giờ đón.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    const params = new URLSearchParams({
      from: fromAirport.id,
      to: toLocation.id,
      date: toIsoDate(pickupDate),
      time: fmtTime(pickupHour, pickupMinute),
    });
    router.push(`/airport-transfer/results?${params.toString()}`);
  };

  const renderFieldContent = (field, value, placeholder) => {
    if (activeField === field) {
      return (
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleEnterSelect();
            }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent outline-none text-slate-900 text-sm md:text-base placeholder:text-slate-400"
        />
      );
    }
    if (value) {
      return (
        <span className="flex-1 min-w-0 font-semibold text-slate-900 text-sm md:text-base truncate">
          {value.name}
        </span>
      );
    }
    return (
      <span className="flex-1 min-w-0 text-slate-400 text-sm md:text-base truncate">
        {placeholder}
      </span>
    );
  };

  const fieldShell = (isActive, hasError) =>
    "w-full flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition " +
    (hasError
      ? "border-rose-400 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200"
      : isActive
        ? "border-sky-500 ring-2 ring-sky-200 bg-sky-50/40"
        : "border-slate-200 hover:border-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="bg-white rounded-2xl shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)] border border-slate-100 p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_auto] gap-3 md:gap-2 items-end">
          <div ref={locationWrapperRef} className="md:contents">
            <div className="relative">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Từ sân bay
              </label>
              <button
                type="button"
                onClick={() => {
                  setActiveField("from");
                  setQuery("");
                }}
                className={fieldShell(activeField === "from", Boolean(errors.from))}
              >
                <PlaneIcon />
                {renderFieldContent(
                  "from",
                  fromAirport,
                  "Ví dụ Sân bay quốc tế Nội Bài"
                )}
              </button>
              {errors.from ? (
                <p className="mt-1.5 text-xs text-rose-600">{errors.from}</p>
              ) : null}

              {activeField === "from" && (
                <div className="absolute top-full left-0 mt-3 z-50">
                  <AirportTransferLocationDropdown
                    recentLabel={fromAirport ? "Tìm kiếm gần đây" : undefined}
                    recentItems={fromAirport ? [fromAirport] : []}
                    sectionLabel="Các sân bay phổ biến"
                    items={filteredAirports}
                    onSelect={handleSelect}
                  />
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center justify-center pb-2">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Đổi chiều điểm đón và điểm đến"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-sky-500 hover:bg-sky-50 hover:border-sky-300 flex items-center justify-center shadow-sm transition"
              >
                <SwapIcon />
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Đến khu vực, địa chỉ, toà nhà
              </label>
              <button
                type="button"
                onClick={() => {
                  setActiveField("to");
                  setQuery("");
                }}
                className={fieldShell(activeField === "to", Boolean(errors.to))}
              >
                <PinIcon />
                {renderFieldContent("to", toLocation, "Ví dụ Chợ Bến Thành")}
              </button>
              {errors.to ? (
                <p className="mt-1.5 text-xs text-rose-600">{errors.to}</p>
              ) : null}

              {activeField === "to" && (
                <div className="absolute top-full right-0 mt-3 z-50">
                  <AirportTransferLocationDropdown
                    sectionLabel="Khu vực / địa điểm phổ biến"
                    items={filteredDestinations}
                    onSelect={handleSelect}
                  />
                </div>
              )}
            </div>
          </div>

          <div ref={dateWrapperRef} className="relative">
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Ngày đón
            </label>
            <button
              type="button"
              onClick={() => setIsDateOpen((v) => !v)}
              className={fieldShell(isDateOpen, Boolean(errors.date))}
            >
              <CalendarIcon />
              <span className="flex-1 text-sm md:text-base text-slate-900">
                {fmtDate(pickupDate)}
              </span>
            </button>
            {errors.date ? (
              <p className="mt-1.5 text-xs text-rose-600">{errors.date}</p>
            ) : null}

            {isDateOpen && (
              <div className="absolute top-full left-0 md:left-auto md:right-0 mt-3 z-50">
                <FlightDatePicker
                  selected={pickupDate}
                  minDate={today}
                  onSelect={handleDateSelect}
                />
              </div>
            )}
          </div>

          <div ref={timeWrapperRef} className="relative">
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Giờ đón
            </label>
            <button
              type="button"
              onClick={() => setIsTimeOpen((v) => !v)}
              className={fieldShell(isTimeOpen, Boolean(errors.time))}
            >
              <ClockIcon />
              <span className="flex-1 text-sm md:text-base text-slate-900">
                {fmtTime(pickupHour, pickupMinute)}
              </span>
            </button>
            {errors.time ? (
              <p className="mt-1.5 text-xs text-rose-600">{errors.time}</p>
            ) : null}

            {isTimeOpen && (
              <div className="absolute top-full right-0 mt-3 z-50">
                <AirportTransferTimePicker
                  hour={pickupHour}
                  minute={pickupMinute}
                  onChange={handleTimeChange}
                  onDone={() => setIsTimeOpen(false)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden mt-3 flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Đổi chiều điểm đón và điểm đến"
            className="inline-flex items-center gap-2 text-sky-600 text-sm font-semibold px-4 py-2 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-100 transition"
          >
            <SwapIcon />
            Đổi chiều
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 md:px-8 py-3 rounded-lg shadow-sm transition w-full md:w-auto justify-center"
          >
            <SearchIcon />
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
}
