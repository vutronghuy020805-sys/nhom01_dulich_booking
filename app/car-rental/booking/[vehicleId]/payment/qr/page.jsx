import { carRentalVehicles } from "@/data/carRentalVehicles";
import PendingFeatureStub from "@/components/common/PendingFeatureStub";

export function generateStaticParams() {
  return carRentalVehicles.map((v) => ({ vehicleId: v.id }));
}

export const dynamicParams = false;

export default function Page() {
  return <PendingFeatureStub />;
}
