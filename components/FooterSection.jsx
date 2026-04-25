import NewsletterBanner from "./NewsletterBanner";
import FooterLinks from "./FooterLinks";

const aboutLinks = [
  // Cách đặt chỗ: chưa có page riêng → placeholder (sẽ rơi vào trang 404 thân thiện)
  { label: "Cách đặt chỗ", href: "/booking-guide" },
  { label: "Về VieGo", href: "/about" },
  { label: "Liên hệ chúng tôi", href: "/contact" },
  { label: "Trợ giúp", href: "/help" },
  { label: "Về chúng tôi", href: "/about" },
];

const productLinks = [
  { label: "Khách sạn", href: "/hotels" },
  { label: "Vé máy bay", href: "/flights" },
  { label: "Vé xe khách", href: "/bus" },
  { label: "Đưa đón sân bay", href: "/airport-transfer" },
  { label: "Biệt thự", href: "/biet-thu" },
  { label: "Căn hộ", href: "/can-ho" },
];

const otherLinks = [
  // Toàn bộ nhóm "Khác" chưa có page thật → placeholder route
  { label: "Giới thiệu bạn bè", href: "/gioi-thieu-ban-be" },
  { label: "VieGo Blog", href: "/blog" },
  { label: "Chính sách Quyền Riêng tư", href: "/privacy-policy" },
  { label: "Điều khoản & Điều kiện", href: "/terms-and-conditions" },
  { label: "Đăng ký nơi nghỉ của bạn", href: "/register-your-property" },
];

// Social: placeholder URL chính thức của từng platform — thay URL thật khi có page VieGo official
const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: "https://cdn.simpleicons.org/facebook/FFFFFF",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "https://cdn.simpleicons.org/instagram/FFFFFF",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com",
    icon: "https://cdn.simpleicons.org/tiktok/FFFFFF",
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com",
    icon: "https://cdn.simpleicons.org/youtube/FFFFFF",
  },
  {
    label: "Telegram",
    href: "https://telegram.org",
    icon: "https://cdn.simpleicons.org/telegram/FFFFFF",
  },
];

// App store placeholder URLs — thay URL thật khi VieGo xuất bản app
const googlePlayUrl = "https://play.google.com/store";
const appStoreUrl = "https://www.apple.com/app-store/";

const paymentLogos = [
  { id: 1, alt: "Visa", src: "https://cdn.simpleicons.org/visa" },
  { id: 2, alt: "Mastercard", src: "https://cdn.simpleicons.org/mastercard" },
  { id: 3, alt: "JCB", src: "https://cdn.simpleicons.org/jcb" },
  { id: 4, alt: "American Express", src: "https://cdn.simpleicons.org/americanexpress" },
  { id: 5, alt: "PayPal", src: "https://cdn.simpleicons.org/paypal" },
  { id: 6, alt: "Stripe", src: "https://cdn.simpleicons.org/stripe" },
  { id: 7, alt: "Apple Pay", src: "https://cdn.simpleicons.org/applepay/000000" },
  { id: 8, alt: "Google Pay", src: "https://cdn.simpleicons.org/googlepay/5F6368" },
  { id: 9, alt: "Alipay", src: "https://cdn.simpleicons.org/alipay" },
  { id: 10, alt: "Klarna", src: "https://cdn.simpleicons.org/klarna" },
  { id: 11, alt: "WeChat Pay", src: "https://cdn.simpleicons.org/wechat" },
  { id: 12, alt: "Discover", src: "https://cdn.simpleicons.org/discover" },
  { id: 13, alt: "Diners Club", src: "https://cdn.simpleicons.org/dinersclub" },
  { id: 14, alt: "Revolut", src: "https://cdn.simpleicons.org/revolut/000000" },
  { id: 15, alt: "Wise", src: "https://cdn.simpleicons.org/wise" },
  { id: 16, alt: "HSBC", src: "https://cdn.simpleicons.org/hsbc" },
];

export default function FooterSection() {
  return (
    <footer>
      <NewsletterBanner />

      <div className="bg-indigo-900 text-white">
        <div className="max-w-350 mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <img
                src="/assets/logo-viego.png"
                alt="VieGo"
                className="h-16 w-auto object-contain mb-6"
              />

              <button
                type="button"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-3 rounded-full shadow-md transition mb-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12l2 2 4-4" />
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
                </svg>
                Hợp tác với VieGo
              </button>
            </div>

            <FooterLinks title="Về VieGo" links={aboutLinks} />
            <FooterLinks title="Sản phẩm" links={productLinks} />
            <FooterLinks title="Khác" links={otherLinks} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
            <div>
              <h4 className="text-white font-bold text-base mb-4">
                Đối tác thanh toán
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {paymentLogos.map((logo) => (
                  <div
                    key={logo.id}
                    className="bg-white rounded-md h-10 flex items-center justify-center p-1.5"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-base mb-4">Về VieGo</h4>
              <ul className="space-y-3">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-blue-100/90 hover:text-white text-sm transition-colors"
                    >
                      <span className="w-6 h-6 flex items-center justify-center shrink-0">
                        <img
                          src={s.icon}
                          alt=""
                          className="w-5 h-5 object-contain"
                        />
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-white font-bold text-base mb-4">
                Tải ứng dụng VieGo
              </h4>
              <div className="flex flex-col gap-3 max-w-50">
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tải trên Google Play"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12 w-auto object-contain"
                  />
                </a>
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tải trên App Store"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Download on the App Store"
                    className="h-12 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
