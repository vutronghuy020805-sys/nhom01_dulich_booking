import Link from "next/link";
import HomeBookingSearch from "./HomeBookingSearch";
import HeroVideoBackground from "./HeroVideoBackground";
import SupportDropdown from "@/components/shared/SupportDropdown";
import MotionReveal from "@/components/motion/MotionReveal";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { fadeInDown, fadeInUp } from "@/lib/motion";

const serviceMenu = [
  { label: "Khách sạn", href: "/hotels" },
  { label: "Vé máy bay", href: "/flights" },
  { label: "Vé xe khách", href: "/bus" },
  { label: "Thuê xe", href: "/car-rental" },
  { label: "Hoạt động", href: "/activities" },
  { label: "Đưa đón sân bay", href: "/airport-transfer" },
];

const topRightMenu = [
  { label: "VND | VI", href: "#" },
  { label: "Hỗ trợ", href: "#" },
  { label: "Đặt chỗ của tôi", href: "/my-bookings" },
  { label: "Đăng ký", href: "/login" },
];

// Pill hover style dùng chung: padding cố định -> không nhảy layout
const navPillClass =
  "shrink-0 whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10 hover:backdrop-blur-md";

export default function Hero() {
  return (
    <section className="relative z-20 w-full h-screen min-h-[860px] bg-neutral-900">
      {/* Video background với loop liền mạch (xem HeroVideoBackground.jsx) */}
      <HeroVideoBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
        <header className="pt-4 pb-2 w-full">
          <div className="w-full max-w-[1500px] mx-auto px-10 flex items-start justify-between gap-6">
            {/* Left: logo + service menu */}
            <div className="flex flex-col gap-2">
              {/*
                mix-blend-screen: nếu file logo có nền đen (black background baked-in),
                screen blend sẽ khiến pixel đen trở nên trong suốt trên nền tối của video.
                Nếu file logo đã có nền trong suốt, hãy bỏ class mix-blend-screen đi để hiển thị
                tự nhiên hơn.
              */}
              <img
                src="/nhom01_dulich_booking/assets/logo-viego.png"
                alt="VieGo Travel"
                className="w-28 h-28 object-contain mix-blend-screen"
              />

              <nav className="flex items-center flex-wrap gap-1 text-white text-[15px] mt-1">
                {serviceMenu.map((item, idx) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${navPillClass} ${
                      idx === 0 ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: top menu */}
            <div className="flex items-center gap-1 text-white text-[15px] font-medium pt-3">
              {/* Vietnam flag — inline SVG, 3:2 ratio, red bg with yellow 5-point star */}
              <svg
                viewBox="0 0 30 20"
                className="w-7 h-[18px] rounded-[3px] shadow-sm shrink-0 mr-2"
                aria-label="Vietnam"
              >
                <rect width="30" height="20" fill="#DA251D" />
                <polygon
                  fill="#FFFF00"
                  points="15,5 16.18,8.38 19.76,8.45 16.9,10.62 17.94,14.04 15,12 12.06,14.04 13.1,10.62 10.24,8.45 13.82,8.38"
                />
              </svg>

              {topRightMenu.map((item) =>
                item.label === "Hỗ trợ" ? (
                  <SupportDropdown
                    key={item.label}
                    triggerClassName={navPillClass}
                  />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={navPillClass}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <ThemeToggle className="ml-1 shrink-0 text-white hover:bg-white/15 hover:text-white" />

              <Link
                href="/login"
                className="ml-2 shrink-0 whitespace-nowrap px-6 py-2.5 rounded-lg bg-blue-400/25 border border-white/30 backdrop-blur-sm hover:bg-blue-400/40 transition-colors font-semibold"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </header>

        {/* Title + search */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[1500px] mx-auto px-10 pb-14">
          <MotionReveal
            as="h1"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.1 }}
            className="text-white text-4xl md:text-5xl lg:text-[64px] font-bold text-center leading-tight mb-14 drop-shadow-2xl"
          >
            VieGo cùng bạn khám phá muôn nơi
          </MotionReveal>

          <MotionReveal variants={fadeInUp} viewport={{ once: true, amount: 0.1 }} delay={0.15}>
            <HomeBookingSearch />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
