import { getAllHotelDetailParams } from "@/components/hotels/hotelResults";
import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export function generateStaticParams() {
  return getAllHotelDetailParams().map(({ slug, hotelSlug }) => ({
    locationSlug: slug,
    hotelSlug,
  }));
}

export const dynamicParams = false;

export default function Page() {
  return <PendingFeatureStub />;
}
