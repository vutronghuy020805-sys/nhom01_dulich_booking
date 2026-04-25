import Link from "next/link";

// Breadcrumb dùng chung cho VieGo.
// - `items`: mảng [{ label, href }]. Item cuối KHÔNG có `href` sẽ được render
//   là trang hiện tại (không clickable, font-medium, màu đậm hơn).
// - `homeHref` & `homeLabel`: item "Trang chủ" tự động chèn ở đầu, tắt bằng
//   `withHome={false}` nếu trang đã có context khác.
// - `variant="light"`: dùng cho nền tối (hero có ảnh), chữ trắng.
// - `className`: wrapper <nav> class bổ sung (spacing / container).
export default function Breadcrumb({
  items = [],
  withHome = true,
  homeHref = "/",
  homeLabel = "Trang chủ",
  variant = "default",
  className = "",
}) {
  const list = withHome ? [{ label: homeLabel, href: homeHref }, ...items] : items;
  if (list.length === 0) return null;

  const isLight = variant === "light";
  const baseText = isLight ? "text-white/85" : "text-slate-500";
  const linkHover = isLight ? "hover:text-white" : "hover:text-sky-600";
  const dividerColor = isLight ? "text-white/60" : "text-slate-300";
  const currentColor = isLight ? "text-white" : "text-slate-800";

  return (
    <nav
      aria-label="breadcrumb"
      className={`text-sm ${baseText} ${className}`}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        {list.map((item, idx) => {
          const isLast = idx === list.length - 1;
          const isCurrent = isLast || !item.href;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5 min-w-0">
              {isCurrent ? (
                <span
                  className={`font-medium truncate max-w-[50vw] md:max-w-none ${currentColor}`}
                  aria-current="page"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`transition-colors ${linkHover}`}
                >
                  {item.label}
                </Link>
              )}
              {!isLast ? (
                <span className={dividerColor} aria-hidden>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
