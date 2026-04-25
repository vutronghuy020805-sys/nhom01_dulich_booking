"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <polyline points="7 10 12 15 17 10" />
      <path d="M5 21h14" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

function BookingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <polyline points="15 2 15 7 20 7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function AirportTransferConfirmationActions({
  bookingCode,
  eticketCode,
  contactEmail,
  ticketText,
}) {
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const showToast = (message, tone = "emerald") => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 2600);
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([ticketText || bookingCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `VieGo-${bookingCode || eticketCode || "eticket"}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast("Đã tải vé điện tử.");
    } catch {
      showToast("Không thể tải vé. Vui lòng thử lại.", "rose");
    }
  };

  const handleResend = () => {
    if (contactEmail) {
      showToast(`Đã gửi lại email đến ${contactEmail}.`);
    } else {
      showToast("Đã gửi lại email thành công.");
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors shadow"
        >
          <DownloadIcon />
          Tải vé điện tử
        </button>
        <button
          type="button"
          onClick={handleResend}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-sm transition-colors shadow-sm"
        >
          <MailIcon />
          Gửi lại email
        </button>
        <button
          type="button"
          onClick={() => router.push("/booking")}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-sm transition-colors shadow-sm"
        >
          <BookingsIcon />
          Về Đặt chỗ của tôi
        </button>
        <button
          type="button"
          onClick={() => router.push("/airport-transfer")}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors shadow"
        >
          <PlusIcon />
          Đặt thêm chuyến khác
        </button>
      </div>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-lg ${
            toast.tone === "rose"
              ? "bg-rose-600 text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </>
  );
}
