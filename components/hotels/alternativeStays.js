export const alternativeStayDataBySlug = {
  "vung-tau": {
    title: "Không chỉ có khách sạn, chúng tôi còn có những loại hình lưu trú khác",
    subtitle:
      "Khám phá thêm những loại hình lưu trú khác phù hợp với nhu cầu cho chuyến đi của bạn",
    items: [
      {
        id: "vt-alt-1",
        title: "Villa ở Vũng Tàu",
        type: "Villa",
        location: "Vũng Tàu",
        image: "/nhom01_dulich_booking/assets/alternative-stays/vungtau-villa.jpg",
      },
      {
        id: "vt-alt-2",
        title: "Căn hộ Vũng Tàu",
        type: "Căn hộ",
        location: "Vũng Tàu",
        image: "/nhom01_dulich_booking/assets/alternative-stays/vungtau-apartment.jpg",
      },
    ],
  },

  "vinh-ha-long": {
    title: "Không chỉ có khách sạn, chúng tôi còn có những loại hình lưu trú khác",
    subtitle:
      "Khám phá thêm những loại hình lưu trú khác phù hợp với nhu cầu cho chuyến đi của bạn",
    items: [
      {
        id: "hl-alt-1",
        title: "Villa ở Hạ Long",
        type: "Villa",
        location: "Hạ Long",
        image: "/nhom01_dulich_booking/assets/alternative-stays/halong-villa.jpg",
      },
      {
        id: "hl-alt-2",
        title: "Căn hộ Hạ Long",
        type: "Căn hộ",
        location: "Hạ Long",
        image: "/nhom01_dulich_booking/assets/alternative-stays/halong-apartment.jpg",
      },
    ],
  },

  "nha-trang": {
    title: "Không chỉ có khách sạn, chúng tôi còn có những loại hình lưu trú khác",
    subtitle:
      "Khám phá thêm những loại hình lưu trú khác phù hợp với nhu cầu cho chuyến đi của bạn",
    items: [
      {
        id: "nt-alt-1",
        title: "Biệt thự ở Nha Trang",
        type: "Biệt thự",
        location: "Nha Trang",
        image: "/nhom01_dulich_booking/assets/alternative-stays/nhatrang-villa.jpg",
      },
      {
        id: "nt-alt-2",
        title: "Căn hộ Nha Trang",
        type: "Căn hộ",
        location: "Nha Trang",
        image: "/nhom01_dulich_booking/assets/alternative-stays/nhatrang-apartment.jpg",
      },
    ],
  },

  "ha-noi": {
    title: "Không chỉ có khách sạn, chúng tôi còn có những loại hình lưu trú khác",
    subtitle:
      "Khám phá thêm những loại hình lưu trú khác phù hợp với nhu cầu cho chuyến đi của bạn",
    items: [
      {
        id: "hn-alt-1",
        title: "Homestay Hà Nội",
        type: "Homestay",
        location: "Hà Nội",
        image: "/nhom01_dulich_booking/assets/alternative-stays/hanoi-homestay.jpg",
      },
      {
        id: "hn-alt-2",
        title: "Căn hộ Hà Nội",
        type: "Căn hộ",
        location: "Hà Nội",
        image: "/nhom01_dulich_booking/assets/alternative-stays/hanoi-apartment.jpg",
      },
    ],
  },

  "phan-thiet": {
    title: "Không chỉ có khách sạn, chúng tôi còn có những loại hình lưu trú khác",
    subtitle:
      "Khám phá thêm những loại hình lưu trú khác phù hợp với nhu cầu cho chuyến đi của bạn",
    items: [
      {
        id: "pt-alt-1",
        title: "Villa ở Phan Thiết",
        type: "Villa",
        location: "Phan Thiết",
        image: "/nhom01_dulich_booking/assets/alternative-stays/phanthiet-villa.jpeg",
      },
      {
        id: "pt-alt-2",
        title: "Bungalow Phan Thiết",
        type: "Bungalow",
        location: "Phan Thiết",
        image: "/nhom01_dulich_booking/assets/alternative-stays/phanthiet-bungalow.jpg",
      },
    ],
  },

  "da-nang": {
    title: "Không chỉ có khách sạn, chúng tôi còn có những loại hình lưu trú khác",
    subtitle:
      "Khám phá thêm những loại hình lưu trú khác phù hợp với nhu cầu cho chuyến đi của bạn",
    items: [
      {
        id: "dn-alt-1",
        title: "Biệt thự ở Đà Nẵng",
        type: "Biệt thự",
        location: "Đà Nẵng",
        image: "/nhom01_dulich_booking/assets/alternative-stays/danang-villa.jpg",
      },
      {
        id: "dn-alt-2",
        title: "Căn hộ Đà Nẵng",
        type: "Căn hộ",
        location: "Đà Nẵng",
        image: "/nhom01_dulich_booking/assets/alternative-stays/danang-apartment.jpg",
      },
    ],
  },
};

export const getAlternativeStaysForSlug = (slug) =>
  alternativeStayDataBySlug[slug] || null;
