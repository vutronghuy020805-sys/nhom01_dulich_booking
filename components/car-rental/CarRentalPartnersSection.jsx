import { carRentalPartners } from "@/data/carRentalPartners";
import CarRentalPartnerCard from "./CarRentalPartnerCard";

export default function CarRentalPartnersSection() {
  return (
    <section className="relative bg-gradient-to-b from-sky-50 via-white to-sky-50 py-14 md:py-20 px-4">
      <div className="max-w-350 mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Các đối tác cho thuê xe
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500">
            Hợp tác với các hãng xe uy tín tại Việt Nam và toàn thế giới
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {carRentalPartners.map((partner) => (
            <CarRentalPartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
