"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ActivityTicketQuantityRow from "./ActivityTicketQuantityRow";

function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

const CATEGORIES = [
  { key: "adult", defaultQty: 1 },
  { key: "senior", defaultQty: 0 },
  { key: "child", defaultQty: 0 },
];

export default function ActivityTicketPricingSelector({
  slug,
  ticket,
  dateLabel,
}) {
  const router = useRouter();
  const [quantities, setQuantities] = useState({
    adult: 1,
    senior: 0,
    child: 0,
  });

  const totalQty = quantities.adult + quantities.senior + quantities.child;

  const totalPrice = useMemo(() => {
    return (
      quantities.adult * ticket.pricing.adult.price +
      quantities.senior * ticket.pricing.senior.price +
      quantities.child * ticket.pricing.child.price
    );
  }, [quantities, ticket]);

  const setQty = (key, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const handleConfirm = () => {
    if (totalQty < 1) return;
    const url =
      `/activities/${slug}/checkout` +
      `?ticket=${encodeURIComponent(ticket.id)}` +
      `&adult=${quantities.adult}` +
      `&senior=${quantities.senior}` +
      `&child=${quantities.child}`;
    router.push(url);
  };

  const canConfirm = totalQty >= 1;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-5 md:px-6 py-4 bg-sky-50/80 text-center">
        <div className="text-xs md:text-sm text-slate-500">
          Ngày tham quan đã chọn
        </div>
        <div className="mt-0.5 text-sm md:text-base font-bold text-slate-900">
          {dateLabel}
        </div>
      </div>

      <div className="px-5 md:px-6">
        {CATEGORIES.map((cat, idx) => {
          const p = ticket.pricing[cat.key];
          return (
            <ActivityTicketQuantityRow
              key={cat.key}
              category={cat.key}
              label={p.label}
              price={p.price}
              note={p.note}
              quantity={quantities[cat.key]}
              onDecrease={() => setQty(cat.key, -1)}
              onIncrease={() => setQty(cat.key, 1)}
              isLast={idx === CATEGORIES.length - 1}
            />
          );
        })}
      </div>

      <div className="px-5 md:px-6 py-5 border-t border-slate-200 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">Tổng giá</div>
          <div className="mt-1 text-2xl md:text-3xl font-bold text-orange-500">
            {formatPrice(totalPrice)}
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canConfirm}
          className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-8 md:px-10 py-3 rounded-lg shadow-sm transition"
        >
          Đặt ngay
        </button>
      </div>
    </section>
  );
}
