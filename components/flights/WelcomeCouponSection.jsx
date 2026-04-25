import CouponCard from "./CouponCard";

const COUPONS = [
  {
    icon: "✈️",
    category: "Vé máy bay:",
    headline: "Giảm đến 75.000đ cho lần đặt vé máy bay đầu tiên",
    subline: "Áp dụng cho giao dịch đầu tiên trên VieGo",
    code: "VIEGONEW",
  },
  {
    icon: "🏨",
    category: "Khách sạn:",
    headline: "Giảm đến 250.000đ cho lần đặt phòng đầu tiên",
    subline: "Áp dụng cho giao dịch đầu tiên trên VieGo",
    code: "VIEGONEW",
  },
  {
    icon: "🎟️",
    category: "Vé tham quan:",
    headline: "Giảm đến 10% cho vé tham quan & hoạt động",
    subline: "Áp dụng cho lần đầu tiên trên VieGo",
    code: "VIEGONEW",
  },
];

export default function WelcomeCouponSection() {
  return (
    <section
      id="welcome-coupons"
      className="max-w-375 mx-auto px-6 lg:px-10 pt-10 pb-16 scroll-mt-32"
    >
      <div className="mb-5">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-900">
          <span className="text-2xl" aria-hidden>
            🎁
          </span>
          Ưu đãi chào mừng người dùng mới
        </h2>
        <p className="text-sm text-slate-500 mt-1 pl-9">
          Độc quyền khi đặt dịch vụ lần đầu trên VieGo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COUPONS.map((c, i) => (
          <CouponCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
