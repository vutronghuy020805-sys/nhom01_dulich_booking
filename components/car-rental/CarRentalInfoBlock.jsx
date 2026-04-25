export default function CarRentalInfoBlock({ block }) {
  return (
    <div>
      <h3 className="text-center text-xl md:text-2xl font-bold text-slate-900 leading-snug">
        {block.title}
      </h3>
      <hr className="mt-5 mb-8 border-t border-slate-200" />
      <div className="space-y-5 text-slate-700 text-[15px] md:text-base leading-relaxed">
        {block.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
