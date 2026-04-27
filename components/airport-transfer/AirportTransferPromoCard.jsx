import Image from "next/image";

export default function AirportTransferPromoCard() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-sky-300 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]">
      <div className="relative aspect-16/9 md:aspect-[21/9] lg:aspect-16/9 bg-sky-200">
        <Image
          src="/nhom01_dulich_booking/assets/airport-transfer/banner/airport-transfer-promo.png"
          alt="Dịch vụ đưa đón sân bay VieGo"
          fill
          sizes="(min-width: 1024px) 620px, 100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-r from-sky-900/30 via-sky-700/10 to-transparent" />
      </div>

      <p className="absolute bottom-2 right-3 text-[10px] text-white/70">
        *Điều kiện và điều khoản kèm theo
      </p>
    </div>
  );
}
