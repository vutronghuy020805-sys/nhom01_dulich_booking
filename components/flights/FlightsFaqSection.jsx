"use client";

import { useState } from "react";
import FlightsFaqItem from "./FlightsFaqItem";
import { flightsFaqLeft, flightsFaqRight } from "./flightsFaqData";

function FaqColumn({ items, openId, onToggle }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl px-5 md:px-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      {items.map((item, i) => (
        <FlightsFaqItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => onToggle(item.id)}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  );
}

export default function FlightsFaqSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
        Các câu hỏi thường gặp
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
        <FaqColumn items={flightsFaqLeft} openId={openId} onToggle={toggle} />
        <FaqColumn items={flightsFaqRight} openId={openId} onToggle={toggle} />
      </div>
    </section>
  );
}
