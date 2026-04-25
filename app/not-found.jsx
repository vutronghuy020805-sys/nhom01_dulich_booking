import NotFoundPage from "@/components/errors/NotFoundPage";

export const metadata = {
  title: "404 - Không tìm thấy trang | VieGo",
  description:
    "Đường dẫn bạn đang tìm kiếm không tồn tại. Quay về trang chủ VieGo.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
