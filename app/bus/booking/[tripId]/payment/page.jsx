import { busLocations } from "@/components/bus/busLocations";
import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export function generateStaticParams() {
  const ids = busLocations.map((l) => l.id);
  const params = [];
  for (const from of ids) {
    for (const to of ids) {
      if (from === to) continue;
      for (let i = 1; i <= 12; i++) {
        params.push({ tripId: `${from}__${to}__${i}` });
      }
    }
  }
  return params;
}

export const dynamicParams = false;

export default function Page() {
  return <PendingFeatureStub />;
}
