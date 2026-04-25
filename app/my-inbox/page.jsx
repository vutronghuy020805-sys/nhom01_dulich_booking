import Link from "next/link";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import SupportAgentIllustration from "@/components/support/SupportAgentIllustration";

export const metadata = {
  title: "Hộp thư của tôi | VieGo",
  description:
    "Theo dõi lịch sử trò chuyện với bộ phận Hỗ trợ Khách hàng VieGo.",
};

export default function MyInboxPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <section className="bg-sky-400">
          <div className="max-w-350 mx-auto px-4 lg:px-10 py-10 md:py-14 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Hộp thư của tôi</h1>
            <p className="mt-3 text-sm md:text-lg font-semibold text-white/95">
              Theo dõi lịch sử trò chuyện với bộ phận Hỗ trợ Khách hàng VieGo
            </p>
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-4 lg:px-10 py-12 md:py-16 text-center">
          <SupportAgentIllustration className="mx-auto w-72 md:w-96 h-auto" />

          <h2 className="mt-6 md:mt-8 text-lg md:text-xl font-bold text-slate-900">
            Bạn cần trợ giúp về đặt chỗ?
          </h2>

          <div className="mt-5 md:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-sm transition-colors w-full sm:w-auto"
            >
              Xem những câu hỏi thường gặp
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors shadow-sm w-full sm:w-auto"
            >
              Hỏi chúng tôi
            </Link>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
