import BenefitCard from "./BenefitCard";

const benefits = [
  {
    id: "needs",
    title: "Đáp ứng mọi nhu cầu của bạn",
    description:
      "Từ chuyến bay, lưu trú, đến điểm tham quan, bạn có thể tin chọn sản phẩm hoàn chỉnh và hướng dẫn du lịch của chúng tôi.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M4 12h16" />
      </svg>
    ),
  },
  {
    id: "flex",
    title: "Tùy chọn đặt chỗ linh hoạt",
    description:
      "Kế hoạch thay đổi bất ngờ? Dùng tính năng đổi lịch hoặc hoàn tiền để xử lý dễ dàng.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M3 10h18" />
        <polyline points="9 15 11 17 15 13" />
      </svg>
    ),
  },
  {
    id: "pay",
    title: "Thanh toán an toàn và thuận tiện",
    description:
      "Tận hưởng nhiều cách thanh toán an toàn, bằng loại tiền thuận tiện nhất cho bạn.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function WhyBookSection() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10">
          Lý do nên đặt chỗ với VieGo?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-5">
              Hơn 50 triệu lượt tải,
              <br />
              hơn 1 triệu đánh giá
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-slate-800">
                    4.6 <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="#34A853"
                  >
                    <path d="M3.9 2.1c-.3.3-.4.7-.4 1.2v17.4c0 .5.1.9.4 1.2l9.6-9.9L3.9 2.1z" />
                    <path d="M16.5 9.1 13.5 12l3 2.9 3.6-2c1-.6 1-2.2 0-2.8l-3.6-2z" fill="#FBBC04" />
                    <path d="m3.9 2.1 9.6 9.9 3-2.9L5.5 1.5c-.6-.3-1.2-.2-1.6.6z" fill="#EA4335" />
                    <path d="m13.5 12-9.6 9.9c.4.4 1 .5 1.6.2L16.5 15l-3-3z" fill="#4285F4" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-slate-800">
                    4.7 <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
            >
              Tải ứng dụng VieGo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12" />
                <polyline points="7 10 12 15 17 10" />
                <path d="M5 21h14" />
              </svg>
            </button>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <BenefitCard
                key={b.id}
                icon={b.icon}
                title={b.title}
                description={b.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
