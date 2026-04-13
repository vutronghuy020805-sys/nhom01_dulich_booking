import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Tours - VieGo",
};

const tours = [
  {
    id: "1",
    name: "Tour Hạ Long Bay 2 Ngày 1 Đêm",
    location: "Quảng Ninh",
    duration: "2 ngày 1 đêm",
    price: 2800000,
  },
  {
    id: "2",
    name: "Khám phá Phố Cổ Hội An",
    location: "Hội An, Quảng Nam",
    duration: "1 ngày",
    price: 650000,
  },
  {
    id: "3",
    name: "Trekking Fansipan - Nóc nhà Đông Dương",
    location: "Sa Pa, Lào Cai",
    duration: "3 ngày 2 đêm",
    price: 4500000,
  },
  {
    id: "4",
    name: "Tour Mũi Cà Mau - Điểm cực Nam",
    location: "Cà Mau",
    duration: "2 ngày 1 đêm",
    price: 1900000,
  },
  {
    id: "5",
    name: "Khám phá Cao Nguyên Đá Đồng Văn",
    location: "Hà Giang",
    duration: "4 ngày 3 đêm",
    price: 5800000,
  },
  {
    id: "6",
    name: "Tour Phú Quốc - Thiên Đường Biển",
    location: "Phú Quốc, Kiên Giang",
    duration: "3 ngày 2 đêm",
    price: 6200000,
  },
];

export default function ToursPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full">
        <SectionTitle
          title="Danh sách tour"
          subtitle="Những hành trình khó quên trên khắp dải đất hình chữ S"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="bg-green-50 h-44 flex items-center justify-center text-gray-400 text-4xl">
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
      </main>

      <Footer />
    </div>
  );
}
