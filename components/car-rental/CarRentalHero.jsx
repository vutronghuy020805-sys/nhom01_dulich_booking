export default function CarRentalHero() {
  return (
    <section className="bg-gradient-to-b from-sky-400 to-sky-500 relative">
      <div className="max-w-375 mx-auto px-6 lg:px-10 pt-10 md:pt-14 pb-48 md:pb-56 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-white">
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
            Đặt xe thông minh, nhanh chóng – tận hưởng hành trình thoải mái
            cùng VieGo!
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/95 leading-relaxed max-w-xl">
            Thuê xe tiện lợi – giá tốt mỗi ngày cùng VieGo! Chọn xe tự lái
            hoặc có tài xế chỉ trong vài thao tác. Đa dạng lựa chọn, phủ sóng
            toàn quốc, thủ tục nhanh gọn, giúp bạn vi vu dễ dàng mà vẫn tiết
            kiệm.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 text-white/90 text-sm">
            <button
              type="button"
              aria-label="Ưu đãi trước"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="font-medium">Xem thêm các ưu đãi</span>
            <button
              type="button"
              aria-label="Ưu đãi tiếp theo"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div
            className="w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shadow-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/nhom01_dulich_booking/assets/car-rental/hero-voucher.png')",
            }}
            role="img"
            aria-label="VieGo - Ưu đãi thuê xe du lịch"
          />
        </div>
      </div>
    </section>
  );
}
