function renderBlock(block, key) {
  switch (block.type) {
    case "sectionTitle":
      return (
        <div key={key}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
            {block.content}
          </h2>
          <div
            className="w-20 h-1 bg-amber-300 mt-2 rounded-full"
            aria-hidden
          />
        </div>
      );
    case "subheading":
      return (
        <h3
          key={key}
          className="text-base md:text-lg font-bold text-slate-800 mt-8 md:mt-10 mb-0"
        >
          {block.content}
        </h3>
      );
    case "paragraph":
      return (
        <p
          key={key}
          className="text-[15px] md:text-base leading-relaxed text-slate-700 mt-4"
        >
          {block.content}
        </p>
      );
    case "image":
      return (
        <div key={key} className="mt-8">
          <img
            src={block.src}
            alt={block.alt || ""}
            className="w-full h-auto rounded-xl bg-slate-100 border border-slate-100"
            loading="lazy"
          />
        </div>
      );
    case "caption":
      return (
        <p
          key={key}
          className="italic text-sm text-slate-500 mt-2"
        >
          {block.content}
        </p>
      );
    case "bulletItem":
      return (
        <p
          key={key}
          className="text-[15px] md:text-base leading-relaxed text-slate-700 mt-6"
        >
          <strong className="font-bold text-slate-900">{block.label}</strong>{" "}
          {block.content}
        </p>
      );
    default:
      return null;
  }
}

export default function BusDestinationArticleSection({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto pt-10 md:pt-12">
        {blocks.map((block, i) => renderBlock(block, block.type + "-" + i))}
      </div>
    </section>
  );
}
