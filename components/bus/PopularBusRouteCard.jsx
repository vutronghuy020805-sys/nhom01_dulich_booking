import Link from "next/link";

function splitPrice(price) {
  const parts = String(price || "").trim().split(/\s+/);
  if (parts.length < 2) return { amount: parts[0] || price, currency: "" };
  const currency = parts[parts.length - 1];
  const amount = parts.slice(0, -1).join(" ");
  return { amount, currency };
}

export default function PopularBusRouteCard({ fromCity, image, routes }) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div
        className="relative aspect-[16/7] bg-slate-700 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        role="img"
        aria-label={`Tuyến xe khách từ ${fromCity}`}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative h-full px-5 py-4 flex items-end justify-between gap-3">
          <div className="text-white">
            <div className="text-sm md:text-base">Vé xe khách từ</div>
            <div className="text-xl md:text-2xl font-extrabold leading-tight">
              {fromCity}{" "}
              <span className="font-medium text-white/90">đến:</span>
            </div>
          </div>
          <div className="text-white text-sm md:text-base shrink-0 self-end pb-0.5">
            Giá từ:
          </div>
        </div>
      </div>

      <ul className="divide-y divide-slate-100">
        {routes.map((r, i) => {
          const { amount, currency } = splitPrice(r.price);
          return (
            <li
              key={r.toSlug || i}
              className={
                "flex items-start justify-between px-5 py-4 gap-3 " +
                (i % 2 === 1 ? "bg-slate-50" : "")
              }
            >
              <Link
                href={r.href}
                className="text-sky-600 font-semibold underline underline-offset-2 decoration-sky-300 hover:text-sky-700 hover:decoration-sky-500"
              >
                {r.toCity}
              </Link>
              <div className="text-right shrink-0 leading-tight">
                <div className="text-slate-900 font-medium">{amount}</div>
                <div className="text-slate-700 text-sm">{currency}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
