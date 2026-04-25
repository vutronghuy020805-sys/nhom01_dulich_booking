import Link from "next/link";
import SleepySuitcaseIllustration from "@/components/account/SleepySuitcaseIllustration";

export const metadata = {
  title: "Đặt chỗ của tôi | VieGo",
  description:
    "Theo dõi vé điện tử, phiếu thanh toán và lịch sử giao dịch của bạn trên VieGo.",
};

export default function MyBookingsPage() {
  return (
    <>
      <section className="relative rounded-2xl bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-sm overflow-hidden">
        <div className="px-6 md:px-8 py-6 md:py-7">
          <h2 className="text-xl md:text-2xl font-bold">
            VieGo Easy reschedule
          </h2>
          <p className="mt-1 text-sm md:text-base text-white/95">
            Đổi lịch dễ như trở bàn tay
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg md:text-xl font-bold text-slate-900">
          Vé điện tử & phiếu thanh toán hiện hành
        </h2>
        <div className="mt-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 flex items-start gap-4 md:gap-5">
          <SleepySuitcaseIllustration className="w-24 h-24 md:w-28 md:h-28 shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Không tìm thấy đặt chỗ
            </h3>
            <p className="mt-1 text-sm md:text-[15px] text-slate-600 leading-relaxed">
              Mọi chỗ bạn đặt sẽ được hiển thị tại đây. Hiện bạn chưa có bất kỳ
              đặt chỗ nào, hãy đặt trên{" "}
              <Link
                href="/"
                className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
              >
                trang chủ
              </Link>{" "}
              ngay!
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg md:text-xl font-bold text-slate-900">
          Lịch sử giao dịch
        </h2>
        <div className="mt-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
          <p className="text-sm md:text-[15px] text-slate-700">
            Xem{" "}
            <Link
              href="/account/transactions"
              className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
            >
              lịch sử giao dịch
            </Link>{" "}
            của bạn
          </p>
        </div>
      </section>
    </>
  );
}
