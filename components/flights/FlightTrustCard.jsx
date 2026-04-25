export default function FlightTrustCard({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 flex-1 bg-white border border-slate-200/80 rounded-2xl p-4 md:p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-slate-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
