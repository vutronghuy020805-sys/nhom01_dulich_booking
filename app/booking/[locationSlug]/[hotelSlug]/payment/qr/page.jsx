import { Suspense } from "react";
import { getAllHotelDetailParams } from "@/components/hotels/hotelResults";
import BookingQrClient from "@/components/booking/BookingQrClient";

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
      <BookingQrClient />
    </Suspense>
  );
}
