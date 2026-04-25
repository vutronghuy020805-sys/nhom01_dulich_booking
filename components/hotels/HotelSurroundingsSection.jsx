import { getSurroundingsForSlug } from "./hotelSurroundings";

const ICONS = {
  beach: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      <path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      <path d="M17 10c0-4-3-7-7-7-1 0-2 .2-3 .6l2.4 3.4" />
      <path d="M10 3L17 10" />
    </svg>
  ),
  spa: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c0-5 4-9 9-9-5 0-9-4-9-9 0 5-4 9-9 9 5 0 9 4 9 9z" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v8a4 4 0 0 0 8 0V2M12 10v12" />
    </svg>
  ),
  walk: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2" />
      <path d="M7 22l2-4 3-3-2-5-3 3-3 1" />
      <path d="M14 11l2 2 3-1 2 4" />
    </svg>
  ),
  culture: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22h18M3 10h18M5 10V5l7-3 7 3v5M8 10v12M12 10v12M16 10v12" />
    </svg>
  ),
  shopping: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2l-3 5v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-3-5zM3 7h18M16 11a4 4 0 0 1-8 0" />
    </svg>
  ),
  desert: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20l5-8 4 5 4-7 7 10z" />
    </svg>
  ),
  boat: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18s1 1 3 1 3-1 6-1 3 1 6 1 3-1 3-1" />
      <path d="M3 14l9-10 9 10M12 4v10" />
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22h18M5 22V10M19 22V10M9 22V14h6v8M3 10l9-7 9 7" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
};

const HEADER_ICONS = {
  nearby: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2" />
      <path d="M7 22l2-4 3-3-2-5-3 3-3 1" />
      <path d="M14 11l2 2 3-1 2 4" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v8a4 4 0 0 0 8 0V2" />
      <path d="M12 10v12" />
    </svg>
  ),
  beach: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 10c0-4-3-7-7-7-1 0-2 .2-3 .6l2.4 3.4" />
      <path d="M10 3L17 10" />
      <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22h18M5 22V10M19 22V10M9 22V14h6v8M3 10l9-7 9 7" />
    </svg>
  ),
};

function ReasonTag({ reason }) {
  const icon = ICONS[reason.icon];
  if (reason.link) {
    return (
      <a
        href="#location"
        className="text-sky-600 hover:text-sky-700 text-sm font-medium whitespace-nowrap"
      >
        <span className="text-slate-300 mr-2">·</span>
        {reason.label}
      </a>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full text-sm font-medium">
      {icon && <span className="text-sky-600">{icon}</span>}
      {reason.label}
    </span>
  );
}

function Column({ icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <ul className="divide-y divide-gray-100">{children}</ul>
    </div>
  );
}

function SimpleItem({ name, distance }) {
  return (
    <li className="flex items-center justify-between py-2.5 text-sm">
      <span className="text-slate-800 truncate pr-3">{name}</span>
      <span className="text-slate-500 shrink-0">{distance}</span>
    </li>
  );
}

function CafeItem({ type, name, distance }) {
  return (
    <li className="flex items-center justify-between py-2.5 text-sm gap-3">
      <span className="truncate">
        <span className="text-slate-400">{type}</span>
        <span className="text-slate-300 mx-1.5">·</span>
        <span className="text-slate-800 font-medium">{name}</span>
      </span>
      <span className="text-slate-500 shrink-0">{distance}</span>
    </li>
  );
}

export default function HotelSurroundingsSection({ locationSlug }) {
  const data = getSurroundingsForSlug(locationSlug);
  if (!data) return null;

  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
        Xung quanh khách sạn
      </h2>

      <div className="mb-8">
        <div className="text-sm font-semibold text-slate-800 mb-3">
          Khách thích khu vực này vì:
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {data.reasons.map((r, i) => (
            <ReasonTag key={i} reason={r} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
        <Column icon={HEADER_ICONS.nearby} title="Xung quanh có gì?">
          {data.nearbyThings.map((it, i) => (
            <SimpleItem key={i} name={it.name} distance={it.distance} />
          ))}
        </Column>

        <Column icon={HEADER_ICONS.food} title="Nhà hàng & quán cà phê">
          {data.cafesAndRestaurants.map((it, i) => (
            <CafeItem
              key={i}
              type={it.type}
              name={it.name}
              distance={it.distance}
            />
          ))}
        </Column>

        <Column
          icon={HEADER_ICONS[data.thirdColumnIcon] || HEADER_ICONS.beach}
          title={data.thirdColumnTitle}
        >
          {data.thirdColumnItems.map((it, i) => (
            <SimpleItem key={i} name={it.name} distance={it.distance} />
          ))}
        </Column>
      </div>
    </section>
  );
}
