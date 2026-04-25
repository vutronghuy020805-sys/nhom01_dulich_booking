export function generateStaticParams() { return [{ locationSlug: "demo", hotelSlug: "demo" }]; }
export const dynamicParams = false;

import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export default function Page() {
  return <PendingFeatureStub />;
}
