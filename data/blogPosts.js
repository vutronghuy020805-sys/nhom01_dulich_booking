// Blog data — toàn bộ địa điểm Việt Nam.
// Mỗi bài có 2 dạng content:
//   - sections: [{ id, heading, paragraphs, tip?, quote? }] — dạng editorial cho bài du lịch chính
//   - content:  [string] — dạng paragraph phẳng cho bài ngắn (Latest Articles)
// BlogDetailPage ưu tiên render sections nếu có, fallback sang content.

const PLACEHOLDER_PARAGRAPHS = [
  "Đây là bài viết mẫu của VieGo Blog. Nội dung đầy đủ sẽ được cập nhật sớm.",
];

export const blogPosts = [
  {
    id: "post-da-nang-tu-tuc-2026",
    slug: "kinh-nghiem-du-lich-da-nang-tu-tuc-2026",
    title: "Kinh nghiệm du lịch Đà Nẵng tự túc chi tiết nhất 2026",
    excerpt:
      "Cẩm nang toàn tập cho chuyến đi Đà Nẵng tự túc: di chuyển, lưu trú, ăn uống, lịch trình 3 ngày 2 đêm và những điểm check-in không thể bỏ lỡ.",
    location: "Đà Nẵng",
    author: "VieGo VN",
    date: "2026-07-15",
    dateLabel: "15 thg 7 2026",
    readTime: "8 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/danang.jpg",
    tags: ["Đà Nẵng", "tự túc", "lịch trình", "kinh nghiệm"],
    category: "Cẩm nang du lịch",
    featured: true,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 3 – tháng 8",
      suitableFor: "Cặp đôi, gia đình, nhóm bạn",
      budget: "Từ 3.500.000 VND/người",
      duration: "3 ngày 2 đêm",
    },
    sections: [
      {
        id: "mo-dau",
        heading: "Vì sao nên chọn Đà Nẵng?",
        paragraphs: [
          "Đà Nẵng đang là điểm đến hàng đầu miền Trung nhờ sự kết hợp hoàn hảo giữa biển xanh, núi hùng vĩ, ẩm thực phong phú và hạ tầng du lịch hiện đại. Thành phố sạch, đẹp, dễ di chuyển — phù hợp cho cả người đi lần đầu lẫn những ai muốn quay lại lần thứ hai, thứ ba.",
        ],
        quote:
          "Đà Nẵng không ồn ào như Sài Gòn, cũng không hoài cổ như Hà Nội — đây là thành phố biết cân bằng.",
      },
      {
        id: "di-chuyen",
        heading: "Di chuyển đến Đà Nẵng như thế nào?",
        paragraphs: [
          "Từ Hà Nội và TP. Hồ Chí Minh, cách nhanh nhất là bay thẳng đến sân bay quốc tế Đà Nẵng. Hãng VietJet, Vietnam Airlines và Bamboo Airways đều có nhiều chuyến mỗi ngày, giá vé dao động 900.000 – 1.800.000 VND tuỳ mùa.",
          "Từ sân bay về trung tâm chỉ khoảng 3 km — bạn có thể đi taxi hoặc Grab khoảng 60.000 – 100.000 VND. Nếu đi nhóm đông, đặt xe riêng qua VieGo để tiện hơn.",
        ],
        tip: "Đặt vé máy bay và khách sạn trước 3–4 tuần để có giá tốt nhất, đặc biệt là mùa cao điểm hè.",
      },
      {
        id: "luu-tru",
        heading: "Nên ở đâu tại Đà Nẵng?",
        paragraphs: [
          "Khu vực biển Mỹ Khê và đường Phạm Văn Đồng là hai trục khách sạn view biển nổi bật, giá từ 800.000 VND/đêm. Nếu thích gần phố, chọn khu cầu Rồng — cầu Sông Hàn để dễ khám phá đêm.",
          "Các chuỗi resort cao cấp như Fusion Maia, Furama hay Intercontinental nằm xa trung tâm hơn nhưng bù lại là không gian riêng tư và bãi biển đẹp.",
        ],
      },
      {
        id: "lich-trinh",
        heading: "Lịch trình gợi ý 3 ngày 2 đêm",
        paragraphs: [
          "Ngày 1: Bà Nà Hills cả ngày — Cầu Vàng, Làng Pháp, Fantasy Park. Tối về phố, ăn hải sản chợ đêm Sơn Trà.",
          "Ngày 2: Bán đảo Sơn Trà buổi sáng — chùa Linh Ứng, đỉnh Bàn Cờ. Chiều Ngũ Hành Sơn, tối dạo cầu Rồng xem phun lửa.",
          "Ngày 3: Dành cho Hội An — cách Đà Nẵng 30 km, đi taxi khoảng 350.000 VND một chiều. Tối về sân bay.",
        ],
      },
      {
        id: "am-thuc",
        heading: "Đừng bỏ qua những món này",
        paragraphs: [
          "Mì Quảng (quán Bà Vị, Cẩm Lệ), bánh xèo Bà Dưỡng, hải sản tươi Bé Mặn, bún chả cá bà Phiến. Tráng miệng với kem bơ chợ Hàn — một đặc sản không đụng hàng.",
        ],
        tip: "Nên đi ăn sớm, khoảng 18:00, vì quán ngon thường hết món sau 20:00.",
      },
    ],
  },
  {
    id: "post-hoi-an-cuoi-tuan",
    slug: "an-gi-choi-gi-o-hoi-an-cuoi-tuan",
    title: "Ăn gì, chơi gì ở Hội An cho chuyến đi cuối tuần",
    excerpt:
      "Cao lầu, cơm gà Bà Buội, chè bắp Cẩm Nam — và những góc phố cổ lên ảnh đẹp nhất. Gợi ý trọn gói cho 2 ngày 1 đêm ở Hội An.",
    location: "Hội An",
    author: "VieGo VN",
    date: "2026-05-22",
    dateLabel: "22 thg 5 2026",
    readTime: "6 phút đọc",
    image: "/nhom01_dulich_booking/assets/activities/attractions/pho-co-hoi-an.jpg",
    tags: ["Hội An", "ẩm thực", "cuối tuần", "phố cổ"],
    category: "Ẩm thực & trải nghiệm",
    featured: true,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 2 – tháng 4",
      suitableFor: "Cặp đôi, gia đình",
      budget: "Từ 1.500.000 VND/người",
      duration: "2 ngày 1 đêm",
    },
    sections: [
      {
        id: "tong-quan",
        heading: "Hội An — thành phố di sản bên sông Hoài",
        paragraphs: [
          "Hội An giữ được vẻ đẹp hoài cổ đặc biệt: những ngôi nhà cổ mái ngói, con hẻm nhỏ thơm mùi mì Quảng, và dòng sông Hoài lung linh đèn hoa đăng khi đêm về. Hai ngày cuối tuần là vừa đủ để cảm nhận trọn vẹn.",
        ],
      },
      {
        id: "di-chuyen",
        heading: "Đi Hội An như thế nào?",
        paragraphs: [
          "Hầu hết khách đến Hội An xuất phát từ Đà Nẵng. Từ sân bay Đà Nẵng về Hội An khoảng 30 km, taxi 350.000 – 400.000 VND, hoặc xe ghép 150.000 VND/người.",
          "Trong trung tâm, xe đạp là phương tiện hoàn hảo — nhiều homestay cho mượn miễn phí. Tránh mang xe máy vào phố cổ vì có quy định cấm theo giờ.",
        ],
      },
      {
        id: "am-thuc",
        heading: "Những món ăn nhất định phải thử",
        paragraphs: [
          "Cao lầu — chỉ Hội An mới chuẩn vị, nên thử ở quán Thanh (26 Thái Phiên). Cơm gà Bà Buội (22 Phan Châu Trinh) là lựa chọn kinh điển. Buổi chiều đạp xe qua Cẩm Nam ăn chè bắp và bánh tráng đập.",
          "Tối, đi phố đèn lồng, thưởng thức bánh bao bánh vạc của Phương, uống cà phê trứng ở Reaching Out Tea House — một quán cà phê do người khiếm thính vận hành.",
        ],
        tip: "Mang theo tiền mặt — nhiều quán nhỏ không chấp nhận thẻ hoặc ví điện tử.",
      },
      {
        id: "choi-gi",
        heading: "Lịch trình gợi ý 2 ngày 1 đêm",
        paragraphs: [
          "Ngày 1: Check-in trước 14:00. Chiều dạo phố cổ, mua vé tham quan 120.000 VND cho 5 điểm di tích. Tối thả đèn hoa đăng trên sông Hoài.",
          "Ngày 2: Sáng sớm đạp xe ra làng rau Trà Quế (cách phố 3 km), học nấu ăn nếu thích. Trưa quay về ăn cơm gà. Chiều ra biển An Bàng tắm và ăn hải sản rồi về Đà Nẵng.",
        ],
        quote:
          "Hội An không cần khám phá nhanh — hãy đi chậm, ngồi lâu, và để ánh đèn lồng làm phần còn lại.",
      },
    ],
  },
  {
    id: "post-da-lat-top-diem-den",
    slug: "top-dia-diem-phai-di-khi-den-da-lat",
    title: "Top địa điểm nhất định phải đi khi đến Đà Lạt",
    excerpt:
      "Đà Lạt không chỉ có LangBiang và Xuân Hương. Khám phá những thung lũng, rừng thông và quán cà phê view triệu đô ít người biết.",
    location: "Đà Lạt",
    author: "VieGo VN",
    date: "2026-06-28",
    dateLabel: "28 thg 6 2026",
    readTime: "7 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/dalat.jpg",
    tags: ["Đà Lạt", "địa điểm", "check-in", "núi rừng"],
    category: "Điểm đến",
    featured: true,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 10 – tháng 2",
      suitableFor: "Cặp đôi, nhóm bạn trẻ",
      budget: "Từ 2.000.000 VND/người",
      duration: "3 ngày 2 đêm",
    },
    sections: [
      {
        id: "gioi-thieu",
        heading: "Đà Lạt — thành phố ngàn hoa quanh năm se lạnh",
        paragraphs: [
          "Nằm ở độ cao 1.500 m so với mực nước biển, Đà Lạt giữ một khí hậu mát mẻ đặc trưng mà hiếm nơi nào ở Việt Nam có được. Những rừng thông, đồi chè, thung lũng và quán cà phê làm nên một Đà Lạt vừa thơ vừa hiện đại.",
        ],
      },
      {
        id: "diem-den",
        heading: "Những điểm nhất định phải đến",
        paragraphs: [
          "Quảng trường Lâm Viên và hồ Xuân Hương là hai trái tim của thành phố — nên đi vào buổi sáng sớm khi sương còn chưa tan.",
          "Đồi chè Cầu Đất cách trung tâm 25 km, view đẹp nhất vào lúc bình minh. Thung lũng Vàng, rừng thông hồ Tuyền Lâm, cáp treo LangBiang — mỗi nơi một vẻ.",
        ],
      },
      {
        id: "quan-ca-phe",
        heading: "Những quán cà phê view triệu đô",
        paragraphs: [
          "Mây Lang Thang — view đồi thông, buổi chiều có nhạc acoustic. Panorama Cafe Đà Lạt — nhìn thẳng ra núi. Còn nhiều quán nhỏ ở đường Trần Hưng Đạo, Khởi Nghĩa Bắc Sơn đáng khám phá.",
        ],
        tip: "Mang theo áo khoác nhẹ — nhiệt độ Đà Lạt có thể xuống 12°C vào ban đêm ngay cả mùa hè.",
      },
      {
        id: "am-thuc",
        heading: "Ăn gì ở Đà Lạt?",
        paragraphs: [
          "Bánh tráng nướng Đà Lạt, bánh ướt lòng gà, lẩu gà lá é, nem nướng Bà Hùng và artichoke — những món không thể bỏ qua. Chợ đêm Đà Lạt là nơi tụ họp mọi món vỉa hè đặc sản.",
        ],
      },
    ],
  },
  {
    id: "post-phu-quoc-3n2d",
    slug: "lich-trinh-kham-pha-phu-quoc-3-ngay-2-dem",
    title: "Lịch trình khám phá Phú Quốc 3 ngày 2 đêm tiết kiệm",
    excerpt:
      "Gợi ý lịch trình tối ưu cho chuyến đi Phú Quốc: lặn ngắm san hô, câu mực đêm, khám phá Nam đảo và ngân sách chi tiết cho mỗi khoản.",
    location: "Phú Quốc",
    author: "VieGo VN",
    date: "2026-06-10",
    dateLabel: "10 thg 6 2026",
    readTime: "8 phút đọc",
    image: "/nhom01_dulich_booking/assets/activities/tours/tour-3-dao-phu-quoc.png",
    tags: ["Phú Quốc", "lịch trình", "biển đảo", "3 đảo"],
    category: "Lịch trình",
    featured: true,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 11 – tháng 4",
      suitableFor: "Gia đình, cặp đôi",
      budget: "Từ 4.500.000 VND/người",
      duration: "3 ngày 2 đêm",
    },
    sections: [
      {
        id: "tong-quan",
        heading: "Phú Quốc — đảo ngọc phía Nam Việt Nam",
        paragraphs: [
          "Phú Quốc hội tụ đủ biển xanh, cát trắng, rừng nguyên sinh và công viên giải trí. Đây là điểm đến biển đảo nổi bật nhất miền Nam, phù hợp cho kỳ nghỉ 2–4 ngày.",
        ],
      },
      {
        id: "di-chuyen",
        heading: "Đến Phú Quốc bằng cách nào?",
        paragraphs: [
          "Cách nhanh nhất là bay thẳng đến sân bay quốc tế Phú Quốc. Từ Hà Nội khoảng 2 giờ, từ TP.HCM chỉ 1 giờ. Vé khứ hồi dao động 1.800.000 – 3.500.000 VND tuỳ mùa.",
        ],
      },
      {
        id: "lich-trinh",
        heading: "Lịch trình chi tiết 3 ngày 2 đêm",
        paragraphs: [
          "Ngày 1: Nhận phòng resort khu Bãi Dài. Chiều tắm biển, tối ăn hải sản chợ đêm Dinh Cậu.",
          "Ngày 2: Tour 3 đảo phía Nam — lặn ngắm san hô ở Hòn Móng Tay, câu cá trên tàu, BBQ trưa, chiều về Hòn Thơm đi cáp treo dài nhất thế giới.",
          "Ngày 3: Tự chọn — VinWonders cho gia đình, Safari cho người yêu động vật, hoặc khám phá Nam đảo và Bãi Khem.",
        ],
        tip: "Đặt tour 3 đảo trước 1–2 ngày để chọn giờ khởi hành phù hợp. VieGo có nhiều deal kết hợp tour + bữa trưa.",
      },
      {
        id: "ngan-sach",
        heading: "Ngân sách chi tiết",
        paragraphs: [
          "Vé máy bay khứ hồi: 2.500.000 VND. Khách sạn 3 sao: 800.000 x 2 = 1.600.000 VND. Tour 3 đảo: 650.000 VND. Ăn uống: 900.000 VND. Di chuyển nội đảo + vé tham quan: 700.000 VND. Tổng: khoảng 6.350.000 VND/người, có thể tiết kiệm còn 4.500.000 VND nếu đi nhóm.",
        ],
      },
    ],
  },
  {
    id: "post-nha-trang-a-z",
    slug: "cam-nang-du-lich-nha-trang-tu-a-den-z",
    title: "Cẩm nang du lịch Nha Trang từ A đến Z cho người mới đi lần đầu",
    excerpt:
      "Tất tần tật về Nha Trang: thời điểm đẹp nhất, cách di chuyển, top khách sạn gần biển, bãi tắm đẹp và các tour lặn ngắm san hô uy tín.",
    location: "Nha Trang",
    author: "VieGo VN",
    date: "2026-05-05",
    dateLabel: "5 thg 5 2026",
    readTime: "10 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/nhatrang.jpg",
    tags: ["Nha Trang", "cẩm nang", "biển", "tour đảo"],
    category: "Cẩm nang du lịch",
    featured: true,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 2 – tháng 8",
      suitableFor: "Mọi đối tượng",
      budget: "Từ 3.000.000 VND/người",
      duration: "3 ngày 2 đêm",
    },
    sections: [
      {
        id: "gioi-thieu",
        heading: "Vì sao Nha Trang luôn hút khách?",
        paragraphs: [
          "Nha Trang có bãi biển dài 7 km, nước trong xanh và hệ sinh thái biển đa dạng bậc nhất Việt Nam. Khí hậu ấm quanh năm, ít bão — lý tưởng cho người đi lần đầu.",
        ],
      },
      {
        id: "thoi-diem",
        heading: "Đi Nha Trang vào tháng nào đẹp nhất?",
        paragraphs: [
          "Tháng 2 đến tháng 8 là mùa khô, biển đẹp, ít mưa. Tháng 9 – tháng 12 có thể gặp mưa và gió mạnh, không thích hợp cho tour biển đảo.",
        ],
        tip: "Tránh đi vào tuần lễ du lịch Nha Trang tháng 6 hàng năm nếu bạn thích yên tĩnh — khách du lịch đông và giá phòng tăng 30–50%.",
      },
      {
        id: "khach-san",
        heading: "Nên ở khách sạn nào?",
        paragraphs: [
          "Đường Trần Phú là trục khách sạn biển chính. Muốn cao cấp: InterContinental, Sheraton, Vinpearl Resort. Tầm trung: Libera, Liberty Central. Giá phòng tiết kiệm: các khách sạn nhỏ ở đường Hùng Vương, Nguyễn Thiện Thuật.",
        ],
      },
      {
        id: "choi-gi",
        heading: "Hoạt động không thể bỏ lỡ",
        paragraphs: [
          "Tour 4 đảo (Hòn Mun, Hòn Tằm, Hòn Miễu, Bãi Tranh): từ 250.000 VND. VinWonders Nha Trang và cáp treo vượt biển: vé 900.000 VND. Tháp Bà Ponagar — di tích Chăm Pa 1.200 năm tuổi. Tắm bùn I-Resort hoặc Tháp Bà Spa.",
        ],
      },
      {
        id: "am-thuc",
        heading: "Đặc sản nhất định phải thử",
        paragraphs: [
          "Bún cá sứa, bún chả cá, bánh căn, nem nướng Ninh Hòa, yến sào. Khu ăn vặt tập trung ở đường Tô Hiến Thành và Nguyễn Thiện Thuật.",
        ],
        quote:
          "Một buổi tối ở Nha Trang: gió biển, ly bia Bến Thành, và tiếng sóng — thế là đủ.",
      },
    ],
  },
  {
    id: "post-hue-van-hoa-am-thuc",
    slug: "kham-pha-hue-van-hoa-va-am-thuc",
    title:
      "Khám phá Huế: điểm đến dành cho người yêu văn hoá và ẩm thực",
    excerpt:
      "Đại Nội, lăng tẩm, bún bò Huế, cơm hến — Huế không chỉ là cố đô mà còn là bảo tàng sống của văn hoá và ẩm thực miền Trung.",
    location: "Huế",
    author: "VieGo VN",
    date: "2026-03-20",
    dateLabel: "20 thg 3 2026",
    readTime: "7 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/hue.jpg",
    tags: ["Huế", "văn hoá", "ẩm thực", "di sản"],
    category: "Văn hoá & di sản",
    featured: false,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 1 – tháng 4",
      suitableFor: "Người yêu văn hoá, lịch sử",
      budget: "Từ 2.000.000 VND/người",
      duration: "2 ngày 1 đêm",
    },
    sections: [
      {
        id: "gioi-thieu",
        heading: "Huế — cố đô của Việt Nam",
        paragraphs: [
          "Huế là kinh đô cuối cùng của chế độ phong kiến Việt Nam, nơi triều Nguyễn để lại dấu ấn sâu đậm trong kiến trúc, ẩm thực và lối sống. Đi Huế không phải để 'đi chơi' theo nghĩa thông thường, mà là để chiêm nghiệm.",
        ],
      },
      {
        id: "di-san",
        heading: "Hệ thống di sản UNESCO",
        paragraphs: [
          "Đại Nội (Kinh thành Huế) là điểm đến không thể bỏ qua — nên dành cả một buổi sáng. Các lăng tẩm vua Nguyễn phân bổ quanh thành phố: lăng Tự Đức (tinh tế), lăng Khải Định (Âu hoá), lăng Minh Mạng (đăng đối). Mỗi lăng mang phong cách riêng.",
          "Chùa Thiên Mụ — biểu tượng của Huế — nằm trên đồi Hà Khê bên sông Hương. Nên đi vào cuối chiều để đón hoàng hôn.",
        ],
      },
      {
        id: "am-thuc",
        heading: "Ẩm thực Huế — tinh tế và cay nồng",
        paragraphs: [
          "Bún bò Huế chuẩn vị chỉ có ở Huế — thử quán mệ Kéo (17 Lý Thường Kiệt) hoặc bún bò O Phụng. Cơm hến và bún hến Cồn là đặc sản dân dã. Bánh khoái, bánh bèo chén, bánh nậm, bánh lọc — ăn kèm chén mắm nêm cay.",
          "Các nhà hàng ẩm thực cung đình Tịnh Gia Viên, Ý Thảo là nơi trải nghiệm 'bữa ngự thiện' phiên bản hiện đại.",
        ],
        tip: "Người Huế ăn cay đặc trưng — nếu không quen, hãy gọi 'ít cay' ngay từ đầu, vì mặc định là rất cay.",
      },
      {
        id: "khac",
        heading: "Những trải nghiệm khác",
        paragraphs: [
          "Đi thuyền rồng trên sông Hương buổi tối, nghe ca Huế. Dạo cầu Trường Tiền, phố đi bộ Nguyễn Đình Chiểu. Mua trà cung đình và mè xửng làm quà.",
        ],
        quote:
          "Huế dạy bạn đi chậm, nhìn kỹ, và thưởng thức từng chi tiết — dù là một mái ngói, một chén chè, hay một bản ca.",
      },
    ],
  },
  {
    id: "post-quy-nhon-bai-bien",
    slug: "bai-bien-dep-o-quy-nhon",
    title: "Những bãi biển đẹp không nên bỏ lỡ ở Quy Nhơn",
    excerpt:
      "Kỳ Co, Eo Gió, Hòn Khô — những cái tên đã làm nên thương hiệu biển Quy Nhơn. Gợi ý lộ trình 1 ngày để khám phá trọn vẹn.",
    location: "Quy Nhơn",
    author: "VieGo VN",
    date: "2026-04-18",
    dateLabel: "18 thg 4 2026",
    readTime: "6 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/quynhon.jpg",
    tags: ["Quy Nhơn", "biển", "Bình Định"],
    category: "Điểm đến",
    featured: false,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 3 – tháng 8",
      suitableFor: "Nhóm bạn, gia đình",
      budget: "Từ 2.500.000 VND/người",
      duration: "2 ngày 1 đêm",
    },
    sections: [
      {
        id: "gioi-thieu",
        heading: "Quy Nhơn — viên ngọc mới của biển miền Trung",
        paragraphs: [
          "Quy Nhơn vài năm gần đây được khách du lịch ưu ái gọi là 'Đảo Bali thu nhỏ' của Việt Nam nhờ những bãi biển hoang sơ, nước xanh ngọc và đường biển uốn lượn đẹp hiếm có.",
        ],
      },
      {
        id: "ky-co",
        heading: "Kỳ Co — bãi tắm đẹp nhất",
        paragraphs: [
          "Kỳ Co được mệnh danh là 'Maldives của Việt Nam' — nước biển trong vắt, cát trắng mịn. Từ Quy Nhơn đi cano khoảng 20 phút, vé khoảng 400.000 VND khứ hồi bao gồm ăn trưa.",
        ],
      },
      {
        id: "eo-gio",
        heading: "Eo Gió — cung đường cheo leo",
        paragraphs: [
          "Eo Gió là một cung đường men theo vách núi nhìn thẳng ra biển, nơi gió thổi quanh năm. Điểm check-in không thể bỏ qua, đặc biệt đẹp lúc hoàng hôn.",
        ],
        tip: "Đi Eo Gió buổi sáng sớm hoặc chiều muộn để tránh nắng gắt — trưa tháng 6–7 nhiệt độ có thể lên 38°C.",
      },
      {
        id: "hon-kho",
        heading: "Hòn Khô — đảo san hô gần bờ",
        paragraphs: [
          "Hòn Khô cách bờ chỉ 15 phút cano, nổi tiếng với rạn san hô rộng. Có thể lặn ống thở ngắm san hô ngay khi thuỷ triều rút.",
        ],
      },
    ],
  },
  {
    id: "post-ha-noi-2n1d",
    slug: "goi-y-lich-trinh-du-lich-ha-noi-2-ngay-1-dem",
    title: "Gợi ý lịch trình du lịch Hà Nội 2 ngày 1 đêm",
    excerpt:
      "Phố cổ, Hồ Gươm, Văn Miếu, chợ đêm Đồng Xuân và những quán cà phê hoài cổ — khám phá Hà Nội trọn vẹn trong một cuối tuần.",
    location: "Hà Nội",
    author: "VieGo VN",
    date: "2026-04-02",
    dateLabel: "2 thg 4 2026",
    readTime: "7 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/hanoi.jpg",
    tags: ["Hà Nội", "lịch trình", "phố cổ", "cuối tuần"],
    category: "Lịch trình",
    featured: true,
    sourceSection: "featured",
    quickInfo: {
      bestTime: "Tháng 9 – tháng 11",
      suitableFor: "Mọi đối tượng",
      budget: "Từ 1.800.000 VND/người",
      duration: "2 ngày 1 đêm",
    },
    sections: [
      {
        id: "gioi-thieu",
        heading: "Hà Nội 36 phố phường",
        paragraphs: [
          "Hà Nội là nơi hoài cổ và hiện đại sống cạnh nhau, nơi phở bò buổi sáng và cà phê trứng buổi chiều đều trở thành ký ức khó quên. 2 ngày là vừa đủ cho lần đầu đặt chân đến thủ đô.",
        ],
      },
      {
        id: "ngay-1",
        heading: "Ngày 1: Trung tâm lịch sử",
        paragraphs: [
          "Sáng: Văn Miếu — Quốc Tử Giám (trường đại học đầu tiên của Việt Nam, 900 năm tuổi). Trưa: bún chả Hàng Mành hoặc phở Thìn Lò Đúc.",
          "Chiều: Hồ Gươm, đền Ngọc Sơn, cầu Thê Húc. Dạo phố đi bộ nếu cuối tuần. Tối: phố cổ, ăn bún đậu mắm tôm, uống bia hơi Tạ Hiện.",
        ],
      },
      {
        id: "ngay-2",
        heading: "Ngày 2: Văn hoá và ẩm thực",
        paragraphs: [
          "Sáng: Lăng Chủ tịch (8:00–11:00 trừ thứ Hai và thứ Sáu), chùa Một Cột, bảo tàng Hồ Chí Minh. Trưa: phở bò Lý Quốc Sư.",
          "Chiều: cà phê trứng Giảng (39 Nguyễn Hữu Huân). Tham quan Nhà hát Lớn, Bưu điện. Tối: chợ đêm Đồng Xuân mua quà.",
        ],
        tip: "Mặc áo lịch sự khi vào Lăng Chủ tịch và các đền chùa — không mặc quần đùi, áo sát nách.",
      },
      {
        id: "an-gi",
        heading: "Ăn gì ở Hà Nội?",
        paragraphs: [
          "Phở, bún chả, bún đậu, bún thang, chả cá Lã Vọng, bánh cuốn Thanh Trì, nem cua bể, chè Bốn Mùa. Cà phê trứng Giảng, cà phê cốt dừa Cộng.",
        ],
      },
    ],
  },
  {
    id: "post-sai-gon-xe-buyt-2-tang",
    slug: "khao-pha-sai-gon-qua-tour-xe-buyt-2-tang",
    title: "Khám phá Sài Gòn qua tour xe buýt 2 tầng",
    excerpt:
      "Một cách mới mẻ để ngắm Sài Gòn: tour hop-on hop-off trên xe buýt 2 tầng đưa bạn đi qua Nhà thờ Đức Bà, Bưu điện, chợ Bến Thành và Landmark 81.",
    location: "TP. Hồ Chí Minh",
    author: "VieGo VN",
    date: "2026-03-05",
    dateLabel: "5 thg 3 2026",
    readTime: "5 phút đọc",
    image: "/nhom01_dulich_booking/assets/activities/tours/xe-buyt-2-tang-hcm.png",
    tags: ["TP. Hồ Chí Minh", "tour", "thành phố"],
    category: "Trải nghiệm",
    featured: false,
    sourceSection: "featured",
  },
  {
    id: "post-ha-long-1-ngay",
    slug: "kham-pha-ha-long-trong-mot-ngay",
    title: "Khám phá vịnh Hạ Long trọn vẹn trong một ngày",
    excerpt:
      "Du thuyền trên vịnh, hang Sửng Sốt, đảo Titop, chèo kayak — những trải nghiệm không thể bỏ qua khi đến di sản thiên nhiên thế giới.",
    location: "Hạ Long",
    author: "VieGo VN",
    date: "2026-02-20",
    dateLabel: "20 thg 2 2026",
    readTime: "6 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/halong.jpg",
    tags: ["Hạ Long", "di sản", "du thuyền"],
    category: "Điểm đến",
    featured: false,
    sourceSection: "featured",
  },
  {
    id: "post-mui-ne-phanthiet",
    slug: "thien-duong-bien-mui-ne-phan-thiet",
    title: "Mũi Né Phan Thiết: thiên đường biển dành cho cả gia đình",
    excerpt:
      "Đồi cát bay, suối Tiên, Hòn Rơm và những resort view biển tuyệt đẹp — cẩm nang cuối tuần cho chuyến đi từ Sài Gòn chỉ 4 giờ lái xe.",
    location: "Mũi Né",
    author: "VieGo VN",
    date: "2026-02-05",
    dateLabel: "5 thg 2 2026",
    readTime: "6 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/phanthiet.jpg",
    tags: ["Mũi Né", "Phan Thiết", "biển", "cuối tuần"],
    category: "Cuối tuần",
    featured: false,
    sourceSection: "featured",
  },
  {
    id: "post-vung-tau-cuoi-tuan",
    slug: "vung-tau-cuoi-tuan-tu-sai-gon",
    title: "Vũng Tàu cuối tuần từ Sài Gòn: đi đâu, ăn gì, chơi gì",
    excerpt:
      "Cách Sài Gòn hơn 100 km, Vũng Tàu là lựa chọn lý tưởng cho chuyến đi 2 ngày 1 đêm giải nhiệt cuối tuần.",
    location: "Vũng Tàu",
    author: "VieGo VN",
    date: "2026-01-18",
    dateLabel: "18 thg 1 2026",
    readTime: "5 phút đọc",
    image: "/nhom01_dulich_booking/assets/locations/vungtau.jpg",
    tags: ["Vũng Tàu", "cuối tuần", "biển"],
    category: "Cuối tuần",
    featured: false,
    sourceSection: "featured",
  },

  // === Các bài viết mới nhất (từ latestTravelArticles.js) ===
  {
    id: "art-1",
    slug: "chi-tiet-dia-diem-va-lich-ban-phao-hoa-30-4-tai-tp-hcm-nam-2026",
    title: "Chi tiết địa điểm và lịch bắn pháo hoa 30/4 tại TP HCM năm 2026",
    excerpt:
      "Tổng hợp đầy đủ các điểm bắn pháo hoa 30/4/2026 tại TP HCM, thời gian và các góc ngắm đẹp nhất cùng gợi ý di chuyển.",
    location: "TP. Hồ Chí Minh",
    author: "VieGo VN",
    date: "2026-04-25",
    dateLabel: "25 thg 4 2026",
    readTime: "12 phút đọc",
    image: "/nhom01_dulich_booking/assets/articles/article-1.jpg",
    tags: ["TP. Hồ Chí Minh", "sự kiện", "30/4"],
    category: "Sự kiện",
    featured: false,
    sourceSection: "latest",
  },
  {
    id: "art-2",
    slug: "vietnam-digital-arrival-card-quy-dinh-khai-bao-nhap-canh-truc-tuyen",
    title:
      "Vietnam Digital Arrival Card: Quy định khai báo nhập cảnh trực tuyến mới nhất",
    excerpt:
      "Hướng dẫn từng bước khai báo Vietnam Digital Arrival Card trực tuyến — các loại giấy tờ cần chuẩn bị và lưu ý quan trọng.",
    location: "Việt Nam",
    author: "VieGo VN",
    date: "2026-04-12",
    dateLabel: "12 thg 4 2026",
    readTime: "12 phút đọc",
    image: "/nhom01_dulich_booking/assets/articles/article-2.jpg",
    tags: ["thủ tục", "nhập cảnh", "quy định"],
    category: "Hướng dẫn",
    featured: false,
    sourceSection: "latest",
  },
  {
    id: "art-3",
    slug: "kinh-nghiem-dat-lich-tham-quan-cac-khu-vui-choi-noi-tieng-tiet-kiem-hon",
    title:
      "Kinh nghiệm đặt lịch tham quan các khu vui chơi nổi tiếng tiết kiệm hơn",
    excerpt:
      "Mẹo đặt vé online, khung giờ ít đông và combo tiết kiệm cho các khu vui chơi hàng đầu Việt Nam.",
    location: "Việt Nam",
    author: "VieGo Editorial",
    date: "2026-04-05",
    dateLabel: "5 thg 4 2026",
    readTime: "5 phút đọc",
    image: "/nhom01_dulich_booking/assets/articles/article-3.jpg",
    tags: ["mẹo", "vui chơi", "tiết kiệm"],
    category: "Mẹo du lịch",
    featured: false,
    sourceSection: "latest",
  },
  {
    id: "art-4",
    slug: "du-lich-thang-4-trong-nuoc-dung-bo-qua-nhung-thien-duong-ly-tuong",
    title:
      "Du lịch tháng 4 trong nước: đừng bỏ qua những 'thiên đường' lý tưởng",
    excerpt:
      "Tháng 4 là thời điểm giao mùa tuyệt đẹp cho du lịch nội địa — những điểm đến lý tưởng đang chờ bạn khám phá.",
    location: "Việt Nam",
    author: "VieGo VN",
    date: "2026-03-28",
    dateLabel: "28 thg 3 2026",
    readTime: "9 phút đọc",
    image: "/nhom01_dulich_booking/assets/articles/article-4.jpeg",
    tags: ["nội địa", "tháng 4", "điểm đến"],
    category: "Điểm đến",
    featured: false,
    sourceSection: "latest",
  },
  {
    id: "art-5",
    slug: "top-diem-den-noi-dia-dep-nhat-cho-ky-nghi-ngan-ngay",
    title: "Top điểm đến nội địa đẹp nhất cho kỳ nghỉ ngắn ngày",
    excerpt:
      "Những điểm đến gần, dễ đi và đẹp ngỡ ngàng cho kỳ nghỉ 2–3 ngày mà bạn không cần lên kế hoạch quá lâu.",
    location: "Việt Nam",
    author: "VieGo VN",
    date: "2026-03-15",
    dateLabel: "15 thg 3 2026",
    readTime: "8 phút đọc",
    image: "/nhom01_dulich_booking/assets/articles/article-5.jpg",
    tags: ["nội địa", "ngắn ngày", "điểm đến"],
    category: "Điểm đến",
    featured: false,
    sourceSection: "latest",
  },
  {
    id: "art-6",
    slug: "meo-san-ve-may-bay-gia-re-vao-mua-cao-diem",
    title: "Mẹo săn vé máy bay giá rẻ vào mùa cao điểm",
    excerpt:
      "Các thủ thuật đặt vé, công cụ so sánh giá và khung giờ vàng để luôn có vé rẻ ngay cả trong mùa cao điểm.",
    location: "Việt Nam",
    author: "VieGo Editorial",
    date: "2026-03-01",
    dateLabel: "1 thg 3 2026",
    readTime: "6 phút đọc",
    image: "/nhom01_dulich_booking/assets/articles/article-6.jpg",
    tags: ["vé máy bay", "tiết kiệm", "mẹo"],
    category: "Mẹo du lịch",
    featured: false,
    sourceSection: "latest",
  },
  {
    id: "art-7",
    slug: "nhung-luu-y-quan-trong-khi-bay-noi-dia-lan-dau",
    title: "Những lưu ý quan trọng khi bay nội địa lần đầu",
    excerpt:
      "Hành lý, giấy tờ, giờ check-in, cửa ra máy bay — tất tần tật những điều cần biết cho chuyến bay nội địa đầu tiên.",
    location: "Việt Nam",
    author: "VieGo VN",
    date: "2026-02-15",
    dateLabel: "15 thg 2 2026",
    readTime: "7 phút đọc",
    image: "/nhom01_dulich_booking/assets/flight-articles/article-7.png",
    tags: ["vé máy bay", "hướng dẫn", "nội địa"],
    category: "Hướng dẫn",
    featured: false,
    sourceSection: "latest",
  },
  {
    id: "art-8",
    slug: "checklist-hanh-ly-gon-nhe-cho-chuyen-du-lich-3-ngay-2-dem",
    title: "Checklist hành lý gọn nhẹ cho chuyến du lịch 3 ngày 2 đêm",
    excerpt:
      "Danh sách đóng gói tối giản cho chuyến đi 3 ngày 2 đêm — chỉ mang những gì thực sự cần thiết.",
    location: "Việt Nam",
    author: "VieGo VN",
    date: "2026-02-01",
    dateLabel: "1 thg 2 2026",
    readTime: "4 phút đọc",
    image: "/nhom01_dulich_booking/assets/flight-articles/article-8.png",
    tags: ["checklist", "hành lý", "mẹo"],
    category: "Mẹo du lịch",
    featured: false,
    sourceSection: "latest",
  },
];

// Fallback content cho bài chưa có sections hoặc content
blogPosts.forEach((p) => {
  if (!p.sections && !p.content) p.content = PLACEHOLDER_PARAGRAPHS;
});

export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getRelatedBlogPosts(post, count = 3) {
  if (!post) return [];
  return blogPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.location === post.location ||
          (p.tags || []).some((t) => (post.tags || []).includes(t)))
    )
    .slice(0, count);
}

export const blogSearchSuggestions = [
  "du lịch Đà Nẵng",
  "ăn gì ở Hội An",
  "lịch trình Phú Quốc",
  "cẩm nang Nha Trang",
  "khám phá Hà Nội 2 ngày",
  "Hạ Long 1 ngày",
  "Mũi Né cuối tuần",
  "Vũng Tàu gần Sài Gòn",
  "mẹo săn vé máy bay",
  "checklist hành lý",
  "kinh nghiệm Đà Lạt mùa hoa",
  "trekking Sa Pa cho người mới",
  "Côn Đảo 3 ngày 2 đêm",
  "ẩm thực đường phố Huế",
  "Quy Nhơn check-in biển",
];

export default blogPosts;
