import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Rooms - VieGo",
};

const rooms = [
  {
    id: "1",
    name: "Phòng Deluxe Hướng Biển",
    location: "Đà Nẵng",
    price: 1200000,
    description: "Phòng rộng rãi với view biển tuyệt đẹp, đầy đủ tiện nghi hiện đại.",
  },
  {
    id: "2",
    name: "Suite Cao Cấp Hội An",
    location: "Hội An, Quảng Nam",
    price: 2500000,
    description: "Suite phong cách cổ truyền Hội An, nằm ngay trung tâm phố cổ.",
  },
  {
    id: "3",
    name: "Phòng Standard Hồ Hoàn Kiếm",
    location: "Hà Nội",
    price: 800000,
    description: "Phòng tiêu chuẩn sạch sẽ, tiện nghi, cách Hồ Hoàn Kiếm 5 phút đi bộ.",
  },
  {
    id: "4",
    name: "Bungalow Phú Quốc",
    location: "Phú Quốc, Kiên Giang",
    price: 1800000,
    description: "Bungalow riêng biệt nằm giữa thiên nhiên nhiệt đới, có hồ bơi riêng.",
  },
  {
    id: "5",
    name: "Phòng Family Sapa",
    location: "Sa Pa, Lào Cai",
    price: 950000,
    description: "Phòng gia đình rộng rãi với view núi rừng Tây Bắc hùng vĩ.",
  },
  {
    id: "6",
    name: "Villa Mũi Né",
    location: "Mũi Né, Bình Thuận",
    price: 3200000,
    description: "Villa sang trọng ngay bãi biển cát trắng, riêng tư và yên tĩnh.",
  },
];

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full">
        <SectionTitle
          title="Danh sách phòng"
          subtitle="Khám phá các lựa chọn phòng nghỉ hấp dẫn trên khắp Việt Nam"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="bg-gray-100 h-44 flex items-center justify-center text-gray-400 text-4xl">
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
      </main>

      <Footer />
    </div>
  );
}
