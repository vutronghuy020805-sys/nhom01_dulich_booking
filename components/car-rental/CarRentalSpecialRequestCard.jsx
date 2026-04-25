"use client";

const MAX = 100;

export default function CarRentalSpecialRequestCard({ value, onChange }) {
  const current = value || "";
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        Yêu cầu đặc biệt cho xe thuê (không bắt buộc)
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 px-5 md:px-6 py-5">
        <p className="text-sm text-slate-700 mb-3">
          <span className="font-semibold">LƯU Ý:</span> Yêu cầu đặc biệt tùy vào
          tình trạng sẵn có của nhà cung cấp xe thuê.
        </p>
        <div className="relative">
          <textarea
            rows={3}
            maxLength={MAX}
            value={current}
            onChange={(e) => onChange(e.target.value.slice(0, MAX))}
            placeholder="Biển số xe lẻ hoặc chẵn, đồ sạc trên xe, ghế ngồi cho em bé, v.v."
            className="w-full resize-none px-3 py-2.5 pr-16 rounded-md border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <div className="text-right text-xs text-slate-400 mt-1">
            {current.length}/{MAX}
          </div>
        </div>
      </div>
    </section>
  );
}
