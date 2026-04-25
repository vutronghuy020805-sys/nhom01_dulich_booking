export function generateStaticParams() { return [{ vehicleId: "demo" }]; }
export const dynamicParams = false;

import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export default function Page() {
  return <PendingFeatureStub />;
}
