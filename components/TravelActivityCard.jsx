export default function TravelActivityCard({ activity }) {
  const hasDiscount = Boolean(activity.oldPrice);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {activity.areaLabel && (
          <span className="absolute top-3 left-3 bg-[#ff7a8a] text-white text-xs font-semibold px-3 py-1 rounded-md shadow">
            {activity.areaLabel}
          </span>
        )}

        {activity.discountText && (
          <span className="absolute bottom-3 right-0 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-l-md shadow">
            {activity.discountText}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-2 min-h-[2.6em]">
          {activity.title}
        </h3>

        <div className="mt-auto pt-3">
          {hasDiscount && (
            <div className="text-xs text-gray-400 line-through">
              {activity.oldPrice.toLocaleString("vi-VN")} VND
            </div>
          )}
          <div className="text-orange-500 font-bold text-lg">
            {activity.price.toLocaleString("vi-VN")} VND
          </div>
        </div>
      </div>
    </div>
  );
}
