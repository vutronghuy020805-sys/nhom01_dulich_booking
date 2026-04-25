"use client";

import { useEffect, useState } from "react";
import ActivityBookingSuccessBanner from "./ActivityBookingSuccessBanner";
import ActivityETicketCard from "./ActivityETicketCard";
import ActivityUsageNotes from "./ActivityUsageNotes";
import ActivityConfirmationActions from "./ActivityConfirmationActions";

const CHECKOUT_STORAGE_KEY = "viego:activity-checkout";
const confirmationStorageKey = (slug, ticketId) =>
  `viego:activity-confirmation:${slug}:${ticketId}`;

function generateBookingCode() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const rand = Math.floor(100 + Math.random() * 900);
  return `ACT${dd}${mm}${yy}${rand}`;
}

function generateETicketCode() {
  const rand = Math.floor(1 + Math.random() * 9999);
  return `VGO-ACT-${String(rand).padStart(4, "0")}`;
}

export default function ActivityConfirmationClient({ bookingContext, method }) {
  const { slug, ticket } = bookingContext;
  const [confirmation, setConfirmation] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = confirmationStorageKey(slug, ticket.id);
    let existing = null;
    try {
      const raw = window.sessionStorage.getItem(key);
      if (raw) existing = JSON.parse(raw);
    } catch {
      // ignore parse errors
    }

    if (existing && existing.bookingCode && existing.eticketCode) {
      setConfirmation(existing);
    } else {
      const fresh = {
        bookingCode: generateBookingCode(),
        eticketCode: generateETicketCode(),
        method: method || "vietqr",
        status: "paid",
        paidAt: new Date().toISOString(),
      };
      try {
        window.sessionStorage.setItem(key, JSON.stringify(fresh));
      } catch {
        // ignore quota errors
      }
      setConfirmation(fresh);
    }

    try {
      const checkoutRaw = window.sessionStorage.getItem(CHECKOUT_STORAGE_KEY);
      if (checkoutRaw) {
        const parsed = JSON.parse(checkoutRaw);
        if (
          parsed &&
          parsed.slug === slug &&
          parsed.ticketId === ticket.id &&
          parsed.form
        ) {
          setContactInfo(parsed.form);
        }
      }
    } catch {
      // ignore
    }
  }, [slug, ticket.id, method]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleDownload = () => {
    showToast("Vé điện tử đã được gửi vào email của bạn.");
  };

  const handleResendEmail = () => {
    showToast("Đã gửi lại email xác nhận thành công.");
  };

  return (
    <div className="space-y-5 md:space-y-6">
      <ActivityBookingSuccessBanner
        bookingCode={confirmation?.bookingCode}
        eticketCode={confirmation?.eticketCode}
      />

      <ActivityETicketCard
        bookingContext={bookingContext}
        confirmation={confirmation}
        contactInfo={contactInfo}
      />

      <ActivityUsageNotes />

      <ActivityConfirmationActions
        onDownload={handleDownload}
        onResendEmail={handleResendEmail}
      />

      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-emerald-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="4 12 10 18 20 6" />
          </svg>
          {toastMessage}
        </div>
      ) : null}
    </div>
  );
}
