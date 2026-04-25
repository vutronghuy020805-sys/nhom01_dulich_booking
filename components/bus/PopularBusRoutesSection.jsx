import PopularBusRouteCard from "./PopularBusRouteCard";
import { popularBusRoutesColumns } from "./popularBusRoutes";

export default function PopularBusRoutesSection() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-20 md:pb-24">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 text-center mb-10 md:mb-12">
        Tuyến Xe Khách Phổ Biến
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {popularBusRoutesColumns.map((col) => (
          <PopularBusRouteCard
            key={col.id}
            fromCity={col.fromCity}
            image={col.image}
            routes={col.routes}
          />
        ))}
      </div>
    </section>
  );
}
