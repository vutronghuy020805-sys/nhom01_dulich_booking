import StayPage from "@/components/villa/StayPage";
import { villaContent } from "@/data/stayPageContent";

export const metadata = villaContent.metadata;

export default function VillaPage() {
  return <StayPage content={villaContent} />;
}
