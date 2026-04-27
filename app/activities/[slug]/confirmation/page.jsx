import { Suspense } from "react";
import { activitiesData as _gsp } from "@/data/activitiesData";
import ActivityConfirmationPageClient from "@/components/activities/confirmation/ActivityConfirmationPageClient";

export function generateStaticParams() {
  return _gsp.map((a) => ({ slug: a.id }));
}
export const dynamicParams = false;

export const metadata = {
  title: "Xác nhận đặt vé | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <ActivityConfirmationPageClient />
    </Suspense>
  );
}
