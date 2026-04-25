import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function CarRentalResultsHero({
  driverOption,
  locationName,
  rangeLabel,
}) {
  const isSelfDrive = driverOption !== "with-driver";
  const breadcrumbType = isSelfDrive ? "Tự lái" : "Có tài xế";
  const title = isSelfDrive ? "Thuê xe tự lái" : "Thuê xe có tài xế";

  return (
    <section className="relative">
      <div className="relative h-72 md:h-96 w-full bg-slate-200 overflow-hidden">
        <Image
          src="/nhom01_dulich_booking/assets/car-rental/results-banner.png"
          alt="Thuê xe tự lái VieGo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
      </div>

      <div className="relative max-w-350 mx-auto px-4 lg:px-6 -mt-24 md:-mt-28">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <Breadcrumb
              items={[
                { label: "Thuê xe", href: "/car-rental" },
                { label: breadcrumbType },
              ]}
              className="text-xs md:text-sm"
            />
            <h1 className="mt-1 text-xl md:text-2xl font-bold text-slate-900">
              {title}
            </h1>
            <p className="mt-2 text-sm md:text-[15px] text-slate-600 leading-relaxed">
              {locationName}
              <span className="text-slate-300 mx-2">•</span>
              {rangeLabel}
            </p>
          </div>

          <Link
            href="/car-rental"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors shadow"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            Thay đổi tìm kiếm
          </Link>
        </div>
      </div>
    </section>
  );
}
