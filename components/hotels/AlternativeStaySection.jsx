import AlternativeStayCard from "./AlternativeStayCard";

export default function AlternativeStaySection({ data }) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="bg-white pt-8 pb-16 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          {data.title}
        </h2>
        <p className="text-gray-500 mb-8">{data.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.items.map((item) => (
            <AlternativeStayCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
