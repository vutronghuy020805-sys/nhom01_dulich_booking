const VN_DAYS = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

export function parseIsoDate(value) {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

export function parseHm(value) {
  if (!value) return { h: 0, m: 0 };
  const [h, m] = String(value).split(":").map(Number);
  return { h: h || 0, m: m || 0 };
}

export function formatVnDate(date) {
  if (!date) return "";
  return `${VN_DAYS[date.getDay()]}, ${date.getDate()} tháng ${
    date.getMonth() + 1
  }, ${date.getFullYear()}`;
}

export function combineDateTime(date, time) {
  if (!date) return null;
  const dt = new Date(date);
  const { h, m } = parseHm(time);
  dt.setHours(h, m, 0, 0);
  return dt;
}

export function totalRentalMinutes(startDate, startTime, endDate, endTime) {
  const s = combineDateTime(startDate, startTime);
  const e = combineDateTime(endDate, endTime);
  if (!s || !e) return 0;
  return Math.max(0, Math.round((e.getTime() - s.getTime()) / 60000));
}

export function formatDurationLabel(minutes) {
  if (!minutes) return "—";
  const days = Math.floor(minutes / (60 * 24));
  const rem = minutes - days * 60 * 24;
  const hours = Math.floor(rem / 60);
  const mins = rem - hours * 60;
  const parts = [];
  if (days) parts.push(`${days} ngày`);
  if (hours) parts.push(`${hours} giờ`);
  if (!days && !hours && mins) parts.push(`${mins} phút`);
  return parts.length ? parts.join(" ") : "—";
}

/**
 * Billing unit based on rental duration:
 * - <= 4h → half-day (4 hours) rate
 * - <= 1 day → 1 day
 * - otherwise ceil(minutes / 1440) days
 */
export function computeBillingUnits(minutes) {
  if (minutes <= 0) return { kind: "day", quantity: 1, hours: 24 };
  if (minutes <= 4 * 60) {
    return { kind: "hours", quantity: 1, hours: 4 };
  }
  const days = Math.max(1, Math.ceil(minutes / (60 * 24)));
  return { kind: "day", quantity: days, hours: days * 24 };
}

export function computePrice(vehicle, units) {
  const base = vehicle?.pricePerDay || 0;
  if (units.kind === "hours") {
    return Math.round(base * 0.5); // half-day rate for <=4h
  }
  return base * units.quantity;
}

export function packageLabel(vehicle, units) {
  const cat = vehicle?.category || "Xe thuê";
  if (units.kind === "hours") {
    return `${cat} (${units.hours} hours)`;
  }
  if (units.quantity === 1) return `${cat} (1 day)`;
  return `${cat} (${units.quantity} days)`;
}

export function formatVnd(amount) {
  if (!amount && amount !== 0) return "—";
  return amount.toLocaleString("vi-VN") + " VND";
}

export function driverLabel(driverOption) {
  return driverOption === "with-driver" ? "Thuê xe có tài xế" : "Thuê xe tự lái";
}

const CAR_RENTAL_COUPONS = {
  VIEGOCAR10: {
    code: "VIEGOCAR10",
    label: "Giảm 10% tổng đơn",
    kind: "percent",
    value: 10,
  },
  VIEGOCAR50: {
    code: "VIEGOCAR50",
    label: "Giảm 50.000 VND",
    kind: "flat",
    value: 50000,
  },
  VIEGOBANMOI: {
    code: "VIEGOBANMOI",
    label: "Giảm 100.000 VND cho đơn đầu",
    kind: "flat",
    value: 100000,
  },
};

export function applyCarRentalCoupon(rawCode, subtotal) {
  const code = String(rawCode || "").trim().toUpperCase();
  if (!code) return { valid: false, error: "Vui lòng nhập mã giảm giá." };
  const meta = CAR_RENTAL_COUPONS[code];
  if (!meta) return { valid: false, error: "Mã không hợp lệ hoặc đã hết hạn." };
  let discount = 0;
  if (meta.kind === "percent") discount = Math.round((subtotal * meta.value) / 100);
  else if (meta.kind === "flat") discount = meta.value;
  discount = Math.max(0, Math.min(discount, subtotal));
  return { valid: true, code: meta.code, label: meta.label, discount };
}

/**
 * Deterministic-ish booking code of the form CAR<digits>.
 * Uses djb2-style hash over vehicleId + locationId + start so the same
 * booking context always yields the same code.
 */
export function generateCarRentalBookingCode(vehicleId, searchParamsObj = {}) {
  const seed = [
    vehicleId || "",
    searchParamsObj.location || "",
    searchParamsObj.startDate || "",
    searchParamsObj.startTime || "",
    searchParamsObj.endDate || "",
    searchParamsObj.endTime || "",
    searchParamsObj.driverOption || "",
  ].join("|");
  let hash = 5381;
  for (let i = 0; i < seed.length; i += 1) {
    hash = ((hash << 5) + hash + seed.charCodeAt(i)) | 0;
  }
  const positive = (hash >>> 0).toString();
  const padded = positive.padStart(10, "0").slice(-10);
  return `CAR${padded}`;
}

/**
 * Deterministic e-ticket confirmation code: VCGO-<YYMMDD>-<4 digits>
 * derived from the same booking seed so refreshing does not regenerate it.
 */
export function generateCarRentalTicketCode(vehicleId, searchParamsObj = {}) {
  const seed = [
    vehicleId || "",
    searchParamsObj.location || "",
    searchParamsObj.startDate || "",
    searchParamsObj.startTime || "",
    searchParamsObj.endDate || "",
    searchParamsObj.endTime || "",
    searchParamsObj.driverOption || "",
    "ticket",
  ].join("|");
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }
  const suffix = (hash % 10000).toString().padStart(4, "0");
  const startIso = searchParamsObj.startDate || "";
  const [y, m, d] = startIso.split("-");
  const yy = (y || "2026").slice(-2);
  const mm = (m || "01").padStart(2, "0");
  const dd = (d || "01").padStart(2, "0");
  return `VCGO-${yy}${mm}${dd}-${suffix}`;
}
