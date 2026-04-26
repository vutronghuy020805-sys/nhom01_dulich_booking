// FAQ data cho chatbot VieGo.
// Mỗi topic có thể chứa nhiều "paragraphs" (dòng câu trả lời) và "links"
// trỏ tới route nội bộ thật trong project.

export const chatbotFaq = [
  {
    id: "my-bookings",
    title: "Đặt chỗ của tôi ở đâu?",
    keywords: [
      "dat cho cua toi",
      "dat cho",
      "my bookings",
      "booking cua toi",
      "ve dien tu",
      "voucher",
      "vé đã đặt",
      "xem đặt chỗ",
    ],
    answer: {
      paragraphs: [
        "Tất cả vé điện tử, phiếu thanh toán và đặt chỗ đang hoạt động đều nằm ở mục Đặt chỗ của tôi trong tài khoản VieGo.",
        "Nếu bạn đã đăng nhập, bạn có thể mở trực tiếp bằng link bên dưới.",
      ],
      links: [{ label: "Mở Đặt chỗ của tôi", href: "/account/my-bookings" }],
    },
  },
  {
    id: "refund",
    title: "Làm sao để hoàn tiền / huỷ vé?",
    keywords: [
      "hoan tien",
      "refund",
      "huy ve",
      "huy dat cho",
      "tra lai tien",
      "cancel",
      "huỷ",
      "hủy",
      "hoàn",
    ],
    answer: {
      paragraphs: [
        "Bạn có thể gửi yêu cầu hoàn tiền từ mục Refunds trong tài khoản. Sau khi VieGo xác minh với đối tác, tiền sẽ được hoàn về thẻ/ví gốc trong 7–14 ngày làm việc.",
        "Chính sách hoàn tiền tuỳ thuộc vào loại dịch vụ và thời điểm huỷ — vui lòng xem chi tiết trong đơn của bạn.",
      ],
      links: [
        { label: "Theo dõi yêu cầu hoàn tiền", href: "/account/refunds" },
        { label: "Trung tâm hỗ trợ", href: "/help" },
      ],
    },
  },
  {
    id: "reschedule",
    title: "Làm sao để đổi lịch?",
    keywords: [
      "doi lich",
      "reschedule",
      "doi ngay",
      "thay doi lich trinh",
      "đổi lịch",
      "đổi ngày",
      "đổi vé",
    ],
    answer: {
      paragraphs: [
        "Với một số dịch vụ, VieGo hỗ trợ đổi lịch dễ dàng (Easy reschedule) — bạn có thể thao tác trực tiếp từ đơn đặt chỗ trong Đặt chỗ của tôi.",
        "Nếu dịch vụ không hỗ trợ đổi lịch tự động, đội ngũ hỗ trợ sẽ giúp bạn làm việc với đối tác.",
      ],
      links: [
        { label: "Xem Đặt chỗ của tôi", href: "/account/my-bookings" },
        { label: "Liên hệ hỗ trợ", href: "/contact" },
      ],
    },
  },
  {
    id: "payment",
    title: "Phương thức thanh toán",
    keywords: [
      "thanh toan",
      "payment",
      "phuong thuc",
      "the tin dung",
      "vi dien tu",
      "momo",
      "zalopay",
      "vnpay",
      "chuyen khoan",
      "qr",
      "thanh toán",
    ],
    answer: {
      paragraphs: [
        "VieGo hỗ trợ nhiều phương thức: thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPAY) và quét mã QR.",
        "Bạn có thể lưu thẻ an toàn trong tài khoản để thanh toán nhanh cho các lần sau.",
      ],
      links: [{ label: "Quản lý thẻ đã lưu", href: "/account/my-cards" }],
    },
  },
  {
    id: "transactions",
    title: "Kiểm tra giao dịch / lịch sử thanh toán",
    keywords: [
      "giao dich",
      "transaction",
      "lich su thanh toan",
      "hoa don",
      "invoice",
      "bien lai",
      "giao dịch",
    ],
    answer: {
      paragraphs: [
        "Lịch sử giao dịch đầy đủ (bao gồm vé máy bay, vé xe, khách sạn, hoạt động, đưa đón sân bay) nằm ở mục Danh sách giao dịch trong tài khoản của bạn.",
      ],
      links: [{ label: "Xem danh sách giao dịch", href: "/account/transactions" }],
    },
  },
  {
    id: "contact",
    title: "Liên hệ hỗ trợ khách hàng",
    keywords: [
      "lien he",
      "ho tro",
      "contact",
      "support",
      "cskh",
      "cham soc khach hang",
      "liên hệ",
      "hỗ trợ",
      "call",
      "hotline",
    ],
    answer: {
      paragraphs: [
        "Đội ngũ VieGo hỗ trợ 24/7 qua Trung tâm hỗ trợ hoặc trang Liên hệ. Bạn có thể gửi yêu cầu và theo dõi phản hồi trong Hộp thư của tôi.",
      ],
      links: [
        { label: "Trung tâm hỗ trợ", href: "/help" },
        { label: "Trang Liên hệ", href: "/contact" },
        { label: "Hộp thư của tôi", href: "/my-inbox" },
      ],
    },
  },
  {
    id: "bus",
    title: "Cách đặt vé xe khách",
    keywords: [
      "ve xe khach",
      "dat ve xe",
      "xe khach",
      "bus",
      "xe do",
      "mua ve xe",
      "vé xe",
    ],
    answer: {
      paragraphs: [
        "Để đặt vé xe khách: vào trang Vé xe khách, chọn điểm đi/đến + ngày khởi hành + số ghế, sau đó chọn chuyến phù hợp và thanh toán.",
        "VieGo có nhiều nhà xe uy tín và giá tốt mỗi ngày.",
      ],
      links: [{ label: "Đặt vé xe khách", href: "/bus" }],
    },
  },
  {
    id: "car-rental",
    title: "Cách thuê xe",
    keywords: [
      "thue xe",
      "car rental",
      "tu lai",
      "co tai xe",
      "self drive",
      "chauffeur",
      "thuê xe",
    ],
    answer: {
      paragraphs: [
        "VieGo có dịch vụ thuê xe tự lái và có tài xế. Vào trang Thuê xe, chọn địa điểm + thời gian nhận/trả xe, hệ thống sẽ hiển thị danh sách xe phù hợp.",
      ],
      links: [{ label: "Thuê xe trên VieGo", href: "/car-rental" }],
    },
  },
  {
    id: "activities",
    title: "Cách đặt hoạt động / vé tham quan",
    keywords: [
      "hoat dong",
      "activity",
      "activities",
      "tour",
      "ve tham quan",
      "vin wonders",
      "ba na",
      "trai nghiem",
      "hoạt động",
      "vé tham quan",
    ],
    answer: {
      paragraphs: [
        "Bạn có thể đặt vé tham quan, trải nghiệm ẩm thực, văn hoá và tour từ trang Hoạt động. Chọn hoạt động, chọn ngày và loại vé, rồi thanh toán.",
      ],
      links: [{ label: "Khám phá Hoạt động", href: "/activities" }],
    },
  },
  {
    id: "airport-transfer",
    title: "Cách đặt đưa đón sân bay",
    keywords: [
      "dua don san bay",
      "san bay",
      "airport transfer",
      "xe san bay",
      "don san bay",
      "đưa đón sân bay",
    ],
    answer: {
      paragraphs: [
        "Vào trang Đưa đón sân bay, chọn sân bay và điểm đến + ngày giờ đón, chọn loại xe phù hợp (4 chỗ, 7 chỗ, VIP…) rồi thanh toán.",
        "Tài xế sẽ chờ sẵn tại cổng đến theo lịch của bạn.",
      ],
      links: [{ label: "Đặt đưa đón sân bay", href: "/airport-transfer" }],
    },
  },
  {
    id: "flights",
    title: "Đặt vé máy bay",
    keywords: [
      "ve may bay",
      "flight",
      "may bay",
      "vé máy bay",
      "chuyến bay",
    ],
    answer: {
      paragraphs: [
        "Đặt vé máy bay trên VieGo: chọn hành trình (một chiều / khứ hồi), ngày bay, số khách, hạng ghế. So sánh nhiều hãng bay để tìm giá tốt.",
      ],
      links: [{ label: "Đặt vé máy bay", href: "/flights" }],
    },
  },
  {
    id: "hotels",
    title: "Đặt khách sạn",
    keywords: [
      "khach san",
      "hotel",
      "phong",
      "check in",
      "check out",
      "khách sạn",
      "phòng",
    ],
    answer: {
      paragraphs: [
        "Tìm và đặt khách sạn ở trang Khách sạn: nhập địa điểm + ngày nhận/trả phòng + số khách. VieGo tổng hợp hàng ngàn chỗ nghỉ từ khách sạn, resort đến homestay.",
      ],
      links: [{ label: "Tìm khách sạn", href: "/hotels" }],
    },
  },
  {
    id: "e-ticket",
    title: "Vé điện tử nằm ở đâu?",
    keywords: [
      "ve dien tu",
      "e-ticket",
      "eticket",
      "voucher",
      "phieu xac nhan",
      "vé điện tử",
    ],
    answer: {
      paragraphs: [
        "Ngay sau khi thanh toán thành công, vé điện tử (e-voucher) sẽ được gửi vào email bạn đăng ký và đồng thời lưu trong Đặt chỗ của tôi.",
      ],
      links: [{ label: "Mở Đặt chỗ của tôi", href: "/account/my-bookings" }],
    },
  },
  {
    id: "policy",
    title: "Chính sách quyền riêng tư & điều khoản",
    keywords: [
      "privacy",
      "policy",
      "dieu khoan",
      "terms",
      "quyen rieng tu",
      "chinh sach",
      "quyền riêng tư",
      "chính sách",
      "điều khoản",
    ],
    answer: {
      paragraphs: [
        "Chi tiết về cách VieGo xử lý dữ liệu cá nhân và các điều khoản sử dụng dịch vụ có ở trang Chính sách quyền riêng tư.",
      ],
      links: [{ label: "Chính sách quyền riêng tư", href: "/privacy-policy" }],
    },
  },
  {
    id: "viego-points",
    title: "Điểm thưởng VieGo Points hoạt động thế nào?",
    keywords: [
      "viego points",
      "diem thuong",
      "loyalty",
      "tich diem",
      "đổi điểm",
      "điểm thưởng",
      "tích điểm",
    ],
    answer: {
      paragraphs: [
        "Mỗi đơn hàng thành công sẽ tích điểm VieGo Points dựa trên giá trị đơn. Bạn có thể dùng điểm để giảm giá cho đơn tiếp theo hoặc đổi voucher.",
        "Chi tiết tỷ lệ tích điểm và cách đổi quà có trong mục VieGo Points trong tài khoản.",
      ],
      links: [{ label: "Tìm hiểu VieGo Points", href: "/help" }],
    },
  },
  {
    id: "promo-code",
    title: "Cách áp dụng mã giảm giá khi đặt?",
    keywords: [
      "ma giam gia",
      "promo code",
      "voucher",
      "coupon",
      "giảm giá",
      "mã khuyến mãi",
    ],
    answer: {
      paragraphs: [
        "Ở bước thanh toán, bạn nhập mã vào ô 'Mã giảm giá' rồi bấm Áp dụng. Hệ thống sẽ kiểm tra điều kiện và trừ trực tiếp vào tổng đơn nếu hợp lệ.",
        "Mỗi đơn chỉ áp dụng được 1 mã. Nếu mã không có hiệu lực, hãy kiểm tra điều kiện sử dụng và hạn dùng.",
      ],
      links: [{ label: "Xem ưu đãi hiện có", href: "/help" }],
    },
  },
];

// Các câu hỏi gợi ý nhanh hiển thị khi mở chat.
export const quickSuggestions = [
  { id: "q-bookings", label: "Đặt chỗ của tôi ở đâu?", topicId: "my-bookings" },
  { id: "q-refund", label: "Tôi muốn hoàn tiền", topicId: "refund" },
  { id: "q-reschedule", label: "Cách đổi lịch", topicId: "reschedule" },
  { id: "q-payment", label: "Phương thức thanh toán", topicId: "payment" },
  { id: "q-contact", label: "Liên hệ hỗ trợ", topicId: "contact" },
  { id: "q-bus", label: "Cách đặt vé xe khách", topicId: "bus" },
  { id: "q-points", label: "VieGo Points là gì?", topicId: "viego-points" },
  { id: "q-promo", label: "Áp dụng mã giảm giá", topicId: "promo-code" },
];

export const fallbackAnswer = {
  paragraphs: [
    "Xin lỗi, tôi chưa hiểu rõ câu hỏi này. Bạn có thể chọn một trong các chủ đề gợi ý bên dưới, hoặc liên hệ Trung tâm hỗ trợ của VieGo để được trợ giúp trực tiếp.",
  ],
  links: [
    { label: "Trung tâm hỗ trợ", href: "/help" },
    { label: "Trang Liên hệ", href: "/contact" },
  ],
};

export const greetingMessage = {
  paragraphs: [
    "Xin chào! Mình là Trợ lý VieGo 👋",
    "Bạn cần hỗ trợ gì? Chọn nhanh một chủ đề bên dưới hoặc nhập câu hỏi bất kỳ nhé.",
  ],
};
