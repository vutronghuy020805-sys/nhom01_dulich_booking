import Link from "next/link";

function isExternal(href) {
  if (!href) return false;
  return /^(https?:)?\/\//i.test(href);
}

export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h4 className="text-white font-bold text-base mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => {
          const href = link.href || "#";
          const external = link.external ?? isExternal(href);
          const baseClass =
            "text-blue-100/90 hover:text-white text-sm transition-colors";

          return (
            <li key={link.label}>
              {external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseClass}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={href} className={baseClass}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
