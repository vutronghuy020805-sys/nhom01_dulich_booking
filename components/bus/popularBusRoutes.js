export const popularBusRoutesColumns = [
  {
    id: "ha-noi",
    fromCity: "Hà Nội",
    fromSlug: "ha-noi",
    image: "/assets/destinations/hanoi.jpg",
    routes: [
      {
        toCity: "Sài Gòn",
        toSlug: "sai-gon",
        price: "1.058.000 VND",
        href: "/bus/search?from=ha-noi&to=sai-gon",
      },
      {
        toCity: "Hải Phòng",
        toSlug: "hai-phong",
        price: "115.000 VND",
        href: "/bus/search?from=ha-noi&to=hai-phong",
      },
      {
        toCity: "Huế",
        toSlug: "hue",
        price: "402.500 VND",
        href: "/bus/search?from=ha-noi&to=hue",
      },
    ],
  },
  {
    id: "sai-gon",
    fromCity: "Sài Gòn",
    fromSlug: "sai-gon",
    image: "/assets/destinations/hcm.jpeg",
    routes: [
      {
        toCity: "Đà Nẵng",
        toSlug: "da-nang",
        price: "517.500 VND",
        href: "/bus/search?from=sai-gon&to=da-nang",
      },
      {
        toCity: "Hà Nội",
        toSlug: "ha-noi",
        price: "1.058.000 VND",
        href: "/bus/search?from=sai-gon&to=ha-noi",
      },
      {
        toCity: "Đà Lạt",
        toSlug: "da-lat",
        price: "207.000 VND",
        href: "/bus/search?from=sai-gon&to=da-lat",
      },
    ],
  },
  {
    id: "da-nang",
    fromCity: "Đà Nẵng",
    fromSlug: "da-nang",
    image: "/assets/destinations/danang.jpg",
    routes: [
      {
        toCity: "Sài Gòn",
        toSlug: "sai-gon",
        price: "517.500 VND",
        href: "/bus/search?from=da-nang&to=sai-gon",
      },
      {
        toCity: "Quảng Ngãi",
        toSlug: "quang-ngai",
        price: "287.500 VND",
        href: "/bus/search?from=da-nang&to=quang-ngai",
      },
      {
        toCity: "Gia Lai",
        toSlug: "gia-lai",
        price: "284.400 VND",
        href: "/bus/search?from=da-nang&to=gia-lai",
      },
    ],
  },
];
