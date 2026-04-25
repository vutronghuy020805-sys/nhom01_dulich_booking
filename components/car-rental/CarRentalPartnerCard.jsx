import Image from "next/image";

export default function CarRentalPartnerCard({ partner }) {
  return (
    <div
      className="group bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center px-4 py-5 h-20 sm:h-24"
      title={partner.name}
    >
      <div className="relative w-full h-full">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes="(min-width: 1024px) 180px, (min-width: 640px) 25vw, 40vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
