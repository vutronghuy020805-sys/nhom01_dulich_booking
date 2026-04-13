export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
