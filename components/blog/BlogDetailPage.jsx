import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import RelatedProducts from "@/components/detail/RelatedProducts";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="9" r="3.5" />
      <path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M15 16c0-2 2-3 4-3" />
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M16 12h3" />
    </svg>
  );
}
function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </svg>
  );
}
function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" aria-hidden>
      <path d="M7 11.2C7 8 9 6 12 5.5v2C10.5 8 9.5 9 9.5 11.2H12v7H6V13c0-.7.4-1.4 1-1.8zm9 0C16 8 18 6 21 5.5v2c-1.5.5-2.5 1.5-2.5 3.7H21v7h-6V13c0-.7.4-1.4 1-1.8z" />
    </svg>
  );
}

function slugifyId(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function HeroPlaceholder({ location }) {
  return (
    <div className="absolute inset-0 bg-linear-to-br from-sky-400 via-sky-500 to-indigo-600 flex items-center justify-center">
      <div className="text-center text-white px-6">
        <PinIcon />
        <p className="mt-3 text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
          {location}
        </p>
        <p className="mt-3 text-sm md:text-base opacity-90">
          Ảnh hero đang được cập nhật
        </p>
      </div>
    </div>
  );
}

function QuickInfoCard({ info, location }) {
  const rows = [
    { label: "Địa điểm", value: location, Icon: PinIcon },
    info?.bestTime && { label: "Thời gian lý tưởng", value: info.bestTime, Icon: CalendarIcon },
    info?.duration && { label: "Thời lượng", value: info.duration, Icon: ClockIcon },
    info?.suitableFor && { label: "Phù hợp với", value: info.suitableFor, Icon: UsersIcon },
    info?.budget && { label: "Ngân sách gợi ý", value: info.budget, Icon: WalletIcon },
  ].filter(Boolean);

  return (
    <aside className="bg-sky-50 border border-sky-100 rounded-2xl p-5 md:p-6">
      <h3 className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-3">
        Thông tin nhanh
      </h3>
      <dl className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-2.5 text-sm">
            <span className="text-sky-600 mt-0.5">
              <row.Icon />
            </span>
            <div className="flex-1 min-w-0">
              <dt className="text-xs text-slate-500">{row.label}</dt>
              <dd className="font-semibold text-slate-900">{row.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function TableOfContents({ sections }) {
  if (!sections || sections.length < 3) return null;
  return (
    <nav className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
        Mục lục
      </h3>
      <ol className="space-y-2 text-sm">
        {sections.map((s, idx) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-slate-700 hover:text-sky-600 transition-colors leading-snug block"
            >
              <span className="text-slate-400 mr-1.5">{idx + 1}.</span>
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function PullQuote({ children }) {
  return (
    <blockquote className="my-8 relative bg-sky-50/60 border-l-4 border-sky-400 rounded-r-xl p-6 md:p-8">
      <span className="absolute top-3 left-4 text-sky-200">
        <QuoteIcon />
      </span>
      <p className="relative text-lg md:text-xl italic font-medium text-slate-800 leading-relaxed pl-10 md:pl-12">
        {children}
      </p>
    </blockquote>
  );
}

function TipBox({ children }) {
  return (
    <aside className="my-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5">
      <span className="text-amber-500 shrink-0 mt-0.5">
        <BulbIcon />
      </span>
      <div>
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
          Mẹo nhỏ
        </p>
        <p className="text-sm md:text-[15px] text-slate-800 leading-relaxed">
          {children}
        </p>
      </div>
    </aside>
  );
}

function ArticleSection({ section, index }) {
  return (
    <section id={section.id} className="scroll-mt-24 mb-10 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug mb-4 md:mb-5">
        <span className="text-sky-500 mr-2">{String(index + 1).padStart(2, "0")}.</span>
        {section.heading}
      </h2>
      <div className="space-y-4 text-[15px] md:text-base text-slate-700 leading-relaxed">
        {section.paragraphs?.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {section.quote ? <PullQuote>{section.quote}</PullQuote> : null}
      {section.tip ? <TipBox>{section.tip}</TipBox> : null}
    </section>
  );
}

export default function BlogDetailPage({ post, relatedPosts = [] }) {
  const hasSections = Array.isArray(post.sections) && post.sections.length > 0;
  const sections = hasSections
    ? post.sections.map((s) => ({ ...s, id: s.id || slugifyId(s.heading) }))
    : null;
  const flatParagraphs = !hasSections
    ? Array.isArray(post.content)
      ? post.content
      : [post.content].filter(Boolean)
    : null;

  const relatedItems = relatedPosts.map((p) => ({
    id: p.id || p.slug,
    title: p.title,
    subtitle: `${p.location || "VieGo"} · ${p.dateLabel || ""}`.trim(),
    image: p.image || "",
    fallbackIcon: "📰",
    href: `/blog/${p.slug}`,
  }));

  return (
    <article className="bg-white">
      <div className="relative w-full aspect-21/9 md:aspect-21/7 bg-slate-800 overflow-hidden">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <HeroPlaceholder location={post.location} />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/40 to-black/85" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-14 px-6 text-center text-white">
          <div className="max-w-4xl">
            {post.category ? (
              <span className="inline-block bg-sky-500/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                {post.category}
              </span>
            ) : null}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-2xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:text-base text-white/95">
              <span className="font-semibold">{post.author || "VieGo VN"}</span>
              <span className="opacity-70">·</span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon /> {post.dateLabel}
              </span>
              {post.readTime ? (
                <>
                  <span className="opacity-70">·</span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon /> {post.readTime}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-14">
        <Breadcrumb
          items={[
            { label: "VieGo Blog", href: "/blog" },
            { label: post.title },
          ]}
          className="mb-4"
        />
        <div className="mb-6 text-sm">
          <Link href="/blog" className="text-sky-600 hover:text-sky-700 font-semibold">
            ← Quay lại VieGo Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 md:gap-12 items-start">
          <div className="min-w-0 max-w-3xl">
            {post.excerpt ? (
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium italic border-l-4 border-sky-400 pl-5 mb-10">
                {post.excerpt}
              </p>
            ) : null}

            {hasSections ? (
              sections.map((s, idx) => (
                <ArticleSection key={s.id} section={s} index={idx} />
              ))
            ) : (
              <div className="space-y-5 text-[15px] md:text-base text-slate-700 leading-relaxed">
                {flatParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {post.tags && post.tags.length > 0 ? (
              <div className="mt-10 pt-6 border-t border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center text-xs font-medium bg-slate-100 hover:bg-sky-100 hover:text-sky-700 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <section className="mt-12 bg-linear-to-r from-sky-500 to-sky-400 rounded-2xl p-6 md:p-8 text-white shadow-lg">
              <h3 className="text-xl md:text-2xl font-extrabold">
                Khám phá thêm cảm hứng du lịch cùng VieGo
              </h3>
              <p className="mt-2 text-sm md:text-base text-white/90 leading-relaxed max-w-xl">
                Bài viết, gợi ý lịch trình và ưu đãi mới nhất — tất cả đều được cập nhật hàng tuần bởi đội ngũ VieGo VN.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-sky-600 hover:bg-sky-50 font-semibold text-sm transition-colors shadow"
                >
                  Xem thêm bài viết
                </Link>
                <Link
                  href="/hotels"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/40 font-semibold text-sm transition-colors backdrop-blur-sm"
                >
                  Khám phá điểm đến
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <QuickInfoCard info={post.quickInfo} location={post.location} />
            {hasSections ? <TableOfContents sections={sections} /> : null}
          </aside>
        </div>

        {relatedItems.length > 0 ? (
          <div className="mt-14 pt-10 border-t border-slate-100">
            <RelatedProducts
              title="Bài viết liên quan"
              subtitle="Cùng chủ đề, cùng điểm đến"
              items={relatedItems}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
