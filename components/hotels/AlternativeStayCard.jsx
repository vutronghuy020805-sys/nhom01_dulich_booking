export default function AlternativeStayCard({ item }) {
  return (
    <a
      href="#"
      className="group relative block rounded-2xl overflow-hidden aspect-[16/7] ring-2 ring-transparent hover:ring-blue-500 hover:ring-offset-2 transition-all"
    >
      <div className="absolute inset-0 bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute left-6 bottom-5 right-6">
        <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
          {item.title}
        </h3>
      </div>
    </a>
  );
}
