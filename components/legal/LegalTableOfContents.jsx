import Link from "next/link";

export default function LegalTableOfContents({ items = [] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav
      aria-label="Mục lục"
      className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm"
    >
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
        Mục lục
      </h3>
      <ol className="space-y-2 text-sm">
        {items.map((item, idx) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="block text-slate-700 hover:text-sky-600 transition-colors leading-snug"
            >
              <span className="text-slate-400 mr-1.5">
                {String(idx + 1).padStart(2, "0")}.
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
