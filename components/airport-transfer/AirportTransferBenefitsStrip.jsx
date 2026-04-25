function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-10 h-10"
      fill="none"
      aria-hidden
    >
      <circle cx="24" cy="24" r="22" fill="#FCD34D" />
      <path
        d="M10 28h28v5a2 2 0 0 1-2 2h-2a3 3 0 0 1-6 0H18a3 3 0 0 1-6 0h-2a2 2 0 0 1-2-2z"
        fill="#F87171"
      />
      <path
        d="M12 28l3-7a3 3 0 0 1 2.8-2h12.4a3 3 0 0 1 2.8 2l3 7z"
        fill="#FCA5A5"
      />
      <rect x="16" y="23" width="6" height="4" rx="1" fill="#E0F2FE" />
      <rect x="26" y="23" width="6" height="4" rx="1" fill="#E0F2FE" />
      <circle cx="16" cy="34" r="2.5" fill="#1F2937" />
      <circle cx="32" cy="34" r="2.5" fill="#1F2937" />
    </svg>
  );
}

const BENEFITS = [
  "Available 24 hours",
  "Convenient pick-up point",
  "All-inclusive price",
];

export default function AirportTransferBenefitsStrip() {
  return (
    <section className="max-w-350 mx-auto px-4 lg:px-10 mt-6 md:mt-8">
      <div className="relative bg-sky-400 rounded-2xl shadow-sm overflow-visible">
        <div className="flex items-center gap-5 md:gap-8 pl-20 md:pl-28 pr-5 md:pr-8 py-4 md:py-5">
          <div className="absolute -left-2 md:-left-3 top-1/2 -translate-y-1/2">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-yellow-300 flex items-center justify-center shadow-md">
              <CarIcon />
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 md:gap-x-12 text-white font-semibold text-sm md:text-base">
            {BENEFITS.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
