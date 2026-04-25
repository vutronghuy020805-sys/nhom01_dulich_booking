import Link from "next/link";
import AccountPageHeader from "@/components/account/AccountPageHeader";
import AccountEmptyState from "@/components/account/AccountEmptyState";
import {
  refundRequests,
  refundStatusMap,
  formatVND,
  formatDateVN,
} from "@/data/accountMock";

export const metadata = {
  title: "Refunds | VieGo",
  description: "Theo dõi các yêu cầu hoàn tiền của bạn trên VieGo.",
};

export default function RefundsPage() {
  const items = refundRequests;

  return (
    <>
      <AccountPageHeader
        title="Refunds"
        subtitle="Theo dõi các yêu cầu hoàn tiền đã gửi tới VieGo."
      />

      {items.length === 0 ? (
        <AccountEmptyState
          title="Bạn chưa có yêu cầu hoàn tiền nào"
          description="Khi bạn gửi yêu cầu hoàn tiền từ một đặt chỗ, trạng thái xử lý sẽ hiển thị tại đây."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
          {items.map((r) => {
            const st = refundStatusMap[r.status];
            return (
              <div
                key={r.id}
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-5"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-mono text-slate-500">
                      {r.id}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${st.className}`}
                    >
                      {st.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm md:text-base font-semibold text-slate-900">
                    {r.service}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Gửi ngày {formatDateVN(r.requestedAt)} · Đơn gốc {r.orderId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Số tiền hoàn</p>
                  <p className="text-base md:text-lg font-bold text-slate-900">
                    {formatVND(r.amount)}
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-semibold text-sky-600 hover:bg-sky-50"
                >
                  Xem chi tiết
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 md:p-6">
        <h3 className="text-base font-bold text-slate-900">
          Quy trình hoàn tiền tại VieGo
        </h3>
        <ol className="mt-2 space-y-1.5 text-sm text-slate-700 list-decimal list-inside">
          <li>Gửi yêu cầu hoàn tiền kèm lý do và chứng từ.</li>
          <li>VieGo xác minh với đối tác (hãng bay, khách sạn…).</li>
          <li>
            Hoàn về thẻ/ví gốc trong 7–14 ngày làm việc tuỳ phương thức thanh
            toán.
          </li>
        </ol>
        <Link
          href="/help"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-800"
        >
          Tìm hiểu thêm tại Trợ giúp →
        </Link>
      </div>
    </>
  );
}
