export function generateStaticParams() { return [{ tripId: "demo" }]; }
export const dynamicParams = false;

import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export default function Page() {
  return <PendingFeatureStub />;
}
