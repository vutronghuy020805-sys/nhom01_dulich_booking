import { activitiesData } from "./activitiesData";

export const activityDetailsData = {
  // ====== ĐIỂM THAM QUAN ======
  "vinwonders-nha-trang": {
    openingHours: "9:00 - 22:00",
    suitableFor: ["Giải trí", "Trò chơi", "Thư giãn", "Gia đình vui vẻ"],
    amenities: [
      { label: "Nhà hàng", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Bãi đỗ xe", available: true },
      { label: "Wi-Fi miễn phí", available: true },
    ],
    highlights: [
      "Trải nghiệm cáp treo vượt biển dài nổi tiếng",
      "Thử các trò chơi cảm giác mạnh",
      "Thư giãn, ngắm biển và thành phố",
      "Xem Tata Show 3D mapping buổi tối",
    ],
    ticketOptions: [
      {
        id: "combo-vinwonders-cap-treo",
        title: "[COMBO] VinWonders + Cáp Treo Khứ Hồi",
        description: "Vé vào cổng và trải nghiệm cáp treo khứ hồi.",
        price: 1050000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "vinwonders-tre-em-sau-18h-buffet",
        title:
          "(Trẻ em) [COMBO] VinWonders (vào cửa sau 18:00) + Cáp Treo Khứ Hồi + Buffet tối",
        description:
          "Thưởng thức bữa tối buffet ngon miệng tại Nhà hàng Wind & Sea.",
        price: 450000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "vinwonders-nguoi-lon-sau-18h-buffet",
        title:
          "(Người lớn/Người cao tuổi) [COMBO] VinWonders (vào cửa sau 18:00) + Cáp Treo Khứ Hồi + Buffet tối",
        description:
          "Thưởng thức bữa tối buffet ngon miệng tại Nhà hàng Wind & Sea.",
        price: 600000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "combo-vinwonders-sau-16h",
        title: "[COMBO] VinWonders (vào cửa sau 16:00) + Cáp Treo Khứ Hồi",
        description: "Lựa chọn phù hợp để tận hưởng buổi chiều và tối tại đảo.",
        price: 700000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "sun-world-nui-ba-den": {
    openingHours: "7:30 - 17:30",
    suitableFor: ["Gia đình", "Tâm linh", "Nhóm bạn", "Người yêu thiên nhiên"],
    amenities: [
      { label: "Nhà hàng", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Bãi đỗ xe", available: true },
      { label: "Khu check-in", available: true },
    ],
    highlights: [
      "Đi cáp treo kỷ lục lên đỉnh Núi Bà Đen",
      "Chiêm bái tượng Phật Bà Tây Bổ Đà Sơn",
      "Ngắm biển mây và quang cảnh Tây Ninh từ trên cao",
      "Check-in các công trình tâm linh độc đáo",
    ],
    ticketOptions: [
      {
        id: "vbd-cap-treo-dinh",
        title: "Vé cáp treo khứ hồi lên đỉnh Núi Bà Đen",
        description: "Trải nghiệm cáp treo tốc độ nhanh và an toàn.",
        price: 450000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "vbd-combo-2-tuyen",
        title: "[COMBO] 2 tuyến cáp treo - đỉnh núi & chùa Bà",
        description: "Trải nghiệm cả hành trình tâm linh lẫn chinh phục đỉnh.",
        price: 620000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "vbd-bua-trua-buffet",
        title: "[COMBO] Cáp treo + Buffet trưa tại đỉnh",
        description: "Bao gồm vé cáp treo và buffet trưa với tầm nhìn đẹp.",
        price: 780000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "thao-cam-vien": {
    openingHours: "7:00 - 18:00",
    suitableFor: ["Gia đình", "Trẻ em", "Học sinh", "Người yêu động vật"],
    amenities: [
      { label: "Nhà vệ sinh", available: true },
      { label: "Ghế nghỉ chân", available: true },
      { label: "Căng tin", available: true },
      { label: "Khu vui chơi", available: true },
    ],
    highlights: [
      "Khám phá vườn thú lâu đời nhất Việt Nam",
      "Quan sát hàng trăm loài động vật hoang dã",
      "Dạo chơi trong khuôn viên cây xanh mát",
      "Khu vui chơi dành riêng cho trẻ em",
    ],
    ticketOptions: [
      {
        id: "tcv-nguoi-lon",
        title: "Vé vào cổng Thảo Cầm Viên - Người lớn",
        description: "Tham quan toàn bộ khu vườn thú và thực vật.",
        price: 80000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "tcv-tre-em",
        title: "Vé vào cổng Thảo Cầm Viên - Trẻ em",
        description: "Giá ưu đãi dành cho trẻ em dưới 1m3.",
        price: 50000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "tcv-combo-tro-choi",
        title: "[COMBO] Vé vào cổng + Khu trò chơi",
        description: "Tiết kiệm hơn khi kết hợp tham quan và chơi.",
        price: 150000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "sun-world-ba-na-hills": {
    openingHours: "7:30 - 22:00",
    suitableFor: ["Gia đình", "Cặp đôi", "Nhóm bạn", "Người yêu khám phá"],
    amenities: [
      { label: "Nhà hàng", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Bãi đỗ xe", available: true },
      { label: "Khu check-in", available: true },
    ],
    highlights: [
      "Đi cáp treo kỷ lục lên đỉnh Bà Nà",
      "Tham quan Cầu Vàng nổi tiếng",
      "Dạo chơi trong Làng Pháp cổ kính",
      "Xem các show nghệ thuật đặc sắc",
    ],
    ticketOptions: [
      {
        id: "bna-ve-vao-cong",
        title: "Vé cáp treo khứ hồi Bà Nà Hills",
        description: "Bao gồm vé cáp treo và tham quan toàn khu.",
        price: 900000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "bna-combo-buffet",
        title: "[COMBO] Cáp treo + Buffet trưa",
        description: "Trọn gói cho một ngày đáng nhớ tại Bà Nà Hills.",
        price: 1150000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "bna-xe-dua",
        title: "[COMBO] Cáp treo + Đưa đón từ Đà Nẵng",
        description: "Xe đưa đón hai chiều từ trung tâm Đà Nẵng.",
        price: 1250000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "hoang-thanh-thang-long": {
    openingHours: "8:00 - 17:00",
    suitableFor: [
      "Gia đình",
      "Học sinh, sinh viên",
      "Người yêu lịch sử",
      "Khách quốc tế",
    ],
    amenities: [
      { label: "Nhà vệ sinh", available: true },
      { label: "Khu trưng bày", available: true },
      { label: "Hướng dẫn viên", available: true },
      { label: "Bãi đỗ xe", available: true },
    ],
    highlights: [
      "Tham quan di sản văn hóa thế giới UNESCO",
      "Khám phá kiến trúc Hoàng cung thời phong kiến",
      "Tìm hiểu hiện vật khảo cổ độc đáo",
      "Check-in các công trình cổ đặc sắc",
    ],
    ticketOptions: [
      {
        id: "htt-nguoi-lon",
        title: "Vé vào cổng Hoàng Thành Thăng Long - Người lớn",
        description: "Tham quan toàn bộ khu di tích trung tâm.",
        price: 70000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "htt-hoc-sinh",
        title: "Vé Học sinh, Sinh viên",
        description: "Ưu đãi dành cho học sinh, sinh viên khi xuất trình thẻ.",
        price: 35000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "htt-huong-dan-vien",
        title: "[COMBO] Vé vào cổng + Hướng dẫn viên",
        description: "Khám phá di sản sâu hơn với hướng dẫn viên chuyên nghiệp.",
        price: 180000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "pho-co-hoi-an": {
    openingHours: "Cả ngày - Khu phố đêm 17:00 - 22:30",
    suitableFor: ["Cặp đôi", "Gia đình", "Nhóm bạn", "Khách quốc tế"],
    amenities: [
      { label: "Quầy thông tin", available: true },
      { label: "Nhà vệ sinh công cộng", available: true },
      { label: "Cửa hàng lưu niệm", available: true },
      { label: "Quán cà phê, ẩm thực", available: true },
    ],
    highlights: [
      "Đi dạo giữa các ngôi nhà cổ hàng trăm năm tuổi",
      "Ngắm phố đèn lồng lung linh buổi tối",
      "Trải nghiệm thả đèn hoa đăng trên sông Hoài",
      "Thưởng thức ẩm thực đặc trưng xứ Quảng",
    ],
    ticketOptions: [
      {
        id: "hoi-an-ve-tham-quan",
        title: "Vé tham quan phố cổ Hội An",
        description: "Vé vào 5 công trình cổ nổi bật trong khu phố cổ.",
        price: 120000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "hoi-an-dem-lang",
        title: "[COMBO] Vé tham quan + Thả đèn hoa đăng",
        description: "Trọn gói tham quan ban ngày và thả đèn buổi tối.",
        price: 180000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "hoi-an-ky-uc",
        title: "[COMBO] Phố cổ + Show Ký Ức Hội An",
        description: "Xem show thực cảnh Ký Ức Hội An nổi tiếng.",
        price: 420000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  // ====== TRẢI NGHIỆM ẨM THỰC ======
  "ben-thanh-princess-dinner-cruise": {
    openingHours: "19:00 - 22:00",
    suitableFor: ["Cặp đôi", "Gia đình", "Nhóm bạn", "Kỷ niệm đặc biệt"],
    amenities: [
      { label: "Nhà hàng trên tàu", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Sân khấu biểu diễn", available: true },
      { label: "Tầng ngắm cảnh", available: true },
    ],
    highlights: [
      "Du ngoạn trên sông Sài Gòn về đêm",
      "Thưởng thức buffet quốc tế đa dạng",
      "Xem các tiết mục ca nhạc live",
      "Không gian lãng mạn, sang trọng",
    ],
    ticketOptions: [
      {
        id: "btp-buffet-standard",
        title: "Buffet tối + Du ngoạn - Gói tiêu chuẩn",
        description: "Buffet quốc tế với hơn 60 món và chương trình ca nhạc.",
        price: 650000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "btp-buffet-premium",
        title: "Buffet tối + Du ngoạn - Gói cao cấp",
        description: "Gói cao cấp với menu phong phú và chỗ ngồi VIP.",
        price: 890000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "btp-tre-em",
        title: "Buffet tối - Trẻ em",
        description: "Ưu đãi dành cho trẻ em dưới 1m3.",
        price: 350000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "pizza-4ps-restaurant": {
    openingHours: "10:00 - 22:00",
    suitableFor: ["Cặp đôi", "Gia đình", "Nhóm bạn đồng nghiệp"],
    amenities: [
      { label: "Wi-Fi miễn phí", available: true },
      { label: "Khu cho trẻ em", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Đặt bàn online", available: true },
    ],
    highlights: [
      "Thưởng thức pizza thủ công nổi tiếng",
      "Không gian ấm cúng, hiện đại",
      "Phù hợp cho cặp đôi và nhóm bạn",
      "Menu phong cách Nhật - Ý độc đáo",
    ],
    ticketOptions: [
      {
        id: "4ps-set-doi",
        title: "Set ăn dành cho 2 người",
        description: "1 pizza lớn, 1 salad, 1 tráng miệng và 2 đồ uống.",
        price: 550000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "4ps-set-nhom",
        title: "Set ăn dành cho 4 người",
        description: "Phù hợp cho nhóm bạn hoặc gia đình nhỏ.",
        price: 980000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "4ps-voucher",
        title: "Voucher 300.000 VND tại Pizza 4P's",
        description: "Sử dụng linh hoạt theo menu tại nhà hàng.",
        price: 270000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "dmaris-buffet-restaurant": {
    openingHours: "11:00 - 22:00",
    suitableFor: ["Gia đình", "Cặp đôi", "Nhóm bạn", "Tiệc sinh nhật"],
    amenities: [
      { label: "Bãi đỗ xe", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Khu ăn riêng", available: true },
      { label: "Wi-Fi miễn phí", available: true },
    ],
    highlights: [
      "Hơn 200 món buffet quốc tế",
      "Hải sản tươi sống phong phú",
      "Khu tráng miệng, kem, bánh ngọt đa dạng",
      "Không gian sang trọng, phù hợp nhiều dịp",
    ],
    ticketOptions: [
      {
        id: "dmaris-trua-thuong",
        title: "Buffet trưa - ngày thường",
        description: "Phục vụ từ Thứ Hai đến Thứ Sáu.",
        price: 490000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "dmaris-toi-cuoi-tuan",
        title: "Buffet tối - cuối tuần",
        description: "Menu mở rộng với hải sản cao cấp.",
        price: 790000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "dmaris-tre-em",
        title: "Buffet - Trẻ em",
        description: "Ưu đãi giá cho trẻ em theo chiều cao.",
        price: 290000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "saigon-street-food-motorbike-tour": {
    openingHours: "17:30 - 22:00",
    suitableFor: ["Khách quốc tế", "Nhóm bạn", "Cặp đôi", "Người thích phiêu lưu"],
    amenities: [
      { label: "Hướng dẫn viên", available: true },
      { label: "Xe máy và mũ bảo hiểm", available: true },
      { label: "Nước uống miễn phí", available: true },
      { label: "Bảo hiểm tour", available: true },
    ],
    highlights: [
      "Khám phá ẩm thực đường phố Sài Gòn về đêm",
      "Ngồi sau xe máy len lỏi các con hẻm",
      "Thưởng thức 6-8 món ăn đặc trưng",
      "Nghe kể chuyện về văn hóa địa phương",
    ],
    ticketOptions: [
      {
        id: "food-tour-chuan",
        title: "Food tour đêm Sài Gòn - gói tiêu chuẩn",
        description: "Khoảng 3.5 giờ, 6 món ăn tại 4 địa điểm.",
        price: 690000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "food-tour-vip",
        title: "Food tour đêm Sài Gòn - gói VIP",
        description: "Nhóm nhỏ 2 khách 1 xe, 8 món tại 6 địa điểm.",
        price: 950000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "food-tour-rieng",
        title: "Food tour riêng cho nhóm (tối đa 4 khách)",
        description: "Dành cho nhóm bạn muốn trải nghiệm riêng tư.",
        price: 2800000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  // ====== TRẢI NGHIỆM VĂN HÓA ======
  "ao-dai-photoshoot-hanoi": {
    openingHours: "8:00 - 18:00",
    suitableFor: ["Cặp đôi", "Gia đình", "Khách quốc tế", "Nhóm bạn nữ"],
    amenities: [
      { label: "Thuê áo dài", available: true },
      { label: "Make-up cơ bản", available: true },
      { label: "Nhiếp ảnh gia", available: true },
      { label: "Ảnh file gốc + chỉnh sửa", available: true },
    ],
    highlights: [
      "Thuê áo dài truyền thống đa dạng mẫu mã",
      "Chụp ảnh tại phố cổ Hà Nội",
      "Có hỗ trợ make-up và nhiếp ảnh gia",
      "Nhận file ảnh chỉnh sửa nhanh chóng",
    ],
    ticketOptions: [
      {
        id: "ao-dai-goi-co-ban",
        title: "Gói thuê áo dài + chụp tự do",
        description: "Thuê áo dài trong 3 tiếng, không có nhiếp ảnh gia.",
        price: 250000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "ao-dai-goi-chup",
        title: "Gói chụp ảnh cá nhân 60 phút",
        description: "Áo dài + make-up + nhiếp ảnh gia + 30 ảnh chỉnh sửa.",
        price: 650000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "ao-dai-goi-cap-doi",
        title: "Gói chụp ảnh cặp đôi 90 phút",
        description: "2 bộ áo dài + make-up + nhiếp ảnh gia + 50 ảnh.",
        price: 1150000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "mua-roi-nuoc-thang-long": {
    openingHours: "15:00 - 21:00 (nhiều suất)",
    suitableFor: ["Gia đình", "Trẻ em", "Khách quốc tế", "Người yêu văn hóa"],
    amenities: [
      { label: "Nhà vệ sinh", available: true },
      { label: "Wi-Fi miễn phí", available: true },
      { label: "Quầy lưu niệm", available: true },
      { label: "Tài liệu giới thiệu", available: true },
    ],
    highlights: [
      "Xem loại hình nghệ thuật dân gian độc đáo",
      "Trải nghiệm gần 50 phút biểu diễn đặc sắc",
      "Âm nhạc dân tộc sống động",
      "Phù hợp cho mọi lứa tuổi",
    ],
    ticketOptions: [
      {
        id: "mrn-ghe-thuong",
        title: "Vé xem múa rối nước - Ghế thường",
        description: "Vé ngồi hạng tiêu chuẩn, suất 18:20 và 19:40.",
        price: 120000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "mrn-ghe-vip",
        title: "Vé xem múa rối nước - Ghế VIP",
        description: "Ghế hạng VIP gần sân khấu, tầm nhìn đẹp.",
        price: 200000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "mrn-family",
        title: "Vé Gia đình (2 người lớn + 2 trẻ em)",
        description: "Ưu đãi vé cho gia đình, ghế thường.",
        price: 380000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "cheo-viet-nam": {
    openingHours: "20:00 - 21:30 (các đêm cuối tuần)",
    suitableFor: ["Người yêu nghệ thuật", "Gia đình", "Khách quốc tế"],
    amenities: [
      { label: "Nhà vệ sinh", available: true },
      { label: "Quầy nước giải khát", available: true },
      { label: "Tài liệu song ngữ", available: true },
      { label: "Bãi đỗ xe", available: true },
    ],
    highlights: [
      "Thưởng thức nghệ thuật Chèo truyền thống",
      "Các vở diễn đặc sắc của dân tộc",
      "Dàn nhạc cụ dân tộc sống động",
      "Có tài liệu song ngữ cho khách quốc tế",
    ],
    ticketOptions: [
      {
        id: "cheo-thuong",
        title: "Vé xem Chèo - Hạng phổ thông",
        description: "Chỗ ngồi hạng tiêu chuẩn, thời lượng khoảng 90 phút.",
        price: 100000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "cheo-vip",
        title: "Vé xem Chèo - Hạng VIP",
        description: "Ghế gần sân khấu, kèm tài liệu giới thiệu vở diễn.",
        price: 180000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "cheo-combo",
        title: "[COMBO] Vé Chèo + Nước giải khát",
        description: "Kèm một phần nước uống trong giờ nghỉ.",
        price: 150000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "lam-gom-bat-trang": {
    openingHours: "8:30 - 17:30",
    suitableFor: ["Gia đình", "Trẻ em", "Cặp đôi", "Khách quốc tế"],
    amenities: [
      { label: "Bàn gốm thủ công", available: true },
      { label: "Lò nung", available: true },
      { label: "Hướng dẫn viên", available: true },
      { label: "Chợ gốm Bát Tràng", available: true },
    ],
    highlights: [
      "Tự tay nặn và trang trí sản phẩm gốm",
      "Trải nghiệm làng nghề hàng trăm năm tuổi",
      "Được mang về sản phẩm tự làm",
      "Tìm hiểu văn hóa Việt Nam truyền thống",
    ],
    ticketOptions: [
      {
        id: "gom-trai-nghiem",
        title: "Trải nghiệm làm gốm 60 phút",
        description: "Dụng cụ, đất sét và hướng dẫn viên.",
        price: 150000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "gom-nung-san-pham",
        title: "[COMBO] Làm gốm + Nung sản phẩm",
        description: "Hoàn thiện và nung thành phẩm trong 7 ngày.",
        price: 350000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "gom-tour-lang",
        title: "[COMBO] Làm gốm + Tour làng Bát Tràng",
        description: "Tham quan chợ gốm và các xưởng sản xuất.",
        price: 450000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  // ====== TRÒ CHƠI ======
  "tau-luon-sieu-toc-vinwonders": {
    openingHours: "9:00 - 21:00",
    suitableFor: ["Nhóm bạn", "Người thích cảm giác mạnh", "Trên 14 tuổi"],
    amenities: [
      { label: "Tủ đồ cá nhân", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Khu ăn uống", available: true },
      { label: "Nhân viên hỗ trợ", available: true },
    ],
    highlights: [
      "Trải nghiệm tàu lượn siêu tốc đỉnh cao",
      "Cảm giác mạnh trọn vẹn khi lộn vòng trên cao",
      "Check-in tại khu trò chơi cảm giác",
      "Thử nhiều vòng chơi trong ngày",
    ],
    ticketOptions: [
      {
        id: "tls-single",
        title: "Vé chơi tàu lượn 1 lượt",
        description: "Phù hợp cho khách muốn trải nghiệm nhanh.",
        price: 180000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "tls-combo-3",
        title: "[COMBO] 3 lượt chơi trò cảm giác mạnh",
        description: "Tàu lượn, đu quay và tháp rơi tự do.",
        price: 390000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "tls-full-day",
        title: "Vé trọn ngày khu trò chơi cảm giác",
        description: "Chơi không giới hạn trong ngày.",
        price: 550000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "zipline-madagui": {
    openingHours: "8:00 - 17:00",
    suitableFor: ["Nhóm bạn", "Người ưa mạo hiểm", "Trên 12 tuổi"],
    amenities: [
      { label: "Thiết bị an toàn", available: true },
      { label: "Huấn luyện viên", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Khu nghỉ chân", available: true },
    ],
    highlights: [
      "Bay qua tán rừng trên dây cáp",
      "View thiên nhiên Madagui tuyệt đẹp",
      "Huấn luyện viên hướng dẫn an toàn",
      "Trải nghiệm phù hợp nhóm bạn mạo hiểm",
    ],
    ticketOptions: [
      {
        id: "zip-chuan",
        title: "Vé Zipline - Tuyến tiêu chuẩn",
        description: "1 tuyến dài khoảng 250m trên rừng nguyên sinh.",
        price: 350000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "zip-combo-hai-tuyen",
        title: "[COMBO] Zipline 2 tuyến liên tiếp",
        description: "Tăng thêm độ phấn khích với 2 tuyến khác nhau.",
        price: 580000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "zip-combo-ve-vao-cong",
        title: "[COMBO] Zipline + Vé vào cổng Madagui",
        description: "Tham quan khu du lịch và trải nghiệm zipline.",
        price: 690000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "atv-bau-trang": {
    openingHours: "6:30 - 17:30",
    suitableFor: ["Nhóm bạn", "Cặp đôi", "Người thích phiêu lưu"],
    amenities: [
      { label: "Xe ATV và mũ bảo hiểm", available: true },
      { label: "Hướng dẫn viên", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Khu chụp ảnh", available: true },
    ],
    highlights: [
      "Lái xe ATV trên đồi cát Bàu Trắng",
      "Ngắm hồ sen và cồn cát đặc trưng",
      "Chụp ảnh tuyệt đẹp giữa sa mạc thu nhỏ",
      "Có hướng dẫn viên đi cùng",
    ],
    ticketOptions: [
      {
        id: "atv-15phut",
        title: "Vé ATV 15 phút",
        description: "Phù hợp cho khách muốn trải nghiệm nhanh.",
        price: 250000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "atv-30phut",
        title: "Vé ATV 30 phút",
        description: "Đủ thời gian khám phá các điểm đẹp trên đồi cát.",
        price: 450000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "atv-combo-anh",
        title: "[COMBO] ATV + Bộ ảnh check-in",
        description: "30 phút ATV và 15 ảnh chỉnh sửa nhanh.",
        price: 590000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "truot-mang-datanla": {
    openingHours: "7:30 - 17:00",
    suitableFor: ["Gia đình", "Trẻ em trên 6 tuổi", "Nhóm bạn"],
    amenities: [
      { label: "Thiết bị an toàn", available: true },
      { label: "Nhân viên hỗ trợ", available: true },
      { label: "Nhà vệ sinh", available: true },
      { label: "Quầy nước giải khát", available: true },
    ],
    highlights: [
      "Trượt máng dài qua rừng thông Đà Lạt",
      "Cảm giác phấn khích nhưng an toàn",
      "Ngắm thác Datanla hùng vĩ",
      "Phù hợp gia đình có trẻ em",
    ],
    ticketOptions: [
      {
        id: "truot-mang-single",
        title: "Vé trượt máng 1 lượt",
        description: "Hành trình khoảng 2.4km đi và về.",
        price: 140000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "truot-mang-combo-thac",
        title: "[COMBO] Trượt máng + Vé vào thác Datanla",
        description: "Kết hợp trò chơi và tham quan thác nước.",
        price: 240000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "truot-mang-family",
        title: "Vé Gia đình (2 người lớn + 2 trẻ em)",
        description: "Ưu đãi cho gia đình 4 người.",
        price: 480000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  // ====== TOUR ======
  "tour-mien-tay": {
    openingHours: "6:30 - 18:00 (1 ngày)",
    suitableFor: ["Gia đình", "Khách quốc tế", "Nhóm bạn", "Người cao tuổi"],
    amenities: [
      { label: "Xe đưa đón", available: true },
      { label: "Hướng dẫn viên", available: true },
      { label: "Bữa trưa", available: true },
      { label: "Đi thuyền", available: true },
    ],
    highlights: [
      "Khám phá sông nước miền Tây đặc trưng",
      "Đi thuyền trong rạch dừa nước",
      "Thưởng thức trái cây và đờn ca tài tử",
      "Ghé thăm cơ sở làm kẹo dừa truyền thống",
    ],
    ticketOptions: [
      {
        id: "mt-tour-1-ngay",
        title: "Tour miền Tây 1 ngày",
        description: "Mỹ Tho - Bến Tre, khởi hành hàng ngày từ TP.HCM.",
        price: 550000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "mt-tour-vip",
        title: "Tour miền Tây 1 ngày - Gói VIP",
        description: "Xe Limousine, bữa trưa cao cấp, nhóm nhỏ.",
        price: 890000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "mt-tour-2-ngay",
        title: "Tour miền Tây 2 ngày 1 đêm",
        description: "Mỹ Tho - Cần Thơ - Chợ nổi Cái Răng.",
        price: 1850000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "tour-3-dao-phu-quoc": {
    openingHours: "8:00 - 16:30 (1 ngày)",
    suitableFor: ["Cặp đôi", "Nhóm bạn", "Gia đình", "Người yêu biển"],
    amenities: [
      { label: "Cano tốc độ cao", available: true },
      { label: "Dụng cụ lặn biển", available: true },
      { label: "Bữa trưa hải sản", available: true },
      { label: "Hướng dẫn viên", available: true },
    ],
    highlights: [
      "Di chuyển bằng cano tốc độ cao",
      "Lặn ngắm san hô tại Hòn Móng Tay",
      "Câu cá tại Hòn Mây Rút",
      "Tắm biển tại Hòn Gầm Ghì",
    ],
    ticketOptions: [
      {
        id: "pq-tour-chuan",
        title: "Tour 3 đảo Nam Phú Quốc - Gói tiêu chuẩn",
        description: "Bao gồm cano, bữa trưa và lặn ngắm san hô.",
        price: 650000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "pq-tour-vip",
        title: "Tour 3 đảo Nam Phú Quốc - Gói VIP",
        description: "Nhóm nhỏ dưới 10 khách, menu hải sản cao cấp.",
        price: 950000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "pq-tour-tre-em",
        title: "Tour 3 đảo - Trẻ em (dưới 1m3)",
        description: "Ưu đãi dành cho trẻ em.",
        price: 390000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "tour-hoa-lu-trang-an-hang-mua": {
    openingHours: "6:30 - 19:00 (1 ngày)",
    suitableFor: ["Gia đình", "Cặp đôi", "Khách quốc tế", "Nhóm bạn"],
    amenities: [
      { label: "Xe đưa đón", available: true },
      { label: "Hướng dẫn viên", available: true },
      { label: "Bữa trưa buffet", available: true },
      { label: "Đi thuyền ở Tràng An", available: true },
    ],
    highlights: [
      "Tham quan cố đô Hoa Lư lịch sử",
      "Đi thuyền qua các hang động Tràng An",
      "Leo 500 bậc thang Hang Múa ngắm toàn cảnh",
      "Thưởng thức bữa trưa truyền thống Ninh Bình",
    ],
    ticketOptions: [
      {
        id: "nb-tour-tiet-kiem",
        title: "Tour Hoa Lư - Tràng An - Hang Múa - Gói tiết kiệm",
        description: "Xe ghép đoàn, khởi hành từ Hà Nội hàng ngày.",
        price: 750000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "nb-tour-chuan",
        title: "Tour Hoa Lư - Tràng An - Hang Múa - Gói tiêu chuẩn",
        description: "Nhóm nhỏ, bữa trưa buffet đặc sản.",
        price: 950000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "nb-tour-private",
        title: "Tour Ninh Bình riêng (4 khách)",
        description: "Xe riêng, hướng dẫn viên riêng, lịch trình linh hoạt.",
        price: 3800000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },

  "xe-buyt-2-tang-hcm": {
    openingHours: "9:00 - 22:00",
    suitableFor: ["Gia đình", "Cặp đôi", "Khách quốc tế", "Nhóm bạn"],
    amenities: [
      { label: "Tầng mui trần", available: true },
      { label: "Thuyết minh tự động đa ngôn ngữ", available: true },
      { label: "Wi-Fi miễn phí", available: true },
      { label: "Ghế ngồi thoải mái", available: true },
    ],
    highlights: [
      "Tham quan các địa danh nổi bật TP.HCM",
      "Ngồi trên tầng mui trần ngắm phố",
      "Thuyết minh tự động đa ngôn ngữ",
      "Lên xuống linh hoạt tại nhiều điểm",
    ],
    ticketOptions: [
      {
        id: "bus-2-tang-4h",
        title: "Vé xe buýt 2 tầng - 4 giờ",
        description: "Phù hợp cho khách muốn tham quan nhanh.",
        price: 150000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "bus-2-tang-24h",
        title: "Vé xe buýt 2 tầng - 24 giờ",
        description: "Lên xuống không giới hạn trong 24 giờ.",
        price: 290000,
        badge: "Voucher sẵn sàng ngay",
      },
      {
        id: "bus-2-tang-48h",
        title: "Vé xe buýt 2 tầng - 48 giờ",
        description: "Tham quan thong thả trong 2 ngày.",
        price: 420000,
        badge: "Voucher sẵn sàng ngay",
      },
    ],
  },
};

const DEFAULT_TICKET_POLICIES = ["Không thể đổi lịch", "Không thể hoàn tiền"];

function roundPrice(value, step = 10000) {
  return Math.max(0, Math.round(value / step) * step);
}

function derivePricing(basePrice) {
  const seniorPrice = roundPrice(basePrice * 0.76);
  return {
    adult: {
      label: "Người lớn",
      price: basePrice,
      note: "140 cm trở lên",
    },
    senior: {
      label: "Người cao tuổi",
      price: seniorPrice,
      note: "60 tuổi trở lên",
    },
    child: {
      label: "Trẻ em",
      price: seniorPrice,
      note: "100 - 139 cm",
    },
  };
}

export function getTicketSelection(slug, ticketId) {
  const activity = getActivityDetailBySlug(slug);
  if (!activity) return null;
  const ticket = activity.ticketOptions.find((t) => t.id === ticketId);
  if (!ticket) return null;
  return {
    activity,
    ticket: {
      ...ticket,
      pricing: ticket.pricing || derivePricing(ticket.price),
      policies: ticket.policies || DEFAULT_TICKET_POLICIES,
      image: ticket.image || activity.gallery?.[0] || activity.image,
    },
  };
}

export function getActivityDetailBySlug(slug) {
  const base = activitiesData.find((a) => a.id === slug);
  if (!base) return null;
  const extra = activityDetailsData[slug];
  return {
    ...base,
    slug: base.id,
    gallery:
      extra?.gallery && extra.gallery.length > 0
        ? extra.gallery
        : [
            base.image,
            `/assets/activities/detail/${slug}/2.jpg`,
            `/assets/activities/detail/${slug}/3.jpg`,
            `/assets/activities/detail/${slug}/4.jpg`,
            `/assets/activities/detail/${slug}/5.jpg`,
          ],
    openingHours: extra?.openingHours || "Liên hệ để biết giờ mở cửa",
    suitableFor: extra?.suitableFor || ["Gia đình", "Nhóm bạn", "Cặp đôi"],
    amenities:
      extra?.amenities || [
        { label: "Nhà vệ sinh", available: true },
        { label: "Bãi đỗ xe", available: true },
      ],
    highlights:
      extra?.highlights || [
        "Trải nghiệm đáng nhớ tại điểm đến nổi bật",
        "Phù hợp cho nhiều đối tượng du khách",
        "Được VieGo giới thiệu và kiểm duyệt",
      ],
    ticketOptions:
      extra?.ticketOptions || [
        {
          id: `${slug}-ve-tieu-chuan`,
          title: `Vé tiêu chuẩn - ${base.title}`,
          description: "Gói vé cơ bản cho trải nghiệm đầy đủ.",
          price: 250000,
          badge: "Voucher sẵn sàng ngay",
        },
      ],
  };
}

export default activityDetailsData;
