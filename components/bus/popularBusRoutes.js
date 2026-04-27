function bookingHref(fromId, toId) {
  return `/bus/booking/${fromId}__${toId}__1?from=${fromId}&to=${toId}`;
}

export const popularBusRoutesColumns = [
  {
    id: "ha-noi",
    fromCity: "Hà Nội",
    fromSlug: "ha-noi",
    image: "/nhom01_dulich_booking/assets/destinations/hanoi.jpg",
    routes: [
      {
        toCity: "Sài Gòn",
        toSlug: "sai-gon",
        price: "1.058.000 VND",
        href: bookingHref("city-hanoi", "city-hcm"),
      },
      {
        toCity: "Hải Phòng",
        toSlug: "hai-phong",
        price: "115.000 VND",
        href: bookingHref("city-hanoi", "city-haiphong"),
      },
      {
        toCity: "Huế",
        toSlug: "hue",
        price: "402.500 VND",
        href: bookingHref("city-hanoi", "city-hue"),
      },
    ],
  },
  {
    id: "sai-gon",
    fromCity: "Sài Gòn",
    fromSlug: "sai-gon",
    image: "/nhom01_dulich_booking/assets/destinations/hcm.jpeg",
    routes: [
      {
        toCity: "Đà Nẵng",
        toSlug: "da-nang",
        price: "517.500 VND",
        href: bookingHref("city-hcm", "city-danang"),
      },
      {
        toCity: "Hà Nội",
        toSlug: "ha-noi",
        price: "1.058.000 VND",
        href: bookingHref("city-hcm", "city-hanoi"),
      },
      {
        toCity: "Đà Lạt",
        toSlug: "da-lat",
        price: "207.000 VND",
        href: bookingHref("city-hcm", "city-dalat"),
      },
    ],
  },
  {
    id: "da-nang",
    fromCity: "Đà Nẵng",
    fromSlug: "da-nang",
    image: "/nhom01_dulich_booking/assets/destinations/danang.jpg",
    routes: [
      {
        toCity: "Sài Gòn",
        toSlug: "sai-gon",
        price: "517.500 VND",
        href: bookingHref("city-danang", "city-hcm"),
      },
      {
        toCity: "Quảng Ngãi",
        toSlug: "quang-ngai",
        price: "287.500 VND",
        href: bookingHref("city-danang", "city-quangngai"),
      },
      {
        toCity: "Gia Lai",
        toSlug: "gia-lai",
        price: "284.400 VND",
        href: bookingHref("city-danang", "city-gialai"),
      },
    ],
  },
  {
    id: "can-tho",
    fromCity: "Cần Thơ",
    fromSlug: "can-tho",
    image: "/nhom01_dulich_booking/assets/destinations/hcm.jpeg",
    routes: [
      {
        toCity: "Sài Gòn",
        toSlug: "sai-gon",
        price: "172.500 VND",
        href: bookingHref("city-cantho", "city-hcm"),
      },
      {
        toCity: "Cà Mau",
        toSlug: "ca-mau",
        price: "138.000 VND",
        href: bookingHref("city-cantho", "city-camau"),
      },
      {
        toCity: "Châu Đốc",
        toSlug: "chau-doc",
        price: "115.000 VND",
        href: bookingHref("city-cantho", "city-chaudoc"),
      },
    ],
  },
];
