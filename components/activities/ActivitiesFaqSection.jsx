"use client";

import { useState } from "react";
import { activitiesFaqs } from "@/data/activitiesFaqs";
import ActivitiesFaqItem from "./ActivitiesFaqItem";

export default function ActivitiesFaqSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-white py-14 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500">
            Giải đáp những thắc mắc phổ biến khi đặt vé hoạt động và trải nghiệm
            qua VieGo
          </p>
        </div>

        <div className="space-y-3">
          {activitiesFaqs.map((item) => (
            <ActivitiesFaqItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
