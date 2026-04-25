import PopularBusDestinationCard from "./PopularBusDestinationCard";
import { popularBusDestinations } from "./popularBusDestinations";

export default function PopularBusDestinationsSection() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-20 md:pb-24">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 text-center mb-10 md:mb-12">
        Các Điểm Đến Phổ Biến
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {popularBusDestinations.map((d) => (
          <PopularBusDestinationCard
            key={d.id}
            title={d.title}
            image={d.image}
            href={d.href}
          />
        ))}
      </div>
    </section>
  );
}
