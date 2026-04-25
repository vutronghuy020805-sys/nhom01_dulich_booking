export const busBookingSteps = [
  {
    id: 1,
    title: "Nhập thông tin chuyến đi",
    description:
      "Chỉ cần điền nơi đi, nơi đến, thời gian khởi hành và số lượng vé, VieGo sẽ giúp bạn nhanh chóng tìm ra hành trình phù hợp nhất.",
    group: 1,
  },
  {
    id: 2,
    title: "Xem lịch trình & giá vé",
    description:
      "Khám phá các chuyến xe với đầy đủ thông tin về tuyến đường, giờ khởi hành và mức giá. Bạn cũng có thể sử dụng bộ lọc để nhanh chóng tìm được nhà xe phù hợp.",
    group: 1,
  },
  {
    id: 3,
    title: "Xem chi tiết chuyến xe",
    description:
      "Khám phá thông tin chi tiết của từng chuyến xe bao gồm tiện ích, tuyến đường, lịch trình, giá vé và hình ảnh trực quan. Chọn chuyến phù hợp và tiếp tục đặt vé chỉ trong vài bước.",
    group: 2,
  },
  {
    id: 4,
    title: "Nhập thông tin hành khách",
    description:
      "Điền đầy đủ thông tin liên hệ và hành khách để hoàn tất đặt vé. VieGo cũng cho phép bạn chọn chỗ ngồi trên các chuyến xe hỗ trợ tính năng này.",
    group: 2,
  },
  {
    id: 5,
    title: "Kiểm tra đặt chỗ",
    description:
      "Xem lại toàn bộ thông tin đặt vé một lần nữa để đảm bảo chính xác. Sau đó, chọn phương thức thanh toán và hoàn tất giao dịch trong thời gian quy định.",
    group: 3,
  },
  {
    id: 6,
    title: "Nhận vé điện tử",
    description:
      "Sau khi thanh toán thành công, vé điện tử sẽ được gửi đến email hoặc SMS của bạn. Bạn cũng có thể xem lại vé trong mục \"Đặt chỗ của tôi\" ngay trên ứng dụng.",
    group: 3,
  },
  {
    id: 7,
    title: "Xuất trình vé điện tử",
    description:
      "Khi lên xe, bạn chỉ cần xuất trình vé điện tử trên điện thoại (qua email, SMS hoặc trong ứng dụng VieGo) cho nhân viên. Vé giấy sẽ được cung cấp nếu nhà xe yêu cầu.",
    group: 4,
  },
];

export const busBookingGroupVisuals = [
  {
    group: 1,
    layout: "visual-left",
    src: "/nhom01_dulich_booking/assets/bus-page/how-to-book/step-visual-1.png",
    alt: "Nhập thông tin chuyến đi và xem lịch trình trên VieGo",
  },
  {
    group: 2,
    layout: "visual-right",
    src: "/nhom01_dulich_booking/assets/bus-page/how-to-book/step-visual-2.png",
    alt: "Xem chi tiết chuyến xe và nhập thông tin hành khách trên VieGo",
  },
  {
    group: 3,
    layout: "visual-left",
    src: "/nhom01_dulich_booking/assets/bus-page/how-to-book/step-visual-3.png",
    alt: "Kiểm tra đặt chỗ và nhận vé điện tử trên VieGo",
  },
  {
    group: 4,
    layout: "visual-left",
    src: "/nhom01_dulich_booking/assets/bus-page/how-to-book/step-visual-4.png",
    alt: "Vé điện tử VieGo khi lên xe",
  },
];
