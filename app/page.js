import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

const featuredRooms = [
  {
    id: "1",
    name: "Phòng Deluxe Hướng Biển",
    location: "Đà Nẵng",
    price: 1200000,
    description: "Phòng rộng rãi với view biển tuyệt đẹp, đầy đủ tiện nghi hiện đại.",
  },
  {
    id: "4",
    name: "Bungalow Phú Quốc",
    location: "Phú Quốc, Kiên Giang",
    price: 1800000,
    description: "Bungalow riêng biệt nằm giữa thiên nhiên nhiệt đới, có hồ bơi riêng.",
  },
];

const featuredTours = [
  {
    id: "1",
    name: "Tour Hạ Long Bay 2 Ngày 1 Đêm",
    location: "Quảng Ninh",
    duration: "2 ngày 1 đêm",
    price: 2800000,
  },
  {
    id: "6",
    name: "Tour Phú Quốc - Thiên Đường Biển",
    location: "Phú Quốc, Kiên Giang",
    duration: "3 ngày 2 đêm",
    price: 6200000,
  },
];

const services = [
  {
    icon: "🏨",
    title: "Đặt phòng khách sạn",
    desc: "Hàng trăm khách sạn, resort, homestay trên khắp Việt Nam với giá tốt nhất.",
  },
  {
    icon: "🗺️",
    title: "Tour du lịch trọn gói",
    desc: "Các tour được thiết kế chu đáo, hướng dẫn viên kinh nghiệm, giá minh bạch.",
  },
  {
    icon: "🛡️",
    title: "Đặt chỗ an toàn",
    desc: "Bảo mật thông tin, thanh toán an toàn, hủy phòng linh hoạt.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Services section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <SectionTitle
              title="Dịch vụ của chúng tôi"
              subtitle="VieGo cung cấp đầy đủ giải pháp du lịch cho bạn"
            />
            <div className="grid sm:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl border hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured rooms */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <SectionTitle
              title="Phòng nổi bật"
              subtitle="Những lựa chọn phòng nghỉ được yêu thích nhất"
            />
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {featuredRooms.map((room) => (
                <div
                  key={room.id}
                  className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="bg-blue-50 h-44 flex items-center justify-center text-5xl">
                    🏨
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">{room.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">📍 {room.location}</p>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{room.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold">
                        {room.price.toLocaleString("vi-VN")}đ
                        <span className="text-sm font-normal text-gray-400">/đêm</span>
                      </span>
                      <Link
                        href={`/rooms/${room.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/rooms"
                className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Xem tất cả phòng →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured tours */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <SectionTitle
              title="Tour nổi bật"
              subtitle="Những hành trình được du khách yêu thích nhất"
            />
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {featuredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="bg-green-50 h-44 flex items-center justify-center text-5xl">
                    🗺️
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">{tour.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">📍 {tour.location}</p>
                    <p className="text-sm text-gray-500 mb-4">⏱ {tour.duration}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold">
                        {tour.price.toLocaleString("vi-VN")}đ
                        <span className="text-sm font-normal text-gray-400">/người</span>
                      </span>
                      <Link
                        href={`/tours/${tour.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/tours"
                className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Xem tất cả tour →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
