"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CarRentalContactSummaryCard from "./CarRentalContactSummaryCard";
import CarRentalPassengerSummaryCard from "./CarRentalPassengerSummaryCard";
import CarRentalPickupCard from "./CarRentalPickupCard";
import CarRentalSpecialRequestCard from "./CarRentalSpecialRequestCard";
import CarRentalTermsCard from "./CarRentalTermsCard";
import CarRentalPriceSummaryCard from "./CarRentalPriceSummaryCard";

function contactStorageKey(vehicleId) {
  return `viego:car-rental:booking:${vehicleId}`;
}

function reviewStorageKey(vehicleId) {
  return `viego:car-rental:review:${vehicleId}`;
}

export default function CarRentalReviewClient({
  vehicleId,
  searchQuery,
  editHref,
  paymentHref,
  pickupPoint,
  dropoffPoint,
  pickupFee = "Free",
  dropoffFee = "Free",
  packageLabel,
  subtotal,
  total,
}) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [contact, setContact] = useState({});
  const [passenger, setPassenger] = useState({});
  const [specialRequest, setSpecialRequest] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(null);

  useEffect(() => {
    try {
      const rawContact = sessionStorage.getItem(contactStorageKey(vehicleId));
      if (rawContact) {
        const parsed = JSON.parse(rawContact);
        setContact({
          contactTitle: parsed.contactTitle,
          contactFullName: parsed.contactFullName,
          contactPhoneCountry: parsed.contactPhoneCountry,
          contactPhone: parsed.contactPhone,
          contactEmail: parsed.contactEmail,
        });
        setPassenger({
          passengerTitle: parsed.passengerTitle,
          passengerFullName: parsed.passengerFullName,
          passengerPhoneCountry: parsed.passengerPhoneCountry,
          passengerPhone: parsed.passengerPhone,
        });
      }
    } catch {
      // ignore
    }
    try {
      const rawReview = sessionStorage.getItem(reviewStorageKey(vehicleId));
      if (rawReview) {
        const parsed = JSON.parse(rawReview);
        if (typeof parsed.specialRequest === "string")
          setSpecialRequest(parsed.specialRequest);
        if (typeof parsed.termsAccepted === "boolean")
          setTermsAccepted(parsed.termsAccepted);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, [vehicleId]);

  const persistReview = (next) => {
    try {
      sessionStorage.setItem(
        reviewStorageKey(vehicleId),
        JSON.stringify(next)
      );
    } catch {
      // ignore
    }
  };

  const handleSpecialChange = (val) => {
    setSpecialRequest(val);
    persistReview({ specialRequest: val, termsAccepted });
  };

  const handleTermsChange = (val) => {
    setTermsAccepted(val);
    if (val) setTermsError(null);
    persistReview({ specialRequest, termsAccepted: val });
  };

  const handleContinue = () => {
    if (!termsAccepted) {
      setTermsError("Vui lòng đồng ý Điều khoản & Điều kiện thuê xe.");
      return;
    }
    persistReview({ specialRequest, termsAccepted });
    router.push(paymentHref);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-sky-50 border border-sky-100 rounded-xl p-4 md:p-5 flex items-start gap-4">
        <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-sky-100 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-sky-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m21 11-4-4v3H9v2h8v3l4-4z" />
            <path d="M3 21V3h10v4" />
            <circle cx="15" cy="15" r="1.2" fill="currentColor" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-slate-900 text-sm md:text-base">
            Đăng nhập hoặc đăng ký để đặt chỗ dễ dàng và nhận thêm nhiều lợi
            ích!
          </div>
          <div className="text-xs md:text-sm text-slate-600 mt-1 flex items-start gap-1.5">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>
              Nhanh chóng điền thông tin với Chi tiết hành khách đã lưu
            </span>
          </div>
          <Link
            href="/login"
            className="inline-block mt-3 text-sm font-bold text-sky-600 hover:text-sky-700"
          >
            Đăng nhập hoặc Đăng ký
          </Link>
        </div>
      </section>

      <CarRentalContactSummaryCard
        contact={contact}
        editHref={editHref}
      />

      <CarRentalPassengerSummaryCard
        passenger={passenger}
        editHref={editHref}
      />

      <CarRentalPickupCard
        title="Điểm đón xe"
        locationName={pickupPoint}
        fee={pickupFee}
      />

      <CarRentalPickupCard
        title="Điểm trả xe"
        locationName={dropoffPoint}
        fee={dropoffFee}
      />

      <CarRentalSpecialRequestCard
        value={specialRequest}
        onChange={handleSpecialChange}
      />

      <CarRentalTermsCard
        checked={termsAccepted}
        onChange={handleTermsChange}
        error={termsError}
      />

      <CarRentalPriceSummaryCard
        packageLabel={packageLabel}
        subtotal={subtotal}
        total={total}
      />

      {loaded &&
        (!contact.contactFullName || !passenger.passengerFullName) && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
            Chưa có thông tin liên hệ hoặc hành khách. Vui lòng{" "}
            <Link
              href={editHref}
              className="underline font-semibold text-amber-900"
            >
              quay lại bước Đặt
            </Link>{" "}
            để điền đầy đủ.
          </div>
        )}

      <div className="flex items-center justify-end mt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="px-10 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm md:text-base transition shadow"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
