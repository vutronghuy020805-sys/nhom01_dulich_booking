const AMENITY_MAP = {
  ac: {
    label: "Điều hoà",
    path: "M4 10h16M4 14h16M8 6v12M16 6v12",
  },
  wifi: {
    label: "Wifi",
    path: "M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0",
  },
  tv: {
    label: "TV",
    path: "M4 6h16v11H4zM9 21h6",
  },
  charging: {
    label: "Sạc USB",
    path: "M7 8h4v8H7zM11 10h4v4h-4zM15 11v2",
  },
};

export default function BusAmenityIcons({ amenities = [] }) {
  if (!amenities.length) return null;
  return (
    <div className="flex items-center gap-2 text-slate-500">
      {amenities.map((a) => {
        const info = AMENITY_MAP[a];
        if (!info) return null;
        return (
          <span
            key={a}
            title={info.label}
            aria-label={info.label}
            className="inline-flex w-6 h-6 items-center justify-center rounded bg-slate-50 border border-slate-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d={info.path} />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
