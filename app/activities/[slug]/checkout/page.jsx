import { Suspense } from "react";
import { activitiesData as _gsp } from "@/data/activitiesData";
import ActivityCheckoutPageClient from "@/components/activities/checkout/ActivityCheckoutPageClient";

export function generateStaticParams() {
  return _gsp.map((a) => ({ slug: a.id }));
}
export const dynamicParams = false;

export const metadata = {
  title: "Thông tin liên hệ | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ActivityCheckoutPageClient />
    </Suspense>
  );
}
