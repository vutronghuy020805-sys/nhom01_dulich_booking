export const vietnamDestinations = [
  { name: "Đà Lạt", slug: "da-lat", subtitle: "Tỉnh Lâm Đồng, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.819 khách sạn" },
  { name: "Thành phố Vũng Tàu", slug: "vung-tau", subtitle: "Bà Rịa - Vũng Tàu, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.027 khách sạn" },
  { name: "Nha Trang", slug: "nha-trang", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.358 khách sạn" },
  { name: "Đà Nẵng", slug: "da-nang", subtitle: "Thành phố Đà Nẵng, Việt Nam", typeLabel: "Thành Phố", hotelCount: "2.104 khách sạn" },
  { name: "Phú Quốc", slug: "phu-quoc", subtitle: "Kiên Giang, Việt Nam", typeLabel: "Đảo", hotelCount: "1.246 khách sạn" },
  { name: "Sa Pa", slug: "sa-pa", subtitle: "Lào Cai, Việt Nam", typeLabel: "Thị Trấn", hotelCount: "864 khách sạn" },
  { name: "Hạ Long", slug: "vinh-ha-long", subtitle: "Quảng Ninh, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.126 khách sạn" },
  { name: "Hội An", slug: "hoi-an", subtitle: "Quảng Nam, Việt Nam", typeLabel: "Thành Phố", hotelCount: "978 khách sạn" },
  { name: "Huế", slug: "hue", subtitle: "Thừa Thiên Huế, Việt Nam", typeLabel: "Thành Phố", hotelCount: "742 khách sạn" },
  { name: "Thành phố Hồ Chí Minh", slug: "ho-chi-minh", subtitle: "Việt Nam", typeLabel: "Thành Phố", hotelCount: "3.245 khách sạn" },
];

// Unknown slugs are intentional — /hotels/[slug] calls notFound() to render 404 for non-existent destinations.
export function slugifyDestination(text) {
  if (!text) return "";
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatShortDate(d) {
  if (!d) return "";
  return `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}`;
}

export function getNightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  const a = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
  const b = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
  return Math.max(0, Math.round((b - a) / msPerDay));
}
