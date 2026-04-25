import StayPage from "@/components/villa/StayPage";
import { apartmentContent } from "@/data/stayPageContent";

export const metadata = apartmentContent.metadata;

export default function ApartmentPage() {
  return <StayPage content={apartmentContent} />;
}
