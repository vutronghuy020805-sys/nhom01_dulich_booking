const NOTES = [
  "Vui lòng có mặt tại điểm đón trước giờ khởi hành ít nhất 15 – 30 phút.",
  "Xuất trình vé điện tử hoặc mã đặt chỗ cho nhân viên nhà xe trước khi lên xe.",
  "Mang theo giấy tờ tùy thân hợp lệ (CCCD/CMND/hộ chiếu) nếu nhà xe yêu cầu.",
  "Liên hệ nhà xe hoặc VieGo nếu cần hỗ trợ thay đổi hoặc xử lý phát sinh.",
];

export default function BusTicketNotesCard() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3">
        Lưu ý khi lên xe
      </h2>
      <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
        {NOTES.map((note, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-sky-500 font-bold shrink-0">•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
