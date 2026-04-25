const NOTES = [
  "Vui lòng đến đúng ngày tham quan đã chọn.",
  "Xuất trình mã vé điện tử hoặc QR khi đến điểm sử dụng dịch vụ.",
  "Một số hoạt động có thể yêu cầu đổi voucher tại quầy hoặc làm theo hướng dẫn của nhà cung cấp.",
  "Hãy kiểm tra kỹ chính sách hoàn hủy và thời gian sử dụng của vé trước khi khởi hành.",
];

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-sky-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

export default function ActivityUsageNotes() {
  return (
    <section className="bg-sky-50/60 border border-sky-200 rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <InfoIcon />
        <h3 className="text-base md:text-lg font-bold text-slate-900">
          Lưu ý khi sử dụng vé
        </h3>
      </div>
      <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-[15px] text-slate-700 leading-relaxed">
        {NOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}
