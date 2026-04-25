export default function BusPageHero() {
  return (
    <section className="bg-gradient-to-b from-sky-400 to-sky-500 relative">
      <div className="max-w-375 mx-auto px-6 lg:px-10 pt-10 md:pt-14 pb-40 md:pb-48 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-white">
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
            Đặt vé xe khách giá rẻ và nhiều khuyến mãi qua VieGo.
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/95 leading-relaxed max-w-xl">
            VieGo mang đến trải nghiệm đặt vé xe khách tiện lợi như mua sắm
            trực tuyến. Khám phá đầy đủ thông tin về tuyến đường, lịch trình,
            điểm đón, tiện ích và mức giá ngay trên một nền tảng duy nhất.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div
            className="w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shadow-xl bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/bus-page/bus-hero-banner.png')",
            }}
            role="img"
            aria-label="VieGo khuyến mãi vé xe khách"
          />
        </div>
      </div>
    </section>
  );
}
