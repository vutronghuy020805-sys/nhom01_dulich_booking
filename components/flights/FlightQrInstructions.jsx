const STEPS = [
  "Chụp màn hình hoặc lưu mã QR bên trên, sau đó mở ứng dụng ngân hàng hoặc ví điện tử có hỗ trợ quét mã VietQR.",
  "Chọn tính năng quét mã QR hoặc tải ảnh mã QR lên từ thư viện ảnh trên điện thoại của bạn.",
  "Kiểm tra đúng tên đơn hàng (VieGo Travel) và tổng số tiền thanh toán trùng khớp với vé máy bay bạn đang đặt.",
  "Hoàn tất thanh toán trong thời gian giữ giá còn hiệu lực để đảm bảo giá vé và chỗ ngồi không bị thay đổi.",
  "Sau khi thanh toán thành công, vé điện tử và thông tin xác nhận của chuyến bay sẽ được VieGo gửi về email của bạn.",
];

export default function FlightQrInstructions() {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">
        Cách thanh toán bằng QR
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
