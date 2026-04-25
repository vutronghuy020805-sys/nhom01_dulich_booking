import Link from "next/link";

export default function BookingHeader({ hotel, activeStep = 1 }) {
  const stars = "★".repeat(hotel.stars);
  const ratingText = hotel.rating.toFixed(1).replace(".", ",");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/" className="shrink-0 flex items-center">
            <img
              src="/assets/logo-viego.png"
              alt="VieGo Travel"
              className="w-12 h-12 object-contain brightness-0"
            />
          </Link>
          <div className="hidden md:block w-px h-10 bg-gray-200" />
          <div className="min-w-0">
            <h1 className="text-base md:text-lg font-bold text-slate-900 truncate">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-amber-400 text-xs tracking-tight">
                {stars}
              </span>
              <span className="text-xs font-bold text-sky-700">
                {ratingText}/10
              </span>
              <span className="text-xs text-slate-500">
                ({hotel.reviews} đánh giá)
              </span>
            </div>
          </div>
        </div>

        <ol className="hidden md:flex items-center gap-4 shrink-0">
          <li className="flex items-center gap-2">
            <span
              className={
                "w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center " +
                (activeStep >= 1 ? "bg-sky-600" : "bg-slate-300")
              }
            >
              1
            </span>
            <span
              className={
                activeStep === 1
                  ? "font-semibold text-sky-700"
                  : "font-medium text-slate-500"
              }
            >
              Xem lại
            </span>
          </li>
          <span className="text-slate-300">—</span>
          <li className="flex items-center gap-2">
            <span
              className={
                "w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center " +
                (activeStep >= 2
                  ? "bg-sky-600 text-white"
                  : "bg-slate-200 text-slate-600")
              }
            >
              2
            </span>
            <span
              className={
                activeStep === 2
                  ? "font-semibold text-sky-700"
                  : "font-medium text-slate-400"
              }
            >
              Thanh toán
            </span>
          </li>
        </ol>
      </div>
    </header>
  );
}
