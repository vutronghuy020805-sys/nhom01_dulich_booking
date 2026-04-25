import Link from "next/link";

const STEPS = [
  { n: 1, label: "Đặt" },
  { n: 2, label: "Xem lại" },
  { n: 3, label: "Thanh toán" },
  { n: 4, label: "Vé điện tử" },
];

function StepBadge({ n, active, done }) {
  return (
    <span
      className={
        "inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold shrink-0 " +
        (active
          ? "bg-sky-500 text-white"
          : done
          ? "bg-emerald-500 text-white"
          : "bg-slate-200 text-slate-500")
      }
    >
      {n}
    </span>
  );
}

export default function CarRentalBookingStepHeader({ activeStep = 1 }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-3 flex items-center gap-6 md:gap-10">
        <Link href="/car-rental" className="flex items-center shrink-0">
          <img
            src="/nhom01_dulich_booking/assets/logo-viego.png"
            alt="VieGo Travel"
            className="w-12 h-12 object-contain brightness-0"
          />
        </Link>

        <ol className="flex items-center gap-3 md:gap-5 lg:gap-8 overflow-x-auto ml-auto">
          {STEPS.map((s, i) => {
            const isActive = s.n === activeStep;
            const isDone = s.n < activeStep;
            return (
              <li key={s.n} className="flex items-center gap-2 shrink-0">
                <StepBadge n={s.n} active={isActive} done={isDone} />
                <span
                  className={
                    "text-sm font-semibold " +
                    (isActive
                      ? "text-sky-700"
                      : isDone
                      ? "text-emerald-700"
                      : "text-slate-500")
                  }
                >
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    className="hidden lg:inline text-slate-300 ml-3"
                    aria-hidden
                  >
                    —
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </header>
  );
}
