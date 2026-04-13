import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "About - VieGo",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <SectionTitle
          title="Về VieGo"
          subtitle="Chúng tôi là nền tảng booking du lịch hàng đầu Việt Nam"
        />

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sứ mệnh của chúng tôi</h3>
            <p>
              VieGo ra đời với sứ mệnh kết nối du khách với những trải nghiệm du lịch tuyệt vời
              nhất trên khắp Việt Nam. Chúng tôi tin rằng mỗi chuyến đi là một câu chuyện đáng
              được kể lại.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-500 text-sm">Khách sạn & phòng nghỉ</div>
            </div>
            <div className="text-center p-6 border rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-500 text-sm">Tour du lịch</div>
            </div>
            <div className="text-center p-6 border rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
              <div className="text-gray-500 text-sm">Khách hàng hài lòng</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Câu chuyện của chúng tôi</h3>
            <p className="mb-4">
              Được thành lập năm 2023, VieGo bắt đầu từ một nhóm nhỏ những người yêu du lịch
              với mong muốn đơn giản hóa việc lên kế hoạch cho các chuyến đi trong nước.
            </p>
            <p>
              Ngày nay, VieGo tự hào là đối tác tin cậy của hàng nghìn du khách, cung cấp
              dịch vụ đặt phòng và tour với giá cả minh bạch, dịch vụ chăm sóc khách hàng
              tận tâm 24/7.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Giá trị cốt lõi</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <span><strong>Tin cậy:</strong> Thông tin minh bạch, giá cả rõ ràng, không phát sinh phí ẩn.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <span><strong>Chất lượng:</strong> Chỉ hợp tác với các đơn vị đã được kiểm duyệt kỹ lưỡng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">✓</span>
                <span><strong>Tiện lợi:</strong> Đặt phòng, tour chỉ trong vài bước đơn giản.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
