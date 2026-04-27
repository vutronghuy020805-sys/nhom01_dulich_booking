import { Suspense } from "react";
import { activitiesData as _gsp } from "@/data/activitiesData";
import ActivityBookingPageClient from "@/components/activities/booking/ActivityBookingPageClient";

export function generateStaticParams() {
  return _gsp.map((a) => ({ slug: a.id }));
}
export const dynamicParams = false;

export const metadata = {
  title: "Đặt vé hoạt động | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ActivityBookingPageClient />
    </Suspense>
  );
}
