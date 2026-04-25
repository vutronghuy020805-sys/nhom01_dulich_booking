"use client";

import { useRouter } from "next/navigation";

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

export const confirmationStorageKey = (slug, ticketId) =>
  `viego:activity-confirmation:${slug}:${ticketId}`;

export default function ActivityQrConfirmBox({ slug, ticket, method = "vietqr", quantities }) {
  const router = useRouter();

  const handleConfirm = () => {
    const payload = {
      bookingCode: generateBookingCode(),
      eticketCode: generateETicketCode(),
      method,
      status: "paid",
      paidAt: new Date().toISOString(),
    };
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          confirmationStorageKey(slug, ticket.id),
          JSON.stringify(payload)
        );
      }
    } catch {
      // ignore
    }

    const params = new URLSearchParams({
      ticket: ticket.id,
      adult: String(quantities.adult),
      senior: String(quantities.senior),
      child: String(quantities.child),
      method,
    });
    router.push(`/activities/${slug}/confirmation?${params.toString()}`);
  };

  return (
    <section>
      <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3">
        Đã hoàn tất thanh toán của bạn?
      </h2>
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Sau khi xác nhận thanh toán, VieGo sẽ phát hành vé điện tử và gửi xác
          nhận qua email của bạn.
        </p>
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-3 rounded-xl border border-sky-500 text-sky-600 hover:bg-sky-50 active:bg-sky-100 font-bold text-sm transition"
        >
          Vâng, tôi đã thanh toán
        </button>
      </div>
    </section>
  );
}
