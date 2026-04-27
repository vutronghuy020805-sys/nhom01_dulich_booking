import { Suspense } from "react";
import { activitiesData as _gsp } from "@/data/activitiesData";
import ActivityPaymentPageClient from "@/components/activities/payment/ActivityPaymentPageClient";

export function generateStaticParams() {
  return _gsp.map((a) => ({ slug: a.id }));
}
export const dynamicParams = false;

export const metadata = {
  title: "Thanh toán | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ActivityPaymentPageClient />
    </Suspense>
  );
}
