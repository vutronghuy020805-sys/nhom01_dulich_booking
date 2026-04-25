/* eslint-disable */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "assets", "car-rental", "partners");
fs.mkdirSync(OUT, { recursive: true });

const logos = [
  {
    id: "hertz",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><rect x="20" y="22" width="200" height="36" rx="4" fill="#FFD400"/><text x="120" y="49" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="26" fill="#111" letter-spacing="2">HERTZ</text></svg>`,
  },
  {
    id: "avis",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="52" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="38" fill="#D4002A">AVIS.</text></svg>`,
  },
  {
    id: "budget",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><polygon points="36,28 60,28 50,52 26,52" fill="#F58220"/><text x="138" y="52" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="26" fill="#111">Budget</text></svg>`,
  },
  {
    id: "dollar",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="44" y="56" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-style="italic" font-size="44" fill="#005DAA">D</text><text x="138" y="52" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="24" fill="#1A1A1A">ollar</text></svg>`,
  },
  {
    id: "enterprise",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="38" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#0F8A2D" letter-spacing="1">ENTERPRISE</text><text x="120" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="11" fill="#444" letter-spacing="3">RENT-A-CAR</text></svg>`,
  },
  {
    id: "sixt",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><rect x="40" y="22" width="160" height="36" fill="#FF6F00"/><text x="120" y="49" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="26" fill="#000" letter-spacing="3">SIXT</text></svg>`,
  },
  {
    id: "europcar",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="36" cy="40" r="14" fill="#0E7C3A"/><text x="36" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="18" fill="#fff">e</text><text x="138" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#0E7C3A">Europcar</text></svg>`,
  },
  {
    id: "national",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="38" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#0B5394" letter-spacing="2">NATIONAL</text><text x="120" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="11" fill="#888" letter-spacing="3">CAR RENTAL</text></svg>`,
  },
  {
    id: "alamo",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-style="italic" font-size="34" fill="#FFB300">Alamo</text><text x="120" y="64" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="9" fill="#0B5394" letter-spacing="3">RENT A CAR</text></svg>`,
  },
  {
    id: "thrifty",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="26" fill="#0066B3">Thrifty</text><text x="120" y="64" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="9" fill="#C8102E" letter-spacing="2">CAR RENTAL</text></svg>`,
  },
  {
    id: "hoang-gia",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><g transform="translate(20,28)"><path d="M14 0 L18 8 L26 8 L20 13 L22 22 L14 17 L6 22 L8 13 L2 8 L10 8 Z" fill="#C9A227"/></g><text x="148" y="40" text-anchor="middle" font-family="Georgia,serif" font-weight="800" font-size="20" fill="#1A2A52">Hoàng Gia</text><text x="148" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="11" fill="#777" letter-spacing="2">RENT A CAR</text></svg>`,
  },
  {
    id: "thaco-rental",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="80" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="26" fill="#0B3E91">THACO</text><text x="172" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="22" fill="#1F2937">RENTAL</text></svg>`,
  },
  {
    id: "an-hai",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><g transform="translate(18,30)" fill="#C8A04A"><path d="M0 12 L10 0 L26 0 L36 12 L26 24 L10 24 Z"/></g><text x="148" y="40" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="18" fill="#0F1F44">An Hải Rent Car</text><text x="148" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="10" fill="#888" letter-spacing="3">CAR RENTAL</text></svg>`,
  },
  {
    id: "truong-phat",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="40" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-style="italic" font-size="22" fill="#0E5BB5">Trường Phát</text><text x="120" y="60" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="12" fill="#1F2937" letter-spacing="2">CAR RENT</text></svg>`,
  },
  {
    id: "sumo",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="32" cy="40" r="14" fill="#1E66B5"/><text x="32" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="14" fill="#fff">S</text><text x="148" y="40" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#0E3F75">Sumo</text><text x="148" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="10" fill="#777" letter-spacing="2">CAR RENTAL</text></svg>`,
  },
  {
    id: "ok-rent",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="76" y="54" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="34" fill="#E63946">OK</text><text x="166" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="22" fill="#1F2937">RENT</text></svg>`,
  },
  {
    id: "viet-motors",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="34" cy="40" r="14" fill="#1F8C4D"/><path d="M27 40 L33 46 L42 35" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="98" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="18" fill="#1F8C4D">VIỆT</text><text x="170" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="18" fill="#1F2937">MOTORS</text></svg>`,
  },
  {
    id: "hai-travel",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><g transform="translate(20,28)" fill="#E11D48"><path d="M12 0 L15 8 L24 8 L17 13 L19 22 L12 17 L5 22 L7 13 L0 8 L9 8 Z"/></g><text x="138" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#1F2937">Hải Travel</text></svg>`,
  },
  {
    id: "hoian-express",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><path d="M16 44 Q22 36 32 40 T48 40" stroke="#F59E0B" stroke-width="3" fill="none" stroke-linecap="round"/><text x="138" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="18" fill="#1F2937">HoianExpress</text></svg>`,
  },
  {
    id: "tour-east",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#1F2937" letter-spacing="3">TOUR EAST</text></svg>`,
  },
  {
    id: "ito-car",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="100" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="28" fill="#1D4ED8">ITO</text><text x="170" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="22" fill="#1F2937">CAR</text></svg>`,
  },
  {
    id: "smart-car",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="42" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#374151">SMART</text><text x="120" y="60" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="11" fill="#6B7280" letter-spacing="3">CAR RENTAL</text></svg>`,
  },
  {
    id: "trac",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="42" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="32" fill="#0EA5E9" letter-spacing="4">TRAC</text><text x="120" y="62" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="9" fill="#94A3B8" letter-spacing="3">RENTAL ALLIANCE</text></svg>`,
  },
  {
    id: "dk-rentals",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><rect x="40" y="26" width="44" height="28" rx="4" fill="#DC2626"/><text x="62" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="18" fill="#fff">DK</text><text x="160" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="20" fill="#1F2937">RENTALS</text></svg>`,
  },
  {
    id: "rapham",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><g transform="translate(20,30)" fill="#1D4ED8"><path d="M10 0 L13 6 L20 6 L14 11 L16 18 L10 14 L4 18 L6 11 L0 6 L7 6 Z"/></g><text x="148" y="40" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#1D4ED8">RaPham</text><text x="148" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="10" fill="#777" letter-spacing="2">TRANSPORTATION</text></svg>`,
  },
  {
    id: "astda",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><path d="M16 50 Q34 32 60 36" stroke="#0EA5E9" stroke-width="3" fill="none" stroke-linecap="round"/><text x="148" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#0E5BB5">ASTDA Car</text></svg>`,
  },
  {
    id: "okk",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="74" y="52" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="30" fill="#1F2937">OKK</text><text x="162" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="16" fill="#F97316">Rent A Car</text></svg>`,
  },
  {
    id: "joyfleet",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="34" cy="40" r="14" fill="#16A34A"/><text x="34" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="14" fill="#fff">J</text><text x="148" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#16A34A">JoyFleet</text></svg>`,
  },
  {
    id: "movby",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><polygon points="22,52 36,28 50,52" fill="#7C3AED"/><text x="148" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#1F2937">MOVBY</text></svg>`,
  },
  {
    id: "goldone",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="34" cy="40" r="14" fill="#D4A017"/><text x="34" y="46" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-style="italic" font-size="16" fill="#fff">G</text><text x="148" y="40" text-anchor="middle" font-family="Georgia,serif" font-weight="800" font-style="italic" font-size="22" fill="#D4A017">GoldOne</text><text x="148" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="10" fill="#777" letter-spacing="2">TRAVEL</text></svg>`,
  },
  {
    id: "tts",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="84" y="44" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="28" fill="#0E5BB5">TTS</text><line x1="120" y1="32" x2="120" y2="52" stroke="#94A3B8" stroke-width="1.5"/><text x="172" y="40" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="11" fill="#1F2937" letter-spacing="1">TRANSPORT</text><text x="172" y="54" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="9" fill="#777" letter-spacing="1">SERVICE</text></svg>`,
  },
  {
    id: "greenfield",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="34" cy="40" r="14" fill="#15803D"/><path d="M34 32 Q40 36 38 44 Q34 40 30 44 Q28 36 34 32 Z" fill="#86EFAC"/><text x="148" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#15803D">Greenfield</text></svg>`,
  },
  {
    id: "easycar",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-style="italic" font-size="28" fill="#0D9488">EasyCar</text></svg>`,
  },
  {
    id: "kangara",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="120" y="42" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#1F2937" letter-spacing="2">KANGARA</text><text x="120" y="60" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="600" font-size="12" fill="#EA580C" letter-spacing="3">TRANS</text></svg>`,
  },
  {
    id: "arowisata",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="34" cy="40" r="14" fill="none" stroke="#0EA5E9" stroke-width="3"/><path d="M26 40 L34 32 L42 40" stroke="#0EA5E9" stroke-width="3" fill="none" stroke-linecap="round"/><text x="148" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#0E5BB5">Arowisata</text></svg>`,
  },
  {
    id: "fast-travel",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><text x="76" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-style="italic" font-size="24" fill="#DC2626">FAST</text><text x="170" y="50" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-style="italic" font-size="22" fill="#1F2937">TRAVEL</text></svg>`,
  },
  {
    id: "dooler",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><ellipse cx="34" cy="40" rx="14" ry="10" fill="#B91C1C"/><text x="34" y="44" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="13" fill="#fff">D</text><text x="148" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#B91C1C">DOOLER</text></svg>`,
  },
  {
    id: "ttapac",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="34" cy="40" r="14" fill="#0F766E"/><text x="34" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="14" fill="#fff">T</text><text x="148" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="22" fill="#0F766E">TTAPAC</text></svg>`,
  },
  {
    id: "nusantara",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><path d="M20 44 Q30 34 40 44" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/><text x="148" y="48" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#16A34A">Nusantara</text></svg>`,
  },
  {
    id: "hai-hien",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80"><rect width="240" height="80" fill="#fff"/><circle cx="34" cy="40" r="14" fill="#0E7C3A"/><text x="34" y="46" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="14" fill="#fff">H</text><text x="148" y="40" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="20" fill="#0F1F44">Hải Hiền</text><text x="148" y="58" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="10" fill="#777" letter-spacing="2">TRANSPORT</text></svg>`,
  },
];

for (const l of logos) {
  const file = path.join(OUT, `${l.id}.svg`);
  fs.writeFileSync(file, l.svg, "utf8");
}
console.log("wrote", logos.length, "logos to", OUT);
