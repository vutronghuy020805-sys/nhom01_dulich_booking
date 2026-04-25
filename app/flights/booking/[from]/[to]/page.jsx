export function generateStaticParams() { return [{ from: "demo", to: "demo" }]; }
export const dynamicParams = false;

import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export default function Page() {
  return <PendingFeatureStub />;
}
