// Lowercase + strip Vietnamese diacritics để match không phân biệt dấu.
export function normalizeVi(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
}

// Đơn giản: test xem `text` có chứa `query` sau normalize không.
export function matchesQuery(text, query) {
  const q = normalizeVi(query);
  if (!q) return true;
  return normalizeVi(text).includes(q);
}

// Tính score đơn giản — ưu tiên match ở đầu, sau đó match bất cứ đâu.
export function matchScore(text, query) {
  const q = normalizeVi(query);
  if (!q) return 0;
  const t = normalizeVi(text);
  if (!t.includes(q)) return -1;
  if (t.startsWith(q)) return 100;
  const wordIdx = t.split(" ").findIndex((w) => w.startsWith(q));
  if (wordIdx >= 0) return 80 - wordIdx;
  return 50;
}

// Tìm tất cả vị trí khớp query trong text (không phân biệt dấu).
// Trả về array [{ start, end }] theo ký tự gốc.
// Thuật toán: normalize đồng độ dài (NFD stripper giữ nguyên độ dài với hầu hết ký tự Latin).
// Để an toàn, dùng fallback regex không dấu trên bản normalize, rồi chiếu lại độ dài.
export function findMatchRanges(text, query) {
  const raw = String(text || "");
  const q = normalizeVi(query);
  if (!q || !raw) return [];
  // Xây map: chỉ số ký tự trong raw → ký tự đã normalize (giữ nguyên length 1:1 trường hợp Latin).
  // Để đơn giản và đủ dùng cho tiếng Việt phổ thông, ta tạo normalized string cùng độ dài với raw
  // bằng cách normalize từng ký tự một.
  let normalized = "";
  const map = []; // map[i] = chỉ số bắt đầu trong raw tương ứng ký tự normalized[i]
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const n = normalizeVi(ch);
    // Có thể n trống (vd ký tự khoảng trắng liên tiếp bị collapse). Giữ 1 ký tự cho mapping.
    const keep = n.length > 0 ? n[0] : " ";
    normalized += keep;
    map.push(i);
  }
  const ranges = [];
  let from = 0;
  while (from < normalized.length) {
    const idx = normalized.indexOf(q, from);
    if (idx === -1) break;
    ranges.push({ start: map[idx], end: map[idx + q.length - 1] + 1 });
    from = idx + q.length;
  }
  return ranges;
}
