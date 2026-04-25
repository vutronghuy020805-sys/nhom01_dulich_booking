"use client";

function scrollToId(id) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function ActivitiesClosingSection() {
  const handleExploreNow = () => scrollToId("activities-search");
  const handleViewAll = () => scrollToId("activities-list");

  return (
    <section className="bg-white pt-4 pb-14 md:pb-20 px-4">
      <div className="max-w-350 mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50 border border-sky-100 px-6 md:px-12 py-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
                </svg>
                Trải nghiệm cùng VieGo
              </span>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug">
                Sẵn sàng khám phá thêm cùng VieGo?
              </h2>
              <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                Từ điểm tham quan nổi tiếng đến trải nghiệm ẩm thực, văn hóa và
                tour hấp dẫn, VieGo giúp bạn dễ dàng tìm thấy hoạt động phù hợp
                cho mọi hành trình. Chọn điểm đến yêu thích và bắt đầu trải
                nghiệm ngay hôm nay.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 sm:gap-4 lg:items-stretch lg:justify-end">
              <button
                type="button"
                onClick={handleExploreNow}
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
              >
                Khám phá hoạt động ngay
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleViewAll}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-700 font-semibold px-6 py-3 rounded-full border border-blue-200 hover:border-blue-300 transition"
              >
                Xem tất cả điểm đến
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
