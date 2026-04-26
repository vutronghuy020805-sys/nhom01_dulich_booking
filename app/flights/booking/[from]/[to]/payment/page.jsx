import { CITIES } from "@/components/flights/flightCities";
import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export function generateStaticParams() {
  const slugs = Object.keys(CITIES);
  const params = [];
  for (const from of slugs) {
    for (const to of slugs) {
      if (from !== to) params.push({ from, to });
    }
  }
  return params;
}

export const dynamicParams = false;

export default function Page() {
  return <PendingFeatureStub />;
}
