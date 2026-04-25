"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FlightBookingContactForm from "./FlightBookingContactForm";
import FlightPassengerForm from "./FlightPassengerForm";
import FlightBookingSummary from "./FlightBookingSummary";
import { getFlightStorageKey } from "./flightResultsData";

const INITIAL_VALUES = {
  fullName: "",
  phoneCountry: "+84",
  phone: "",
  email: "",
  gender: "",
  lastName: "",
  firstName: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  nationality: "",
  idNumber: "",
  loyaltyMember: false,
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidBirthDate(day, month, year) {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (!d || !m || !y) return false;
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  if (y < 1900 || y > new Date().getFullYear()) return false;
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
  );
}

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Vui lòng nhập họ tên.";
  if (!values.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại.";
  else if (!/^\d{8,}$/.test(values.phone.trim()))
    errors.phone = "Số điện thoại không hợp lệ.";
  if (!values.email.trim()) errors.email = "Vui lòng nhập email.";
  else if (!isValidEmail(values.email.trim()))
    errors.email = "Email không đúng định dạng.";

  if (!values.gender) errors.gender = "Vui lòng chọn giới tính.";
  if (!values.lastName.trim()) errors.lastName = "Vui lòng nhập họ.";
  if (!values.firstName.trim()) errors.firstName = "Vui lòng nhập chữ đệm và tên.";
  if (!isValidBirthDate(values.birthDay, values.birthMonth, values.birthYear))
    errors.birthDate = "Vui lòng nhập ngày sinh hợp lệ.";
  if (!values.nationality) errors.nationality = "Vui lòng chọn quốc tịch.";
  if (!values.idNumber.trim())
    errors.idNumber = "Vui lòng nhập số căn cước công dân.";
  else if (values.idNumber.trim().length < 9)
    errors.idNumber = "Số căn cước công dân phải có ít nhất 9 chữ số.";

  return errors;
}

export default function FlightBookingClient({
  fromCity,
  toCity,
  flight,
  dateLong,
  dateIso,
  basePrice,
}) {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (
      (key === "birthDay" || key === "birthMonth" || key === "birthYear") &&
      errors.birthDate
    ) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.birthDate;
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      try {
        const storageKey = getFlightStorageKey(
          fromCity.slug,
          toCity.slug,
          flight.id
        );
        sessionStorage.setItem(storageKey, JSON.stringify(values));
      } catch {
        // ignore storage errors, still navigate
      }
      const query = new URLSearchParams();
      query.set("flightId", flight.id);
      query.set("price", String(basePrice));
      if (dateIso) query.set("date", dateIso);
      router.push(
        `/flights/booking/${fromCity.slug}/${toCity.slug}/payment?${query.toString()}`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-375 mx-auto px-6 lg:px-10 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 flex flex-col gap-5">
        <FlightBookingContactForm
          values={values}
          errors={errors}
          onChange={handleChange}
        />
        <FlightPassengerForm
          values={values}
          errors={errors}
          onChange={handleChange}
        />

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 md:px-8 py-2.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
          >
            Tiếp tục thanh toán
          </button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <FlightBookingSummary
          flight={flight}
          fromCity={fromCity}
          toCity={toCity}
          dateLong={dateLong}
        />
      </div>
    </form>
  );
}
