import CouponCard from "@/components/flights/CouponCard";
import { busCoupons } from "./busCoupons";

export default function BusNewUserCouponSection() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-10">
      <div className="mb-5">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-900">
          <span className="text-2xl" aria-hidden>
            🎁
          </span>
          Mã ưu đãi tặng bạn mới
        </h2>
        <p className="text-sm text-slate-500 mt-1 pl-9">
          Áp dụng cho lần đặt đầu tiên qua VieGo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {busCoupons.map((c, i) => (
          <CouponCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
