import Link from "next/link";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";

const VN_DAYS = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

function parseIsoDate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatVnDate(d) {
  if (!d) return "";
  return `${VN_DAYS[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

// Template kết quả tìm kiếm dùng chung cho cả /biet-thu/search và /can-ho/search.
export default function StaySearchResultsPage({ content, sp }) {
  const destination = typeof sp.destination === "string" ? sp.destination : "";
  const checkInIso = typeof sp.checkIn === "string" ? sp.checkIn : "";
  const nights = Number(sp.nights) || 1;
  const adults = Number(sp.adults) || 2;
  const childrenCount = Number(sp.children) || 0;
  const rooms = Number(sp.rooms) || 1;

  const checkIn = parseIsoDate(checkInIso);
  const checkOut = checkIn
    ? new Date(
        checkIn.getFullYear(),
        checkIn.getMonth(),
        checkIn.getDate() + nights
      )
    : null;

  const sr = content.search_results;
  const breadcrumbCurrent = destination
    ? `${sr.breadcrumbPrefix} ${destination}`
    : sr.fallbackTitle;
  const heading = destination
    ? `${sr.titlePrefix} ${destination}`
    : sr.fallbackTitle;
  const emptyBody = sr.emptyBody.replace(
    "{destination}",
    destination || "điểm đến của bạn"
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Khách sạn" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb
            items={[
              { label: content.breadcrumbLabel, href: content.basePath },
              { label: breadcrumbCurrent },
            ]}
          />
        </div>

        <section className="max-w-350 mx-auto px-4 lg:px-10 py-6 md:py-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              {heading}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {checkIn
                ? `${formatVnDate(checkIn)} → ${formatVnDate(checkOut)} · ${nights} đêm · ${adults} người lớn, ${childrenCount} trẻ em, ${rooms} phòng`
                : `Vui lòng quay lại trang ${content.breadcrumbLabel} để chọn ngày.`}
            </p>
          </div>

          <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 text-center">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              {sr.emptyHeading}
            </h2>
            <p className="mt-2 text-sm md:text-[15px] text-slate-600 max-w-xl mx-auto">
              {emptyBody}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/hotels"
                className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm transition-colors"
              >
                Xem khách sạn
              </Link>
              <Link
                href={content.basePath}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Tìm lại
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
