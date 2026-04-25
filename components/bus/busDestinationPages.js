export const busDestinationPages = [
  {
    slug: "vung-tau",
    title: "Vé xe đi Vũng Tàu",
    heroTitle: "Vé xe đi Vũng Tàu",
    heroImage: "/nhom01_dulich_booking/assets/hotels/vungtau-1.jpg",
    destinationName: "Vũng Tàu",
    prefillDestinationId: "city-vungtau",
    breadcrumbLabel: "Vé xe đi Vũng Tàu",
  },
  {
    slug: "da-lat",
    title: "Vé xe đi Đà Lạt",
    heroTitle: "Vé xe đi Đà Lạt",
    heroImage: "/nhom01_dulich_booking/assets/destinations/dalat.jpg",
    destinationName: "Đà Lạt",
    prefillDestinationId: "city-dalat",
    breadcrumbLabel: "Vé xe đi Đà Lạt",
  },
  {
    slug: "nha-trang",
    title: "Vé xe đi Nha Trang",
    heroTitle: "Vé xe đi Nha Trang",
    heroImage: "/nhom01_dulich_booking/assets/destinations/nhatrang.jpg",
    destinationName: "Nha Trang",
    prefillDestinationId: "city-nhatrang",
    breadcrumbLabel: "Vé xe đi Nha Trang",
  },
  {
    slug: "phan-thiet",
    title: "Vé xe đi Phan Thiết",
    heroTitle: "Vé xe đi Phan Thiết",
    heroImage: "/nhom01_dulich_booking/assets/hotels/phanthiet-1.jpg",
    destinationName: "Phan Thiết",
    prefillDestinationId: "city-phanthiet",
    breadcrumbLabel: "Vé xe đi Phan Thiết",
  },
  {
    slug: "sai-gon",
    title: "Vé xe đi Sài Gòn",
    heroTitle: "Vé xe đi Sài Gòn",
    heroImage: "/nhom01_dulich_booking/assets/destinations/hcm.jpeg",
    destinationName: "Sài Gòn",
    prefillDestinationId: "city-hcm",
    breadcrumbLabel: "Vé xe đi Sài Gòn",
  },
  {
    slug: "da-nang",
    title: "Vé xe đi Đà Nẵng",
    heroTitle: "Vé xe đi Đà Nẵng",
    heroImage: "/nhom01_dulich_booking/assets/destinations/danang.jpg",
    destinationName: "Đà Nẵng",
    prefillDestinationId: "city-danang",
    breadcrumbLabel: "Vé xe đi Đà Nẵng",
  },
];

export function findBusDestinationBySlug(slug) {
  return busDestinationPages.find((d) => d.slug === slug) || null;
}
