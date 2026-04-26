import { Suspense } from "react";
import { getAllHotelDetailParams } from "@/components/hotels/hotelResults";
import BookingStep1Client from "@/components/booking/BookingStep1Client";

export function generateStaticParams() {
  return getAllHotelDetailParams().map(({ slug, hotelSlug }) => ({
    locationSlug: slug,
    hotelSlug,
  }));
}

export const dynamicParams = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <BookingStep1Client />
    </Suspense>
  );
}
