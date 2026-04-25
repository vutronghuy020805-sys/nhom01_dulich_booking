const features = [
  {
    id: "discover",
    title: "Khám phá điểm đến hấp dẫn cùng VieGo",
    description:
      "VieGo mang đến nhiều lựa chọn hoạt động, điểm tham quan và trải nghiệm nổi bật tại các điểm đến phổ biến, giúp bạn dễ dàng tìm được hành trình phù hợp với sở thích của mình.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "fast",
    title: "Đặt nhanh, linh hoạt và tiện lợi",
    description:
      "Chỉ với vài thao tác đơn giản, bạn có thể đặt vé hoạt động online nhanh chóng, xem thông tin rõ ràng và tận hưởng quy trình đặt chỗ tiện lợi, tiết kiệm thời gian.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
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
    id: "support",
    title: "VieGo luôn sẵn sàng hỗ trợ bạn",
    description:
      "Đội ngũ hỗ trợ khách hàng của VieGo luôn đồng hành khi bạn cần, giúp bạn yên tâm hơn trong suốt quá trình tìm kiếm, đặt vé và trải nghiệm chuyến đi.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2v-1z" />
        <path d="M20 14a2 2 0 0 0-2-2h-1v5h1a2 2 0 0 0 2-2v-1z" />
        <path d="M17 17v1a3 3 0 0 1-3 3h-2" />
      </svg>
    ),
  },
];

export default function WhyChooseVieGoSection() {
  return (
    <section className="bg-white">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-14 md:py-20">
        <div className="border-t border-slate-200 pt-12 md:pt-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug mb-10 md:mb-14 max-w-4xl">
            Bạn cứ thoải mái khám phá, còn lại cứ để VieGo lo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-start gap-4">
                <div className="shrink-0 text-emerald-600">{feature.icon}</div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-[15px] leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
