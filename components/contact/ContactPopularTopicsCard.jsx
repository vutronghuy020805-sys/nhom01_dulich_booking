"use client";

import Link from "next/link";
import { useState } from "react";
import { contactTopicTabs } from "@/data/contactTopics";

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 " +
        (open ? "rotate-180" : "")
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function ContactPopularTopicsCard() {
  const [activeTabId, setActiveTabId] = useState(contactTopicTabs[0].id);
  const [openTopicId, setOpenTopicId] = useState(null);

  const activeTab =
    contactTopicTabs.find((t) => t.id === activeTabId) || contactTopicTabs[0];

  const handleSelectTab = (id) => {
    setActiveTabId(id);
    setOpenTopicId(null);
  };

  const handleToggleTopic = (id) => {
    setOpenTopicId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-bold text-slate-900">
          Chủ đề phổ biến
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Xem thêm tại{" "}
          <Link
            href="/help"
            className="text-sky-600 hover:text-sky-700 hover:underline font-medium"
          >
            Trung tâm hỗ trợ
          </Link>
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Chủ đề phổ biến"
        className="mt-6 flex items-center justify-center gap-4 md:gap-8 border-b border-slate-200 overflow-x-auto"
      >
        {contactTopicTabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectTab(tab.id)}
              className={
                "relative shrink-0 px-1 pb-3 text-sm md:text-base font-semibold transition-colors " +
                (isActive
                  ? "text-sky-600"
                  : "text-slate-500 hover:text-slate-700")
              }
            >
              {tab.label}
              {isActive ? (
                <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-sky-500 rounded-full" />
              ) : null}
            </button>
          );
        })}
      </div>

      <ul className="mt-5 space-y-3">
        {activeTab.topics.map((topic) => {
          const isOpen = openTopicId === topic.id;
          return (
            <li
              key={topic.id}
              className="rounded-2xl bg-slate-50 border border-slate-100"
            >
              <button
                type="button"
                onClick={() => handleToggleTopic(topic.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 px-5 md:px-6 py-4 text-left"
              >
                <span className="flex-1 text-sm md:text-base font-semibold text-slate-900 leading-snug">
                  {topic.question}
                </span>
                <ChevronIcon open={isOpen} />
              </button>
              {isOpen ? (
                <div className="px-5 md:px-6 pb-4 -mt-1 text-sm text-slate-600 leading-relaxed">
                  {topic.answer}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
