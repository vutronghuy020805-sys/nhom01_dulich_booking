export default function ArticleCard({ article }) {
  return (
    <article className="group flex flex-col h-full">
      <div className="relative w-full h-52 md:h-56 bg-gray-100 rounded-2xl overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-4 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug line-clamp-3 mb-3">
          {article.title}
        </h3>

        <p className="text-sm text-gray-500 italic mb-3">{article.readTime}</p>

        <div className="flex items-center gap-2 mt-auto">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full overflow-hidden">
            <img
              src="/assets/logo-viego.png"
              alt={article.brand}
              className="w-full h-full object-cover brightness-0"
            />
          </span>
          <span className="text-sm font-semibold text-slate-700">{article.brand}</span>
        </div>
      </div>
    </article>
  );
}
