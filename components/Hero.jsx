import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Khám phá Việt Nam cùng <span className="text-yellow-300">VieGo</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Đặt phòng khách sạn và tour du lịch dễ dàng, nhanh chóng. Hàng trăm
          điểm đến hấp dẫn đang chờ bạn khám phá.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/rooms"
            className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore Rooms
          </Link>
          <Link
            href="/tours"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
          >
            Explore Tours
          </Link>
        </div>
      </div>
    </section>
  );
}
