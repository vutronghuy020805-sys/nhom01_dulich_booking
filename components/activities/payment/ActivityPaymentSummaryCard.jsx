"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "viego:activity-checkout";

function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

function Row({ label, value, emphasize = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="text-sm text-slate-500 shrink-0">{label}</div>
      <div
        className={
          "text-sm text-right " +
          (emphasize
            ? "font-bold text-orange-500 text-base"
            : "font-medium text-slate-800")
        }
      >
        {value}
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 shrink-0 text-slate-400"
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

export default function ActivityPaymentSummaryCard({ bookingContext }) {
  const { slug, activity, ticket, quantities, totalPrice, dateLabel } =
    bookingContext;
  const totalQty = quantities.adult + quantities.senior + quantities.child;

  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        parsed.slug === slug &&
        parsed.ticketId === ticket.id &&
        parsed.form
      ) {
        setContactInfo(parsed.form);
      }
    } catch {
      // ignore
    }
  }, [slug, ticket.id]);

  const contactName = contactInfo?.contactFullName?.trim() || "—";
  const contactPhone = contactInfo?.contactPhone?.trim() || "—";
  const contactEmail = contactInfo?.contactEmail?.trim() || "—";
  const customerName = [contactInfo?.lastName, contactInfo?.firstName]
    .map((s) => (s ? s.trim() : ""))
    .filter(Boolean)
    .join(" ") || "—";

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="px-5 py-4 bg-sky-50 border-b border-slate-200">
        <h3 className="text-base md:text-lg font-bold text-slate-900">
          Thông tin chi tiết
        </h3>
      </div>

      <div className="p-5 space-y-5">
        <div className="flex items-start gap-3">
          <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
            <Image
              src={ticket.image}
              alt={activity.title}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm md:text-base font-bold text-slate-900 leading-snug">
              {activity.title}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <PinIcon />
              <span className="truncate">{activity.location}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
            Gói vé
          </div>
          <div className="text-sm font-semibold text-slate-800 leading-snug">
            {ticket.title}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <Row label="Ngày tham quan" value={dateLabel} />
          <Row
            label={`Người lớn (${formatPrice(ticket.pricing.adult.price)})`}
            value={quantities.adult}
          />
          <Row
            label={`Người cao tuổi (${formatPrice(ticket.pricing.senior.price)})`}
            value={quantities.senior}
          />
          <Row
            label={`Trẻ em (${formatPrice(ticket.pricing.child.price)})`}
            value={quantities.child}
          />
          <Row label="Tổng số vé" value={`${totalQty} vé`} />
        </div>

        <div className="border-t border-slate-100 pt-4">
          <Row label="Tổng cộng" value={formatPrice(totalPrice)} emphasize />
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3">
            Người liên hệ
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Họ tên</span>
              <span className="text-slate-800 font-medium text-right">
                {contactName}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Điện thoại</span>
              <span className="text-slate-800 font-medium text-right">
                {contactPhone}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Email</span>
              <span className="text-slate-800 font-medium text-right break-all">
                {contactEmail}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3">
            Khách hàng
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-slate-500 shrink-0">Họ và tên</span>
            <span className="text-slate-800 font-medium text-right">
              {customerName}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
