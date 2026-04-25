import { airportTransferPartners } from "@/data/airportTransferPartners";
import AirportTransferPartnerLogo from "./AirportTransferPartnerLogo";

export default function AirportTransferPartnersSection() {
  return (
    <section className="bg-white">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
              Đối tác xe đưa đón sân bay
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
              Chúng tôi hợp tác với các công ty vận tải hàng đầu trong và ngoài
              nước để mang đến cho bạn một chuyến đi thoải mái từ và đến sân
              bay.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {airportTransferPartners.map((partner) => (
                <AirportTransferPartnerLogo
                  key={partner.id}
                  partner={partner}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 md:mt-16 text-center text-base md:text-lg font-bold text-slate-900">
          Trải nghiệm chuyến đi suôn sẻ từ và đến sân bay!
        </p>
      </div>
    </section>
  );
}
