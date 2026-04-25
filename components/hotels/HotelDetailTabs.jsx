"use client";

import { useEffect, useState } from "react";

const tabs = [
  { id: "overview", label: "Tổng quan" },
  { id: "rooms", label: "Phòng" },
  { id: "policies", label: "Chính sách" },
  { id: "location", label: "Vị trí" },
  { id: "amenities", label: "Tiện ích" },
  { id: "reviews", label: "Đánh giá" },
];

export default function HotelDetailTabs() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const sectionIds = tabs.map((t) => t.id);
    const handleScroll = () => {
      const y = window.scrollY + 180;
      let current = sectionIds[0];
      let maxTop = -1;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y && el.offsetTop > maxTop) {
          current = id;
          maxTop = el.offsetTop;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-30 z-30 bg-white border-b border-gray-200">
      <div className="max-w-375 mx-auto px-6 lg:px-10 flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={
                "shrink-0 px-1 py-4 text-sm font-semibold border-b-2 transition-colors " +
                (isActive
                  ? "text-sky-600 border-sky-600"
                  : "text-slate-600 border-transparent hover:text-slate-800")
              }
            >
              {tab.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
