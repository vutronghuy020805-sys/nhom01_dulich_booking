import Link from "next/link";

function StepCheck() {
  return (
    <span className="inline-flex w-6 h-6 rounded-full bg-emerald-500 text-white items-center justify-center shadow-sm">
      <svg
        viewBox="0 0 24 24"
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="5 12 10 17 19 7" />
      </svg>
    </span>
  );
}

function StepNumber({ n, active }) {
  return (
    <span
      className={
        "inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold " +
        (active
          ? "bg-sky-500 text-white"
          : "bg-white border border-slate-300 text-slate-500")
      }
    >
      {n}
    </span>
  );
}

export default function FlightBookingHeader({ step = 1 }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-3 flex items-center gap-6 md:gap-10">
        <Link href="/flights" className="shrink-0 flex items-center">
          <img
            src="/assets/logo-viego.png"
            alt="VieGo Travel"
            className="w-12 h-12 object-contain brightness-0"
          />
        </Link>

        <ol className="flex items-center gap-4 md:gap-8 flex-1 min-w-0 overflow-x-auto">
          <li className="flex items-center gap-3 shrink-0">
            {step > 1 ? <StepCheck /> : <StepNumber n={1} active />}
            <div className="min-w-0">
              <div
                className={
                  "text-sm font-semibold " +
                  (step >= 1 ? "text-emerald-600" : "text-slate-500")
                }
              >
                Chi tiết chuyến đi của bạn
              </div>
            </div>
          </li>

          <li className="hidden md:block flex-1 h-px bg-slate-200" />

          <li className="flex items-center gap-3 shrink-0">
            <StepNumber n={2} active={step === 2} />
            <div className="min-w-0">
              <div
                className={
                  "text-sm font-semibold " +
                  (step === 2 ? "text-sky-600" : "text-slate-700")
                }
              >
                Thanh toán
              </div>
              <div className="text-xs text-slate-500">
                Hoàn tất đặt vé máy bay
              </div>
            </div>
          </li>
        </ol>
      </div>
    </header>
  );
}
