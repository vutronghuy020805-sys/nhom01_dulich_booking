export const popularLocations = [
  { slug: "vung-tau", city: "Vũng Tàu", image: "/assets/locations/vungtau.jpg" },
  { slug: "vinh-ha-long", city: "Vịnh Hạ Long", image: "/assets/locations/halong.jpg" },
  { slug: "nha-trang", city: "Nha Trang", image: "/assets/locations/nhatrang.jpg" },
  { slug: "ha-noi", city: "Hà Nội", image: "/assets/locations/hanoi.jpg" },
  { slug: "phan-thiet", city: "Phan Thiết", image: "/assets/locations/phanthiet.jpg" },
  { slug: "da-nang", city: "Đà Nẵng", image: "/assets/locations/danang.jpg" },
];

export const findLocationBySlug = (slug) => {
  if (!slug) return null;
  return popularLocations.find((d) => d.slug === slug) || null;
};

export const findLocationByName = (name) => {
  if (!name) return null;
  const needle = name.trim().toLowerCase();
  return popularLocations.find((d) => d.city.toLowerCase() === needle) || null;
};
