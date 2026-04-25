export default function FlightsFaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  isLast,
}) {
  return (
    <div className={isLast ? "" : "border-b border-slate-100"}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left py-4 md:py-5 group"
      >
        <span className="font-bold text-slate-900 text-sm md:text-base leading-snug">
          {question}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={
            "shrink-0 w-5 h-5 text-slate-500 transition-transform duration-300 " +
            (isOpen ? "rotate-180" : "rotate-0")
          }
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
        className={
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out " +
          (isOpen
            ? "grid-rows-[1fr] opacity-100 pb-4 md:pb-5"
            : "grid-rows-[0fr] opacity-0")
        }
      >
        <div className="overflow-hidden">
          <p className="text-sm text-slate-600 leading-relaxed pr-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
