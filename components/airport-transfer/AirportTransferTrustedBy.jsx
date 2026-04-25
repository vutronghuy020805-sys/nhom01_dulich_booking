import { TRUSTED_PARTNERS } from "@/data/airportTransferData";

export default function AirportTransferTrustedBy() {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-4 md:gap-6 bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] px-5 md:px-6 py-3">
        <span className="text-sm md:text-base font-semibold text-slate-700">
          Trusted by
        </span>
        <div className="flex items-center gap-3 md:gap-4">
          {TRUSTED_PARTNERS.map((p) => (
            <div
              key={p.id}
              className="h-8 md:h-9 flex items-center"
              title={p.label}
            >
              <img
                src={p.src}
                alt={p.label}
                className="max-h-full max-w-28 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
