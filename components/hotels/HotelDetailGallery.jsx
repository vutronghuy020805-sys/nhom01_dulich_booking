export default function HotelDetailGallery({ hotel }) {
  const images = hotel.galleryImages && hotel.galleryImages.length
    ? hotel.galleryImages
    : [hotel.image];
  const [cover, ...rest] = images;
  const thumbs = rest.slice(0, 4);
  while (thumbs.length < 4) thumbs.push(cover);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-80 md:h-[460px]">
        <img
          src={cover}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {thumbs.map((src, idx) => {
          const isLast = idx === thumbs.length - 1;
          return (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden bg-gray-100 h-40 md:h-[225px]"
            >
              <img
                src={src}
                alt={`${hotel.name} - ảnh ${idx + 2}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {isLast && (
                <button
                  type="button"
                  className="absolute inset-0 bg-black/45 flex items-center justify-center gap-2 text-white font-semibold text-sm hover:bg-black/55 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  Xem tất cả hình ảnh
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
