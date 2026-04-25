"use client";

import { useRouter } from "next/navigation";

export const bookingStorageKey = (locationSlug, hotelSlug, ratePlanId) =>
  `booking:${locationSlug}:${hotelSlug}:${ratePlanId}`;

export default function BookingStep1Form({
  locationSlug,
  hotelSlug,
  roomSectionId,
  ratePlanId,
  children,
}) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      contactName: (fd.get("contactName") || "").toString().trim(),
      contactPhoneCountryCode: "+84",
      contactPhone: (fd.get("contactPhone") || "").toString().trim(),
      contactEmail: (fd.get("contactEmail") || "").toString().trim(),
      bookingForSelf: fd.get("bookingForSelf") === "on",
      guestName: (fd.get("guestName") || "").toString().trim(),
      specialRequests: fd.getAll("specialRequests").map(String),
    };

    try {
      sessionStorage.setItem(
        bookingStorageKey(locationSlug, hotelSlug, ratePlanId),
        JSON.stringify(data)
      );
    } catch {
      // sessionStorage unavailable — silently continue; payment page will still load
    }

    const url = `/booking/${encodeURIComponent(
      locationSlug
    )}/${encodeURIComponent(
      hotelSlug
    )}/payment?roomSectionId=${encodeURIComponent(
      roomSectionId
    )}&ratePlanId=${encodeURIComponent(ratePlanId)}`;
    router.push(url);
  };

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      {children}
    </form>
  );
}
