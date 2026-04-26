import { Suspense } from "react";
import { getAllHotelDetailParams } from "@/components/hotels/hotelResults";
import BookingPaymentClient from "@/components/booking/BookingPaymentClient";

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
      <BookingPaymentClient />
    </Suspense>
  );
}
