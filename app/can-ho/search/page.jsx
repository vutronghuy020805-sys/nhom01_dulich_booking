import StaySearchResultsPage from "@/components/villa/StaySearchResultsPage";
import { apartmentContent } from "@/data/stayPageContent";

export const metadata = {
  title: "Kết quả tìm căn hộ | VieGo",
  description: "Danh sách căn hộ phù hợp với lịch trình của bạn trên VieGo.",
};

export default async function ApartmentSearchPage({ searchParams }) {
  const sp = (await searchParams) || {};
  return <StaySearchResultsPage content={apartmentContent} sp={sp} />;
}
