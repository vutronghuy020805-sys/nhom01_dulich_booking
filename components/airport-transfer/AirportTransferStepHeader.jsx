import Link from "next/link";

const STEPS = [
  { id: 1, label: "Đặt" },
  { id: 2, label: "Xem lại" },
  { id: 3, label: "Thanh toán" },
  { id: 4, label: "Vé điện tử" },
];

export default function AirportTransferStepHeader({ currentStep = 1 }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0 flex items-center">
          <img
            src="/nhom01_dulich_booking/assets/logo-viego.png"
            alt="VieGo Travel"
            className="w-14 h-14 object-contain brightness-0"
          />
        </Link>

        <ol className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium overflow-x-auto">
          {STEPS.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isDone = step.id < currentStep;
            return (
              <li key={step.id} className="flex items-center gap-1 md:gap-2 shrink-0">
                <span
                  className={
                    "inline-flex items-center gap-2 px-1 md:px-2 py-1 " +
                    (isActive
                      ? "text-sky-600"
                      : isDone
                        ? "text-slate-700"
                        : "text-slate-400")
                  }
                >
                  <span
                    className={
                      "inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold " +
                      (isActive
                        ? "bg-sky-500 text-white"
                        : isDone
                          ? "bg-slate-200 text-slate-700"
                          : "bg-slate-200 text-slate-500")
                    }
                  >
                    {step.id}
                  </span>
                  <span className="font-semibold">{step.label}</span>
                </span>
                {idx < STEPS.length - 1 ? (
                  <span className="text-slate-300 select-none">—</span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </header>
  );
}
