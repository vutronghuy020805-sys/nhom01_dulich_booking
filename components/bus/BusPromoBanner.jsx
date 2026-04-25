export default function BusPromoBanner() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-10 md:pt-12">
      <div
        className="w-full aspect-[3.4/1] rounded-2xl overflow-hidden bg-slate-200 bg-cover bg-center shadow-sm"
        style={{
          backgroundImage:
            "url('/nhom01_dulich_booking/assets/bus-page/bus-promo-banner.png')",
        }}
        role="img"
        aria-label="VieGo - Du lịch xuyên Việt, deal có hạn giảm đến 50%"
      />
    </section>
  );
}
