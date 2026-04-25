import { chatbotFaq, fallbackAnswer } from "@/data/chatbotFaq";

// Chuẩn hoá text để keyword matching: bỏ dấu tiếng Việt, lowercase, gộp khoảng
// trắng. Làm thế keyword "doi lich" vẫn match được câu hỏi "Đổi Lịch" của user.
export function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Tính điểm match giữa query đã normalize và danh sách keywords của 1 topic.
// Keyword càng dài (nhiều từ) thì điểm càng cao — ưu tiên match cụm từ cụ thể
// hơn là match 1 từ đơn lẻ.
function scoreTopic(normalizedQuery, keywords = []) {
  let score = 0;
  for (const kw of keywords) {
    const nk = normalize(kw);
    if (!nk) continue;
    if (normalizedQuery.includes(nk)) {
      score += 10 + nk.length;
    } else {
      // Cho điểm nhỏ nếu ít nhất 1 token của keyword xuất hiện trong query.
      const tokens = nk.split(" ");
      const matched = tokens.filter(
        (t) => t.length >= 3 && normalizedQuery.includes(t)
      ).length;
      if (matched > 0) score += matched;
    }
  }
  return score;
}

// Trả về { topicId, answer } phù hợp nhất, hoặc fallback nếu không match.
export function matchFaq(query) {
  const q = normalize(query);
  if (!q) return { topicId: null, answer: fallbackAnswer };

  let best = { score: 0, topic: null };
  for (const topic of chatbotFaq) {
    const s = scoreTopic(q, topic.keywords);
    if (s > best.score) best = { score: s, topic };
  }

  if (!best.topic || best.score < 3) {
    return { topicId: null, answer: fallbackAnswer };
  }
  return { topicId: best.topic.id, answer: best.topic.answer };
}

export function findTopicById(id) {
  return chatbotFaq.find((t) => t.id === id) || null;
}
