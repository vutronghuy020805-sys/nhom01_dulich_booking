"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AirportTransferStepHeader from "./AirportTransferStepHeader";
import AirportTransferBookingSummaryCard from "./AirportTransferBookingSummaryCard";
import FooterSection from "@/components/FooterSection";
import { getVehicleById } from "@/data/airportTransferVehicles";
import { AIRPORTS, DESTINATIONS } from "@/data/airportTransferData";

const VN_DAYS = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];

function parseIsoDate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatDateLabel(date) {
  if (!date) return "";
  const day = VN_DAYS[date.getDay()];
  return `${day}, ${date.getDate()} thg ${date.getMonth() + 1}, ${date.getFullYear()}`;
}

export default function AirportTransferBookingPageClient() {
  const sp = useSearchParams();
  const vehicleId = sp.get("vehicle") || "";
  const vehicle = getVehicleById(vehicleId);

  const fromId = sp.get("from") || "";
  const toId = sp.get("to") || "";
  const dateStr = sp.get("date") || "";
  const timeStr = sp.get("time") || "";

  const fromName = AIRPORTS.find((a) => a.id === fromId)?.name || "";
  const toName = DESTINATIONS.find((d) => d.id === toId)?.name || "";

  const pickupDate = parseIsoDate(dateStr);
  const dateLabel = formatDateLabel(pickupDate);

  const backQuery = new URLSearchParams(
    Object.entries({ from: fromId, to: toId, date: dateStr, time: timeStr }).filter(
      ([, v]) => v
    )
  ).toString();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AirportTransferStepHeader currentStep={1} />

      <main className="flex-1 max-w-350 mx-auto px-4 lg:px-10 py-6 md:py-8 w-full">
        <Link
          href={`/airport-transfer/results${backQuery ? `?${backQuery}` : ""}`}
          className="text-sky-600 hover:text-sky-700 text-sm font-semibold inline-flex items-center gap-1"
        >
          ← Quay lại danh sách xe
        </Link>

        <h1 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900">
          Chi tiết chuyến đưa đón
        </h1>

        {vehicle ? (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 md:gap-8 items-start">
            <form
              method="get"
              action="/nhom01_dulich_booking/airport-transfer/customer-info"
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-5"
            >
              <input type="hidden" name="vehicle" value={vehicleId} />
              <input type="hidden" name="from" value={fromId} />
              <input type="hidden" name="to" value={toId} />
              <input type="hidden" name="date" value={dateStr} />
              <input type="hidden" name="time" value={timeStr} />

              <h2 className="text-base md:text-lg font-bold text-slate-900">
                Thông tin chuyến bay và đón
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="airline"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Hãng hàng không
                  </label>
                  <input
                    id="airline"
                    name="airline"
                    type="text"
                    placeholder="VD: Vietnam Airlines"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm md:text-base text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="flightNumber"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Số hiệu chuyến bay
                  </label>
                  <input
                    id="flightNumber"
                    name="flightNumber"
                    type="text"
                    placeholder="VD: VN214"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm md:text-base text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="noteToDriver"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Ghi chú cho tài xế
                </label>
                <textarea
                  id="noteToDriver"
                  name="noteToDriver"
                  rows={3}
                  placeholder="Yêu cầu đặc biệt, địa chỉ chi tiết..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm md:text-base text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none resize-y"
                />
              </div>

              <div>
                <label
                  htmlFor="carQuantity"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Số lượng xe
                </label>
                <input
                  id="carQuantity"
                  name="carQuantity"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={1}
                  className="w-28 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm md:text-base text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Tạm tính cho 1 xe</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-500">
                    {vehicle.price.toLocaleString("vi-VN")} VND
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow"
                >
                  Book Now
                </button>
              </div>
            </form>

            <AirportTransferBookingSummaryCard
              fromName={fromName}
              toName={toName}
              vehicle={vehicle}
              dateLabel={dateLabel}
              timeLabel={timeStr}
            />
          </div>
        ) : (
          <p className="mt-6 text-slate-600">
            Không tìm thấy thông tin xe. Vui lòng{" "}
            <Link
              href="/airport-transfer"
              className="text-sky-600 hover:underline"
            >
              quay lại tìm kiếm
            </Link>
            .
          </p>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
