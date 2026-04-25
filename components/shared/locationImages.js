export const DEFAULT_HERO_IMAGE = "/assets/locations/default.jpg";

// Ảnh đại diện theo thành phố lớn — thư mục: public/assets/locations/
export const cityImageMap = {
  "Hà Nội": "/assets/locations/hanoi.jpg",
  "Thành phố Hà Nội": "/assets/locations/hanoi.jpg",

  "TP. Hồ Chí Minh": "/assets/locations/tphcm.jpg",
  "TP Hồ Chí Minh": "/assets/locations/tphcm.jpg",
  "Thành phố Hồ Chí Minh": "/assets/locations/tphcm.jpg",
  "Hồ Chí Minh": "/assets/locations/tphcm.jpg",

  "Đà Nẵng": "/assets/locations/danang.jpg",
  "Thành phố Đà Nẵng": "/assets/locations/danang.jpg",

  "Nha Trang": "/assets/locations/nhatrang.jpg",
  "Đà Lạt": "/assets/locations/dalat.jpg",
  "Phú Quốc": "/assets/locations/phuquoc.jpg",
  "Hạ Long": "/assets/locations/halong.jpg",
  "Vịnh Hạ Long": "/assets/locations/halong.jpg",
  "Hội An": "/assets/locations/hoian.jpg",
  "Huế": "/assets/locations/hue.jpg",
  "Sa Pa": "/assets/locations/sapa.jpg",

  "Vũng Tàu": "/assets/locations/vungtau.jpg",
  "Thành phố Vũng Tàu": "/assets/locations/vungtau.jpg",

  "Phan Thiết": "/assets/locations/phanthiet.jpg",
};

// Ảnh cho địa điểm / khách sạn cụ thể — ưu tiên cao hơn cityImageMap
export const itemImageMap = {
  "Hồ Hoàn Kiếm": "/assets/locations/hanoi.jpg",
  "Văn Miếu": "/assets/locations/hanoi.jpg",
  "Lăng Bác": "/assets/locations/hanoi.jpg",

  "Chợ Bến Thành": "/assets/locations/tphcm.jpg",
  "Dinh Độc Lập": "/assets/locations/tphcm.jpg",
  "Nhà thờ Đức Bà": "/assets/locations/tphcm.jpg",

  "Bãi biển Mỹ Khê": "/assets/locations/danang.jpg",
  "Cầu Rồng": "/assets/locations/danang.jpg",
  "Bà Nà Hills": "/assets/locations/danang.jpg",

  "Vinpearl Nha Trang": "/assets/locations/nhatrang.jpg",
  "Tháp Bà Ponagar": "/assets/locations/nhatrang.jpg",

  "Vinpearl Phú Quốc": "/assets/locations/phuquoc.jpg",
  "Bãi Sao": "/assets/locations/phuquoc.jpg",
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
