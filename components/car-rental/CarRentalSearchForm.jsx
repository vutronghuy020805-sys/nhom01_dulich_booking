"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CarRentalLocationDropdown from "@/components/CarRentalLocationDropdown";
import CarRentalTimePicker from "@/components/CarRentalTimePicker";
import FlightDatePicker from "@/components/FlightDatePicker";
import { carRentalLocations } from "./carRentalLocations";

function fmtVn(d) {
  return `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}`;
}

function fmtTime(hour, minute) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function toIso(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function CarRentalSearchForm() {
  const router = useRouter();

  const [driverOption, setDriverOption] = useState("self-drive");
  const [pickupLocation, setPickupLocation] = useState(null);

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const locationWrapperRef = useRef(null);

  const [startDate, setStartDate] = useState(new Date(2026, 3, 17));
  const [endDate, setEndDate] = useState(new Date(2026, 3, 19));
  const [openCalendarFor, setOpenCalendarFor] = useState(null);
  const dateWrapperRef = useRef(null);

  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(20);
  const [endMinute, setEndMinute] = useState(0);
  const [openTimePickerFor, setOpenTimePickerFor] = useState(null);
  const timeWrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        locationWrapperRef.current &&
        !locationWrapperRef.current.contains(e.target)
      ) {
        setIsLocationOpen(false);
        setLocationQuery("");
      }
      if (
        dateWrapperRef.current &&
        !dateWrapperRef.current.contains(e.target)
      ) {
        setOpenCalendarFor(null);
      }
      if (
        timeWrapperRef.current &&
        !timeWrapperRef.current.contains(e.target)
      ) {
        setOpenTimePickerFor(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const q = locationQuery.trim().toLowerCase();
  const filteredLocations =
    q === ""
      ? carRentalLocations
      : carRentalLocations.filter(
          (l) =>
            l.name.toLowerCase().includes(q) ||
            l.subtitle.toLowerCase().includes(q) ||
            l.typeLabel.toLowerCase().includes(q)
        );

  const handleDateSelect = (date) => {
    if (openCalendarFor === "start") {
      setStartDate(date);
      if (date.getTime() > endDate.getTime()) {
        setEndDate(date);
      }
    } else if (openCalendarFor === "end") {
      setEndDate(date);
    }
    setOpenCalendarFor(null);
  };

  const handleTimeChange = ({ hour, minute }) => {
    if (openTimePickerFor === "start") {
      setStartHour(hour);
      setStartMinute(minute);
    } else if (openTimePickerFor === "end") {
      setEndHour(hour);
      setEndMinute(minute);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("driverOption", driverOption);
    if (pickupLocation?.id) params.set("location", pickupLocation.id);
    params.set("startDate", toIso(startDate));
    params.set("startTime", fmtTime(startHour, startMinute));
    params.set("endDate", toIso(endDate));
    params.set("endTime", fmtTime(endHour, endMinute));
    router.push(`/car-rental/booking/toyota-vios?${params.toString()}`);
  };

  const fieldClasses =
    "flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-colors cursor-pointer";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 md:p-6">
      <div className="mb-5">
        <div className="text-sm font-semibold text-slate-700 mb-2">
          Có hoặc không có tài xế?
        </div>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="driverOption"
              value="self-drive"
              checked={driverOption === "self-drive"}
              onChange={() => setDriverOption("self-drive")}
              className="w-4 h-4 accent-sky-500"
            />
            <span className="text-sm text-slate-800 font-medium">
              Không có tài xế
            </span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="driverOption"
              value="with-driver"
              checked={driverOption === "with-driver"}
              onChange={() => setDriverOption("with-driver")}
              className="w-4 h-4 accent-sky-500"
            />
            <span className="text-sm text-slate-800 font-medium">
              Có tài xế
            </span>
          </label>
        </div>
      </div>

      <div className="mb-4 relative" ref={locationWrapperRef}>
        <div className="text-sm font-semibold text-slate-700 mb-2">
          Vị trí cho thuê của bạn
        </div>
        {isLocationOpen ? (
          <div className={fieldClasses}>
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
            <input
              autoFocus
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Điền thành phố, sân bay hoặc khách sạn"
              className="flex-1 min-w-0 bg-transparent outline-none text-slate-800 text-sm placeholder:text-slate-400"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setIsLocationOpen(true);
              setLocationQuery("");
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
              <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span
              className={
                pickupLocation
                  ? "font-semibold text-slate-900 text-sm truncate"
                  : "text-slate-400 text-sm truncate"
              }
            >
              {pickupLocation?.name ||
                "Điền thành phố, sân bay hoặc khách sạn"}
            </span>
          </button>
        )}

        {isLocationOpen && (
          <div className="absolute top-full mt-2 left-0 z-40">
            <CarRentalLocationDropdown
              items={filteredLocations}
              onSelect={(item) => {
                setPickupLocation(item);
                setIsLocationOpen(false);
                setLocationQuery("");
              }}
            />
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 items-end"
        ref={dateWrapperRef}
      >
        <div className="relative">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Ngày bắt đầu thuê
          </div>
          <button
            type="button"
            onClick={() =>
              setOpenCalendarFor((v) => (v === "start" ? null : "start"))
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
              <path d="M3 9h18M8 3v4M16 3v4" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">
              {fmtVn(startDate)}
            </span>
          </button>
          {openCalendarFor === "start" && (
            <div className="absolute top-full mt-2 left-0 z-40">
              <FlightDatePicker
                selected={startDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        <div className="relative" ref={timeWrapperRef}>
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Thời gian bắt đầu
          </div>
          <button
            type="button"
            onClick={() =>
              setOpenTimePickerFor((v) => (v === "start" ? null : "start"))
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">
              {fmtTime(startHour, startMinute)}
            </span>
          </button>
          {openTimePickerFor === "start" && (
            <div className="absolute top-full mt-2 left-0 z-40">
              <CarRentalTimePicker
                hour={startHour}
                minute={startMinute}
                onChange={handleTimeChange}
                onDone={() => setOpenTimePickerFor(null)}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Ngày kết thúc thuê
          </div>
          <button
            type="button"
            onClick={() =>
              setOpenCalendarFor((v) => (v === "end" ? null : "end"))
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
              <path d="M3 9h18M8 3v4M16 3v4" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">
              {fmtVn(endDate)}
            </span>
          </button>
          {openCalendarFor === "end" && (
            <div className="absolute top-full mt-2 right-0 z-40">
              <FlightDatePicker
                selected={endDate}
                minDate={startDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Thời gian kết thúc
          </div>
          <button
            type="button"
            onClick={() =>
              setOpenTimePickerFor((v) => (v === "end" ? null : "end"))
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-semibold text-slate-800">
              {fmtTime(endHour, endMinute)}
            </span>
          </button>
          {openTimePickerFor === "end" && (
            <div className="absolute top-full mt-2 right-0 z-40">
              <CarRentalTimePicker
                hour={endHour}
                minute={endMinute}
                onChange={handleTimeChange}
                onDone={() => setOpenTimePickerFor(null)}
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="col-span-2 md:col-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-colors shadow"
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
