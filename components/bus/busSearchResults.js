import { busLocations } from "./busLocations";

const CITY_POINTS = {
  "city-hcm": [
    { id: "hcm-suoi-tien", name: "VP Suối Tiên" },
    { id: "hcm-go-vap", name: "VP Gò Vấp" },
    { id: "hcm-mien-dong-moi", name: "Bến Xe Miền Đông Mới" },
    { id: "hcm-mien-tay", name: "Bến Xe Miền Tây" },
    { id: "hcm-nga-tu-ga", name: "VP Ngã Tư Ga - HCM" },
    { id: "hcm-q1", name: "VP Quận 1 - HCM" },
  ],
  "city-hanoi": [
    { id: "hn-my-dinh", name: "Bến xe Mỹ Đình" },
    { id: "hn-giap-bat", name: "Bến xe Giáp Bát" },
    { id: "hn-van-dien", name: "VP Văn Điển" },
    { id: "hn-giang-vo", name: "VP Giảng Võ" },
  ],
  "city-dalat": [
    { id: "dl-lien-tinh", name: "Bến xe liên tỉnh Đà Lạt" },
    { id: "dl-xvnt", name: "VP Đà Lạt 192 Xô Viết Nghệ Tĩnh" },
    { id: "dl-khe-sanh", name: "VP Đà Lạt - Khe Sanh" },
    { id: "dl-nguyen-tu-luc", name: "VP Đà Lạt - Nguyễn Tử Lực" },
  ],
  "city-vungtau": [
    { id: "vt-bx", name: "Bến xe Vũng Tàu" },
    { id: "vt-ba-ria", name: "VP Bà Rịa" },
    { id: "vt-trung-tam", name: "VP Trung tâm Vũng Tàu" },
  ],
  "city-danang": [
    { id: "dn-trung-tam", name: "Bến xe Trung tâm Đà Nẵng" },
    { id: "dn-hai-chau", name: "VP Hải Châu - Đà Nẵng" },
    { id: "dn-son-tra", name: "VP Sơn Trà - Đà Nẵng" },
  ],
  "city-nhatrang": [
    { id: "nt-phia-nam", name: "Bến xe phía Nam Nha Trang" },
    { id: "nt-phia-bac", name: "Bến xe phía Bắc Nha Trang" },
    { id: "nt-tran-phu", name: "VP Trần Phú - Nha Trang" },
  ],
  "city-phanthiet": [
    { id: "pt-bx", name: "Bến xe Phan Thiết" },
    { id: "pt-mui-ne", name: "VP Mũi Né" },
  ],
  "city-cantho": [
    { id: "ct-91b", name: "Bến xe 91B Cần Thơ" },
    { id: "ct-trung-tam", name: "Bến xe Trung tâm Cần Thơ" },
  ],
  "city-hue": [
    { id: "hue-phia-nam", name: "Bến xe phía Nam Huế" },
    { id: "hue-phia-bac", name: "Bến xe phía Bắc Huế" },
  ],
  "city-quynhon": [
    { id: "qn-bx", name: "Bến xe Quy Nhơn" },
  ],
  "city-haiphong": [
    { id: "hp-niem-nghia", name: "Bến xe Niệm Nghĩa" },
    { id: "hp-tam-bac", name: "Bến xe Tam Bạc" },
  ],
  "bs-mdmoi": [{ id: "hcm-mien-dong-moi", name: "Bến Xe Miền Đông Mới" }],
  "bs-mientay": [{ id: "hcm-mien-tay", name: "Bến Xe Miền Tây" }],
  "bs-giapbat": [{ id: "hn-giap-bat", name: "Bến xe Giáp Bát" }],
  "bs-mydinh": [{ id: "hn-my-dinh", name: "Bến xe Mỹ Đình" }],
  "bs-dn": [{ id: "dn-trung-tam", name: "Bến xe Trung tâm Đà Nẵng" }],
};

const OPERATORS = [
  {
    id: "hoang-thuy",
    name: "Hoang Thuy",
    vehicleClass: "Phòng Đơn Lớn Nằm 1 Khách - Limousine 22 phòng (WC)",
    vehicleShort: "Phòng Đơn Lớn Nằm - Limousine 22 phòng",
    image: "/assets/bus-search/hoang-thuy.jpg",
    ratingBase: 4.5,
  },
  {
    id: "dien-linh",
    name: "Dien Linh Limousine",
    vehicleClass: "Giường nằm nhỏ - Limousine 36 giường",
    vehicleShort: "Giường nằm nhỏ - Limousine 36 giường",
    image: "/assets/bus-search/dien-linh.jpg",
    ratingBase: 4.1,
  },
  {
    id: "tien-oanh",
    name: "Tien Oanh Limousine",
    vehicleClass: "Giường nằm - Limousine 34 giường",
    vehicleShort: "Giường nằm - Limousine 34 giường",
    image: "/assets/bus-search/tien-oanh.jpg",
    ratingBase: 4.3,
  },
  {
    id: "hoa-mai",
    name: "Hoa Mai",
    vehicleClass: "Limousine 9 chỗ VIP",
    vehicleShort: "Limousine 9 chỗ VIP",
    image: "/assets/bus-search/hoa-mai.jpg",
    ratingBase: 4.6,
  },
  {
    id: "huy-hoang",
    name: "Huy Hoang",
    vehicleClass: "Limousine 9 chỗ",
    vehicleShort: "Limousine 9 chỗ",
    image: "/assets/bus-search/huy-hoang.jpg",
    ratingBase: 4.4,
  },
  {
    id: "kim-anh",
    name: "Kim Anh Limousine",
    vehicleClass: "Limousine VIP 22 phòng",
    vehicleShort: "Limousine VIP 22 phòng",
    image: "/assets/bus-search/kim-anh.jpg",
    ratingBase: 4.7,
  },
  {
    id: "phuong-trang",
    name: "Phuong Trang (Futa)",
    vehicleClass: "Giường nằm 40 chỗ",
    vehicleShort: "Giường nằm 40 chỗ",
    image: "/assets/bus-search/phuong-trang.jpg",
    ratingBase: 4.3,
  },
  {
    id: "thanh-vinh",
    name: "Thanh Vinh",
    vehicleClass: "Ghế ngồi 35 chỗ",
    vehicleShort: "Ghế ngồi 35 chỗ",
    image: "/assets/bus-search/thanh-vinh.jpg",
    ratingBase: 4.2,
  },
];

const AMENITY_POOL = ["ac", "wifi", "tv", "charging"];

function hashCode(str) {
  let h = 0;
  for (const c of String(str || "")) {
    h = (h * 31 + c.charCodeAt(0)) | 0;
  }
  return Math.abs(h) + 1;
}

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function padTime(totalMin) {
  const mins = ((totalMin % 1440) + 1440) % 1440;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatDuration(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (m === 0) return `${h}giờ`;
  return `${h}giờ ${m}phút`;
}

export function findBusLocationById(id) {
  return busLocations.find((l) => l.id === id) || null;
}

export function getPointsForLocation(id) {
  const explicit = CITY_POINTS[id];
  if (explicit && explicit.length) return explicit;
  const loc = findBusLocationById(id);
  if (loc) return [{ id, name: loc.name }];
  return [{ id: "generic", name: "Điểm đón/trả" }];
}

function pickFrom(arr, rand) {
  return arr[Math.floor(rand() * arr.length)];
}

function buildTrip(i, fromId, toId, fromPoints, toPoints, rand) {
  const operator = OPERATORS[Math.floor(rand() * OPERATORS.length)];
  const pickup = pickFrom(fromPoints, rand);
  const dropoff = pickFrom(toPoints, rand);

  const depHour = Math.floor(rand() * 24);
  const depMinute = pickFrom([0, 5, 10, 15, 19, 24, 29, 30, 45], rand);
  const depTotal = depHour * 60 + depMinute;
  const durationMin = 300 + Math.floor(rand() * 300);
  const arrTotal = depTotal + durationMin;

  const priceBucket = 300 + Math.floor(rand() * 30) * 5;
  const price = priceBucket * 1000;

  const ratingDelta = rand() * 0.4 - 0.2;
  const ratingNum = Math.max(3.8, Math.min(4.9, operator.ratingBase + ratingDelta));
  const rating = ratingNum.toFixed(1);

  const amenities = [];
  for (const a of AMENITY_POOL) {
    if (rand() > 0.25) amenities.push(a);
  }

  return {
    id: `${fromId}__${toId}__${i + 1}`,
    operator,
    departureTime: padTime(depTotal),
    arrivalTime: padTime(arrTotal),
    departureMin: depTotal,
    durationMin,
    duration: formatDuration(durationMin),
    pickup,
    dropoff,
    price,
    priceLabel: `${price.toLocaleString("vi-VN")} VND`,
    rating,
    amenities,
    nextDay: arrTotal >= 1440,
  };
}

export function generateBusSearchResults(fromId, toId) {
  if (!fromId || !toId) {
    return { bestResults: [], allResults: [] };
  }
  const fromPoints = getPointsForLocation(fromId);
  const toPoints = getPointsForLocation(toId);

  const seed = hashCode(`${fromId}__${toId}`);
  const rand = seededRandom(seed);

  const trips = [];
  for (let i = 0; i < 12; i++) {
    trips.push(buildTrip(i, fromId, toId, fromPoints, toPoints, rand));
  }
  trips.sort((a, b) => a.departureMin - b.departureMin);

  const bestResults = [...trips]
    .sort((a, b) => Number(b.rating) - Number(a.rating) || a.price - b.price)
    .slice(0, 4);

  return { bestResults, allResults: trips };
}

export function findBusTripById(fromId, toId, tripId) {
  if (!fromId || !toId || !tripId) return null;
  const { allResults } = generateBusSearchResults(fromId, toId);
  return allResults.find((t) => t.id === tripId) || null;
}

export function getBusBookingStorageKey(tripId) {
  return `bus-booking:${tripId}`;
}

export function generateBusBookingCode(tripId) {
  let h = 0;
  for (const c of String(tripId || "")) {
    h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff;
  }
  const num = 1000000000 + (Math.abs(h) % 1000000000);
  return String(num);
}

export function generateBusTicketCode(tripId) {
  let h = 0;
  for (const c of String(`${tripId || ""}:ticket`)) {
    h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff;
  }
  const hashed = Math.abs(h);
  const part1 = String(hashed % 1000000).padStart(6, "0");
  const part2 = String(Math.floor(hashed / 1000000) % 1000).padStart(3, "0");
  return `VBGO-${part1}-${part2}`;
}

const BUS_PAYMENT_COUPONS = {
  VIEGOBANMOI: { type: "percent", value: 10, label: "Giảm 10% tổng đơn" },
  VIEGOBUS10: { type: "amount", value: 10000, label: "Giảm 10.000₫" },
  VIEGOBUS50: { type: "amount", value: 50000, label: "Giảm 50.000₫" },
};

export function applyBusCoupon(code, subtotal) {
  if (!code) return { valid: false };
  const upper = String(code).trim().toUpperCase();
  if (!upper) return { valid: false };
  const coupon = BUS_PAYMENT_COUPONS[upper];
  if (!coupon) return { valid: false, error: "Mã giảm giá không hợp lệ." };
  let discount = 0;
  if (coupon.type === "percent") {
    discount = Math.round((subtotal * coupon.value) / 100 / 1000) * 1000;
  } else if (coupon.type === "amount") {
    discount = Math.min(coupon.value, subtotal);
  }
  return { valid: true, code: upper, discount, label: coupon.label };
}

export function formatSearchDateLong(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const wd = weekdays[date.getDay()];
  return `${wd}, ${String(date.getDate()).padStart(2, "0")} tháng ${String(
    date.getMonth() + 1
  ).padStart(2, "0")} ${date.getFullYear()}`;
}
