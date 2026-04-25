export const vietnamDestinations = [
  { name: "Đà Lạt", subtitle: "Tỉnh Lâm Đồng, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.819 khách sạn" },
  { name: "Thành phố Vũng Tàu", subtitle: "Bà Rịa - Vũng Tàu, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.027 khách sạn" },
  { name: "Nha Trang", subtitle: "Khánh Hòa, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.358 khách sạn" },
  { name: "Đà Nẵng", subtitle: "Thành phố Đà Nẵng, Việt Nam", typeLabel: "Thành Phố", hotelCount: "2.104 khách sạn" },
  { name: "Phú Quốc", subtitle: "Kiên Giang, Việt Nam", typeLabel: "Đảo", hotelCount: "1.246 khách sạn" },
  { name: "Sa Pa", subtitle: "Lào Cai, Việt Nam", typeLabel: "Thị Trấn", hotelCount: "864 khách sạn" },
  { name: "Hạ Long", subtitle: "Quảng Ninh, Việt Nam", typeLabel: "Thành Phố", hotelCount: "1.126 khách sạn" },
  { name: "Hội An", subtitle: "Quảng Nam, Việt Nam", typeLabel: "Thành Phố", hotelCount: "978 khách sạn" },
  { name: "Huế", subtitle: "Thừa Thiên Huế, Việt Nam", typeLabel: "Thành Phố", hotelCount: "742 khách sạn" },
  { name: "Thành phố Hồ Chí Minh", subtitle: "Việt Nam", typeLabel: "Thành Phố", hotelCount: "3.245 khách sạn" },
];

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
