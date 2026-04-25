// Content config cho 2 trang lưu trú dùng chung template StayPage:
// - villaContent  -> /biet-thu
// - apartmentContent -> /can-ho
//
// Cả 2 page tái sử dụng các component trong components/villa/, chỉ khác text
// và data. Muốn sửa nội dung trang nào thì chỉ cần chỉnh ở đây.

import { villaHighlights } from "./villaHighlights";
import { villaBenefits } from "./villaBenefits";
import { villaRecommendedDestinations } from "./villaRecommendedDestinations";
import { villaInfoBlocks, villaInfoTitle } from "./villaInfoContent";
import { apartmentHighlights } from "./apartmentHighlights";
import { apartmentInfoBlocks, apartmentInfoTitle } from "./apartmentInfoContent";

export const villaContent = {
  basePath: "/biet-thu",
  metadata: {
    title: "Biệt thự trên VieGo | Đặt phòng nghỉ riêng tư",
    description:
      "Đặt phòng nghỉ với không gian riêng tư cho một kỳ nghỉ khó quên cùng nhóm bạn trên VieGo.",
  },
  breadcrumbLabel: "Biệt thự",
  hero: {
    title: "Biệt thự trên VieGo",
    description:
      "Đặt phòng nghỉ với không gian riêng tư cho một kỳ nghỉ khó quên cùng nhóm bạn.",
  },
  search: {
    placeholder: "Thành phố, căn hộ, biệt thự, hoặc nơi đến",
  },
  highlights: {
    title: "Bạn có thể đặt biệt thự trên VieGo!",
    description:
      "Bạn muốn có một kỳ nghỉ riêng tư với người thân yêu, hoặc với gia đình? Chúng tôi có rất nhiều lựa chọn biệt thự đáp ứng nhu cầu của bạn. Khám phá ngay!",
    items: villaHighlights,
  },
  benefits: {
    title: "Tại sao bạn nên đặt biệt thự và căn hộ trên VieGo?",
    items: villaBenefits,
  },
  destinations: {
    title: "Các điểm đến được đề xuất",
    items: villaRecommendedDestinations,
  },
  info: {
    title: villaInfoTitle,
    blocks: villaInfoBlocks,
  },
  search_results: {
    breadcrumbPrefix: "Biệt thự ở",
    titlePrefix: "Biệt thự ở",
    fallbackTitle: "Kết quả tìm biệt thự",
    emptyHeading: "Đang chuẩn bị danh sách biệt thự cho bạn",
    emptyBody:
      "VieGo đang cập nhật kho biệt thự cao cấp tại {destination}. Trong lúc chờ, bạn có thể khám phá các chỗ nghỉ khác trên VieGo.",
  },
};

export const apartmentContent = {
  basePath: "/can-ho",
  metadata: {
    title: "Căn hộ trên VieGo | Đặt căn hộ nghỉ dưỡng tiện nghi",
    description:
      "Đặt căn hộ tiện nghi với không gian riêng tư và thoải mái cho kỳ nghỉ đáng nhớ của bạn trên VieGo.",
  },
  breadcrumbLabel: "Căn hộ",
  hero: {
    title: "Căn hộ trên VieGo",
    description:
      "Đặt căn hộ tiện nghi với không gian riêng tư và thoải mái cho kỳ nghỉ đáng nhớ của bạn.",
  },
  search: {
    placeholder: "Thành phố, căn hộ hoặc nơi đến",
  },
  highlights: {
    title: "Bạn có thể đặt căn hộ trên VieGo!",
    description:
      "Bạn muốn có một kỳ nghỉ tiện nghi và linh hoạt với người thân yêu, hoặc với gia đình? Chúng tôi có rất nhiều lựa chọn căn hộ đáp ứng nhu cầu của bạn. Khám phá ngay!",
    items: apartmentHighlights,
  },
  benefits: {
    title: "Tại sao bạn nên đặt căn hộ trên VieGo?",
    items: villaBenefits,
  },
  destinations: {
    title: "Các điểm đến được đề xuất",
    items: villaRecommendedDestinations,
  },
  info: {
    title: apartmentInfoTitle,
    blocks: apartmentInfoBlocks,
  },
  search_results: {
    breadcrumbPrefix: "Căn hộ ở",
    titlePrefix: "Căn hộ ở",
    fallbackTitle: "Kết quả tìm căn hộ",
    emptyHeading: "Đang chuẩn bị danh sách căn hộ cho bạn",
    emptyBody:
      "VieGo đang cập nhật kho căn hộ tiện nghi tại {destination}. Trong lúc chờ, bạn có thể khám phá các chỗ nghỉ khác trên VieGo.",
  },
};
