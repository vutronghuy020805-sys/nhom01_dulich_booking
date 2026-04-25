const BASE_NOTES = [
  "Vui lòng có mặt tại điểm nhận xe đúng giờ đã đặt.",
  "Mang theo giấy tờ tùy thân hợp lệ (CCCD/CMND/hộ chiếu).",
  "Xuất trình mã đặt chỗ hoặc mã xác nhận điện tử cho nhà cung cấp khi nhận xe.",
  "Nếu có thay đổi hoặc phát sinh, vui lòng liên hệ VieGo hoặc nhà cung cấp càng sớm càng tốt.",
];

const SELF_DRIVE_NOTES = [
  "Mang theo giấy phép lái xe còn hiệu lực phù hợp với loại xe đã đặt.",
  "Kiểm tra kỹ xe trước khi nhận và ký biên bản bàn giao với nhà cung cấp.",
];

const WITH_DRIVER_NOTES = [
  "Tài xế hoặc nhà cung cấp có thể chủ động liên hệ với bạn trước giờ đón.",
  "Cung cấp địa chỉ chính xác khi tài xế liên hệ để tránh chậm trễ.",
];

export default function CarRentalPickupNotesCard({ driverOption }) {
  const extras =
    driverOption === "with-driver" ? WITH_DRIVER_NOTES : SELF_DRIVE_NOTES;
  const notes = [...BASE_NOTES, ...extras];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3">
        Lưu ý khi nhận xe
      </h2>
      <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
        {notes.map((note, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-sky-500 font-bold shrink-0">•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
