const benefits = [
  {
    id: "b1",
    title: "Hoạt động 24/7",
    description:
      "Liên hệ với Bộ phận Chăm sóc Khách hàng của chúng tôi qua Chat trực tiếp, Email hoặc Gọi điện thoại một cách dễ dàng.",
    iconBg: "bg-blue-100 text-blue-600",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4z" />
        <path d="M3 19a2 2 0 0 0 2 2h1v-6H3v4z" />
      </svg>
    ),
  },
  {
    id: "b2",
    title: "Nhiều lựa chọn đa dạng, linh hoạt",
    description:
      "Lập kế hoạch và điều chỉnh chuyến đi của bạn một cách dễ dàng với tính năng hủy phòng miễn phí, thanh toán tại khách sạn và nhiều hơn thế nữa.",
    iconBg: "bg-amber-100 text-amber-600",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M9 4h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
        <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
        <polyline points="9 13 11 15 15 11" />
      </svg>
    ),
  },
  {
    id: "b3",
    title: "Phương thức thanh toán đa dạng và an toàn",
    description:
      "Nhiều lựa chọn thanh toán tiện lợi, an toàn và phù hợp cho nhu cầu của bạn.",
    iconBg: "bg-emerald-100 text-emerald-600",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function WhyBookVieGoSection() {
  return (
    <section className="bg-white pt-16 pb-8 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
          Tại sao nên đặt phòng khách sạn với VieGo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <article
              key={b.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-start gap-4 h-full"
            >
              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${b.iconBg}`}
              >
                {b.icon}
              </span>
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1.5">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
