"use client";

import { useState } from "react";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className={`text-sm md:text-base font-medium transition-colors ${
            isOpen ? "text-blue-600" : "text-slate-800"
          }`}
        >
          {item.question}
        </span>

        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors shrink-0 ${
            isOpen ? "bg-blue-100 text-blue-600" : "bg-blue-50 text-blue-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed px-5 pb-5">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LocationFaqSection({ faq }) {
  const [openId, setOpenId] = useState(null);

  if (!faq || !faq.items || faq.items.length === 0) return null;

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-gray-50 pt-4 pb-16 px-4">
      <div className="max-w-350 mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              {faq.title}
            </h2>

            <div className="flex flex-col gap-3">
              {faq.items.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>

            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition"
              >
                Xem tất cả những câu hỏi
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-start justify-center w-80 shrink-0 pt-8">
            <img
              src="/nhom01_dulich_booking/assets/faq/faq-illustration.png"
              alt="Câu hỏi thường gặp"
              className="w-full h-auto max-h-80 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
