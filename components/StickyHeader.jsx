"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SupportDropdown from "@/components/shared/SupportDropdown";
import ThemeToggle from "@/components/theme/ThemeToggle";

const serviceMenu = [
  { label: "Khách sạn", href: "/hotels" },
  { label: "Vé máy bay", href: "/flights" },
  { label: "Vé xe khách", href: "/bus" },
  { label: "Thuê xe", href: "/car-rental" },
  { label: "Hoạt động", href: "/activities" },
  { label: "Đưa đón sân bay", href: "/airport-transfer" },
];

const topRightMenu = [
  { label: "VND | VI", href: "#" },
  { label: "Hỗ trợ", href: "#" },
  { label: "Đặt chỗ của tôi", href: "/my-bookings" },
  { label: "Đăng ký", href: "/login" },
];

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const threshold = 400;
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-md transition-transform duration-300 " +
        (isVisible ? "translate-y-0" : "-translate-y-full")
      }
    >
      <div className="w-full max-w-375 mx-auto px-10 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="shrink-0">
            <img
              src="/assets/logo-viego.png"
              alt="VieGo Travel"
              className="w-12 h-12 object-contain brightness-0"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-slate-700 text-sm">
            {serviceMenu.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  "px-3 py-2 rounded-full transition-colors hover:bg-gray-100 " +
                  (idx === 0 ? "font-semibold text-blue-700" : "font-medium")
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-1 text-slate-700 text-sm font-medium">
          <svg
            viewBox="0 0 30 20"
            className="w-6 h-4 rounded-[3px] shadow-sm shrink-0 mr-2"
            aria-label="Vietnam"
          >
            <rect width="30" height="20" fill="#DA251D" />
            <polygon
              fill="#FFFF00"
              points="15,5 16.18,8.38 19.76,8.45 16.9,10.62 17.94,14.04 15,12 12.06,14.04 13.1,10.62 10.24,8.45 13.82,8.38"
            />
          </svg>

          {topRightMenu.map((item) =>
            item.label === "Hỗ trợ" ? (
              <SupportDropdown key={item.label} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-full transition-colors hover:bg-gray-100"
              >
                {item.label}
              </Link>
            )
          )}

          <ThemeToggle className="ml-1" />

          <Link
            href="/login"
            className="ml-2 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
}
