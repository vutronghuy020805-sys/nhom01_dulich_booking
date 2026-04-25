import { carRentalPopularDestinations } from "@/data/carRentalPopularDestinations";
import CarRentalDestinationCard from "./CarRentalDestinationCard";

export default function CarRentalPopularDestinationsSection() {
  return (
    <section className="bg-white py-14 md:py-20 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-10 md:mb-12">
          Danh sách điểm đến cho thuê xe phổ biến
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {carRentalPopularDestinations.map((destination) => (
            <CarRentalDestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
