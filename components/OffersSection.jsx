"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const offers = [
  {
    id: 1,
    image: "/assets/vouchers/voucher-1.svg",
    title: "Sale Hoa Anh Đào",
    subtitle: "Vé tham quan & Trải nghiệm",
    tag: "Sale Hoa Anh Đào",
    cta: "Giảm đến 50%",
  },
  {
    id: 2,
    image: "/assets/vouchers/voucher-2.svg",
    title: "Siêu hội thành viên",
    subtitle: "Ngày 20 - 25 hàng tháng",
    tag: "Ưu đãi thành viên",
    cta: "Xem thêm",
  },
  {
    id: 3,
    image: "/assets/vouchers/voucher-3.svg",
    title: "Sống trọn đam mê K-Culture",
    subtitle: "Du lịch cùng VieGo",
    tag: "Hàn Quốc",
    cta: "Xem thêm",
  },
  {
    id: 4,
    image: "/assets/vouchers/voucher-4.svg",
    title: "Ưu đãi 4",
    subtitle: "Mô tả voucher 4",
    tag: "Ưu đãi",
    cta: "Xem thêm",
  },
  {
    id: 5,
    image: "/assets/vouchers/voucher-5.svg",
    title: "Ưu đãi 5",
    subtitle: "Mô tả voucher 5",
    tag: "Ưu đãi",
    cta: "Xem thêm",
  },
  {
    id: 6,
    image: "/assets/vouchers/voucher-6.svg",
    title: "Ưu đãi 6",
    subtitle: "Mô tả voucher 6",
    tag: "Ưu đãi",
    cta: "Xem thêm",
  },
];

function useItemsPerView() {
  const [items, setItems] = useState(3);

  useEffect(() => {
    const computeItems = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      return 3;
    };

    const handleResize = () => setItems(computeItems());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return items;
}

export default function OffersSection() {
  const itemsPerView = useItemsPerView();
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, offers.length - itemsPerView);
  const safeIndex = Math.min(index, maxIndex);

  const canPrev = safeIndex > 0;
  const canNext = safeIndex < maxIndex;

  const handlePrev = () => {
    if (canPrev) setIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    if (canNext) setIndex((i) => Math.min(maxIndex, i + 1));
  };

  const slideWidthPct = 100 / itemsPerView;
  const translatePct = safeIndex * slideWidthPct;

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Ưu đãi cho bạn
        </h2>

        <div className="relative">
          <button
            type="button"
            aria-label="Voucher trước"
            onClick={handlePrev}
            disabled={!canPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${translatePct}%)` }}
            >
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="shrink-0 px-3"
                  style={{ width: `${slideWidthPct}%` }}
                >
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Voucher tiếp theo"
            onClick={handleNext}
            disabled={!canNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
