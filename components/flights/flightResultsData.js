const AIRLINES = [
  "VietJet Air",
  "Vietravel Airlines",
  "Vietnam Airlines",
  "Bamboo Airways",
  "Pacific Airlines",
];

const VN_WEEKDAYS = [
  "Chủ nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
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

function padTime(minsTotal) {
  const mins = ((minsTotal % 1440) + 1440) % 1440;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function shortTime(minsTotal) {
  const mins = ((minsTotal % 1440) + 1440) % 1440;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

function pickFrom(arr, rand) {
  return arr[Math.floor(rand() * arr.length)];
}

const FARE_CLASSES = [
  "Nguyên bản - Phổ thông",
  "Eco - Phổ thông",
  "Tiết kiệm - Phổ thông",
  "Linh hoạt - Phổ thông",
];

function buildStandardFlight(i, fromSlug, toSlug, basePrice, rand) {
  const airline = pickFrom(AIRLINES, rand);
  const depHour = 5 + Math.floor(rand() * 18);
  const depMin = pickFrom([0, 5, 10, 20, 30, 40, 45, 50], rand);
  const durMin = 110 + Math.floor(rand() * 40);
  const depTotal = depHour * 60 + depMin;
  const arrTotal = depTotal + durMin;
  const crossDay = arrTotal >= 24 * 60;

  const priceVar = Math.floor((rand() - 0.3) * 150000);
  const price = Math.max(500000, Math.round((basePrice + priceVar) / 1000) * 1000);
  const hasOld = rand() > 0.45;
  const oldPrice = hasOld
    ? Math.round((price + rand() * 90000 + 20000) / 1000) * 1000
    : null;
  const hasBadge = hasOld && rand() > 0.4;
  const remainingSeats = rand() < 0.3 ? Math.floor(rand() * 3) + 1 : null;
  const specialPrice = rand() < 0.25;
  const isChangeable = rand() > 0.3;
  const isRefundable = rand() > 0.7;
  const fareClass = pickFrom(FARE_CLASSES, rand);

  return {
    id: `${fromSlug}-${toSlug}-${i + 1}`,
    airline,
    departureTime: padTime(depTotal),
    arrivalTime: padTime(arrTotal),
    departureMin: depTotal,
    arrivalMin: arrTotal,
    durationMin: durMin,
    duration: `${Math.floor(durMin / 60)}h ${String(durMin % 60).padStart(2, "0")}m`,
    price,
    oldPrice,
    baggage: "0kg",
    badge: hasBadge ? "Ưu đãi mừng Đại Lễ" : null,
    isPromo: hasBadge,
    remainingSeats,
    crossDay,
    specialPrice,
    fareClass,
    isChangeable,
    isRefundable,
    policies: [
      isChangeable ? "Có áp dụng đổi lịch bay" : "Không áp dụng đổi lịch bay",
      isRefundable ? "Có hoàn vé" : "Không hoàn vé",
    ],
    benefits: ["Hành lý xách tay 7kg"],
    passengerType: "Người lớn",
    tripType: "MỘT CHIỀU",
  };
}

function buildFeaturedFlight(fromSlug, toSlug, basePrice, rand) {
  const depHour = 6 + Math.floor(rand() * 3);
  const depMin = pickFrom([0, 10, 15, 20, 30], rand);
  const durMin = 120 + Math.floor(rand() * 20);
  const depTotal = depHour * 60 + depMin;
  const arrTotal = depTotal + durMin;

  const price = Math.round((basePrice * 0.95) / 1000) * 1000;
  const oldPrice = Math.round((price * 1.3) / 1000) * 1000;

  return {
    id: `${fromSlug}-${toSlug}-featured`,
    airline: "VietJet Air",
    departureTime: shortTime(depTotal),
    arrivalTime: shortTime(arrTotal),
    departureTimePadded: padTime(depTotal),
    arrivalTimePadded: padTime(arrTotal),
    departureMin: depTotal,
    arrivalMin: arrTotal,
    durationMin: durMin,
    duration: `${Math.floor(durMin / 60)}h${durMin % 60}p`,
    price,
    oldPrice,
    baggage: "0kg",
    badge: "Ưu đãi mừng đại lễ",
    promoTitle: "Mừng đại lễ",
    promoDiscount: "Giảm đến 30%",
    fareClass: "Nguyên bản - Phổ thông",
    isChangeable: true,
    isRefundable: false,
    policies: ["Có áp dụng đổi lịch bay", "Không hoàn vé"],
    benefits: ["Hành lý xách tay 7kg", "Chọn chỗ ngồi miễn phí"],
    passengerType: "Người lớn",
    tripType: "MỘT CHIỀU",
  };
}

export function generateFlightSearchData(fromSlug, toSlug, basePrice) {
  const seed = hashCode(`${fromSlug}-${toSlug}`);
  const rand = seededRandom(seed);

  const featured = buildFeaturedFlight(fromSlug, toSlug, basePrice, rand);

  const flights = [];
  for (let i = 0; i < 10; i++) {
    flights.push(buildStandardFlight(i, fromSlug, toSlug, basePrice, rand));
  }

  flights.sort((a, b) => a.departureMin - b.departureMin);

  return { featured, flights };
}

export function findFlightById(fromSlug, toSlug, basePrice, flightId) {
  if (!flightId) return null;
  const { featured, flights } = generateFlightSearchData(
    fromSlug,
    toSlug,
    basePrice
  );
  if (flightId === featured.id) return featured;
  return flights.find((f) => f.id === flightId) || null;
}

export function computeFlightPricing(flight) {
  const price = flight.price;
  const taxesAndFees = Math.round((price * 0.08) / 1000) * 1000;
  const totalPrice = price + taxesAndFees;
  return { price, taxesAndFees, totalPrice };
}

export function getFlightStorageKey(fromSlug, toSlug, flightId) {
  return `flight-booking:${fromSlug}-${toSlug}-${flightId}`;
}

export function getFlightConfirmationStorageKey(fromSlug, toSlug, flightId) {
  return `flight-booking:confirmation:${fromSlug}:${toSlug}:${flightId}`;
}

export function generateFlightBookingCode(flightId) {
  let h = 0;
  for (const c of String(flightId || "")) {
    h = (h * 31 + c.charCodeAt(0)) & 0xffffff;
  }
  const year = new Date().getFullYear();
  return `VG-FLT-${year}-${String(h % 1000000).padStart(6, "0")}`;
}

export function parseISODate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatVnDateShort(date) {
  return `${VN_WEEKDAYS[date.getDay()]}, ${date.getDate()} thg ${date.getMonth() + 1}`;
}

export function formatVnDateLong(date) {
  return `${VN_WEEKDAYS[date.getDay()]}, ${date.getDate()} thg ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;
}

export function generateDateTabs(iso, basePrice, routeKey) {
  const baseDate = parseISODate(iso) || new Date();
  const rand = seededRandom(hashCode(`${routeKey}-${iso || ""}`));

  const tabs = [];
  for (let offset = -2; offset <= 1; offset++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    const priceVar = Math.floor((rand() - 0.5) * 300000);
    const price =
      offset === 0
        ? basePrice
        : Math.max(500000, Math.round((basePrice + priceVar) / 1000) * 1000);
    tabs.push({
      key: toISODate(d),
      label: formatVnDateShort(d),
      longLabel: formatVnDateLong(d),
      price,
    });
  }
  return tabs;
}

export function parseVnDealDate(str) {
  if (!str) return null;
  const m = str.match(/(\d+)\s*thg\s*(\d+)\s*(\d+)/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (!day || !month || !year) return null;
  return toISODate(new Date(year, month - 1, day));
}
