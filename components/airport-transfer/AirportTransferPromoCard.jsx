import Image from "next/image";

export default function AirportTransferPromoCard() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-sky-300 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]">
      <div className="relative aspect-16/9 md:aspect-[21/9] lg:aspect-16/9 bg-sky-200">
        <Image
          src="/assets/airport-transfer/banner/airport-transfer-promo.png"
          alt="Dịch vụ đưa đón sân bay VieGo"
          fill
          sizes="(min-width: 1024px) 620px, 100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-r from-sky-900/30 via-sky-700/10 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 shadow">
            <img
              src="/assets/logo-viego.png"
              alt="VieGo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-xs font-bold text-slate-800">
              Đưa đón sân bay
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 md:left-6">
          <div className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight drop-shadow">
            DỊCH VỤ<br />ĐƯA ĐÓN
          </div>
          <span className="inline-flex items-center mt-3 bg-emerald-500 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full shadow">
            Đặt trước ngay!
          </span>
        </div>
      </div>

      <p className="absolute bottom-2 right-3 text-[10px] text-white/70">
        *Điều kiện và điều khoản kèm theo
      </p>
    </div>
  );
}
