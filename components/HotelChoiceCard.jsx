import Image from "next/image";

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function HotelChoiceCard({ hotel }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative w-full aspect-4/3 bg-gray-100">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center"
        />
        {hotel.areaLabel && (
          <span className="absolute top-3 left-0 bg-slate-800/90 text-white text-xs font-medium pl-3 pr-4 py-1.5 rounded-r-full flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            {hotel.areaLabel}
          </span>
        )}
        {hotel.discountText && (
          <span className="absolute bottom-3 right-0 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-l-md shadow">
            {hotel.discountText}
          </span>
        )}
      </div>

      {hotel.badgeText && (
        <div className="bg-blue-700 text-white text-center font-semibold py-2 text-sm">
          {hotel.badgeText}
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-2 min-h-[2.6em]">
          {hotel.name}
        </h3>

        <div className="mt-1.5">
          <Stars count={hotel.stars || 0} />
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-600">
          <span className="text-blue-600 font-semibold">{hotel.rating}/10</span>
          <span className="text-gray-300">•</span>
          <span>{hotel.reviews} đánh giá</span>
        </div>

        <div className="mt-auto pt-3">
          {hotel.oldPrice && (
            <div className="text-xs text-gray-400 line-through">
              {hotel.oldPrice.toLocaleString("vi-VN")} VND
            </div>
          )}
          <div className="text-orange-500 font-bold text-lg">
            {hotel.newPrice.toLocaleString("vi-VN")} VND
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {hotel.note || "Chưa bao gồm thuế và phí"}
          </div>
        </div>
      </div>
    </div>
  );
}
