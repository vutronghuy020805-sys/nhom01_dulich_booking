import Image from "next/image";
import Link from "next/link";

export default function CarRentalDestinationCard({ destination }) {
  return (
    <Link
      href={`/car-rental/destination/${destination.slug}`}
      className="group relative block overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow aspect-[16/10]"
    >
      <Image
        src={destination.image}
        alt={destination.title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h3 className="text-white text-2xl md:text-3xl font-bold text-center leading-tight drop-shadow-md">
          {destination.title}
        </h3>
      </div>
    </Link>
  );
}
