"use client";

export default function NewsletterBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?w=2400&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
        <h2 className="text-white text-2xl md:text-4xl font-bold leading-snug mb-8 max-w-3xl mx-auto">
          Luôn được cập nhật về các lời khuyên du lịch, đề xuất và khuyến mãi
          mới nhất.
        </h2>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 relative bg-white rounded-full shadow-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <polyline points="3 7 12 13 21 7" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn"
              className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-full text-gray-700 placeholder:text-gray-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-md transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-white text-base md:text-lg font-semibold mb-6 max-w-2xl mx-auto">
          Có chuyến đi mơ ước của bạn trong tầm tay của bạn. Tải xuống ứng dụng.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="bg-white p-2 rounded-md shadow-sm">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fviego.vn&bgcolor=ffffff"
              alt="QR tải ứng dụng VieGo"
              className="w-20 h-20 object-contain"
            />
          </div>

          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tải trên Google Play"
            className="inline-block"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-14 w-auto object-contain"
            />
          </a>

          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tải trên App Store"
            className="inline-block"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              className="h-14 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
