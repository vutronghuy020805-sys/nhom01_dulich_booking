import FlightTrustCard from "./FlightTrustCard";

function AppStoreIcon() {
  return (
    <span className="inline-flex w-6 h-6 rounded-md bg-gradient-to-b from-sky-400 to-sky-600 text-white items-center justify-center shadow-sm">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="currentColor"
        aria-hidden
      >
        <path d="M17.05 12.54c-.03-2.63 2.15-3.9 2.25-3.96-1.23-1.8-3.14-2.05-3.82-2.08-1.62-.17-3.17.96-4 .96-.85 0-2.12-.94-3.49-.91-1.79.03-3.44 1.04-4.36 2.64-1.86 3.22-.47 8 1.34 10.62.88 1.28 1.93 2.72 3.31 2.67 1.33-.05 1.83-.86 3.44-.86 1.6 0 2.06.86 3.47.83 1.44-.03 2.34-1.3 3.21-2.59 1.02-1.49 1.43-2.94 1.45-3.02-.03-.01-2.78-1.07-2.8-4.3zM14.5 5.2c.72-.88 1.21-2.1 1.08-3.3-1.04.04-2.3.69-3.05 1.57-.67.78-1.26 2.02-1.1 3.21 1.16.09 2.35-.59 3.07-1.48z" />
      </svg>
    </span>
  );
}

function GooglePlayIcon() {
  return (
    <span className="inline-flex w-6 h-6 rounded-md bg-white border border-slate-200 items-center justify-center shadow-sm">
      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
        <path
          d="M3.6 2.5c-.3.3-.5.7-.5 1.3v16.4c0 .6.2 1 .5 1.3l9.1-9.5L3.6 2.5z"
          fill="#34A853"
        />
        <path
          d="M16.6 15.5l-3.9-4 3.9-4 4.8 2.7c1.4.8 1.4 2 0 2.8l-4.8 2.5z"
          fill="#FBBC04"
        />
        <path
          d="M12.7 11.5l-9.1 9.5c.4.4 1.1.5 1.8.1l11.2-6.4-3.9-3.2z"
          fill="#EA4335"
        />
        <path
          d="M12.7 11.5L16.6 8 5.4 1.6c-.7-.4-1.4-.3-1.8.1l9.1 9.8z"
          fill="#4285F4"
        />
      </svg>
    </span>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 text-amber-400"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.5l7.1-.6z" />
    </svg>
  );
}

function ChangeFlightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 3v4M16 3v4" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <path d="M9 7h6" />
      <circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none" />
      <path d="M17 10l2.5 1.2-2.5 1.2" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15a4 4 0 0 1-4 4h-1l-3 3v-3H8a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </svg>
  );
}

const CARDS = [
  {
    icon: <ChangeFlightIcon />,
    title: "Dễ dàng thay đổi chuyến bay",
    description: "Thoải mái hủy hoặc thay đổi đặt chỗ chuyến bay.",
  },
  {
    icon: <PaymentIcon />,
    title: "Thanh toán tiện lợi",
    description: "Giao dịch dễ dàng với đa dạng hình thức thanh toán.",
  },
  {
    icon: <SupportIcon />,
    title: "Hỗ trợ 24/7",
    description: "Hãy liên hệ VieGo bất cứ lúc nào, bất cứ ở đâu.",
  },
];

export default function FlightTrustSection() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-2 pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
        <div className="lg:w-1/3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
            Hơn 50 triệu lượt tải,
            <br />
            hơn 1 triệu lượt đánh giá
          </h2>
          <div className="flex items-center gap-5 mt-4">
            <div className="flex items-center gap-2">
              <AppStoreIcon />
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-800">
                4,9
                <StarIcon />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GooglePlayIcon />
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-800">
                4,8
                <StarIcon />
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:w-2/3">
          {CARDS.map((card) => (
            <FlightTrustCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
