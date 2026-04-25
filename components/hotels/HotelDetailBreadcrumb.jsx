import Breadcrumb from "@/components/common/Breadcrumb";

export default function HotelDetailBreadcrumb({
  hotel,
  locationCity,
  locationSlug,
}) {
  const items = [
    { label: "Khách sạn", href: "/hotels" },
    { label: `Khách sạn ở ${locationCity}`, href: `/hotels/${locationSlug}` },
    { label: hotel.name },
  ];
  return <Breadcrumb items={items} />;
}
