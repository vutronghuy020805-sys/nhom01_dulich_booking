import { redirect } from "next/navigation";

export default function MyBookingsRedirectPage() {
  redirect("/account/my-bookings");
}
