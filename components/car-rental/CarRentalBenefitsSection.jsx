import { carRentalBenefits } from "@/data/carRentalBenefits";
import CarRentalBenefitItem from "./CarRentalBenefitItem";

export default function CarRentalBenefitsSection() {
  return (
    <section className="bg-white py-14 md:py-20 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-12 md:mb-14">
          Tại sao nên thuê xe qua VieGo?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8">
          {carRentalBenefits.map((benefit) => (
            <CarRentalBenefitItem key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
