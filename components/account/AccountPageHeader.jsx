export default function AccountPageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-5 md:mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
