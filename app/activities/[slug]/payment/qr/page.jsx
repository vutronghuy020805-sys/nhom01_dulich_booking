import { Suspense } from "react";
import { activitiesData as _gsp } from "@/data/activitiesData";
import ActivityQrPageClient from "@/components/activities/payment/ActivityQrPageClient";

export function generateStaticParams() {
  return _gsp.map((a) => ({ slug: a.id }));
}
export const dynamicParams = false;

export const metadata = {
  title: "Thanh toán VietQR | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ActivityQrPageClient />
    </Suspense>
  );
}
