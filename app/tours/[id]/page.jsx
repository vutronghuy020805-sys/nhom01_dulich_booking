import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductGallery from "@/components/detail/ProductGallery";
import ProductReviews from "@/components/detail/ProductReviews";
import RelatedProducts from "@/components/detail/RelatedProducts";
import { generateMockReviews, summarizeReviews } from "@/lib/mockReviews";

const tours = [
  {
    id: "1",
    name: "Tour Hạ Long Bay 2 Ngày 1 Đêm",
    location: "Quảng Ninh",
    duration: "2 ngày 1 đêm",
    price: 2800000,
    description:
      "Khám phá kỳ quan thiên nhiên thế giới Vịnh Hạ Long với hàng nghìn hòn đảo đá vôi. Tour bao gồm nghỉ đêm trên thuyền, tham quan hang động và kayaking.",
    schedule: [
      "Ngày 1: Xuất phát từ Hà Nội - Đón tại cảng Tuần Châu - Xuống thuyền - Tham quan hang Sửng Sốt - Kayaking - Tiệc tối trên thuyền - Nghỉ đêm.",
      "Ngày 2: Bình minh trên vịnh - Tham quan làng chài Vung Viêng - Buffet sáng - Trở về cảng - Xe đưa về Hà Nội.",
    ],
    images: [],
  },
  {
    id: "2",
    name: "Khám phá Phố Cổ Hội An",
    location: "Hội An, Quảng Nam",
    duration: "1 ngày",
    price: 650000,
    description:
      "Dạo bước qua những con phố cổ kính, thưởng thức ẩm thực đặc sắc và tìm hiểu văn hóa truyền thống của Hội An - Di sản văn hóa thế giới.",
    schedule: [
      "Buổi sáng: Tham quan Chùa Cầu - Nhà cổ Tấn Ký - Hội quán Phúc Kiến - Thưởng thức Cao Lầu.",
      "Buổi chiều: Tham quan chợ Hội An - Làm đèn lồng - Thuyền thả đèn trên sông Hoài.",
    ],
    images: [],
  },
  {
    id: "3",
    name: "Trekking Fansipan - Nóc nhà Đông Dương",
    location: "Sa Pa, Lào Cai",
    duration: "3 ngày 2 đêm",
    price: 4500000,
    description:
      "Chinh phục đỉnh Fansipan 3143m - nóc nhà của Đông Dương. Hành trình trekking qua những cánh rừng nguyên sinh, thác nước hùng vĩ và các bản làng dân tộc.",
    schedule: [
      "Ngày 1: Từ Hà Nội lên Sa Pa - Check-in - Tham quan bản Cát Cát - Nghỉ đêm.",
      "Ngày 2: Bắt đầu trek - Cáp treo lên đỉnh Fansipan - Chinh phục đỉnh cao - Hạ trại nghỉ đêm.",
      "Ngày 3: Xuống núi - Thăm thị trấn Sa Pa - Trở về Hà Nội.",
    ],
    images: [],
  },
  {
    id: "4",
    name: "Tour Mũi Cà Mau - Điểm cực Nam",
    location: "Cà Mau",
    duration: "2 ngày 1 đêm",
    price: 1900000,
    description:
      "Hành trình về điểm cực Nam của Tổ quốc, khám phá rừng đước Cà Mau, văn hóa miền Tây sông nước và hệ sinh thái ngập mặn đặc sắc.",
    schedule: [
      "Ngày 1: Bay vào TP Cà Mau - Tham quan rừng đước - Đi thuyền khám phá kênh rạch - Nghỉ đêm tại nhà dân.",
      "Ngày 2: Đi thuyền ra Mũi Cà Mau - Chụp ảnh cột mốc cực Nam - Thưởng thức hải sản tươi sống - Bay về.",
    ],
    images: [],
  },
  {
    id: "5",
    name: "Khám phá Cao Nguyên Đá Đồng Văn",
    location: "Hà Giang",
    duration: "4 ngày 3 đêm",
    price: 5800000,
    description:
      "Hành trình khám phá cao nguyên đá Đồng Văn - Di sản địa chất toàn cầu, qua những con đèo hiểm trở, ruộng bậc thang và văn hóa các dân tộc H'Mông, Lô Lô.",
    schedule: [
      "Ngày 1: Hà Nội - Hà Giang - Đèo Bắc Sum - Quản Bạ - Cổng Trời.",
      "Ngày 2: Yên Minh - Đồng Văn - Dinh thự Vua Mèo - Phố cổ Đồng Văn.",
      "Ngày 3: Đèo Mã Pì Lèng - Mèo Vạc - Hẻm Tu Sản.",
      "Ngày 4: Trở về Hà Giang - Về Hà Nội.",
    ],
    images: [],
  },
  {
    id: "6",
    name: "Tour Phú Quốc - Thiên Đường Biển",
    location: "Phú Quốc, Kiên Giang",
    duration: "3 ngày 2 đêm",
    price: 6200000,
    description:
      "Tận hưởng thiên đường biển đảo Phú Quốc với bãi biển cát trắng, nước trong xanh, hải sản tươi sống và không gian nghỉ dưỡng đẳng cấp.",
    schedule: [
      "Ngày 1: Bay đến Phú Quốc - Check-in resort - Tắm biển bãi Dài - Ăn tối chợ đêm Dinh Cậu.",
      "Ngày 2: Tour 3 đảo - Snorkeling - Câu cá - BBQ hải sản trên biển.",
      "Ngày 3: Tham quan VinWonders - Mua đặc sản - Bay về.",
    ],
    images: [],
  },
];

export default async function TourDetailPage({ params }) {
  const { id } = await params;
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Không tìm thấy tour</h2>
            <Link href="/tours" className="text-blue-600 hover:underline">
              Quay lại danh sách tour
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const reviews = generateMockReviews(`tour-${tour.id}`, 4);
  const reviewSummary = summarizeReviews(reviews);

  const relatedTours = tours
    .filter((t) => t.id !== tour.id)
    .slice(0, 4)
    .map((t) => ({
      id: t.id,
      title: t.name,
      subtitle: `${t.location} · ${t.duration}`,
      image: t.images?.[0] || "",
      fallbackIcon: "🗺️",
      price: t.price,
      href: `/tours/${t.id}`,
    }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10 md:py-14 w-full">
        <Breadcrumb
          items={[
            { label: "Hoạt động", href: "/activities" },
            { label: tour.name },
          ]}
          className="mb-5"
        />
        <Link href="/tours" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
          ← Quay lại danh sách tour
        </Link>

        {tour.images && tour.images.length > 0 ? (
          <div className="mb-8">
            <ProductGallery images={tour.images} alt={tour.name} />
          </div>
        ) : (
          <div className="bg-green-50 h-64 rounded-xl flex items-center justify-center text-6xl mb-8">
            🗺️
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{tour.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                <span>📍 {tour.location}</span>
                <span>⏱ {tour.duration}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Mô tả tour</h2>
              <p className="text-gray-600 leading-relaxed">{tour.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Lịch trình</h2>
              <ol className="space-y-3">
                {tour.schedule.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="bg-blue-100 text-blue-700 font-bold text-sm w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="border rounded-xl p-6 shadow-sm sticky top-24">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {tour.price.toLocaleString("vi-VN")}đ
              </div>
              <p className="text-gray-400 text-sm mb-2">mỗi người</p>
              <p className="text-gray-500 text-sm mb-6">⏱ {tour.duration}</p>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                Đặt tour
              </button>

              <p className="text-center text-xs text-gray-400">
                Hủy miễn phí trước 48h khởi hành
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <ProductReviews summary={reviewSummary} reviews={reviews} />
          {relatedTours.length > 0 ? (
            <RelatedProducts
              title="Tour tương tự"
              subtitle="Gợi ý tour khác bạn có thể thích"
              items={relatedTours}
            />
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
