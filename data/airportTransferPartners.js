// Logo dùng Google Favicon Service (https://www.google.com/s2/favicons) — miễn phí, không cần API key,
// hoạt động với mọi domain có favicon. Nếu muốn chất lượng cao hơn, có thể tải logo về local
// (đặt tại public/assets/airport-transfer/partners/*) và thay path ở đây.
const favicon = (domain) =>
  `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

export const airportTransferPartners = [
  { id: "grab", name: "Grab", logo: favicon("grab.com") },
  { id: "uber", name: "Uber", logo: favicon("uber.com") },
  { id: "lyft", name: "Lyft", logo: favicon("lyft.com") },
  { id: "bolt", name: "Bolt", logo: favicon("bolt.eu") },
  { id: "hertz", name: "Hertz", logo: favicon("hertz.com") },
  { id: "turo", name: "Turo", logo: favicon("turo.com") },
  { id: "sixt", name: "Sixt", logo: favicon("sixt.com") },
  { id: "careem", name: "Careem", logo: favicon("careem.com") },
  { id: "gojek", name: "Gojek", logo: favicon("gojek.com") },
  { id: "didi", name: "DiDi", logo: favicon("didiglobal.com") },
  { id: "olacabs", name: "Ola Cabs", logo: favicon("olacabs.com") },
  { id: "flixbus", name: "FlixBus", logo: favicon("flixbus.com") },
  { id: "blablacar", name: "BlaBlaCar", logo: favicon("blablacar.com") },
  { id: "skyscanner", name: "Skyscanner", logo: favicon("skyscanner.com") },
  { id: "tripadvisor", name: "Tripadvisor", logo: favicon("tripadvisor.com") },
  { id: "trivago", name: "Trivago", logo: favicon("trivago.com") },
  { id: "airbnb", name: "Airbnb", logo: favicon("airbnb.com") },
  { id: "expedia", name: "Expedia", logo: favicon("expedia.com") },
  { id: "agoda", name: "Agoda", logo: favicon("agoda.com") },
  { id: "kayak", name: "Kayak", logo: favicon("kayak.com") },
  { id: "lime", name: "Lime", logo: favicon("li.me") },
  { id: "revel", name: "Revel", logo: favicon("gorevel.com") },
];

export default airportTransferPartners;
