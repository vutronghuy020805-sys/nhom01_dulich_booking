function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3z" />
      <path d="M7 11l4-7a2 2 0 0 1 2-1c1 0 2 1 2 2v4h4a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 2H7" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function AmenityIcon({ available }) {
  if (available) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 text-emerald-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="4 12 10 18 20 6" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-rose-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export default function ActivityQuickInfo({ activity }) {
  return (
    <section className="bg-white">
      <div className="max-w-350 mx-auto px-4 lg:px-10 pt-6 md:pt-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug">
          {activity.title}
        </h1>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
              <h3 className="text-sm md:text-base font-bold text-slate-900 mb-3">
                Bạn sẽ trải nghiệm
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-[15px] text-slate-700 leading-relaxed">
                {activity.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-start gap-3">
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-700 bg-white">
                <ClockIcon />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Giờ hoạt động
                </div>
                <div className="text-sm text-slate-600 mt-0.5">
                  {activity.openingHours}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-700 bg-white">
                <ThumbsUpIcon />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Phù hợp với
                </div>
                <div className="text-sm text-slate-600 mt-0.5">
                  {activity.suitableFor.join(", ")}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-700 bg-white">
                <InfoIcon />
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900 mb-2">
                  Tiện nghi
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {activity.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <AmenityIcon available={item.available} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
