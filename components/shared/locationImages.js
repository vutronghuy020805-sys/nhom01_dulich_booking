export const DEFAULT_HERO_IMAGE = "/nhom01_dulich_booking/assets/locations/default.jpg";

// Ảnh đại diện theo thành phố lớn — thư mục: public/assets/locations/
export const cityImageMap = {
  "Hà Nội": "/nhom01_dulich_booking/assets/locations/hanoi.jpg",
  "Thành phố Hà Nội": "/nhom01_dulich_booking/assets/locations/hanoi.jpg",

  "TP. Hồ Chí Minh": "/nhom01_dulich_booking/assets/locations/tphcm.jpg",
  "TP Hồ Chí Minh": "/nhom01_dulich_booking/assets/locations/tphcm.jpg",
  "Thành phố Hồ Chí Minh": "/nhom01_dulich_booking/assets/locations/tphcm.jpg",
  "Hồ Chí Minh": "/nhom01_dulich_booking/assets/locations/tphcm.jpg",

  "Đà Nẵng": "/nhom01_dulich_booking/assets/locations/danang.jpg",
  "Thành phố Đà Nẵng": "/nhom01_dulich_booking/assets/locations/danang.jpg",

  "Nha Trang": "/nhom01_dulich_booking/assets/locations/nhatrang.jpg",
  "Đà Lạt": "/nhom01_dulich_booking/assets/locations/dalat.jpg",
  "Phú Quốc": "/nhom01_dulich_booking/assets/locations/phuquoc.jpg",
  "Hạ Long": "/nhom01_dulich_booking/assets/locations/halong.jpg",
  "Vịnh Hạ Long": "/nhom01_dulich_booking/assets/locations/halong.jpg",
  "Hội An": "/nhom01_dulich_booking/assets/locations/hoian.jpg",
  "Huế": "/nhom01_dulich_booking/assets/locations/hue.jpg",
  "Sa Pa": "/nhom01_dulich_booking/assets/locations/sapa.jpg",

  "Vũng Tàu": "/nhom01_dulich_booking/assets/locations/vungtau.jpg",
  "Thành phố Vũng Tàu": "/nhom01_dulich_booking/assets/locations/vungtau.jpg",

  "Phan Thiết": "/nhom01_dulich_booking/assets/locations/phanthiet.jpg",
};

// Ảnh cho địa điểm / khách sạn cụ thể — ưu tiên cao hơn cityImageMap
export const itemImageMap = {
  "Hồ Hoàn Kiếm": "/nhom01_dulich_booking/assets/locations/hanoi.jpg",
  "Văn Miếu": "/nhom01_dulich_booking/assets/locations/hanoi.jpg",
  "Lăng Bác": "/nhom01_dulich_booking/assets/locations/hanoi.jpg",

  "Chợ Bến Thành": "/nhom01_dulich_booking/assets/locations/tphcm.jpg",
  "Dinh Độc Lập": "/nhom01_dulich_booking/assets/locations/tphcm.jpg",
  "Nhà thờ Đức Bà": "/nhom01_dulich_booking/assets/locations/tphcm.jpg",

  "Bãi biển Mỹ Khê": "/nhom01_dulich_booking/assets/locations/danang.jpg",
  "Cầu Rồng": "/nhom01_dulich_booking/assets/locations/danang.jpg",
  "Bà Nà Hills": "/nhom01_dulich_booking/assets/locations/danang.jpg",

  "Vinpearl Nha Trang": "/nhom01_dulich_booking/assets/locations/nhatrang.jpg",
  "Tháp Bà Ponagar": "/nhom01_dulich_booking/assets/locations/nhatrang.jpg",

  "Vinpearl Phú Quốc": "/nhom01_dulich_booking/assets/locations/phuquoc.jpg",
  "Bãi Sao": "/nhom01_dulich_booking/assets/locations/phuquoc.jpg",
};

export function getLocationImage(query) {
  if (!query) return DEFAULT_HERO_IMAGE;

  const trimmed = query.trim();
  if (!trimmed) return DEFAULT_HERO_IMAGE;

  // 1) Khớp chính xác theo địa điểm cụ thể
  if (itemImageMap[trimmed]) return itemImageMap[trimmed];

  // 2) Khớp chính xác theo tên thành phố
  if (cityImageMap[trimmed]) return cityImageMap[trimmed];

  // 3) Fuzzy: query có chứa tên thành phố (không phân biệt hoa thường)
  const lower = trimmed.toLowerCase();
  for (const [city, img] of Object.entries(cityImageMap)) {
    if (lower.includes(city.toLowerCase())) return img;
  }

  // 4) Fuzzy: query có chứa tên địa điểm cụ thể
  for (const [item, img] of Object.entries(itemImageMap)) {
    if (lower.includes(item.toLowerCase())) return img;
  }

  return DEFAULT_HERO_IMAGE;
}
