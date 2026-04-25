import { notFound } from "next/navigation";
import FlightBookingSuccessHeader from "@/components/flights/FlightBookingSuccessHeader";
import FlightBookingSuccessStatus from "@/components/flights/FlightBookingSuccessStatus";
import FlightBookingSuccessSummary from "@/components/flights/FlightBookingSuccessSummary";
import FlightBookingSuccessActions from "@/components/flights/FlightBookingSuccessActions";
import FooterSection from "@/components/FooterSection";
import { findCityBySlug } from "@/components/flights/flightCities";
import {
  findFlightById,
  parseISODate,
  formatVnDateLong,
  toISODate,
  computeFlightPricing,
  generateFlightBookingCode,
} from "@/components/flights/flightResultsData";

export async function generateMetadata({ params }) {
  const { from, to } = await params;
  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) {
    return { title: "Đặt vé máy bay thành công | VieGo" };
  }
  return {
    title: `Đặt vé thành công · ${fromCity.displayName} → ${toCity.displayName} | VieGo`,
    description: `VieGo xác nhận đặt vé máy bay ${fromCity.displayName} → ${toCity.displayName} thành công.`,
  };
}

export default async function FlightBookingSuccessPage({
  params,
  searchParams,
}) {
  const { from, to } = await params;
  const search = (await searchParams) || {};

  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) notFound();

  const rawPrice = Number(search.price);
  const basePrice =
    Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice : 1099000;
  const dateParam =
    typeof search.date === "string" && search.date
      ? search.date
      : toISODate(new Date());
  const flightId =
    typeof search.flightId === "string" ? search.flightId : null;

  const flight = findFlightById(
    fromCity.slug,
    toCity.slug,
    basePrice,
    flightId
  );
  if (!flight) notFound();

  const dateObj = parseISODate(dateParam) || new Date();
  const dateLong = formatVnDateLong(dateObj);
  const pricing = computeFlightPricing(flight);
  const fallbackCode = generateFlightBookingCode(flight.id);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <FlightBookingSuccessHeader />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 space-y-6">
          <FlightBookingSuccessStatus
            fromCity={fromCity}
            toCity={toCity}
            flight={flight}
            fromSlug={fromCity.slug}
            toSlug={toCity.slug}
            flightId={flight.id}
            fallbackCode={fallbackCode}
          />

          <FlightBookingSuccessSummary
            fromCity={fromCity}
            toCity={toCity}
            flight={flight}
            dateLong={dateLong}
            pricing={pricing}
            fromSlug={fromCity.slug}
            toSlug={toCity.slug}
            flightId={flight.id}
          />

          <section className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
            <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3">
              Lưu ý trước chuyến bay
            </h2>
            <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold shrink-0">•</span>
                <span>
                  Bạn nên có mặt tại sân bay trước giờ khởi hành ít nhất{" "}
                  <span className="font-semibold">90 phút</span> với chuyến bay
                  nội địa và <span className="font-semibold">2 giờ</span> với
                  chuyến bay quốc tế.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold shrink-0">•</span>
                <span>
                  Chuẩn bị giấy tờ tùy thân hợp lệ (CCCD/CMND/hộ chiếu) khi làm
                  thủ tục check-in tại quầy hoặc check-in online trên ứng dụng
                  hãng bay.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold shrink-0">•</span>
                <span>
                  Kiểm tra hành lý xách tay và hành lý ký gửi theo quy định của
                  hạng vé đã đặt để tránh phí phát sinh tại sân bay.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold shrink-0">•</span>
                <span>
                  Nếu cần hỗ trợ, bạn có thể liên hệ VieGo 24/7 hoặc xem vé
                  điện tử trong mục <span className="font-semibold">Đặt chỗ của tôi</span>.
                </span>
              </li>
            </ul>
          </section>

          <FlightBookingSuccessActions />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
