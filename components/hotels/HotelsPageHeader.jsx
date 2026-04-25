import Link from "next/link";
import SupportDropdown from "@/components/shared/SupportDropdown";
import ThemeToggle from "@/components/theme/ThemeToggle";

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
  { label: "Đặt chỗ của tôi", href: "/account/my-bookings" },
  { label: "Đăng ký", href: "/login" },
];

export default function HotelsPageHeader({ active = "Khách sạn" }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="shrink-0 flex items-center">
          <img
            src="/nhom01_dulich_booking/assets/logo-viego.png"
            alt="VieGo Travel"
            className="w-14 h-14 object-contain brightness-0"
          />
        </Link>

        <div className="hidden md:flex items-center gap-1 text-slate-700 text-sm font-medium">
          <svg
            viewBox="0 0 30 20"
            className="w-6 h-4 rounded-[3px] shadow-sm shrink-0 mr-2"
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
              <SupportDropdown key={item.label} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-full transition-colors hover:bg-gray-100"
              >
                {item.label}
              </Link>
            )
          )}

          <ThemeToggle className="ml-1" />

          <Link
            href="/login"
            className="ml-2 px-5 py-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors font-semibold"
          >
            Đăng nhập
          </Link>
        </div>
      </div>

      <nav className="max-w-375 mx-auto px-6 lg:px-10 pb-1 flex items-center gap-1 overflow-x-auto">
        {serviceMenu.map((item) => {
          const isActive = item.label === active;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                "shrink-0 px-4 py-3 text-base font-semibold border-b-2 transition-colors " +
                (isActive
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-600 border-transparent hover:text-slate-800")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
