import HotelSearchPanel from "./HotelSearchPanel";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=80&auto=format&fit=crop";

export default function HotelsHero({
  heroImage,
  selectedLocation,
  onLocationChange,
}) {
  const bg = heroImage || DEFAULT_HERO_IMAGE;
  return (
    <section className="bg-white pt-8 pb-40 px-4">
      <div className="max-w-350 mx-auto relative">
        <div className="relative rounded-3xl overflow-hidden ring-1 ring-blue-200 shadow-sm">
          <img
            key={bg}
            src={bg}
            alt="Ảnh địa điểm du lịch"
            className="w-full h-95 md:h-115 object-cover object-center transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/10" />

          <div className="absolute left-0 right-0 top-0 p-8 md:p-12 text-white">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-lg whitespace-nowrap">
              Một giấc ngủ ngon, một bữa ăn thịnh soạn
            </h1>
            <p className="mt-3 text-white/90 text-sm md:text-base drop-shadow">
              Khám phá nhiều lựa chọn từ khách sạn, biệt thự, resort và hơn thế
              nữa
            </p>
          </div>
        </div>

        <div className="absolute left-4 right-4 -bottom-32 md:-bottom-28">
          <HotelSearchPanel
            externalLocation={selectedLocation}
            onLocationChange={onLocationChange}
          />
        </div>
      </div>
    </section>
  );
}
