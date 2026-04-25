"use client";

import { useEffect, useState } from "react";
import CouponCard from "./CouponCard";

const coupons = [
  {
    id: "c1",
    title: "Giảm đến 75.000 cho lần đặt vé máy bay đầu tiên",
    description: "Áp dụng cho lần đặt đầu tiên trên ứng dụng VieGo",
    code: "VIEGOBANMOI",
    type: "flight",
  },
  {
    id: "c2",
    title: "Giảm giá tới 250.000 cho lần đặt phòng khách sạn",
    description: "Áp dụng cho khách sạn có dấu ưu đãi trên VieGo",
    code: "VIEGOHOTEL",
    type: "hotel",
  },
  {
    id: "c3",
    title: "Giảm đến 10% cho lần đặt vé tham quan",
    description: "Áp dụng khi đặt vé tham quan qua VieGo",
    code: "VIEGOTRAVEL",
    type: "attraction",
  },
  {
    id: "c4",
    title: "Giảm 150.000 cho kỳ nghỉ cuối tuần",
    description: "Áp dụng từ thứ 6 đến chủ nhật hàng tuần",
    code: "VIEGOWEEKEND",
    type: "weekend",
  },
  {
    id: "c5",
    title: "Ưu đãi đặc biệt cho khách hàng mới",
    description: "Đăng ký tài khoản VieGo để nhận voucher 10%",
    code: "VIEGO10",
    type: "gift",
  },
];

export default function CouponSection() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, coupons.length - visibleCount);
  const safeIndex = Math.min(index, maxIndex);
  const atStart = safeIndex === 0;
  const atEnd = safeIndex >= maxIndex;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const slidePercent = 100 / visibleCount;

  return (
    <section className="bg-gray-50 pt-8 pb-16 px-4">
      <div className="max-w-350 mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8S14 3 16.5 3a2.5 2.5 0 0 1 0 5" />
            </svg>
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Đăng ký để sử dụng coupon
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label="Xem các coupon trước"
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            disabled={atEnd}
            aria-label="Xem các coupon tiếp theo"
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${safeIndex * slidePercent}%)` }}
            >
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="shrink-0 px-3"
                  style={{ width: `${slidePercent}%` }}
                >
                  <CouponCard coupon={coupon} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
