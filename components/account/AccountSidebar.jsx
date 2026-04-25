"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutMenuItem from "./LogoutMenuItem";

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function BookingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}
function TxnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="14" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  );
}
function RefundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <path d="M12 11v4M10 13l2-2 2 2" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 17h12l-1.5-2V11a4.5 4.5 0 0 0-9 0v4z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="9" r="3.5" />
      <path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M15 16c0-2 2-3 4-3" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12c0 .5-.05 1-.14 1.5l2 1.6-2 3.4-2.4-.9c-.8.6-1.7 1.1-2.6 1.4L13.5 22h-3l-.4-2c-.9-.3-1.8-.8-2.6-1.4l-2.4.9-2-3.4 2-1.6c-.1-.5-.14-1-.14-1.5s.04-1 .14-1.5l-2-1.6 2-3.4 2.4.9c.8-.6 1.7-1.1 2.6-1.4L10.5 2h3l.4 2c.9.3 1.8.8 2.6 1.4l2.4-.9 2 3.4-2 1.6c.09.5.14 1 .14 1.5z" />
    </svg>
  );
}
function PointsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <text x="12" y="16" fontSize="11" textAnchor="middle" fontWeight="700" fill="currentColor" stroke="none">P</text>
    </svg>
  );
}

const TOP_ITEMS = [
  { href: "/account/my-cards", label: "Thẻ của tôi", Icon: CardIcon },
];

const BOOKING_ITEMS = [
  { href: "/account/my-bookings", label: "Đặt chỗ của tôi", Icon: BookingsIcon },
  { href: "/account/transactions", label: "Danh sách giao dịch", Icon: TxnIcon },
  { href: "/account/refunds", label: "Refunds", Icon: RefundIcon },
  { href: "/account/price-alerts", label: "Thông báo giá vé máy bay", Icon: BellIcon },
  { href: "/account/saved-passengers", label: "Thông tin hành khách đã lưu", Icon: UsersIcon },
  { href: "/account/notification-settings", label: "Cài đặt thông báo", Icon: MailIcon },
];

const FOOTER_ITEMS = [
  { href: "/account/settings", label: "Cài đặt", Icon: GearIcon },
];

function SidebarLink({ item, active }) {
  const { Icon, label, href } = item;
  return (
    <Link
      href={href}
      className={
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors " +
        (active
          ? "bg-sky-500 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-100")
      }
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
}

export default function AccountSidebar({
  user = { initial: "A", name: "Google" },
  points = 0,
}) {
  const pathname = usePathname() || "";
  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600">
          {user.initial}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold text-slate-900 truncate">
            {user.name}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-slate-800">
        <PointsIcon />
        <span className="text-base font-semibold">{points}</span>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
        {TOP_ITEMS.map((item) => (
          <SidebarLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </div>

      <nav className="mt-2 space-y-1">
        {BOOKING_ITEMS.map((item) => (
          <SidebarLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </nav>

      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
        {FOOTER_ITEMS.map((item) => (
          <SidebarLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
        <LogoutMenuItem />
      </div>
    </aside>
  );
}
