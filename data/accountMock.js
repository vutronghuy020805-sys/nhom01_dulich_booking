// Mock data cho khu vực tài khoản VieGo.
// Cấu trúc theo dạng array of objects để dễ thay bằng API thực tế sau này.

export const savedCards = [
  {
    id: "card_001",
    brand: "Visa",
    bank: "Vietcombank",
    last4: "4821",
    holder: "NGUYEN VAN A",
    expiry: "08/27",
    isDefault: true,
  },
  {
    id: "card_002",
    brand: "Mastercard",
    bank: "Techcombank",
    last4: "9043",
    holder: "NGUYEN VAN A",
    expiry: "02/26",
    isDefault: false,
  },
];

export const transactions = [
  {
    id: "VG-2026-0421-A7",
    service: "flight",
    serviceLabel: "Vé máy bay",
    title: "VN-214 Hà Nội → TP.HCM",
    paidAt: "2026-04-21",
    amount: 2850000,
    status: "success",
  },
  {
    id: "VG-2026-0402-B1",
    service: "hotel",
    serviceLabel: "Khách sạn",
    title: "Mường Thanh Luxury Đà Nẵng · 2 đêm",
    paidAt: "2026-04-02",
    amount: 3680000,
    status: "success",
  },
  {
    id: "VG-2026-0318-C9",
    service: "activity",
    serviceLabel: "Hoạt động",
    title: "Vé Bà Nà Hills - Cầu Vàng",
    paidAt: "2026-03-18",
    amount: 850000,
    status: "refunded",
  },
  {
    id: "VG-2026-0305-D2",
    service: "bus",
    serviceLabel: "Vé xe khách",
    title: "Phương Trang · Sài Gòn → Đà Lạt",
    paidAt: "2026-03-05",
    amount: 310000,
    status: "pending",
  },
  {
    id: "VG-2026-0212-E5",
    service: "airport",
    serviceLabel: "Đưa đón sân bay",
    title: "Sân bay Nội Bài → Phố cổ Hà Nội",
    paidAt: "2026-02-12",
    amount: 420000,
    status: "cancelled",
  },
];

export const refundRequests = [
  {
    id: "RF-2026-0318-C9",
    orderId: "VG-2026-0318-C9",
    service: "Hoạt động · Vé Bà Nà Hills",
    requestedAt: "2026-03-20",
    amount: 850000,
    status: "refunded",
  },
  {
    id: "RF-2026-0410-F7",
    orderId: "VG-2026-0410-F7",
    service: "Vé máy bay · VN-213",
    requestedAt: "2026-04-11",
    amount: 1950000,
    status: "processing",
  },
];

export const priceAlerts = [
  {
    id: "pa_001",
    route: "Hà Nội (HAN) → Đà Nẵng (DAD)",
    departDate: "2026-06-15",
    threshold: 1200000,
    email: "locdx@locdo.tech",
    active: true,
  },
  {
    id: "pa_002",
    route: "TP.HCM (SGN) → Tokyo (HND)",
    departDate: "2026-07-20",
    threshold: 6500000,
    email: "locdx@locdo.tech",
    active: false,
  },
];

export const savedPassengers = [
  {
    id: "pax_001",
    salutation: "Ông",
    fullName: "Nguyễn Văn A",
    dob: "1990-05-12",
    nationality: "Việt Nam",
    docType: "CCCD",
    docNumber: "079090001234",
    paxType: "adult",
  },
  {
    id: "pax_002",
    salutation: "Bé",
    fullName: "Nguyễn Ngọc B",
    dob: "2018-09-04",
    nationality: "Việt Nam",
    docType: "Giấy khai sinh",
    docNumber: "KS123456",
    paxType: "child",
  },
];

export const defaultNotificationPrefs = {
  email: {
    bookingConfirm: true,
    promotions: true,
    scheduleChange: true,
  },
  sms: {
    departureReminder: true,
    otpSecurity: true,
  },
  push: {
    deals: false,
    paymentReminder: true,
    checkinReminder: true,
  },
};

export const defaultAccountProfile = {
  fullName: "Nguyễn Văn A",
  email: "locdx@locdo.tech",
  phone: "+84 901 234 567",
  language: "vi",
  currency: "VND",
  twoFactor: false,
  devices: [
    {
      id: "dev_1",
      name: "Chrome trên Windows 11",
      location: "Hà Nội, Việt Nam",
      lastActive: "2026-04-24 09:12",
      current: true,
    },
    {
      id: "dev_2",
      name: "VieGo App · iPhone 14",
      location: "Đà Nẵng, Việt Nam",
      lastActive: "2026-04-18 21:47",
      current: false,
    },
  ],
};

export const transactionStatusMap = {
  success: { label: "Thành công", className: "bg-emerald-100 text-emerald-700" },
  pending: { label: "Chờ thanh toán", className: "bg-amber-100 text-amber-700" },
  cancelled: { label: "Đã huỷ", className: "bg-slate-200 text-slate-700" },
  refunded: { label: "Hoàn tiền", className: "bg-sky-100 text-sky-700" },
};

export const refundStatusMap = {
  processing: { label: "Đang xử lý", className: "bg-amber-100 text-amber-700" },
  refunded: { label: "Đã hoàn tiền", className: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Bị từ chối", className: "bg-rose-100 text-rose-700" },
};

export function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateVN(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
