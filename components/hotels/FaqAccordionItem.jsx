export default function FaqAccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span
          className={`text-base md:text-lg font-medium transition-colors ${
            isOpen ? "text-blue-600" : "text-slate-800"
          }`}
        >
          {item.question}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-600" : "text-gray-400"
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed pr-8">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
