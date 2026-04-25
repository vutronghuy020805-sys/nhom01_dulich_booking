export default function CarRentalFaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:shadow-sm transition-shadow">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5"
      >
        <span
          className={`text-sm md:text-base font-semibold leading-snug transition-colors ${
            isOpen ? "text-blue-600" : "text-slate-900"
          }`}
        >
          {item.question}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`shrink-0 w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-600" : "rotate-0 text-slate-400"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out px-5 md:px-6 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
