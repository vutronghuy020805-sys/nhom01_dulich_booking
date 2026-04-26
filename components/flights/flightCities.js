export const CITIES = {
  sgn: {
    code: "SGN",
    displayName: "TP. Hồ Chí Minh",
    aliases: ["TP HCM", "TP. HCM", "TP. Hồ Chí Minh", "Hồ Chí Minh"],
  },
  han: { code: "HAN", displayName: "Hà Nội", aliases: ["Hà Nội"] },
  dad: { code: "DAD", displayName: "Đà Nẵng", aliases: ["Đà Nẵng"] },
  hui: { code: "HUI", displayName: "Huế", aliases: ["Huế"] },
  pqc: { code: "PQC", displayName: "Phú Quốc", aliases: ["Phú Quốc"] },
  cxr: { code: "CXR", displayName: "Nha Trang", aliases: ["Nha Trang"] },
  uih: { code: "UIH", displayName: "Quy Nhơn", aliases: ["Quy Nhơn"] },
  tbb: { code: "TBB", displayName: "Phú Yên", aliases: ["Phú Yên"] },
  hph: { code: "HPH", displayName: "Hải Phòng", aliases: ["Hải Phòng"] },
  vca: { code: "VCA", displayName: "Cần Thơ", aliases: ["Cần Thơ"] },
  dli: { code: "DLI", displayName: "Đà Lạt", aliases: ["Đà Lạt"] },
  dib: { code: "DIB", displayName: "Điện Biên", aliases: ["Điện Biên"] },
  pxu: { code: "PXU", displayName: "Pleiku", aliases: ["Pleiku"] },
  bmv: { code: "BMV", displayName: "Buôn Ma Thuột", aliases: ["Buôn Ma Thuột"] },
  vcs: { code: "VCS", displayName: "Côn Đảo", aliases: ["Côn Đảo"] },
  vii: { code: "VII", displayName: "Vinh", aliases: ["Vinh"] },
  vdh: { code: "VDH", displayName: "Đồng Hới", aliases: ["Đồng Hới"] },
  tbb2: { code: "TBB", displayName: "Tuy Hòa", aliases: ["Tuy Hòa"] },
  cxr2: { code: "CXR", displayName: "Cam Ranh", aliases: ["Cam Ranh"] },
};

const aliasIndex = {};
for (const [slug, city] of Object.entries(CITIES)) {
  for (const alias of city.aliases) {
    aliasIndex[alias.trim().toLowerCase()] = { slug, ...city };
  }
}

export function findCityByName(name) {
  if (!name) return null;
  return aliasIndex[name.trim().toLowerCase()] || null;
}

export function findCityBySlug(slug) {
  if (!slug) return null;
  const city = CITIES[slug.toLowerCase()];
  return city ? { slug: slug.toLowerCase(), ...city } : null;
}

export function parseRouteString(routeString) {
  if (!routeString) return null;
  const parts = routeString.split(" - ").map((s) => s.trim());
  if (parts.length !== 2) return null;
  const from = findCityByName(parts[0]);
  const to = findCityByName(parts[1]);
  if (!from || !to) return null;
  return { from, to };
}
