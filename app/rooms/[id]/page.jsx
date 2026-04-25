import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductGallery from "@/components/detail/ProductGallery";
import ProductReviews from "@/components/detail/ProductReviews";
import RelatedProducts from "@/components/detail/RelatedProducts";
import { generateMockReviews, summarizeReviews } from "@/lib/mockReviews";

const rooms = [
  {
    id: "1",
    name: "Phòng Deluxe Hướng Biển",
    location: "Đà Nẵng",
    price: 1200000,
    description:
      "Phòng rộng rãi với view biển tuyệt đẹp, đầy đủ tiện nghi hiện đại. Diện tích 45m², ban công riêng hướng biển, phù hợp cho cặp đôi hoặc gia đình nhỏ.",
    amenities: ["Wi-Fi miễn phí", "Điều hòa", "TV 55 inch", "Minibar", "Ban công hướng biển", "Bồn tắm"],
    images: [],
  },
  {
    id: "2",
    name: "Suite Cao Cấp Hội An",
    location: "Hội An, Quảng Nam",
    price: 2500000,
    description:
      "Suite phong cách cổ truyền Hội An, nằm ngay trung tâm phố cổ. Kiến trúc gỗ truyền thống kết hợp tiện nghi hiện đại, mang lại trải nghiệm độc đáo.",
    amenities: ["Wi-Fi miễn phí", "Điều hòa", "TV 65 inch", "Bồn tắm ngoài trời", "Dịch vụ phòng 24/7", "Minibar"],
    images: [],
  },
  {
    id: "3",
    name: "Phòng Standard Hồ Hoàn Kiếm",
    location: "Hà Nội",
    price: 800000,
    description:
      "Phòng tiêu chuẩn sạch sẽ, tiện nghi, cách Hồ Hoàn Kiếm 5 phút đi bộ. Lý tưởng cho khách du lịch khám phá trung tâm Hà Nội.",
    amenities: ["Wi-Fi miễn phí", "Điều hòa", "TV 43 inch", "Tủ lạnh", "Két an toàn"],
    images: [],
  },
  {
    id: "4",
    name: "Bungalow Phú Quốc",
    location: "Phú Quốc, Kiên Giang",
    price: 1800000,
    description:
      "Bungalow riêng biệt nằm giữa thiên nhiên nhiệt đới, có hồ bơi riêng. Không gian yên tĩnh, lãng mạn, cách bãi biển 50m.",
    amenities: ["Wi-Fi miễn phí", "Hồ bơi riêng", "Điều hòa", "TV 55 inch", "BBQ ngoài trời", "Xe đạp miễn phí"],
    images: [],
  },
  {
    id: "5",
    name: "Phòng Family Sapa",
    location: "Sa Pa, Lào Cai",
    price: 950000,
    description:
      "Phòng gia đình rộng rãi với view núi rừng Tây Bắc hùng vĩ. Diện tích 60m², 2 phòng ngủ, phù hợp cho gia đình 4 người.",
    amenities: ["Wi-Fi miễn phí", "Điều hòa + sưởi ấm", "TV 50 inch", "Bếp nhỏ", "View núi", "Bãi đỗ xe"],
    images: [],
  },
  {
    id: "6",
    name: "Villa Mũi Né",
    location: "Mũi Né, Bình Thuận",
    price: 3200000,
    description:
      "Villa sang trọng ngay bãi biển cát trắng, riêng tư và yên tĩnh. Diện tích 120m² với sân vườn và hồ bơi tràn bờ.",
    amenities: ["Wi-Fi miễn phí", "Hồ bơi tràn bờ", "Sân vườn riêng", "Bếp đầy đủ", "Phòng tắm ngoài trời", "Dịch vụ đầu bếp"],
    images: [],
  },
];

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export default async function RoomDetailPage({ params }) {
  const { id } = await params;
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Không tìm thấy phòng</h2>
            <Link href="/rooms" className="text-blue-600 hover:underline">
              Quay lại danh sách phòng
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const reviews = generateMockReviews(`room-${room.id}`, 4);
  const reviewSummary = summarizeReviews(reviews);

  const relatedRooms = rooms
    .filter((r) => r.id !== room.id)
    .slice(0, 4)
    .map((r) => ({
      id: r.id,
      title: r.name,
      subtitle: r.location,
      image: r.images?.[0] || "",
      price: r.price,
      href: `/rooms/${r.id}`,
    }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 md:py-14 w-full">
        <Breadcrumb
          items={[
            { label: "Khách sạn", href: "/hotels" },
            { label: room.name },
          ]}
          className="mb-5"
        />
        <Link href="/rooms" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
          ← Quay lại danh sách phòng
        </Link>

        {room.images && room.images.length > 0 ? (
          <div className="mb-8">
            <ProductGallery images={room.images} alt={room.name} />
          </div>
        ) : (
          <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center text-6xl mb-8">
            🏨
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{room.name}</h1>
              <p className="text-gray-500">📍 {room.location}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Mô tả</h2>
              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Tiện nghi</h2>
              <ul className="grid grid-cols-2 gap-2">
                {room.amenities.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="border rounded-xl p-6 shadow-sm sticky top-24">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {room.price.toLocaleString("vi-VN")}đ
              </div>
              <p className="text-gray-400 text-sm mb-6">mỗi đêm</p>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                Đặt ngay
              </button>

              <p className="text-center text-xs text-gray-400">
                Miễn phí hủy phòng trong 24h
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <ProductReviews summary={reviewSummary} reviews={reviews} />
          {relatedRooms.length > 0 ? (
            <RelatedProducts
              title="Chỗ nghỉ tương tự"
              subtitle="Gợi ý phòng khác bạn có thể thích"
              items={relatedRooms}
            />
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
