import Link from "next/link";

function VoucherIcon() {
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
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9z" />
      <line x1="10" y1="8" x2="10" y2="16" strokeDasharray="2 2" />
    </svg>
  );
}

function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

export default function ActivityTicketCard({ slug, ticket }) {
  const href = `/activities/${slug}/booking?ticket=${ticket.id}`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
            {ticket.title}
          </h4>
          {ticket.description ? (
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
              {ticket.description}
            </p>
          ) : null}
          {ticket.badge ? (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
              <span className="text-slate-500">
                <VoucherIcon />
              </span>
              {ticket.badge}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 flex lg:flex-col items-center lg:items-end justify-between gap-3 lg:gap-2">
          <div className="text-lg md:text-xl font-bold text-orange-500">
            {formatPrice(ticket.price)}
          </div>
          <Link
            href={href}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-sm transition whitespace-nowrap"
          >
            Chọn vé
          </Link>
        </div>
      </div>
    </div>
  );
}
