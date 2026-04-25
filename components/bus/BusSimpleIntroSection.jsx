const busSimpleIntroContent = {
  title: "Đặt Vé Xe Khách Cùng VieGo – Đơn Giản Hóa Mọi Hành Trình",
  paragraphs: [
    "Sẵn sàng cho hành trình khám phá với trải nghiệm đặt vé tiện lợi hơn bao giờ hết cùng VieGo. Chỉ với vài thao tác đơn giản, bạn có thể dễ dàng tìm kiếm và đặt vé xe khách phù hợp ngay trên ứng dụng.",
    "Với quy trình “Chọn – Đặt – Đi”, mọi thứ trở nên nhanh gọn: chọn chuyến xe theo nhu cầu, đặt vé trong tích tắc và tận hưởng hành trình một cách thoải mái, không lo lắng.",
    "Dưới đây là những hướng dẫn giúp bạn đặt vé xe khách trên VieGo một cách nhanh chóng và thuận tiện nhất.",
  ],
};

export default function BusSimpleIntroSection() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-20 md:pb-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-slate-900 text-center mb-8 md:mb-10 leading-snug">
          {busSimpleIntroContent.title}
        </h2>

        <div className="space-y-5 md:space-y-6 text-slate-700 leading-relaxed text-[15px] md:text-base">
          {busSimpleIntroContent.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
