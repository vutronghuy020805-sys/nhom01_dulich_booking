const STEPS = [
  "Chụp màn hình hoặc lưu mã QR bên trên, sau đó mở ứng dụng ví điện tử hoặc ngân hàng điện tử có hỗ trợ thanh toán QR với VietQR.",
  "Tìm biểu tượng hình ảnh ở phía dưới hoặc phía trên của trang để tải lên mã QR từ bộ sưu tập.",
  "Nếu bạn đang thanh toán bằng một thiết bị khác, bạn có thể quét trực tiếp mã QR bên trên.",
  "Đảm bảo tổng số tiền và người nhận thanh toán khớp với chi tiết ở trên, sau đó hoàn tất thanh toán trong thời gian giới hạn.",
  "Đặt chỗ của bạn sẽ tự động được xác nhận sau khi thanh toán thành công. Bạn có thể kiểm tra tình trạng đặt chỗ trong trang Đặt chỗ.",
];

export default function QrInstructionBox() {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">
        How to Pay with QR
      </h2>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <ol className="space-y-3 text-sm text-slate-700 leading-relaxed">
          {STEPS.map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-semibold text-slate-900 shrink-0">
                {i + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
