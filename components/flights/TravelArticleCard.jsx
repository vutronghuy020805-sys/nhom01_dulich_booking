import Link from "next/link";
import { articleHref } from "./latestTravelArticles";

export default function TravelArticleCard({ article }) {
  return (
    <Link
      href={articleHref(article.slug)}
      className="shrink-0 w-64 md:w-72 bg-white rounded-2xl border border-gray-200 hover:shadow-md transition overflow-hidden snap-start group"
    >
      <div className="relative aspect-[16/10] bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-700 transition">
          {article.title}
        </h3>
        <div className="mt-auto text-sm">
          <div className="text-slate-500">{article.source}</div>
          <div className="text-xs text-slate-400 mt-0.5">
            {article.readTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
