const STEPS = [
  "Mở ứng dụng ngân hàng hoặc ví điện tử có hỗ trợ quét mã VietQR.",
  "Quét mã QR hiển thị ở phía trên hoặc tải ảnh mã QR về để mở trên thiết bị khác.",
  "Kiểm tra đúng số tiền, nội dung thanh toán và thông tin người nhận trước khi xác nhận.",
  "Hoàn tất thanh toán trong thời gian giữ chỗ còn hiệu lực để đảm bảo giá vé không thay đổi.",
  "Sau khi thanh toán thành công, vé điện tử của VieGo sẽ được gửi đến email và lưu trong mục Đặt chỗ của tôi.",
];

export default function BusPaymentInstructionsCard() {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">
        Cách thanh toán bằng mã QR
      </h2>
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
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
