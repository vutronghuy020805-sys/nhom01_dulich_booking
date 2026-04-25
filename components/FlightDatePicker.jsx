"use client";

import { useMemo, useState } from "react";

const WEEKDAYS_VN = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

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

function getMonthCells(year, month) {
  const firstDay = new Date(year, month, 1);
  const firstCol = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstCol; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

function MonthView({
  viewDate,
  today,
  selected,
  minDate,
  onSelect,
  onPrev,
  onNext,
  showPrev,
  showNext,
}) {
  const cells = useMemo(
    () => getMonthCells(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 shrink-0">
          {showPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Tháng trước"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-xl font-bold text-blue-900">
            tháng {String(viewDate.getMonth() + 1).padStart(2, "0")} {viewDate.getFullYear()}
          </h3>
        </div>
        <div className="w-10 shrink-0 flex justify-end">
          {showNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Tháng sau"
              className="w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center text-[#55B6FF] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-sm text-gray-600 pb-2 mb-2 border-b border-gray-200">
        {WEEKDAYS_VN.map((day, i) => (
          <div key={day} className={`text-center py-1 ${i === 6 ? "text-red-500" : ""}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} />;

          const past = isBefore(d, today);
          const beforeMin = minDate && isBefore(d, minDate);
          const disabled = past || beforeMin;
          const isSelected = isSameDay(d, selected);
          const isToday = isSameDay(d, today);
          const isSunday = d.getDay() === 0;

          let cls =
            "relative aspect-square flex items-center justify-center text-lg rounded-full transition-colors";
          if (disabled) {
            cls += " text-gray-300 cursor-not-allowed";
          } else if (isSelected) {
            cls += " border-2 border-[#55B6FF] text-[#55B6FF] font-bold cursor-pointer";
          } else {
            cls += ` font-bold cursor-pointer hover:bg-sky-50 ${
              isSunday ? "text-red-500" : "text-gray-800"
            }`;
          }

          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelect(d)}
              className={cls}
            >
              {isToday && !disabled && (
                <span className="absolute top-0 left-1 text-[10px] font-medium text-gray-500">
                  Hôm nay
                </span>
              )}
              <span>{d.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FlightDatePicker({ selected, minDate, onSelect }) {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [viewDate, setViewDate] = useState(() => {
    const base = selected || minDate || new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const rightMonth = addMonths(viewDate, 1);

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-[780px] max-w-[92vw]">
      <div className="flex gap-8">
        <MonthView
          viewDate={viewDate}
          today={today}
          selected={selected}
          minDate={minDate}
          onSelect={onSelect}
          onPrev={() => setViewDate(addMonths(viewDate, -1))}
          onNext={() => setViewDate(addMonths(viewDate, 1))}
          showPrev
          showNext={false}
        />
        <MonthView
          viewDate={rightMonth}
          today={today}
          selected={selected}
          minDate={minDate}
          onSelect={onSelect}
          onPrev={() => setViewDate(addMonths(viewDate, -1))}
          onNext={() => setViewDate(addMonths(viewDate, 1))}
          showPrev={false}
          showNext
        />
      </div>
    </div>
  );
}
