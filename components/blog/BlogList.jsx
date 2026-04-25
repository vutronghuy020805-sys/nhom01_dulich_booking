import Link from "next/link";
import HighlightedText from "@/components/search/HighlightedText";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 text-slate-400 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BlogCard({ post, query }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 mb-2">
          <PinIcon />
          <span>
            <HighlightedText text={post.location} query={query} />
          </span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors">
          <HighlightedText text={post.title} query={query} />
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
          <HighlightedText text={post.excerpt} query={query} />
        </p>
        <p className="mt-3 text-xs text-slate-500">
          {post.author} · {post.dateLabel}
        </p>
      </div>
    </Link>
  );
}

export default function BlogList({ posts = [], query = "", title = "Bài viết mới" }) {
  return (
    <section className="max-w-350 mx-auto px-4 lg:px-10 py-10 md:py-14">
      <div className="flex items-end justify-between mb-5 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            {title}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {posts.length} bài viết trên VieGo Blog
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-14 text-center text-slate-500">
          Không tìm thấy bài viết phù hợp. Hãy thử từ khoá khác.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} query={query} />
          ))}
        </div>
      )}
    </section>
  );
}
