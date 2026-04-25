function BulletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-sky-500 mt-0.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const NOTES = [
  "Vui lòng có mặt đúng giờ đón đã chọn.",
  "Tài xế có thể liên hệ với bạn qua số điện thoại đã cung cấp.",
  "Hãy kiểm tra hãng bay và mã chuyến bay để tránh nhầm lẫn khi đón.",
  "Trong trường hợp thay đổi lịch trình, vui lòng kiểm tra chính sách đổi/hủy của booking.",
];

export default function AirportTransferUsageNotes() {
  return (
    <section className="bg-sky-50 border border-sky-100 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-slate-900">
        Lưu ý cho chuyến xe của bạn
      </h3>
      <ul className="mt-3 space-y-2">
        {NOTES.map((note) => (
          <li
            key={note}
            className="flex items-start gap-2.5 text-sm md:text-[15px] text-slate-700 leading-relaxed"
          >
            <BulletIcon />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
