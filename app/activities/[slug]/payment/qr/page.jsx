import { activitiesData as _gsp } from "@/data/activitiesData";
export function generateStaticParams() { return _gsp.map((a) => ({ slug: a.id })); }
export const dynamicParams = false;

import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export default function Page() {
  return <PendingFeatureStub />;
}
