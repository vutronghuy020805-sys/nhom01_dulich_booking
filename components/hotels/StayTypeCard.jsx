export default function StayTypeCard({ stay }) {
  return (
    <a
      href="#"
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md ring-2 ring-transparent hover:ring-blue-500 transition-all"
    >
      <div className="relative w-full h-60 bg-gray-100 overflow-hidden">
        <img
          src={stay.image}
          alt={stay.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg md:text-xl font-bold text-slate-900">
          {stay.title}
        </h3>
      </div>
    </a>
  );
}
