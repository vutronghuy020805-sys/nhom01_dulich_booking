import Link from "next/link";

export default function PopularBusDestinationCard({ title, image, href }) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[16/9] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <span className="text-white text-lg md:text-xl lg:text-2xl font-extrabold text-center drop-shadow-md">
          {title}
        </span>
      </div>
    </Link>
  );
}
