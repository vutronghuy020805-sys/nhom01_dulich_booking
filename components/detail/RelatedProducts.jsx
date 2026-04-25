import Link from "next/link";

function formatVnd(value) {
  if (value == null) return "";
  return value.toLocaleString("vi-VN") + " VND";
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 text-amber-400"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2 L14.7 8.6 L21.8 9.2 L16.4 13.9 L18.1 20.9 L12 17.3 L5.9 20.9 L7.6 13.9 L2.2 9.2 L9.3 8.6 Z" />
    </svg>
  );
}

function RelatedCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative aspect-4/3 bg-linear-to-br from-sky-100 via-slate-50 to-slate-100 overflow-hidden flex items-center justify-center">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="text-4xl opacity-60">{item.fallbackIcon || "🏨"}</span>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="text-sm md:text-base font-semibold text-slate-900 line-clamp-2 leading-snug">
          {item.title}
        </h3>
        {item.subtitle ? (
          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
            {item.subtitle}
          </p>
        ) : null}
        <div className="mt-2 flex items-center justify-between gap-2">
          {item.rating ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800">
              <StarIcon />
              {Number(item.rating).toFixed(1)}
            </span>
          ) : (
            <span />
          )}
          {item.price ? (
            <span className="text-sm font-bold text-orange-500">
              {formatVnd(item.price)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default function RelatedProducts({
  title = "Sản phẩm liên quan",
  subtitle,
  items = [],
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {items.map((it) => (
          <RelatedCard key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
}
