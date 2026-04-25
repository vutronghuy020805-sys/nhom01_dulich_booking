import Image from "next/image";

function CalendarXIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
      <line x1="9.5" y1="14" x2="14.5" y2="18" />
      <line x1="14.5" y1="14" x2="9.5" y2="18" />
    </svg>
  );
}

function RefundXIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="7" width="19" height="11" rx="2" />
      <circle cx="12" cy="12.5" r="2.5" />
      <line x1="9.5" y1="10.5" x2="14.5" y2="14.5" />
    </svg>
  );
}

function getPolicyIcon(index) {
  return index === 0 ? <CalendarXIcon /> : <RefundXIcon />;
}

export default function ActivityTicketBookingCard({ activity, ticket }) {
  return (
    <aside className="bg-white border border-slate-200 rounded-2xl p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
        <Image
          src={ticket.image}
          alt={ticket.title}
          fill
          sizes="(min-width: 1024px) 320px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <h2 className="mt-4 text-base md:text-lg font-bold text-slate-900 leading-snug">
        {ticket.title}
      </h2>
      <div className="mt-1 text-xs md:text-sm text-slate-500">
        {activity.title}
      </div>

      {ticket.policies?.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {ticket.policies.map((policy, idx) => (
            <li
              key={policy}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-2 text-xs md:text-sm text-slate-600"
            >
              <span className="text-slate-500">{getPolicyIcon(idx)}</span>
              <span>{policy}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
