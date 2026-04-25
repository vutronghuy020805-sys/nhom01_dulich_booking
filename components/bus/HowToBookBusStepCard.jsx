export default function HowToBookBusStepCard({ number, title, description }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 flex gap-4 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg md:text-xl font-extrabold">
        {number}
      </div>
      <div className="min-w-0 pt-1">
        <h3 className="font-bold text-slate-900 text-base md:text-lg leading-snug">
          {title}
        </h3>
        <p className="text-sm md:text-[15px] text-slate-600 mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
