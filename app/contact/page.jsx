import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Contact - VieGo",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 w-full">
        <SectionTitle
          title="Liên hệ với chúng tôi"
          subtitle="Có câu hỏi hoặc cần hỗ trợ? Gửi tin nhắn cho chúng tôi ngay!"
        />

        <div className="bg-white border rounded-xl p-8 shadow-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tin nhắn
              </label>
              <textarea
                rows={5}
                placeholder="Nhập nội dung tin nhắn..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl mb-1">📧</div>
            <div className="text-sm font-medium text-gray-700">Email</div>
            <div className="text-sm text-gray-500">support@viego.vn</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl mb-1">📞</div>
            <div className="text-sm font-medium text-gray-700">Hotline</div>
            <div className="text-sm text-gray-500">1800 1234</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl mb-1">📍</div>
            <div className="text-sm font-medium text-gray-700">Địa chỉ</div>
            <div className="text-sm text-gray-500">Hà Nội, Việt Nam</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
