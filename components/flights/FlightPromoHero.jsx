export default function FlightPromoHero() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-8">
      <div className="flex items-stretch gap-4">
        <div className="flex-1 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-700 min-h-60">
          <img
            src="/assets/flight-page/flight-banner.png"
            alt="VieGo × VinWonders - Giảm đến 30%"
            className="w-full h-full object-cover aspect-[3/1]"
          />
        </div>

        <a
          href="#welcome-coupons"
          className="shrink-0 w-20 md:w-24 rounded-3xl bg-cyan-200 hover:bg-cyan-300 transition flex flex-col items-center justify-center gap-1 text-center text-sky-900 font-bold text-base"
        >
          <span>Xem</span>
          <span>ưu</span>
          <span>đãi</span>
        </a>
      </div>
    </section>
  );
}
