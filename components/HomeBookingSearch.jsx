"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import HotelDatePicker from "./HotelDatePicker";
import GuestRoomDropdown from "./GuestRoomDropdown";
import FlightLocationDropdown from "./FlightLocationDropdown";
import FlightDatePicker from "./FlightDatePicker";
import PassengerDropdown from "./PassengerDropdown";
import SeatClassDropdown, { SEAT_CLASSES } from "./SeatClassDropdown";
import BusLocationDropdown from "./BusLocationDropdown";
import BusPassengerDropdown from "./BusPassengerDropdown";
import CarRentalLocationDropdown from "./CarRentalLocationDropdown";
import CarRentalTimePicker from "./CarRentalTimePicker";
import AirportTransferLocationDropdown from "./AirportTransferLocationDropdown";
import AirportTransferTimePicker from "./AirportTransferTimePicker";
import {
  vietnamDestinations,
  formatShortDate,
  slugifyDestination,
} from "./shared/hotelSearchData";

const serviceTabs = [
  { label: "Khách sạn", icon: "/nhom01_dulich_booking/assets/icons/hotel.png" },
  {
    label: "Vé máy bay",
    icon: "/nhom01_dulich_booking/assets/icons/plane.png",
    activeIcon: "/nhom01_dulich_booking/assets/icons/plane-active.png",
  },
  {
    label: "Vé xe khách",
    icon: "/nhom01_dulich_booking/assets/icons/bus.png",
    activeIcon: "/nhom01_dulich_booking/assets/icons/bus-active.png",
  },
  {
    label: "Thuê xe",
    icon: "/nhom01_dulich_booking/assets/icons/car.png",
    activeIcon: "/nhom01_dulich_booking/assets/icons/car-active.png",
  },
  {
    label: "Hoạt động",
    icon: "/nhom01_dulich_booking/assets/icons/activity.png",
    activeIcon: "/nhom01_dulich_booking/assets/icons/activity-active.png",
  },
  {
    label: "Đưa đón sân bay",
    icon: "/nhom01_dulich_booking/assets/icons/airport-transfer.png",
    activeIcon: "/nhom01_dulich_booking/assets/icons/airport-transfer-active.png",
  },
];

const chips = ["Tất cả", "Khách sạn", "Biệt thự", "Căn hộ"];

// Sân bay Việt Nam — chỉ bao gồm Việt Nam
const vietnamAirports = [
  { id: "SGN", name: "TP HCM", code: "SGN", subtitle: "Sân bay Tân Sơn Nhất, Thành phố Hồ Chí Minh, Việt Nam", typeLabel: "Sân bay" },
  { id: "HAN", name: "Hà Nội", code: "HAN", subtitle: "Sân bay Nội Bài, Hà Nội, Việt Nam", typeLabel: "Sân bay" },
  { id: "DAD", name: "Đà Nẵng", code: "DAD", subtitle: "Sân bay Đà Nẵng, Đà Nẵng, Việt Nam", typeLabel: "Sân bay" },
  { id: "PQC", name: "Phú Quốc", code: "PQC", subtitle: "Sân bay Phú Quốc, Kiên Giang, Việt Nam", typeLabel: "Sân bay" },
  { id: "CXR", name: "Nha Trang", code: "CXR", subtitle: "Sân bay Cam Ranh, Khánh Hòa, Việt Nam", typeLabel: "Sân bay" },
  { id: "HUI", name: "Huế", code: "HUI", subtitle: "Sân bay Phú Bài, Thừa Thiên Huế, Việt Nam", typeLabel: "Sân bay" },
  { id: "HPH", name: "Hải Phòng", code: "HPH", subtitle: "Sân bay Cát Bi, Hải Phòng, Việt Nam", typeLabel: "Sân bay" },
  { id: "VCA", name: "Cần Thơ", code: "VCA", subtitle: "Sân bay Cần Thơ, Cần Thơ, Việt Nam", typeLabel: "Sân bay" },
  { id: "VII", name: "Vinh", code: "VII", subtitle: "Sân bay Vinh, Nghệ An, Việt Nam", typeLabel: "Sân bay" },
  { id: "DLI", name: "Đà Lạt", code: "DLI", subtitle: "Sân bay Liên Khương, Lâm Đồng, Việt Nam", typeLabel: "Sân bay" },
  { id: "UIH", name: "Quy Nhơn", code: "UIH", subtitle: "Sân bay Phù Cát, Bình Định, Việt Nam", typeLabel: "Sân bay" },
  { id: "BMV", name: "Buôn Ma Thuột", code: "BMV", subtitle: "Sân bay Buôn Ma Thuột, Đắk Lắk, Việt Nam", typeLabel: "Sân bay" },
  { id: "VKG", name: "Rạch Giá", code: "VKG", subtitle: "Sân bay Rạch Giá, Kiên Giang, Việt Nam", typeLabel: "Sân bay" },
  { id: "VCS", name: "Côn Đảo", code: "VCS", subtitle: "Sân bay Côn Đảo, Bà Rịa - Vũng Tàu, Việt Nam", typeLabel: "Sân bay" },
  { id: "TBB", name: "Tuy Hòa", code: "TBB", subtitle: "Sân bay Tuy Hòa, Phú Yên, Việt Nam", typeLabel: "Sân bay" },
];

function getAirportShortLabel(a) {
  // "Sân bay Nội Bài" (phần trước dấu phẩy đầu tiên của subtitle)
  const idx = a.subtitle.indexOf(",");
  return idx === -1 ? a.subtitle : a.subtitle.slice(0, idx).trim();
}

/* ======================================================================
   HOTEL SEARCH FORM
   ====================================================================== */
function HotelSearchForm() {
  const router = useRouter();
  const [activeChip, setActiveChip] = useState(0);
  const [locationQuery, setLocationQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const locationWrapperRef = useRef(null);

  // Date picker state
  const [checkIn, setCheckIn] = useState(new Date(2026, 3, 15));
  const [checkOut, setCheckOut] = useState(new Date(2026, 3, 16));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dateWrapperRef = useRef(null);

  // Guest + room state
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const guestWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationWrapperRef.current && !locationWrapperRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(e.target)) {
        setIsDatePickerOpen(false);
      }
      if (guestWrapperRef.current && !guestWrapperRef.current.contains(e.target)) {
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
      : "Chọn ngày nhận phòng và trả phòng";

  const guestLabel = `${guests.adults} người lớn, ${guests.children} Trẻ em, ${guests.rooms} phòng`;

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
  };

  const handleSearch = () => {
    const text = locationQuery.trim();
    if (!text) return;
    const match = vietnamDestinations.find(
      (d) => d.name.toLowerCase() === text.toLowerCase()
    );
    const slug = match ? match.slug : slugifyDestination(text);
    if (!slug) return;
    router.push(`/hotels/${slug}`);
  };

  return (
    <>
      {/* Chips */}
      <div className="flex items-center flex-wrap gap-3 mb-5">
        {chips.map((chip, idx) => (
          <button
            key={chip}
            type="button"
            onClick={() => setActiveChip(idx)}
            className={`px-7 py-2 rounded-full transition-all duration-200 backdrop-blur-sm ${
              idx === activeChip
                ? "bg-[#55B6FF] text-white font-semibold shadow-md"
                : "bg-black/40 text-white font-medium hover:bg-white/20 hover:shadow-lg hover:shadow-black/20"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Labels */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-3 text-white text-sm font-medium px-6">
        <div>Thành phố, địa điểm hoặc tên khách sạn:</div>
        <div>Ngày nhận phòng và trả phòng:</div>
        <div>Số khách và loại phòng:</div>
        <div aria-hidden className="hidden md:block w-20" />
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-full flex items-stretch shadow-2xl">
        {/* Location with dropdown */}
        <div className="flex-1 relative" ref={locationWrapperRef}>
          <div className="flex items-center gap-3 px-6 py-4 border-r border-gray-200 rounded-l-full">
            <img src="/nhom01_dulich_booking/assets/icons/location.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Thành phố, căn hộ, biệt thự, hoặc nơi đến"
              className="flex-1 min-w-0 outline-none text-gray-800 placeholder-gray-400 text-[15px] bg-transparent"
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-[520px] max-w-[90vw] mt-3 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden">
              {/* Gần tôi */}
              <div className="p-3">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-sky-50 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#55B6FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="w-5 h-5 shrink-0"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3" fill="#55B6FF" stroke="none" />
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                  </svg>
                  <span className="font-medium text-gray-800">Gần tôi</span>
                </button>
              </div>

              <div className="border-t border-gray-100" />

              {/* Popular destinations */}
              <div className="p-3 max-h-[360px] overflow-y-auto">
                <h3 className="font-bold text-gray-900 px-2 mb-2">Điểm đến phổ biến</h3>
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
                        <div className="font-semibold text-gray-900">{d.name}</div>
                        <div className="text-sm text-gray-500 truncate">{d.subtitle}</div>
                      </div>
                      <div className="shrink-0 flex flex-col items-end gap-1">
                        <span className="bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {d.typeLabel}
                        </span>
                        <span className="text-xs text-gray-500">{d.hotelCount}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative" ref={dateWrapperRef}>
          <button
            type="button"
            onClick={() => setIsDatePickerOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-6 py-4 border-r border-gray-200 cursor-pointer text-left"
          >
            <img src="/nhom01_dulich_booking/assets/icons/calendar.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-gray-800 text-[15px] truncate">{dateLabel}</span>
          </button>

          {isDatePickerOpen && (
            <div className="absolute top-full left-0 mt-3 z-50">
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

        <div className="flex-1 relative" ref={guestWrapperRef}>
          <button
            type="button"
            onClick={() => setIsGuestOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-6 py-4 cursor-pointer text-left"
          >
            <img src="/nhom01_dulich_booking/assets/icons/guest-room.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-gray-800 text-[15px] truncate">{guestLabel}</span>
          </button>

          {isGuestOpen && (
            <div className="absolute top-full right-0 mt-3 z-50">
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

        <button
          type="button"
          aria-label="Tìm kiếm"
          onClick={handleSearch}
          className="bg-[#55B6FF] hover:bg-[#3fa5f5] transition-colors px-12 flex items-center justify-center shrink-0 rounded-r-full"
        >
          <img src="/nhom01_dulich_booking/assets/icons/search.png" alt="" className="w-8 h-8 object-contain" />
        </button>
      </div>
    </>
  );
}

/* ======================================================================
   FLIGHT MULTI-CITY ROWS — layout for "Nhiều thành phố" mode
   Each row has its own {from, to, date}; airport dropdown + date picker
   are reused from the roundtrip form (FlightLocationDropdown, FlightDatePicker)
   ====================================================================== */
function FlightMultiCityRows() {
  const [rows, setRows] = useState([
    {
      id: 1,
      from: vietnamAirports[0], // TP HCM (SGN)
      to: vietnamAirports[1], // Hà Nội (HAN)
      date: new Date(2026, 3, 16),
    },
    {
      id: 2,
      from: null,
      to: null,
      date: new Date(2026, 3, 17),
    },
  ]);
  const nextIdRef = useRef(3);

  // Which row + field currently owns the open location dropdown
  const [activeLocation, setActiveLocation] = useState(null); // { rowIdx, field: 'from' | 'to' } | null
  const [locationQuery, setLocationQuery] = useState("");
  // Which row currently owns the open calendar
  const [activeCalendarRow, setActiveCalendarRow] = useState(null); // rowIdx | null

  const locationWrapperRefs = useRef([]);
  const dateWrapperRefs = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      if (activeLocation !== null) {
        const ref = locationWrapperRefs.current[activeLocation.rowIdx];
        if (ref && !ref.contains(e.target)) {
          setActiveLocation(null);
          setLocationQuery("");
        }
      }
      if (activeCalendarRow !== null) {
        const ref = dateWrapperRefs.current[activeCalendarRow];
        if (ref && !ref.contains(e.target)) {
          setActiveCalendarRow(null);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeLocation, activeCalendarRow]);

  const updateRow = (rowIdx, patch) => {
    setRows((prev) => prev.map((r, i) => (i === rowIdx ? { ...r, ...patch } : r)));
  };

  const swapRow = (rowIdx) => {
    setRows((prev) =>
      prev.map((r, i) => (i === rowIdx ? { ...r, from: r.to, to: r.from } : r))
    );
  };

  const addRow = () => {
    setRows((prev) => {
      const last = prev[prev.length - 1];
      const nextDate = last && last.date ? new Date(last.date) : new Date();
      nextDate.setDate(nextDate.getDate() + 1);
      return [
        ...prev,
        { id: nextIdRef.current++, from: null, to: null, date: nextDate },
      ];
    });
  };

  const handleSelectAirport = (airport) => {
    if (!activeLocation) return;
    updateRow(activeLocation.rowIdx, { [activeLocation.field]: airport });
    setActiveLocation(null);
    setLocationQuery("");
  };

  const handleSelectDate = (date) => {
    if (activeCalendarRow === null) return;
    updateRow(activeCalendarRow, { date });
    setActiveCalendarRow(null);
  };

  const q = locationQuery.trim().toLowerCase();
  const filteredAirports =
    q === ""
      ? vietnamAirports
      : vietnamAirports.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.code.toLowerCase().includes(q) ||
            a.subtitle.toLowerCase().includes(q)
        );

  const fmt = (d) => (d ? `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}` : "");

  const renderRow = (row, rowIdx, rightButton, isLast) => {
    const isLocationOpen = activeLocation !== null && activeLocation.rowIdx === rowIdx;
    const activeField = isLocationOpen ? activeLocation.field : null;
    const isCalendarOpen = activeCalendarRow === rowIdx;

    return (
      <div key={row.id} className={isLast ? "" : "mb-5"}>
        {/* Labels */}
        <div className="flex items-center gap-3 mb-3 text-white text-sm font-medium">
          <div className="flex-[2] flex items-center">
            <div className="flex-1 px-6">Từ</div>
            <div className="w-14 shrink-0" aria-hidden />
            <div className="flex-1 px-6">Đến</div>
          </div>
          <div className="flex-1 px-6">Ngày khởi hành</div>
          <div className="w-56 shrink-0" aria-hidden />
        </div>

        {/* Inputs */}
        <div className="flex items-stretch gap-3">
          {/* From + Swap + To pill */}
          <div
            className="flex-[2] relative"
            ref={(el) => {
              locationWrapperRefs.current[rowIdx] = el;
            }}
          >
            <div className="bg-white rounded-full flex items-stretch shadow-2xl">
              {/* FROM */}
              <button
                type="button"
                onClick={() => {
                  setActiveLocation({ rowIdx, field: "from" });
                  setLocationQuery("");
                }}
                className="flex-1 flex items-center gap-3 px-6 py-3 text-left rounded-l-full hover:bg-gray-50 transition-colors min-w-0"
              >
                <img src="/nhom01_dulich_booking/assets/icons/plane-depart.png" alt="" className="w-7 h-7 object-contain shrink-0" />
                {activeField === "from" ? (
                  <input
                    autoFocus
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Thành phố hoặc sân bay"
                    className="flex-1 min-w-0 bg-transparent outline-none font-bold text-gray-900 text-[15px]"
                  />
                ) : row.from ? (
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-[15px] truncate">
                      {row.from.name} ({row.from.code})
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {getAirportShortLabel(row.from)}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-[15px]">Điểm khởi hành</span>
                )}
              </button>

              {/* SWAP */}
              <div className="flex items-center px-2 relative z-10">
                <button
                  type="button"
                  onClick={() => swapRow(rowIdx)}
                  aria-label="Đổi chiều"
                  className="w-10 h-10 rounded-full bg-sky-50 border-2 border-white shadow flex items-center justify-center hover:bg-sky-100 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 20l-4-4 4-4" />
                  </svg>
                </button>
              </div>

              {/* TO */}
              <button
                type="button"
                onClick={() => {
                  setActiveLocation({ rowIdx, field: "to" });
                  setLocationQuery("");
                }}
                className="flex-1 flex items-center gap-3 px-6 py-3 text-left rounded-r-full hover:bg-gray-50 transition-colors min-w-0"
              >
                <img src="/nhom01_dulich_booking/assets/icons/plane-arrive.png" alt="" className="w-7 h-7 object-contain shrink-0" />
                {activeField === "to" ? (
                  <input
                    autoFocus
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Thành phố hoặc sân bay"
                    className="flex-1 min-w-0 bg-transparent outline-none font-bold text-gray-900 text-[15px]"
                  />
                ) : row.to ? (
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-[15px] truncate">
                      {row.to.name} ({row.to.code})
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {getAirportShortLabel(row.to)}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-[15px]">Điểm đến</span>
                )}
              </button>
            </div>

            {/* Airport dropdown (reused from roundtrip) */}
            {isLocationOpen && (
              <div
                className={`absolute top-full mt-3 z-50 ${
                  activeField === "from" ? "left-0" : "right-0"
                }`}
              >
                <FlightLocationDropdown
                  items={filteredAirports}
                  onSelect={handleSelectAirport}
                />
              </div>
            )}
          </div>

          {/* Date field + calendar popup */}
          <div
            className="flex-1 relative flex"
            ref={(el) => {
              dateWrapperRefs.current[rowIdx] = el;
            }}
          >
            <button
              type="button"
              onClick={() => setActiveCalendarRow(rowIdx)}
              className={`w-full bg-white rounded-full flex items-center gap-3 px-6 py-3 shadow-2xl text-left cursor-pointer transition-shadow ${
                isCalendarOpen ? "ring-2 ring-sky-400" : ""
              }`}
            >
              <img src="/nhom01_dulich_booking/assets/icons/calendar.png" alt="" className="w-6 h-6 object-contain shrink-0" />
              <span className="text-gray-800 font-semibold text-[15px]">
                {fmt(row.date)}
              </span>
            </button>

            {isCalendarOpen && (
              <div className="absolute top-full left-0 mt-3 z-50">
                <FlightDatePicker selected={row.date} onSelect={handleSelectDate} />
              </div>
            )}
          </div>

          {/* Right-side button */}
          {rightButton}
        </div>
      </div>
    );
  };

  return (
    <>
      {rows.map((row, rowIdx) => {
        const isLast = rowIdx === rows.length - 1;
        let rightButton;
        if (isLast) {
          rightButton = (
            <button
              type="button"
              className="w-56 shrink-0 bg-[#55B6FF] hover:bg-[#3fa5f5] transition-colors text-white font-semibold rounded-full shadow-lg"
            >
              Tìm chuyến bay
            </button>
          );
        } else if (rowIdx === 0) {
          rightButton = (
            <button
              type="button"
              onClick={addRow}
              className="w-56 shrink-0 bg-black/40 hover:bg-white/20 transition-colors text-white font-semibold text-sm rounded-full flex items-center justify-center gap-2 backdrop-blur-sm px-4"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v8M8 12h8" strokeLinecap="round" strokeWidth="2" />
              </svg>
              THÊM CHUYẾN BAY KHÁC
            </button>
          );
        } else {
          // Middle rows: empty spacer to keep column alignment
          rightButton = <div className="w-56 shrink-0" aria-hidden />;
        }
        return renderRow(row, rowIdx, rightButton, isLast);
      })}
    </>
  );
}

/* ======================================================================
   FLIGHT SEARCH FORM
   ====================================================================== */
function FlightSearchForm() {
  const chevron = (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  const [from, setFrom] = useState(vietnamAirports[0]); // SGN
  const [to, setTo] = useState(vietnamAirports[1]); // HAN
  const [activeField, setActiveField] = useState(null); // 'from' | 'to' | null
  const [query, setQuery] = useState("");
  const locationWrapperRef = useRef(null);

  // Date picker state
  const [departureDate, setDepartureDate] = useState(new Date(2026, 3, 16));
  const [returnDate, setReturnDate] = useState(new Date(2026, 3, 18));
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [openCalendarFor, setOpenCalendarFor] = useState(null); // 'departure' | 'return' | null
  const dateWrapperRef = useRef(null);

  // Passenger state
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const passengerWrapperRef = useRef(null);

  // Seat class state
  const [seatClass, setSeatClass] = useState(SEAT_CLASSES[0]);
  const [isSeatClassOpen, setIsSeatClassOpen] = useState(false);
  const seatClassWrapperRef = useRef(null);

  // Trip mode: "roundtrip" (Một chiều/Khứ hồi) | "multicity" (Nhiều thành phố)
  const [flightMode, setFlightMode] = useState("roundtrip");

  useEffect(() => {
    const handler = (e) => {
      if (locationWrapperRef.current && !locationWrapperRef.current.contains(e.target)) {
        setActiveField(null);
        setQuery("");
      }
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(e.target)) {
        setOpenCalendarFor(null);
      }
      if (passengerWrapperRef.current && !passengerWrapperRef.current.contains(e.target)) {
        setIsPassengerOpen(false);
      }
      if (seatClassWrapperRef.current && !seatClassWrapperRef.current.contains(e.target)) {
        setIsSeatClassOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const passengerLabel = `${passengers.adults} Người lớn, ${passengers.children} Trẻ em, ${passengers.infants} Em bé`;

  const handleDateSelect = (date) => {
    if (openCalendarFor === "departure") {
      setDepartureDate(date);
      // Nếu ngày về đang nhỏ hơn ngày đi mới → clear
      if (returnDate && date.getTime() > returnDate.getTime()) {
        setReturnDate(null);
      }
    } else if (openCalendarFor === "return") {
      setReturnDate(date);
      setIsRoundTrip(true); // tự bật khứ hồi khi chọn ngày về
    }
    setOpenCalendarFor(null);
  };

  const handleReturnFieldClick = () => {
    // Click vào ô ngày về → mở lịch. Chọn được ngày sẽ tự bật isRoundTrip.
    setOpenCalendarFor("return");
  };

  const fmt = (d) => (d ? `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}` : "Chọn ngày về");

  const q = query.trim().toLowerCase();
  const filteredAirports =
    q === ""
      ? vietnamAirports
      : vietnamAirports.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.code.toLowerCase().includes(q) ||
            a.subtitle.toLowerCase().includes(q)
        );

  const handleSelect = (airport) => {
    if (activeField === "from") setFrom(airport);
    else if (activeField === "to") setTo(airport);
    setActiveField(null);
    setQuery("");
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setActiveField(null);
    setQuery("");
  };

  return (
    <>
      {/* Row 1: trip type + options */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        {/* Left: trip type */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFlightMode("roundtrip")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-colors ${
              flightMode === "roundtrip"
                ? "bg-[#55B6FF] text-white font-semibold shadow-md"
                : "bg-black/40 text-white font-medium backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M2.5 19l20-8L2.5 3v7l14 1-14 1z" />
            </svg>
            Một chiều/Khứ hồi
          </button>
          <button
            type="button"
            onClick={() => setFlightMode("multicity")}
            className={`px-6 py-2.5 rounded-full transition-colors ${
              flightMode === "multicity"
                ? "bg-[#55B6FF] text-white font-semibold shadow-md"
                : "bg-black/40 text-white font-medium backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            Nhiều thành phố
          </button>
        </div>

        {/* Right: options */}
        <div className="flex items-center gap-3 text-white">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-[18px] h-[18px] rounded accent-[#55B6FF] cursor-pointer"
            />
            <span className="font-medium">Bay thẳng</span>
          </label>

          <div className="relative" ref={passengerWrapperRef}>
            <button
              type="button"
              onClick={() => setIsPassengerOpen((v) => !v)}
              className="bg-black/40 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm hover:bg-white/20 transition-colors font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
                <circle cx="17" cy="10" r="2" />
                <path d="M14 18c0-2 1.5-3 3-3s3 1 3 3" />
              </svg>
              {passengerLabel}
              {chevron}
            </button>

            {isPassengerOpen && (
              <div className="absolute top-full right-0 mt-3 z-50">
                <PassengerDropdown
                  adults={passengers.adults}
                  childrenCount={passengers.children}
                  infants={passengers.infants}
                  onChange={setPassengers}
                  onDone={() => setIsPassengerOpen(false)}
                />
              </div>
            )}
          </div>

          <div className="relative" ref={seatClassWrapperRef}>
            <button
              type="button"
              onClick={() => setIsSeatClassOpen((v) => !v)}
              className="bg-black/40 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm hover:bg-white/20 transition-colors font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 4v10a2 2 0 0 0 2 2h4" />
                <path d="M7 20h10M13 16l2 4" />
              </svg>
              {seatClass}
              {chevron}
            </button>

            {isSeatClassOpen && (
              <div className="absolute top-full right-0 mt-3 z-50">
                <SeatClassDropdown
                  selected={seatClass}
                  onSelect={(cls) => {
                    setSeatClass(cls);
                    setIsSeatClassOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {flightMode === "multicity" && <FlightMultiCityRows />}

      {flightMode === "roundtrip" && (
        <>
      {/* Row 2: labels — layout mirrors Row 3 so every label sits directly above its input */}
      <div className="flex items-center gap-3 mb-3 text-white text-sm font-medium">
        {/* Over From + Swap + To pill (flex-[2]) */}
        <div className="flex-[2] flex items-center">
          <div className="flex-1 px-6">Từ</div>
          <div className="w-14 shrink-0" aria-hidden />
          <div className="flex-1 px-6">Đến</div>
        </div>

        {/* Over the two date fields (flex-1) */}
        <div className="flex-1 flex gap-3">
          <div className="flex-1 px-6">Ngày khởi hành</div>
          <div className="flex-1 px-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isRoundTrip}
                onChange={(e) => {
                  setIsRoundTrip(e.target.checked);
                  if (!e.target.checked && openCalendarFor === "return") {
                    setOpenCalendarFor(null);
                  }
                }}
                className="w-[18px] h-[18px] rounded accent-[#55B6FF] cursor-pointer"
              />
              <span>Khứ hồi</span>
            </label>
          </div>
        </div>

        {/* Over the search button */}
        <div className="w-16 shrink-0" aria-hidden />
      </div>

      {/* Row 3: inputs */}
      <div className="flex items-stretch gap-3">
        {/* From + Swap + To pill */}
        <div className="flex-[2] relative" ref={locationWrapperRef}>
          <div className="bg-white rounded-full flex items-stretch shadow-2xl">
            {/* FROM */}
            <button
              type="button"
              onClick={() => {
                setActiveField("from");
                setQuery("");
              }}
              className="flex-1 flex items-center gap-3 px-6 py-3 text-left rounded-l-full hover:bg-gray-50 transition-colors"
            >
              <img
                src="/nhom01_dulich_booking/assets/icons/plane-depart.png"
                alt=""
                className="w-7 h-7 object-contain shrink-0"
              />
              {activeField === "from" ? (
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Thành phố hoặc sân bay"
                  className="flex-1 min-w-0 bg-transparent outline-none font-bold text-gray-900 text-[15px]"
                />
              ) : (
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 text-[15px] truncate">
                    {from.name} ({from.code})
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {getAirportShortLabel(from)}
                  </div>
                </div>
              )}
            </button>

            {/* SWAP */}
            <div className="flex items-center px-2 relative z-10">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Đổi chiều"
                className="w-10 h-10 rounded-full bg-sky-50 border-2 border-white shadow flex items-center justify-center hover:bg-sky-100 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 20l-4-4 4-4" />
                </svg>
              </button>
            </div>

            {/* TO */}
            <button
              type="button"
              onClick={() => {
                setActiveField("to");
                setQuery("");
              }}
              className="flex-1 flex items-center gap-3 px-6 py-3 text-left rounded-r-full hover:bg-gray-50 transition-colors"
            >
              <img
                src="/nhom01_dulich_booking/assets/icons/plane-arrive.png"
                alt=""
                className="w-7 h-7 object-contain shrink-0"
              />
              {activeField === "to" ? (
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Thành phố hoặc sân bay"
                  className="flex-1 min-w-0 bg-transparent outline-none font-bold text-gray-900 text-[15px]"
                />
              ) : (
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 text-[15px] truncate">
                    {to.name} ({to.code})
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {getAirportShortLabel(to)}
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Dropdown */}
          {activeField && (
            <div
              className={`absolute top-full mt-3 z-50 ${
                activeField === "from" ? "left-0" : "right-0"
              }`}
            >
              <FlightLocationDropdown
                items={filteredAirports}
                onSelect={handleSelect}
              />
            </div>
          )}
        </div>

        {/* Date fields wrapper — shared ref for click-outside */}
        <div ref={dateWrapperRef} className="flex items-stretch gap-3 flex-1 relative">
          {/* Depart date */}
          <button
            type="button"
            onClick={() => setOpenCalendarFor("departure")}
            className={`flex-1 bg-white rounded-full flex items-center gap-3 px-6 py-3 shadow-2xl text-left cursor-pointer transition-shadow ${
              openCalendarFor === "departure" ? "ring-2 ring-sky-400" : ""
            }`}
          >
            <img src="/nhom01_dulich_booking/assets/icons/calendar.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-gray-800 font-semibold text-[15px]">
              {fmt(departureDate)}
            </span>
          </button>

          {/* Return date */}
          <button
            type="button"
            onClick={handleReturnFieldClick}
            className={`flex-1 bg-white rounded-full flex items-center gap-3 px-6 py-3 shadow-2xl text-left cursor-pointer transition-shadow ${
              openCalendarFor === "return" ? "ring-2 ring-sky-400" : ""
            } ${!isRoundTrip ? "opacity-60" : ""}`}
          >
            <img
              src="/nhom01_dulich_booking/assets/icons/calendar.png"
              alt=""
              className={`w-6 h-6 object-contain shrink-0 ${!isRoundTrip ? "opacity-60" : ""}`}
            />
            <span
              className={`font-semibold text-[15px] ${
                isRoundTrip ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {fmt(returnDate)}
            </span>
          </button>

          {/* Calendar popup */}
          {openCalendarFor && (
            <div
              className={`absolute top-full mt-3 z-50 ${
                openCalendarFor === "departure" ? "left-0" : "right-0"
              }`}
            >
              <FlightDatePicker
                selected={
                  openCalendarFor === "departure" ? departureDate : returnDate
                }
                minDate={openCalendarFor === "return" ? departureDate : undefined}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          type="button"
          aria-label="Tìm kiếm"
          className="bg-[#55B6FF] hover:bg-[#3fa5f5] transition-colors w-16 h-16 rounded-full flex items-center justify-center shrink-0 self-center shadow-2xl"
        >
          <img src="/nhom01_dulich_booking/assets/icons/search.png" alt="" className="w-8 h-8 object-contain" />
        </button>
      </div>
        </>
      )}
    </>
  );
}

/* ======================================================================
   BUS TICKET FORM — "Vé xe khách" mode
   ====================================================================== */
const busLocations = [
  { id: "city-hcm", name: "TP Hồ Chí Minh", subtitle: "Tất cả các điểm lên xe ở TP Hồ Chí Minh", typeLabel: "CITY_GEO" },
  { id: "city-dalat", name: "Đà Lạt", subtitle: "Tất cả các điểm lên xe ở Đà Lạt", typeLabel: "CITY_GEO" },
  { id: "city-brvt", name: "Bà Rịa - Vũng Tàu", subtitle: "Tất cả các điểm lên xe ở Bà Rịa - Vũng Tàu", typeLabel: "CITY_GEO" },
  { id: "city-danang", name: "Đà Nẵng", subtitle: "Tất cả các điểm lên xe ở Đà Nẵng", typeLabel: "CITY_GEO" },
  { id: "city-phanthiet", name: "Phan Thiết", subtitle: "Tất cả các điểm lên xe ở Phan Thiết", typeLabel: "CITY_GEO" },
  { id: "city-nhatrang", name: "Nha Trang", subtitle: "Tất cả các điểm lên xe ở Nha Trang", typeLabel: "CITY_GEO" },
  { id: "city-hue", name: "Huế", subtitle: "Tất cả các điểm lên xe ở Huế", typeLabel: "CITY_GEO" },
  { id: "city-hanoi", name: "Hà Nội", subtitle: "Tất cả các điểm lên xe ở Hà Nội", typeLabel: "CITY_GEO" },
  { id: "city-cantho", name: "Cần Thơ", subtitle: "Tất cả các điểm lên xe ở Cần Thơ", typeLabel: "CITY_GEO" },
  { id: "bs-mdmoi", name: "Bến xe Miền Đông mới", subtitle: "TP Hồ Chí Minh, Việt Nam", typeLabel: "BUS_STATION" },
  { id: "bs-mientay", name: "Bến xe Miền Tây", subtitle: "TP Hồ Chí Minh, Việt Nam", typeLabel: "BUS_STATION" },
  { id: "bs-dalat", name: "Bến xe Đà Lạt", subtitle: "Lâm Đồng, Việt Nam", typeLabel: "BUS_STATION" },
  { id: "bs-dn", name: "Bến xe Trung tâm Đà Nẵng", subtitle: "Đà Nẵng, Việt Nam", typeLabel: "BUS_STATION" },
  { id: "bs-nt", name: "Bến xe phía Nam Nha Trang", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "BUS_STATION" },
  { id: "tr-saigon", name: "Ga Sài Gòn", subtitle: "TP Hồ Chí Minh, Việt Nam", typeLabel: "TRAIN_STATION" },
  { id: "tr-hanoi", name: "Ga Hà Nội", subtitle: "Hà Nội, Việt Nam", typeLabel: "TRAIN_STATION" },
  { id: "tr-danang", name: "Ga Đà Nẵng", subtitle: "Đà Nẵng, Việt Nam", typeLabel: "TRAIN_STATION" },
  { id: "tr-nhatrang", name: "Ga Nha Trang", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "TRAIN_STATION" },
];

function BusTicketForm() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [activeField, setActiveField] = useState(null); // 'from' | 'to' | null
  const [query, setQuery] = useState("");
  const locationWrapperRef = useRef(null);

  // Date state
  const [busDepartureDate, setBusDepartureDate] = useState(new Date(2026, 3, 15));
  const [busReturnDate, setBusReturnDate] = useState(null);
  const [busIsRoundTrip, setBusIsRoundTrip] = useState(false);
  const [openCalendarFor, setOpenCalendarFor] = useState(null); // 'departure' | 'return' | null
  const dateWrapperRef = useRef(null);

  // Passenger state
  const [passengers, setPassengers] = useState(1);
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const passengerWrapperRef = useRef(null);

  const fmt = (d) => `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}`;

  useEffect(() => {
    const handler = (e) => {
      if (locationWrapperRef.current && !locationWrapperRef.current.contains(e.target)) {
        setActiveField(null);
        setQuery("");
      }
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(e.target)) {
        setOpenCalendarFor(null);
      }
      if (passengerWrapperRef.current && !passengerWrapperRef.current.contains(e.target)) {
        setIsPassengerOpen(false);
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
      setBusDepartureDate(date);
      // If current return date is before new departure, reset it
      if (busReturnDate && date.getTime() > busReturnDate.getTime()) {
        setBusReturnDate(null);
      }
    } else if (openCalendarFor === "return") {
      setBusReturnDate(date);
      setBusIsRoundTrip(true); // auto-enable roundtrip when picking a return date
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

  const renderLocationContent = (field, value) => {
    if (activeField === field) {
      return (
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Nhập thành phố, nhà ga,..."
          className="flex-1 min-w-0 bg-transparent outline-none text-gray-800 text-[15px] placeholder-gray-400"
        />
      );
    }
    if (value) {
      return (
        <span className="flex-1 min-w-0 font-bold text-gray-900 text-[15px] truncate">
          {value.name}
        </span>
      );
    }
    return (
      <span className="flex-1 min-w-0 text-gray-400 text-[15px] truncate">
        Nhập thành phố, nhà ga,...
      </span>
    );
  };

  return (
    <>
      {/* Labels row — aligned above each pill cell */}
      <div className="flex items-center mb-3 text-white text-sm font-medium">
        <div className="flex-[2] flex items-center">
          <div className="flex-1 px-6">Từ</div>
          <div className="w-14 shrink-0" aria-hidden />
          <div className="flex-1 px-6">Đến</div>
        </div>
        <div className="flex-[2] flex">
          <div className="flex-1 px-6">Ngày khởi hành</div>
          <div className="flex-1 px-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={busIsRoundTrip}
                onChange={(e) => {
                  setBusIsRoundTrip(e.target.checked);
                  if (!e.target.checked && openCalendarFor === "return") {
                    setOpenCalendarFor(null);
                  }
                }}
                className="w-[18px] h-[18px] rounded accent-[#55B6FF] cursor-pointer"
              />
              <span>Khứ hồi</span>
            </label>
          </div>
        </div>
        <div className="flex-1 px-6">Số ghế</div>
        <div className="w-28 shrink-0" aria-hidden />
      </div>

      {/* Single white pill containing all cells + search button */}
      <div className="bg-white rounded-full flex items-stretch shadow-2xl">
        {/* From + Swap + To — wrapped so the dropdown anchors here */}
        <div className="flex-[2] flex items-stretch relative" ref={locationWrapperRef}>
          {/* From */}
          <button
            type="button"
            onClick={() => {
              setActiveField("from");
              setQuery("");
            }}
            className="flex-1 flex items-center gap-3 px-6 py-4 rounded-l-full text-left hover:bg-gray-50 transition-colors min-w-0"
          >
            <img src="/nhom01_dulich_booking/assets/icons/bus-active.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            {renderLocationContent("from", from)}
          </button>

          {/* Swap */}
          <div className="flex items-center px-2 relative z-10">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Đổi chiều"
              className="w-10 h-10 rounded-full bg-sky-50 border-2 border-white shadow flex items-center justify-center hover:bg-sky-100 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 20l-4-4 4-4" />
              </svg>
            </button>
          </div>

          {/* To */}
          <button
            type="button"
            onClick={() => {
              setActiveField("to");
              setQuery("");
            }}
            className="flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors min-w-0"
          >
            <img src="/nhom01_dulich_booking/assets/icons/bus-active.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            {renderLocationContent("to", to)}
          </button>

          {/* Dropdown */}
          {activeField && (
            <div
              className={`absolute top-full mt-3 z-50 ${
                activeField === "from" ? "left-0" : "right-0"
              }`}
            >
              <BusLocationDropdown items={filtered} onSelect={handleSelect} />
            </div>
          )}
        </div>

        {/* Dates wrapper (flex-[2]) — contains Depart + Return + calendar popup */}
        <div className="flex-[2] flex items-stretch relative" ref={dateWrapperRef}>
          {/* Depart date */}
          <button
            type="button"
            onClick={() => setOpenCalendarFor("departure")}
            className={`flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors ${
              openCalendarFor === "departure" ? "bg-sky-50" : ""
            }`}
          >
            <img src="/nhom01_dulich_booking/assets/icons/calendar.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-gray-800 text-[15px]">{fmt(busDepartureDate)}</span>
          </button>

          {/* Return date — mờ khi isRoundTrip=false */}
          <button
            type="button"
            onClick={() => setOpenCalendarFor("return")}
            className={`flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors ${
              !busIsRoundTrip ? "bg-gray-50" : ""
            } ${openCalendarFor === "return" ? "bg-sky-50" : ""}`}
          >
            <img
              src="/nhom01_dulich_booking/assets/icons/calendar.png"
              alt=""
              className={`w-6 h-6 object-contain shrink-0 ${!busIsRoundTrip ? "opacity-60" : ""}`}
            />
            <span
              className={`text-[15px] ${
                busIsRoundTrip && busReturnDate ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {busIsRoundTrip && busReturnDate ? fmt(busReturnDate) : "Chọn ngày về"}
            </span>
          </button>

          {/* Calendar popup */}
          {openCalendarFor && (
            <div
              className={`absolute top-full mt-3 z-50 ${
                openCalendarFor === "departure" ? "left-0" : "right-0"
              }`}
            >
              <FlightDatePicker
                selected={openCalendarFor === "departure" ? busDepartureDate : busReturnDate}
                minDate={openCalendarFor === "return" ? busDepartureDate : undefined}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        {/* Seats — clickable, opens passenger dropdown */}
        <div className="flex-1 flex items-stretch relative" ref={passengerWrapperRef}>
          <button
            type="button"
            onClick={() => setIsPassengerOpen((v) => !v)}
            className={`flex-1 flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
              isPassengerOpen ? "bg-sky-50" : ""
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-[#55B6FF] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="3" />
              <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
            </svg>
            <span className="text-gray-800 text-[15px]">{passengers} hành khách</span>
          </button>

          {isPassengerOpen && (
            <div className="absolute top-full left-0 mt-3 z-50">
              <BusPassengerDropdown
                selected={passengers}
                onSelect={(n) => {
                  setPassengers(n);
                  setIsPassengerOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Search */}
        <button
          type="button"
          aria-label="Tìm kiếm"
          className="bg-[#55B6FF] hover:bg-[#3fa5f5] transition-colors px-10 flex items-center justify-center shrink-0 rounded-r-full"
        >
          <img src="/nhom01_dulich_booking/assets/icons/search.png" alt="" className="w-7 h-7 object-contain" />
        </button>
      </div>
    </>
  );
}

/* ======================================================================
   CAR RENTAL FORM — "Thuê xe" mode
   ====================================================================== */
const carRentalLocations = [
  { id: "city-hcm", name: "Thành phố Hồ Chí Minh", subtitle: "Việt Nam", typeLabel: "City" },
  { id: "city-hn", name: "Hà Nội", subtitle: "Việt Nam", typeLabel: "City" },
  { id: "city-dn", name: "Đà Nẵng", subtitle: "Việt Nam", typeLabel: "City" },
  { id: "city-dalat", name: "Đà Lạt", subtitle: "Lâm Đồng, Việt Nam", typeLabel: "City" },
  { id: "city-nhatrang", name: "Nha Trang", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "City" },
  { id: "city-phuquoc", name: "Phú Quốc", subtitle: "Kiên Giang, Việt Nam", typeLabel: "City" },
  { id: "ap-sgn", name: "Tan Son Nhat International Airport (SGN)", subtitle: "Ward 2, Tan Binh District, Ho Chi Minh City, Việt Nam", typeLabel: "Airport" },
  { id: "ap-han", name: "Noi Bai International Airport (HAN)", subtitle: "Soc Son District, Hà Nội, Việt Nam", typeLabel: "Airport" },
  { id: "ap-dad", name: "Da Nang International Airport (DAD)", subtitle: "Hai Chau District, Đà Nẵng, Việt Nam", typeLabel: "Airport" },
  { id: "ap-cxr", name: "Cam Ranh International Airport (CXR)", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "Airport" },
  { id: "ht-landmark81", name: "Vinpearl Landmark 81", subtitle: "Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam", typeLabel: "Hotel" },
  { id: "ht-newworld", name: "New World Saigon Hotel", subtitle: "Quận 1, Thành phố Hồ Chí Minh, Việt Nam", typeLabel: "Hotel" },
  { id: "ht-intercon", name: "InterContinental Hanoi Landmark72", subtitle: "Nam Từ Liêm, Hà Nội, Việt Nam", typeLabel: "Hotel" },
  { id: "ht-novotel", name: "Novotel Danang Premier Han River", subtitle: "Hải Châu, Đà Nẵng, Việt Nam", typeLabel: "Hotel" },
  { id: "ht-dalatpalace", name: "Dalat Palace Heritage Hotel", subtitle: "Đà Lạt, Lâm Đồng, Việt Nam", typeLabel: "Hotel" },
];

function CarRentalForm() {
  const [rentalMode, setRentalMode] = useState("self-drive"); // "self-drive" | "with-driver"
  const [location, setLocation] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationWrapperRef = useRef(null);

  // Date state
  const [rentalStartDate, setRentalStartDate] = useState(new Date(2026, 3, 17));
  const [rentalEndDate, setRentalEndDate] = useState(new Date(2026, 3, 19));
  const [openCalendarFor, setOpenCalendarFor] = useState(null); // 'start' | 'end' | null
  const startDateWrapperRef = useRef(null);
  const endDateWrapperRef = useRef(null);

  // Time state
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(20);
  const [endMinute, setEndMinute] = useState(0);
  const [openTimePickerFor, setOpenTimePickerFor] = useState(null); // 'start' | 'end' | null
  const startTimeWrapperRef = useRef(null);
  const endTimeWrapperRef = useRef(null);

  const fmtDate = (d) => `${d.getDate()} thg ${d.getMonth() + 1}, ${d.getFullYear()}`;
  const fmtTime = (h, m) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  useEffect(() => {
    const handler = (e) => {
      if (locationWrapperRef.current && !locationWrapperRef.current.contains(e.target)) {
        setIsLocationOpen(false);
      }
      if (openCalendarFor === "start") {
        const ref = startDateWrapperRef.current;
        if (ref && !ref.contains(e.target)) setOpenCalendarFor(null);
      } else if (openCalendarFor === "end") {
        const ref = endDateWrapperRef.current;
        if (ref && !ref.contains(e.target)) setOpenCalendarFor(null);
      }
      if (openTimePickerFor === "start") {
        const ref = startTimeWrapperRef.current;
        if (ref && !ref.contains(e.target)) setOpenTimePickerFor(null);
      } else if (openTimePickerFor === "end") {
        const ref = endTimeWrapperRef.current;
        if (ref && !ref.contains(e.target)) setOpenTimePickerFor(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openCalendarFor, openTimePickerFor]);

  const q = location.trim().toLowerCase();
  const filteredLocations =
    q === ""
      ? carRentalLocations
      : carRentalLocations.filter(
          (l) =>
            l.name.toLowerCase().includes(q) ||
            l.subtitle.toLowerCase().includes(q) ||
            l.typeLabel.toLowerCase().includes(q)
        );

  const handleSelectLocation = (item) => {
    setLocation(item.name);
    setIsLocationOpen(false);
  };

  const handleDateSelect = (date) => {
    if (openCalendarFor === "start") {
      setRentalStartDate(date);
      // If new start is after current end, push end to match start
      if (rentalEndDate && date.getTime() > rentalEndDate.getTime()) {
        setRentalEndDate(date);
      }
    } else if (openCalendarFor === "end") {
      setRentalEndDate(date);
    }
    setOpenCalendarFor(null);
  };

  const tabClass = (active) =>
    `flex items-center gap-2 px-6 py-2.5 rounded-full transition-colors ${
      active
        ? "bg-[#55B6FF] text-white font-semibold shadow-md"
        : "bg-black/40 text-white font-medium backdrop-blur-sm hover:bg-white/20"
    }`;

  const ClockIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#55B6FF] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );

  return (
    <>
      {/* Rental mode sub-tabs */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => setRentalMode("self-drive")}
          className={tabClass(rentalMode === "self-drive")}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6h-2v-2H7v2H5v-6zm2.2-1h9.6L16 7H8l-.8 3zM7 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          Tự lái
        </button>
        <button
          type="button"
          onClick={() => setRentalMode("with-driver")}
          className={tabClass(rentalMode === "with-driver")}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="3" />
            <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
          </svg>
          Có tài xế
        </button>
      </div>

      {/* Labels row */}
      <div className="flex items-center mb-3 text-white text-sm font-medium">
        <div className="flex-[2] px-6">Địa điểm thuê xe của bạn</div>
        <div className="flex-1 px-6">Ngày bắt đầu</div>
        <div className="flex-1 px-6">Giờ bắt đầu</div>
        <div className="flex-1 px-6">Ngày kết thúc</div>
        <div className="flex-1 px-6">Giờ kết thúc</div>
        <div className="w-24 shrink-0" aria-hidden />
      </div>

      {/* Input pill */}
      <div className="bg-white rounded-full flex items-stretch shadow-2xl">
        {/* Location — wrapped for dropdown anchoring */}
        <div className="flex-[2] flex items-stretch relative" ref={locationWrapperRef}>
          <div className="flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 rounded-l-full">
            <img src="/nhom01_dulich_booking/assets/icons/location.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setIsLocationOpen(true);
              }}
              onFocus={() => setIsLocationOpen(true)}
              onClick={() => setIsLocationOpen(true)}
              placeholder="Điền thành phố, sân bay hoặc khách sạn"
              className="flex-1 min-w-0 outline-none text-gray-800 placeholder-gray-400 text-[15px] bg-transparent"
            />
          </div>

          {isLocationOpen && (
            <div className="absolute top-full left-0 mt-3 z-50">
              <CarRentalLocationDropdown
                items={filteredLocations}
                onSelect={handleSelectLocation}
              />
            </div>
          )}
        </div>

        {/* Start date — clickable, opens calendar */}
        <div className="flex-1 flex items-stretch relative" ref={startDateWrapperRef}>
          <button
            type="button"
            onClick={() => setOpenCalendarFor("start")}
            className={`flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors ${
              openCalendarFor === "start" ? "bg-sky-50" : ""
            }`}
          >
            <img src="/nhom01_dulich_booking/assets/icons/calendar.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-gray-800 text-[15px]">{fmtDate(rentalStartDate)}</span>
          </button>

          {openCalendarFor === "start" && (
            <div className="absolute top-full left-0 mt-3 z-50">
              <FlightDatePicker
                selected={rentalStartDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        {/* Start time — clickable, opens time picker */}
        <div className="flex-1 flex items-stretch relative" ref={startTimeWrapperRef}>
          <button
            type="button"
            onClick={() => setOpenTimePickerFor("start")}
            className={`flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors ${
              openTimePickerFor === "start" ? "bg-sky-50" : ""
            }`}
          >
            <ClockIcon />
            <span className="text-gray-800 text-[15px]">{fmtTime(startHour, startMinute)}</span>
          </button>

          {openTimePickerFor === "start" && (
            <div className="absolute top-full left-0 mt-3 z-50">
              <CarRentalTimePicker
                hour={startHour}
                minute={startMinute}
                onChange={({ hour, minute }) => {
                  setStartHour(hour);
                  setStartMinute(minute);
                }}
                onDone={() => setOpenTimePickerFor(null)}
              />
            </div>
          )}
        </div>

        {/* End date — clickable, minDate=start to block earlier dates */}
        <div className="flex-1 flex items-stretch relative" ref={endDateWrapperRef}>
          <button
            type="button"
            onClick={() => setOpenCalendarFor("end")}
            className={`flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors ${
              openCalendarFor === "end" ? "bg-sky-50" : ""
            }`}
          >
            <img src="/nhom01_dulich_booking/assets/icons/calendar.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-gray-800 text-[15px]">{fmtDate(rentalEndDate)}</span>
          </button>

          {openCalendarFor === "end" && (
            <div className="absolute top-full right-0 mt-3 z-50">
              <FlightDatePicker
                selected={rentalEndDate}
                minDate={rentalStartDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}
        </div>

        {/* End time — clickable, opens time picker */}
        <div className="flex-1 flex items-stretch relative" ref={endTimeWrapperRef}>
          <button
            type="button"
            onClick={() => setOpenTimePickerFor("end")}
            className={`flex-1 flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
              openTimePickerFor === "end" ? "bg-sky-50" : ""
            }`}
          >
            <ClockIcon />
            <span className="text-gray-800 text-[15px]">{fmtTime(endHour, endMinute)}</span>
          </button>

          {openTimePickerFor === "end" && (
            <div className="absolute top-full right-0 mt-3 z-50">
              <CarRentalTimePicker
                hour={endHour}
                minute={endMinute}
                onChange={({ hour, minute }) => {
                  setEndHour(hour);
                  setEndMinute(minute);
                }}
                onDone={() => setOpenTimePickerFor(null)}
              />
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          type="button"
          aria-label="Tìm kiếm"
          className="bg-[#55B6FF] hover:bg-[#3fa5f5] transition-colors px-8 flex items-center justify-center shrink-0 rounded-r-full"
        >
          <img src="/nhom01_dulich_booking/assets/icons/search.png" alt="" className="w-7 h-7 object-contain" />
        </button>
      </div>
    </>
  );
}

/* ======================================================================
   ACTIVITIES FORM — "Hoạt động" mode
   ====================================================================== */
function ActivitiesForm() {
  const [query, setQuery] = useState("");

  const categories = [
    { label: "Điểm tham quan", icon: "/nhom01_dulich_booking/assets/icons/activity-sight.png" },
    { label: "Trải nghiệm ẩm thực", icon: "/nhom01_dulich_booking/assets/icons/activity-food.png" },
    { label: "Trải nghiệm văn hóa", icon: "/nhom01_dulich_booking/assets/icons/activity-culture.png" },
    { label: "Trò chơi", icon: "/nhom01_dulich_booking/assets/icons/activity-games.png" },
    { label: "Tour", icon: "/nhom01_dulich_booking/assets/icons/activity-tour.png" },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Search */}
      <div className="w-full bg-white rounded-full flex items-stretch shadow-2xl">
        <div className="flex-1 flex items-center px-8 py-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bạn có ý tưởng gì cho chuyến đi tiếp theo không?"
            className="flex-1 min-w-0 bg-transparent outline-none text-gray-800 text-[15px] placeholder-gray-400"
          />
        </div>
        <button
          type="button"
          aria-label="Tìm kiếm"
          className="bg-[#55B6FF] hover:bg-[#3fa5f5] transition-colors px-8 flex items-center justify-center shrink-0 rounded-r-full"
        >
          <img src="/nhom01_dulich_booking/assets/icons/search.png" alt="" className="w-7 h-7 object-contain" />
        </button>
      </div>

      {/* Guidance */}
      <p className="text-white/90 text-[15px] text-center">
        Hoặc chọn một danh mục để mở khóa trải nghiệm tiếp theo của bạn
      </p>

      {/* Categories */}
      <div className="flex items-center justify-center flex-wrap gap-3">
        {categories.map(({ label, icon }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 hover:bg-white/20 transition-colors text-white font-medium backdrop-blur-sm"
          >
            <img src={icon} alt="" className="w-5 h-5 object-contain shrink-0" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================================================================
   AIRPORT TRANSFER FORM — "Đưa đón sân bay" mode
   ====================================================================== */
const transferAirports = [
  { id: "ap-han", name: "Sân bay quốc tế Nội Bài (HAN)", subtitle: "Hà Nội, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-sgn", name: "Sân bay quốc tế Tân Sơn Nhất (SGN)", subtitle: "Thành phố Hồ Chí Minh, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-dad", name: "Sân bay quốc tế Đà Nẵng (DAD)", subtitle: "Đà Nẵng, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-cxr", name: "Sân bay quốc tế Cam Ranh (CXR)", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-pqc", name: "Sân bay Phú Quốc (PQC)", subtitle: "Kiên Giang, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-vca", name: "Sân bay Cần Thơ (VCA)", subtitle: "Cần Thơ, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-hui", name: "Sân bay Phú Bài (HUI)", subtitle: "Thừa Thiên Huế, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-dli", name: "Sân bay Liên Khương (DLI)", subtitle: "Lâm Đồng, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-hph", name: "Sân bay Cát Bi (HPH)", subtitle: "Hải Phòng, Việt Nam", typeLabel: "SÂN BAY" },
  { id: "ap-vii", name: "Sân bay Vinh (VII)", subtitle: "Nghệ An, Việt Nam", typeLabel: "SÂN BAY" },
];

const transferDestinations = [
  { id: "dest-benthanh", name: "Chợ Bến Thành", subtitle: "Quận 1, Thành phố Hồ Chí Minh, Việt Nam", typeLabel: "ĐỊA DANH" },
  { id: "dest-dailai", name: "Hồ Đại Lải", subtitle: "Vĩnh Phúc, Việt Nam", typeLabel: "KHU VỰC" },
  { id: "dest-hoankiem", name: "Hồ Hoàn Kiếm", subtitle: "Hoàn Kiếm, Hà Nội, Việt Nam", typeLabel: "ĐỊA DANH" },
  { id: "dest-hoian", name: "Phố cổ Hội An", subtitle: "Quảng Nam, Việt Nam", typeLabel: "ĐỊA DANH" },
  { id: "dest-banahills", name: "Bà Nà Hills", subtitle: "Đà Nẵng, Việt Nam", typeLabel: "ĐỊA DANH" },
  { id: "dest-vinpearlnt", name: "Vinpearl Nha Trang", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "KHÁCH SẠN" },
  { id: "dest-landmark81", name: "Landmark 81", subtitle: "Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam", typeLabel: "ĐỊA DANH" },
  { id: "dest-sunworld", name: "Sun World Hạ Long", subtitle: "Quảng Ninh, Việt Nam", typeLabel: "ĐỊA DANH" },
  { id: "dest-intercondn", name: "InterContinental Danang Sun Peninsula Resort", subtitle: "Đà Nẵng, Việt Nam", typeLabel: "KHÁCH SẠN" },
  { id: "dest-hotram", name: "Khu nghỉ dưỡng Hồ Tràm", subtitle: "Bà Rịa - Vũng Tàu, Việt Nam", typeLabel: "KHU VỰC" },
];

function AirportTransferForm() {
  const [fromAirport, setFromAirport] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [activeField, setActiveField] = useState(null); // 'from' | 'to' | null
  const [query, setQuery] = useState("");
  const locationWrapperRef = useRef(null);

  // Pickup date state
  const [pickupDate, setPickupDate] = useState(new Date(2026, 3, 15));
  const [isDateOpen, setIsDateOpen] = useState(false);
  const dateWrapperRef = useRef(null);

  // Pickup time state
  const [pickupHour, setPickupHour] = useState(21);
  const [pickupMinute, setPickupMinute] = useState(55);
  const [isPickupTimeOpen, setIsPickupTimeOpen] = useState(false);
  const timeWrapperRef = useRef(null);

  const fmtDate = (d) => `${d.getDate()} thg ${d.getMonth() + 1}, ${d.getFullYear()}`;
  const fmtTime = (h, m) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  useEffect(() => {
    const handler = (e) => {
      if (locationWrapperRef.current && !locationWrapperRef.current.contains(e.target)) {
        setActiveField(null);
        setQuery("");
      }
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(e.target)) {
        setIsDateOpen(false);
      }
      if (timeWrapperRef.current && !timeWrapperRef.current.contains(e.target)) {
        setIsPickupTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDateSelect = (date) => {
    setPickupDate(date);
    setIsDateOpen(false);
  };

  const handleSwap = () => {
    setFromAirport(toLocation);
    setToLocation(fromAirport);
    setActiveField(null);
    setQuery("");
  };

  const handleSelect = (item) => {
    if (activeField === "from") setFromAirport(item);
    else if (activeField === "to") setToLocation(item);
    setActiveField(null);
    setQuery("");
  };

  const qLower = query.trim().toLowerCase();
  const filterItems = (list) =>
    qLower === ""
      ? list
      : list.filter(
          (i) =>
            i.name.toLowerCase().includes(qLower) ||
            i.subtitle.toLowerCase().includes(qLower) ||
            i.typeLabel.toLowerCase().includes(qLower)
        );
  const filteredAirports = filterItems(transferAirports);
  const filteredDestinations = filterItems(transferDestinations);

  const ClockIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#55B6FF] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );

  const renderFieldContent = (field, value, placeholder) => {
    if (activeField === field) {
      return (
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent outline-none text-gray-800 text-[15px] placeholder-gray-400"
        />
      );
    }
    if (value) {
      return (
        <span className="flex-1 min-w-0 font-bold text-gray-900 text-[15px] truncate">
          {value.name}
        </span>
      );
    }
    return (
      <span className="flex-1 min-w-0 text-gray-400 text-[15px] truncate">
        {placeholder}
      </span>
    );
  };

  return (
    <>
      {/* Labels row */}
      <div className="flex items-center mb-3 text-white text-sm font-medium">
        <div className="flex-[2] flex items-center">
          <div className="flex-1 px-6">Từ sân bay</div>
          <div className="w-14 shrink-0" aria-hidden />
          <div className="flex-1 px-6">Đến khu vực, địa chỉ, toà nhà</div>
        </div>
        <div className="flex-1 px-6">Ngày đón</div>
        <div className="flex-1 px-6">Giờ đón</div>
        <div className="w-24 shrink-0" aria-hidden />
      </div>

      {/* Single white pill */}
      <div className="bg-white rounded-full flex items-stretch shadow-2xl">
        {/* From + Swap + To — wrapped for dropdown anchoring */}
        <div className="flex-[2] flex items-stretch relative" ref={locationWrapperRef}>
          {/* From */}
          <button
            type="button"
            onClick={() => {
              setActiveField("from");
              setQuery("");
            }}
            className="flex-1 flex items-center gap-3 px-6 py-4 rounded-l-full text-left hover:bg-gray-50 transition-colors min-w-0"
          >
            <img src="/nhom01_dulich_booking/assets/icons/plane-depart.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            {renderFieldContent("from", fromAirport, "Ví dụ Sân bay quốc tế Nội Bài")}
          </button>

          {/* Swap */}
          <div className="flex items-center px-2 relative z-10">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Đổi chiều"
              className="w-10 h-10 rounded-full bg-sky-50 border-2 border-white shadow flex items-center justify-center hover:bg-sky-100 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 20l-4-4 4-4" />
              </svg>
            </button>
          </div>

          {/* To */}
          <button
            type="button"
            onClick={() => {
              setActiveField("to");
              setQuery("");
            }}
            className="flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors min-w-0"
          >
            <img src="/nhom01_dulich_booking/assets/icons/location.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            {renderFieldContent("to", toLocation, "Ví dụ Chợ Bến Thành")}
          </button>

          {/* Dropdown popup */}
          {activeField === "from" && (
            <div className="absolute top-full left-0 mt-3 z-50">
              <AirportTransferLocationDropdown
                recentLabel="Tìm kiếm gần đây"
                recentItems={fromAirport ? [fromAirport] : []}
                sectionLabel="Các sân bay phổ biến"
                items={filteredAirports}
                onSelect={handleSelect}
              />
            </div>
          )}
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

        {/* Date — clickable, opens calendar */}
        <div className="flex-1 flex items-stretch relative" ref={dateWrapperRef}>
          <button
            type="button"
            onClick={() => setIsDateOpen((v) => !v)}
            className={`flex-1 flex items-center gap-3 px-6 py-4 border-r border-gray-200 text-left hover:bg-gray-50 transition-colors ${
              isDateOpen ? "bg-sky-50" : ""
            }`}
          >
            <img src="/nhom01_dulich_booking/assets/icons/calendar.png" alt="" className="w-6 h-6 object-contain shrink-0" />
            <span className="text-gray-800 text-[15px]">{fmtDate(pickupDate)}</span>
          </button>

          {isDateOpen && (
            <div className="absolute top-full left-0 mt-3 z-50">
              <FlightDatePicker selected={pickupDate} onSelect={handleDateSelect} />
            </div>
          )}
        </div>

        {/* Time — clickable, opens time picker */}
        <div className="flex-1 flex items-stretch relative" ref={timeWrapperRef}>
          <button
            type="button"
            onClick={() => setIsPickupTimeOpen((v) => !v)}
            className={`flex-1 flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
              isPickupTimeOpen ? "bg-sky-50" : ""
            }`}
          >
            <ClockIcon />
            <span className="text-gray-800 text-[15px]">{fmtTime(pickupHour, pickupMinute)}</span>
          </button>

          {isPickupTimeOpen && (
            <div className="absolute top-full right-0 mt-3 z-50">
              <AirportTransferTimePicker
                hour={pickupHour}
                minute={pickupMinute}
                onChange={({ hour, minute }) => {
                  setPickupHour(hour);
                  setPickupMinute(minute);
                }}
                onDone={() => setIsPickupTimeOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Search */}
        <button
          type="button"
          aria-label="Tìm kiếm"
          className="bg-[#55B6FF] hover:bg-[#3fa5f5] transition-colors px-8 flex items-center justify-center shrink-0 rounded-r-full"
        >
          <img src="/nhom01_dulich_booking/assets/icons/search.png" alt="" className="w-7 h-7 object-contain" />
        </button>
      </div>
    </>
  );
}

/* ======================================================================
   MAIN COMPONENT
   ====================================================================== */
export default function HomeBookingSearch() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="w-full">
      {/* Service tabs */}
      <div className="flex items-center flex-wrap gap-2 md:gap-3">
        {serviceTabs.map((tab, idx) => {
          const isActive = idx === activeService;
          const iconSrc = isActive && tab.activeIcon ? tab.activeIcon : tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveService(idx)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-white text-gray-900 font-semibold shadow-md"
                  : "text-white/95 font-medium hover:bg-white/15 hover:backdrop-blur-md hover:text-white"
              }`}
            >
              <img
                src={iconSrc}
                alt=""
                className={`w-6 h-6 object-contain ${
                  isActive ? "" : "mix-blend-screen"
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-px bg-white/30 my-6" />

      {/* Conditional form based on active service */}
      {activeService === 0 && <HotelSearchForm />}
      {activeService === 1 && <FlightSearchForm />}
      {activeService === 2 && <BusTicketForm />}
      {activeService === 3 && <CarRentalForm />}
      {activeService === 4 && <ActivitiesForm />}
      {activeService === 5 && <AirportTransferForm />}
    </div>
  );
}
