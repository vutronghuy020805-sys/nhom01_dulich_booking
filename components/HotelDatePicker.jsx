"use client";

import { useMemo, useState } from "react";

const WEEKDAYS_VN = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];
const DAY_NAMES_VN = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function isBefore(a, b) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}
function isInRangeStrict(d, start, end) {
  if (!start || !end) return false;
  const t = startOfDay(d).getTime();
  return t > startOfDay(start).getTime() && t < startOfDay(end).getTime();
}
function formatLong(d) {
  if (!d) return "—";
  return `${DAY_NAMES_VN[d.getDay()]}, ${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}`;
}

function getMonthCells(year, month) {
  const firstDay = new Date(year, month, 1);
  const firstCol = (firstDay.getDay() + 6) % 7; // Mon=0, Sun=6
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstCol; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

function MonthView({ viewDate, today, checkIn, checkOut, onSelectDay, onPrev, onNext }) {
  const cells = useMemo(
    () => getMonthCells(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  return (
    <div className="flex-1 min-w-0">
      {/* Month header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="font-semibold text-gray-800">
          tháng {viewDate.getMonth() + 1} năm {viewDate.getFullYear()}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Tháng trước"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Tháng sau"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#55B6FF] hover:text-[#3fa5f5] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-600 pb-2 mb-2 border-b border-gray-200">
        {WEEKDAYS_VN.map((day, i) => (
          <div key={day} className={`py-1 ${i === 6 ? "text-red-500" : ""}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} />;

          const past = isBefore(d, today);
          const isCheckIn = isSameDay(d, checkIn);
          const isCheckOut = isSameDay(d, checkOut);
          const inRange = isInRangeStrict(d, checkIn, checkOut);
          const isSelected = isCheckIn || isCheckOut;
          const isSunday = d.getDay() === 0;

          let cls = "aspect-square flex items-center justify-center text-sm rounded-full transition-colors";
          if (past) {
            cls += " text-gray-300 cursor-not-allowed";
          } else if (isSelected) {
            cls += " bg-[#55B6FF] text-white font-semibold";
          } else if (inRange) {
            cls += " bg-sky-100 text-gray-800 font-medium rounded-none";
          } else {
            cls += ` cursor-pointer hover:bg-sky-50 ${isSunday ? "text-red-500" : "text-gray-800"}`;
          }

          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={past}
              onClick={() => !past && onSelectDay(d)}
              className={cls}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HotelDatePicker({ checkIn, checkOut, onChange }) {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [viewDate, setViewDate] = useState(() => {
    const base = checkIn || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const rightMonth = addMonths(viewDate, 1);

  const handleSelectDay = (date) => {
    // Case 1: no check-in selected → set check-in
    // Case 2: both set → reset, new check-in
    if (!checkIn || (checkIn && checkOut)) {
      onChange({ checkIn: date, checkOut: null });
      return;
    }
    // Case 3: only check-in set, new date ≤ check-in → replace check-in
    if (!isBefore(checkIn, date)) {
      onChange({ checkIn: date, checkOut: null });
      return;
    }
    // Case 4: only check-in set, new date > check-in → set check-out
    onChange({ checkIn, checkOut: date });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-[760px] max-w-[92vw]">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Ngày Ở</h2>

      <div className="grid grid-cols-2 gap-6 mb-5 pb-4 border-b border-gray-200">
        <div>
          <div className="text-sm text-gray-500">Nhận phòng</div>
          <div className="font-semibold text-gray-800 text-[15px]">{formatLong(checkIn)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Trả phòng</div>
          <div className="font-semibold text-gray-800 text-[15px]">{formatLong(checkOut)}</div>
        </div>
      </div>

      <div className="flex gap-8">
        <MonthView
          viewDate={viewDate}
          today={today}
          checkIn={checkIn}
          checkOut={checkOut}
          onSelectDay={handleSelectDay}
          onPrev={() => setViewDate(addMonths(viewDate, -1))}
          onNext={() => setViewDate(addMonths(viewDate, 1))}
        />
        <MonthView
          viewDate={rightMonth}
          today={today}
          checkIn={checkIn}
          checkOut={checkOut}
          onSelectDay={handleSelectDay}
          onPrev={() => setViewDate(addMonths(viewDate, -1))}
          onNext={() => setViewDate(addMonths(viewDate, 1))}
        />
      </div>
    </div>
  );
}
