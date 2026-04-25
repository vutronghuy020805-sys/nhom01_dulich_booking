export const COUPONS = {
  VIEGO10: {
    code: "VIEGO10",
    type: "percent",
    value: 10,
    label: "Giảm 10% tổng đơn",
    minSubtotal: 0,
  },
  WELCOME50K: {
    code: "WELCOME50K",
    type: "amount",
    value: 50000,
    label: "Giảm 50.000 VND",
    minSubtotal: 200000,
  },
  FREEDISC: {
    code: "FREEDISC",
    type: "percent",
    value: 5,
    label: "Giảm 5% tổng đơn",
    minSubtotal: 0,
  },
  VIEGO100K: {
    code: "VIEGO100K",
    type: "amount",
    value: 100000,
    label: "Giảm 100.000 VND",
    minSubtotal: 500000,
  },
};

export function normalizeCouponCode(raw) {
  return String(raw || "").trim().toUpperCase();
}

export function findCoupon(raw) {
  const code = normalizeCouponCode(raw);
  if (!code) return null;
  return COUPONS[code] || null;
}

export function validateCoupon(raw, subtotal) {
  const code = normalizeCouponCode(raw);
  if (!code) {
    return { valid: false, error: "Vui lòng nhập mã giảm giá." };
  }
  if (subtotal <= 0) {
    return { valid: false, error: "Giỏ hàng đang trống, không thể áp mã." };
  }
  const coupon = COUPONS[code];
  if (!coupon) {
    return { valid: false, error: "Mã giảm giá không tồn tại." };
  }
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      error: `Đơn hàng tối thiểu ${coupon.minSubtotal.toLocaleString("vi-VN")} VND để dùng mã này.`,
    };
  }
  return { valid: true, coupon };
}

export function computeDiscount(coupon, subtotal) {
  if (!coupon) return 0;
  if (coupon.type === "percent") {
    return Math.round((subtotal * coupon.value) / 100 / 1000) * 1000;
  }
  if (coupon.type === "amount") {
    return Math.min(coupon.value, subtotal);
  }
  return 0;
}
