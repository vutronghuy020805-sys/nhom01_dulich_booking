import StaySearchResultsPage from "@/components/villa/StaySearchResultsPage";
import { villaContent } from "@/data/stayPageContent";

export const metadata = {
  title: "Kết quả tìm biệt thự | VieGo",
  description: "Danh sách biệt thự phù hợp với lịch trình của bạn trên VieGo.",
};

export default async function VillaSearchPage({ searchParams }) {
  const sp = (await searchParams) || {};
  return <StaySearchResultsPage content={villaContent} sp={sp} />;
}
