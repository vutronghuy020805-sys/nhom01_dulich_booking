export const helpTopics = [
  {
    id: "booking-direct",
    question: "Đặt chỗ trực tiếp để đảm bảo an toàn",
    answer:
      "Để đảm bảo an toàn, bạn nên đặt chỗ trực tiếp qua website hoặc ứng dụng chính thức của VieGo. Tránh giao dịch qua bên thứ ba không được ủy quyền.",
    categoryIds: ["general", "account"],
  },
  {
    id: "flight-reschedule",
    question: "Cách đổi lịch vé máy bay của tôi",
    answer:
      "Truy cập 'Đặt chỗ của tôi', chọn vé cần đổi lịch, bấm 'Đổi lịch' và làm theo hướng dẫn. Phí đổi lịch tuỳ thuộc vào hạng vé và chính sách của hãng bay.",
    categoryIds: ["flights"],
  },
  {
    id: "flight-change-name",
    question:
      "Tôi có thể thay đổi hoặc sửa tên hành khách trên vé máy bay của mình không ?",
    answer:
      "Một số hãng bay cho phép sửa tên trong 24 giờ đầu sau đặt, số khác yêu cầu huỷ/đặt lại. Liên hệ VieGo CS để được kiểm tra cụ thể cho mã đặt chỗ của bạn.",
    categoryIds: ["flights", "account"],
  },
  {
    id: "flight-cancel-refund",
    question: "Cách huỷ vé và hoàn tiền cho đặt chỗ máy bay",
    answer:
      "Vào 'Đặt chỗ của tôi' → chọn vé → bấm 'Huỷ đặt chỗ' → xác nhận. Tiền hoàn sẽ về nguồn thanh toán gốc trong 7-14 ngày làm việc.",
    categoryIds: ["flights", "viegopay"],
  },
  {
    id: "refund-status",
    question: "Làm cách nào để kiểm tra trạng thái hoàn tiền của tôi",
    answer:
      "Truy cập mục 'Hoàn tiền' trong 'Đặt chỗ của tôi' để xem trạng thái real-time của từng yêu cầu hoàn tiền.",
    categoryIds: ["general", "viegopay"],
  },
  {
    id: "hotel-checkin",
    question: "Tôi cần xuất trình gì khi nhận phòng khách sạn?",
    answer:
      "Mang theo CCCD/Passport của người đặt phòng và mã booking. Một số khách sạn có thể yêu cầu thẻ tín dụng để đặt cọc.",
    categoryIds: ["hotels"],
  },
  {
    id: "hotel-cancel",
    question: "Chính sách huỷ phòng khách sạn như thế nào?",
    answer:
      "Mỗi phòng có chính sách riêng được hiển thị trước khi đặt. Phòng 'Hoàn tiền miễn phí' cho phép huỷ trước 24-72 giờ nhận phòng.",
    categoryIds: ["hotels"],
  },
  {
    id: "airport-transfer-pickup",
    question: "Tài xế đưa đón sân bay sẽ đón tôi ở đâu?",
    answer:
      "Tài xế sẽ có mặt tại khu vực đón quy định của sân bay với bảng tên của bạn, thường là khu arrival hall. Liên hệ số điện thoại trong e-ticket nếu cần hỗ trợ.",
    categoryIds: ["airport-transfer"],
  },
  {
    id: "airport-transfer-flight-delay",
    question: "Nếu chuyến bay của tôi bị hoãn thì sao?",
    answer:
      "Nhập đúng mã chuyến bay khi đặt xe, tài xế sẽ theo dõi giờ thực tế và chờ thêm miễn phí tối đa 60 phút sau giờ hạ cánh.",
    categoryIds: ["airport-transfer", "flights"],
  },
  {
    id: "bus-ticket-cancel",
    question: "Huỷ vé xe khách như thế nào?",
    answer:
      "Vào 'Đặt chỗ của tôi' → chọn vé xe → 'Huỷ đặt chỗ'. Phí huỷ theo chính sách của nhà xe.",
    categoryIds: ["bus"],
  },
  {
    id: "activity-voucher",
    question: "Voucher hoạt động du lịch dùng như thế nào?",
    answer:
      "Sau khi thanh toán thành công, voucher sẽ xuất hiện trong mục 'Đặt chỗ của tôi'. Xuất trình mã QR tại điểm đến.",
    categoryIds: ["activities"],
  },
  {
    id: "viegopay-topup",
    question: "Cách nạp tiền vào ví VieGoPay?",
    answer:
      "Mở VieGoPay trong app → 'Nạp tiền' → chọn phương thức (ngân hàng, thẻ, ví điện tử) → nhập số tiền và xác nhận.",
    categoryIds: ["viegopay"],
  },
  {
    id: "viego-points-earn",
    question: "Làm sao để tích VieGo Points?",
    answer:
      "Mỗi giao dịch thành công đều tích Points theo tỷ lệ. Đăng nhập trước khi đặt chỗ để đảm bảo Points được ghi nhận.",
    categoryIds: ["viego-points"],
  },
  {
    id: "account-security",
    question: "Tôi nghi ngờ tài khoản bị xâm nhập thì phải làm gì?",
    answer:
      "Đổi mật khẩu ngay, bật xác thực 2 lớp, và liên hệ CS qua 'Liên hệ chúng tôi' để được khoá tài khoản tạm thời nếu cần.",
    categoryIds: ["account"],
  },
  {
    id: "combo-flight-hotel",
    question: "Combo Vé máy bay + Khách sạn có được huỷ lẻ không?",
    answer:
      "Combo thường chỉ huỷ trọn gói. Với combo linh hoạt, bạn có thể huỷ từng phần - xem chính sách trong chi tiết booking.",
    categoryIds: ["combo", "flights", "hotels"],
  },
  {
    id: "insurance-claim",
    question: "Cách yêu cầu bồi thường bảo hiểm du lịch?",
    answer:
      "Liên hệ đối tác bảo hiểm theo thông tin trong chứng nhận bảo hiểm, cung cấp giấy tờ liên quan (vé, hoá đơn y tế, biên bản...). Thời hạn khiếu nại thường 30 ngày sau sự cố.",
    categoryIds: ["insurance"],
  },
];
