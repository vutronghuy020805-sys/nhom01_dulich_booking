import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">VieGo</h2>
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
              Nền tảng booking du lịch hàng đầu Việt Nam. Khám phá các phòng và
              tour hấp dẫn trên khắp mọi miền đất nước.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Điều hướng</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@viego.vn</li>
              <li>Phone: 1800 1234</li>
              <li>Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} VieGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
