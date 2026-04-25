"use client";

export default function CategoryFilter({ options, selected, onChange }) {
  const selectedSet = new Set(selected || []);

  const toggle = (id) => {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  return (
    <ul className="space-y-2">
      {options.map((opt) => {
        const active = selectedSet.has(opt.id);
        return (
          <li key={opt.id}>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggle(opt.id)}
                className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
              />
              <span className="flex-1">{opt.label}</span>
              {typeof opt.count === "number" ? (
                <span className="text-xs text-slate-400">({opt.count})</span>
              ) : null}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
