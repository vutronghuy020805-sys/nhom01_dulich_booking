"use client";

const AdultIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
  </svg>
);

const ChildIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="2.6" />
    <path d="M12 9v6" />
    <path d="M8.5 12.5L12 11l3.5 1.5" />
    <path d="M9.5 20l2.5-5 2.5 5" />
  </svg>
);

const InfantIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="9.5" cy="10.5" r="0.7" fill="currentColor" />
    <circle cx="14.5" cy="10.5" r="0.7" fill="currentColor" />
    <path d="M10 14.5c.7.6 1.3.9 2 .9s1.3-.3 2-.9" />
  </svg>
);

export default function PassengerDropdown({
  adults,
  childrenCount,
  infants,
  onChange,
  onDone,
}) {
  const rows = [
    { key: "adults", label: "Người lớn", desc: "Từ 12 tuổi", Icon: AdultIcon, value: adults, min: 1 },
    { key: "children", label: "Trẻ em", desc: "Từ 2 - 11 tuổi", Icon: ChildIcon, value: childrenCount, min: 0 },
    { key: "infants", label: "Em bé", desc: "Dưới 2 tuổi", Icon: InfantIcon, value: infants, min: 0 },
  ];

  const current = { adults, children: childrenCount, infants };

  const inc = (key) => {
    onChange({ ...current, [key]: current[key] + 1 });
  };
  const dec = (key, min) => {
    if (current[key] > min) onChange({ ...current, [key]: current[key] - 1 });
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-semibold text-gray-800">Số hành khách</h3>
        <button
          type="button"
          onClick={onDone}
          aria-label="Đóng"
          className="text-gray-400 hover:text-gray-700 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((r) => {
          const { Icon } = r;
          const disabledMinus = r.value <= r.min;
          return (
            <div key={r.key} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Icon />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 leading-tight">{r.label}</div>
                  <div className="text-sm text-gray-500 leading-tight">{r.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => dec(r.key, r.min)}
                  disabled={disabledMinus}
                  aria-label={`Giảm ${r.label.toLowerCase()}`}
                  className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center transition-colors ${
                    disabledMinus ? "text-gray-300 cursor-not-allowed" : "text-[#55B6FF] hover:bg-gray-200"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-8 text-center text-lg font-medium text-gray-800 border-b border-gray-200">
                  {r.value}
                </span>
                <button
                  type="button"
                  onClick={() => inc(r.key)}
                  aria-label={`Tăng ${r.label.toLowerCase()}`}
                  className="w-10 h-10 rounded-lg bg-sky-50 text-[#55B6FF] flex items-center justify-center hover:bg-sky-100 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onDone}
        className="mt-6 w-full bg-[#55B6FF] hover:bg-[#3fa5f5] text-white font-semibold py-3 rounded-xl transition-colors shadow-md"
      >
        Xong
      </button>
    </div>
  );
}
