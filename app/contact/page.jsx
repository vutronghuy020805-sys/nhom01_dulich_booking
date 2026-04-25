import Link from "next/link";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import ContactPopularTopicsCard from "@/components/contact/ContactPopularTopicsCard";
import ContactFormSection from "@/components/contact/ContactFormSection";

export const metadata = {
  title: "Liên hệ chúng tôi | VieGo",
  description:
    "VieGo luôn sẵn sàng hỗ trợ - các chủ đề phổ biến, trò chuyện và gọi điện tới đội ngũ hỗ trợ khách hàng.",
};

function InboxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 7h12a4 4 0 0 1 4 4v8H4z" />
      <path d="M4 7V5a1 1 0 0 1 1-1h9" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 5h16v11H8l-4 4z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <section className="bg-sky-400">
          <div className="max-w-350 mx-auto px-4 lg:px-10 py-10 md:py-14">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Liên hệ chúng tôi
                </h1>
                <p className="mt-2 text-sm md:text-base text-white/95">
                  Chúng tôi luôn sẵn sàng hỗ trợ, dù bạn ở bất cứ nơi đâu!
                </p>
              </div>

              <Link
                href="/my-inbox"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <InboxIcon />
                Kiểm tra tin nhắn đến của tôi
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-350 mx-auto px-4 lg:px-10 py-8 md:py-10 space-y-6 md:space-y-8">
          <div className="text-center">
            <h2 className="text-base md:text-lg font-semibold text-slate-700 pb-3 border-b border-slate-200">
              Hỗ trợ khách hàng
            </h2>
          </div>

          <ContactPopularTopicsCard />

          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-base md:text-lg font-bold text-slate-900">
              Có vẻ như bạn không có bất kỳ đặt chỗ nào gần đây
            </h2>
            <p className="mt-3 text-sm md:text-[15px] text-slate-600 leading-relaxed">
              Không sao cả! Bạn vẫn có thể trò chuyện với chúng tôi để được giải
              đáp các câu hỏi chung hoặc hỗ trợ trước khi đặt chỗ.
              <br />
              Bạn muốn hỏi về đặt chỗ cũ hơn? Chỉ cần nhập Mã đặt chỗ của bạn
              theo cách thủ công.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/chat-support"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-sm transition-colors"
              >
                <ChatIcon />
                Trò chuyện với chúng tôi
              </Link>
              <a
                href="tel:19001234"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <PhoneIcon />
                Gọi cho chúng tôi
              </a>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-base md:text-lg font-bold text-slate-900">
                Trung tâm hỗ trợ
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Trả lời nhanh các câu hỏi bạn đang quan tâm
              </p>
            </div>
            <Link
              href="/help"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors shadow-sm shrink-0"
            >
              Bắt đầu ngay
              <ArrowRightIcon />
            </Link>
          </section>

          <ContactFormSection />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
