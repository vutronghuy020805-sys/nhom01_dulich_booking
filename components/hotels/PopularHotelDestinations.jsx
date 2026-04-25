import Link from "next/link";
import { popularLocations } from "./popularLocations";

export default function PopularHotelDestinations() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
          Khách sạn tốt nhất ở các địa điểm phổ biến
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularLocations.map((d) => (
            <Link
              key={d.slug}
              href={`/hotels/${d.slug}`}
              className="group relative block rounded-2xl overflow-hidden aspect-video ring-2 ring-transparent hover:ring-blue-500 hover:ring-offset-2 transition-all"
            >
              <img
                src={d.image}
                alt={d.city}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <h3 className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-lg">
                  Khách sạn ở {d.city}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
