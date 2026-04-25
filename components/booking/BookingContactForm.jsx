export default function BookingContactForm() {
  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-amber-500 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 12V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4" />
          <rect x="2" y="12" width="20" height="8" rx="2" />
          <circle cx="12" cy="16" r="1" />
        </svg>
        <p className="flex-1 text-sm text-slate-700">
          Đăng nhập hoặc đăng ký để có giá rẻ hơn và nhiều ưu đãi hơn!
        </p>
        <a
          href="/login"
          className="text-sm font-semibold text-sky-600 hover:text-sky-700 whitespace-nowrap"
        >
          Đăng nhập/Đăng ký
        </a>
      </div>

      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-slate-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 6L2 7" />
          </svg>
          Liên hệ đặt chỗ
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Thêm liên hệ để nhận xác nhận đặt chỗ.
        </p>

        <div className="mt-5 rounded-2xl bg-sky-50/40 border border-gray-100 p-5 space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1.5">
              Họ tên<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <p className="text-xs text-slate-400 mt-1">
              Người Việt: nhập Tên đệm + Tên chính + Họ. Người nước ngoài: nhập
              Tên + Họ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">
                Điện thoại di động<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-slate-900 font-medium shrink-0">
                  +84
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="contactPhone"
                  required
                  pattern="[0-9]{9,10}"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là
                số di động
              </p>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1.5">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <p className="text-xs text-slate-400 mt-1">
                VD: email@example.com
              </p>
            </div>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-2 cursor-pointer text-sm text-slate-700">
          <input
            type="checkbox"
            name="bookingForSelf"
            className="w-4 h-4 rounded border-gray-300"
          />
          Tôi đặt chỗ cho chính mình
        </label>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-slate-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 22a8 8 0 0 1 16 0" />
          </svg>
          Thông tin Khách hàng
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Vui lòng điền đầy đủ các thông tin để nhận xác nhận đơn hàng
        </p>

        <div className="mt-5 rounded-2xl bg-sky-50/40 border border-gray-100 p-5">
          <label className="block text-sm text-slate-600 mb-1.5">
            Họ tên<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="guestName"
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <p className="text-xs text-slate-400 mt-1">
            Người Việt: nhập Tên đệm + Tên chính + Họ. Người nước ngoài: nhập
            Tên + Họ.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-sky-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          Yêu cầu đặc biệt
        </h2>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Tất cả các yêu cầu đặc biệt tùy thuộc vào tình trạng sẵn có và không
          được đảm bảo. Nhận phòng sớm hoặc đưa đón sân bay có thể phát sinh
          thêm phí. Vui lòng liên hệ trực tiếp với nhân viên khách sạn để biết
          thêm thông tin.
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {["Phòng không hút thuốc", "Phòng liên thông", "Tầng lầu"].map(
            (label) => (
              <label
                key={label}
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="specialRequests"
                  value={label}
                  className="w-4 h-4 rounded border-gray-300"
                />
                {label}
              </label>
            )
          )}
        </div>

        <a
          href="#"
          className="mt-4 inline-block text-sky-600 hover:text-sky-700 text-sm font-semibold"
        >
          Đọc tất cả
        </a>
      </section>
    </div>
  );
}
