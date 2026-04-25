const NAMES = [
  "Minh Anh",
  "Hoàng Nam",
  "Thu Trang",
  "Quốc Bảo",
  "Phương Linh",
  "Đức Huy",
  "Lan Hương",
  "Gia Khánh",
  "Ngọc Hạnh",
  "Thanh Tùng",
  "Mỹ Linh",
  "Tuấn Kiệt",
  "Bích Phương",
  "Nhật Minh",
  "Hải Đăng",
  "Khánh Vy",
];

const POSITIVE_TITLES = [
  "Trải nghiệm rất đáng giá",
  "Quá tuyệt vời, sẽ quay lại!",
  "Vượt ngoài mong đợi",
  "Đặt qua VieGo rất tiện",
  "Dịch vụ đúng như mô tả",
  "Rất hài lòng",
  "Chuẩn không cần chỉnh",
];

const POSITIVE_BODIES = [
  "Mình và gia đình rất hài lòng, dịch vụ chuyên nghiệp, đặt qua VieGo nhanh gọn.",
  "Trải nghiệm xứng đáng với giá tiền. Nhân viên thân thiện, không gian sạch sẽ.",
  "Đặt dễ, nhận voucher ngay, hướng dẫn rõ ràng. Lần sau chắc chắn quay lại.",
  "Đúng giờ, đúng dịch vụ cam kết, mình đánh giá cao phần hỗ trợ khách hàng.",
  "Cảnh đẹp, không gian thoáng, tiện nghi ổn — rất phù hợp đi cuối tuần.",
  "Mình ấn tượng với sự chu đáo. Điểm cộng là giá rất hợp lý so với chất lượng.",
  "Đáng để thử! Ưu đãi trên VieGo giúp mình tiết kiệm được một khoản.",
];

const SOURCE_LABELS = [
  "Đặt qua VieGo",
  "Khách hàng thân thiết",
  "Khách hàng mới",
  "Đặt phút chót",
  "Gia đình có trẻ nhỏ",
];

function hash32(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function formatVnDate(d) {
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
}

export function generateMockReviews(seed, count = 4) {
  if (!seed) seed = "default";
  const reviews = [];
  const base = hash32(seed);
  for (let i = 0; i < count; i++) {
    const h = hash32(`${seed}|${i}`);
    const name = NAMES[(base + i) % NAMES.length];
    const title = POSITIVE_TITLES[h % POSITIVE_TITLES.length];
    const body = POSITIVE_BODIES[(h >> 3) % POSITIVE_BODIES.length];
    const source = SOURCE_LABELS[(h >> 5) % SOURCE_LABELS.length];
    const rating = 4 + ((h % 11) / 10); // 4.0 – 5.0
    const daysAgo = 3 + (h % 180);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    reviews.push({
      id: `${seed}-rv-${i}`,
      name,
      initial: name.charAt(0).toUpperCase(),
      title,
      body,
      source,
      rating: Math.round(rating * 10) / 10,
      dateLabel: formatVnDate(date),
    });
  }
  return reviews;
}

export function summarizeReviews(reviews) {
  if (!reviews.length) return { avg: 0, count: 0, distribution: [0, 0, 0, 0, 0] };
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  const avg = Math.round((sum / reviews.length) * 10) / 10;
  const distribution = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    const idx = Math.max(0, Math.min(4, Math.floor(r.rating) - 1));
    distribution[idx]++;
  });
  return { avg, count: reviews.length, distribution };
}
