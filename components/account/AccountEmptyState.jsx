import SleepySuitcaseIllustration from "./SleepySuitcaseIllustration";

export default function AccountEmptyState({
  title = "Chưa có dữ liệu",
  description,
  action,
  illustration,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-6">
      <div className="shrink-0">
        {illustration ?? (
          <SleepySuitcaseIllustration className="w-28 h-28 md:w-32 md:h-32" />
        )}
      </div>
      <div className="flex-1 min-w-0 text-center md:text-left">
        <h3 className="text-base md:text-lg font-bold text-slate-900">{title}</h3>
        {description ? (
          <p className="mt-1.5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            {description}
          </p>
        ) : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}
