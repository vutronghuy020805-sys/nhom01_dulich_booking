export const ACTIVITY_CATEGORIES = [
  {
    id: "diem-tham-quan",
    label: "Điểm tham quan",
    icon: "/assets/icons/activity-sight.png",
  },
  {
    id: "trai-nghiem-am-thuc",
    label: "Trải nghiệm ẩm thực",
    icon: "/assets/icons/activity-food.png",
  },
  {
    id: "trai-nghiem-van-hoa",
    label: "Trải nghiệm văn hóa",
    icon: "/assets/icons/activity-culture.png",
  },
  {
    id: "tro-choi",
    label: "Trò chơi",
    icon: "/assets/icons/activity-games.png",
  },
  {
    id: "tour",
    label: "Tour",
    icon: "/assets/icons/activity-tour.png",
  },
];

export const ACTIVITY_DESTINATIONS = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Nha Trang",
  "Phú Quốc",
  "Hội An",
  "Vũng Tàu",
  "Đà Lạt",
  "Tây Ninh",
  "Phan Thiết",
  "Ninh Bình",
];

export const activitiesData = [
  // === Điểm tham quan ===
  {
    id: "vinwonders-nha-trang",
    title: "VinWonders Nha Trang",
    destination: "Nha Trang",
    category: "diem-tham-quan",
    location: "Đảo Hòn Tre, phường Nha Trang",
    image: "/assets/activities/attractions/vinwonders-nha-trang.jpg",
  },
  {
    id: "sun-world-nui-ba-den",
    title: "Sun World Núi Bà Đen",
    destination: "Tây Ninh",
    category: "diem-tham-quan",
    location: "Phường Bình Minh, tỉnh Tây Ninh",
    image: "/assets/activities/attractions/sun-world-nui-ba-den.jpg",
  },
  {
    id: "thao-cam-vien",
    title: "Thảo Cầm Viên",
    destination: "TP. Hồ Chí Minh",
    category: "diem-tham-quan",
    location: "Phường Sài Gòn, TP. Hồ Chí Minh",
    image: "/assets/activities/attractions/thao-cam-vien.jpg",
  },
  {
    id: "sun-world-ba-na-hills",
    title: "Sun World Bà Nà Hills",
    destination: "Đà Nẵng",
    category: "diem-tham-quan",
    location: "Xã Bà Nà, TP. Đà Nẵng",
    image: "/assets/activities/attractions/ba-na-hills.jpg",
  },
  {
    id: "hoang-thanh-thang-long",
    title: "Hoàng Thành Thăng Long",
    destination: "Hà Nội",
    category: "diem-tham-quan",
    location: "Ba Đình, TP. Hà Nội",
    image: "/assets/activities/attractions/hoang-thanh-thang-long.jpg",
  },
  {
    id: "pho-co-hoi-an",
    title: "Phố cổ Hội An",
    destination: "Hội An",
    category: "diem-tham-quan",
    location: "TP. Hội An, Quảng Nam",
    image: "/assets/activities/attractions/pho-co-hoi-an.jpg",
  },

  // === Trải nghiệm ẩm thực ===
  {
    id: "ben-thanh-princess-dinner-cruise",
    title: "Ăn tối và du ngoạn trên tàu Bến Thành Princess",
    destination: "TP. Hồ Chí Minh",
    category: "trai-nghiem-am-thuc",
    location: "P. Xóm Chiếu, TP. Hồ Chí Minh",
    image: "/assets/activities/food/ben-thanh-princess-dinner-cruise.png",
  },
  {
    id: "pizza-4ps-restaurant",
    title: "Nhà hàng Pizza 4P's",
    destination: "TP. Hồ Chí Minh",
    category: "trai-nghiem-am-thuc",
    location: "Thảo Điền, TP. Hồ Chí Minh",
    image: "/assets/activities/food/pizza-4ps-restaurant.png",
  },
  {
    id: "dmaris-buffet-restaurant",
    title: "Nhà hàng buffet D'Maris",
    destination: "TP. Hồ Chí Minh",
    category: "trai-nghiem-am-thuc",
    location: "Tầng 5, Tòa nhà PICO PLAZA",
    image: "/assets/activities/food/dmaris-buffet-restaurant.png",
  },
  {
    id: "saigon-street-food-motorbike-tour",
    title: "Trải nghiệm ẩm thực đường phố bằng xe máy",
    destination: "TP. Hồ Chí Minh",
    category: "trai-nghiem-am-thuc",
    location: "Quận 4, TP. Hồ Chí Minh",
    image: "/assets/activities/food/saigon-street-food-motorbike-tour.png",
  },

  // === Trải nghiệm văn hóa ===
  {
    id: "ao-dai-photoshoot-hanoi",
    title: "Mặc Áo dài chụp ảnh",
    destination: "Hà Nội",
    category: "trai-nghiem-van-hoa",
    location: "Phố cổ Hà Nội",
    image: "/assets/activities/culture/ao-dai-photoshoot-hanoi.png",
  },
  {
    id: "mua-roi-nuoc-thang-long",
    title: "Xem Múa rối nước",
    destination: "Hà Nội",
    category: "trai-nghiem-van-hoa",
    location: "Nhà hát Múa rối nước Thăng Long",
    image: "/assets/activities/culture/mua-roi-nuoc-thang-long.png",
  },
  {
    id: "cheo-viet-nam",
    title: "Xem/hát Chèo",
    destination: "Hà Nội",
    category: "trai-nghiem-van-hoa",
    location: "Nhà hát Chèo Việt Nam",
    image: "/assets/activities/culture/cheo-viet-nam.png",
  },
  {
    id: "lam-gom-bat-trang",
    title: "Làm gốm",
    destination: "Hà Nội",
    category: "trai-nghiem-van-hoa",
    location: "Làng gốm Bát Tràng",
    image: "/assets/activities/culture/lam-gom-bat-trang.png",
  },

  // === Trò chơi ===
  {
    id: "tau-luon-sieu-toc-vinwonders",
    title: "Tàu lượn siêu tốc",
    destination: "Nha Trang",
    category: "tro-choi",
    location: "VinWonders Nha Trang",
    image: "/assets/activities/games/tau-luon-sieu-toc-vinwonders.png",
  },
  {
    id: "zipline-madagui",
    title: "Zipline",
    destination: "Đà Lạt",
    category: "tro-choi",
    location: "Khu du lịch Madagui",
    image: "/assets/activities/games/zipline-madagui.png",
  },
  {
    id: "atv-bau-trang",
    title: "Đua xe địa hình ATV",
    destination: "Phan Thiết",
    category: "tro-choi",
    location: "Khu du lịch Bàu Trắng",
    image: "/assets/activities/games/atv-bau-trang.png",
  },
  {
    id: "truot-mang-datanla",
    title: "Trượt máng",
    destination: "Đà Lạt",
    category: "tro-choi",
    location: "Thác Datanla",
    image: "/assets/activities/games/truot-mang-datanla.png",
  },

  // === Tour ===
  {
    id: "tour-mien-tay",
    title: "Tour miền Tây",
    destination: "TP. Hồ Chí Minh",
    category: "tour",
    location: "Mỹ Tho, Bến Tre",
    image: "/assets/activities/tours/tour-mien-tay.png",
  },
  {
    id: "tour-3-dao-phu-quoc",
    title: "Tour 3 đảo bằng Cano Nam Phú Quốc - 1 ngày",
    destination: "Phú Quốc",
    category: "tour",
    location: "143 Trần Hưng Đạo",
    image: "/assets/activities/tours/tour-3-dao-phu-quoc.png",
  },
  {
    id: "tour-hoa-lu-trang-an-hang-mua",
    title: "Tour Hoa Lư, Tràng An, và Hang Múa",
    destination: "Ninh Bình",
    category: "tour",
    location: "Hoa Lư, Ninh Bình",
    image: "/assets/activities/tours/tour-hoa-lu-trang-an-hang-mua.png",
  },
  {
    id: "xe-buyt-2-tang-hcm",
    title: "Xe buýt hai tầng Thành phố Hồ Chí Minh",
    destination: "TP. Hồ Chí Minh",
    category: "tour",
    location: "TP HCM",
    image: "/assets/activities/tours/xe-buyt-2-tang-hcm.png",
  },
];

function stableHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// Sinh price / rating ổn định theo id (không đổi giữa các lần render).
export function enrichActivity(activity) {
  const h = stableHash(activity.id);
  const priceBuckets = [150000, 250000, 350000, 450000, 600000, 850000, 1200000];
  const price = priceBuckets[h % priceBuckets.length];
  const rating = Math.round((3.6 + ((h % 15) / 10)) * 10) / 10; // 3.6 → 5.0
  const reviews = 50 + (h % 450);
  return { ...activity, price, rating, reviews };
}

export const enrichedActivities = activitiesData.map(enrichActivity);

export function filterActivities({ category, destination, keyword }) {
  const kw = String(keyword || "").trim().toLowerCase();
  return enrichedActivities.filter((a) => {
    if (category && a.category !== category) return false;
    if (destination && a.destination !== destination) return false;
    if (kw) {
      const hay = `${a.title} ${a.location} ${a.destination}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    return true;
  });
}

export default activitiesData;
