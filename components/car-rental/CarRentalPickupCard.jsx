export default function CarRentalPickupCard({ title, locationName, fee }) {
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        {title}
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 px-5 md:px-6 py-4">
        <div className="text-sm md:text-base font-semibold text-slate-900">
          {locationName}
        </div>
        <div className="text-sm text-slate-500 mt-0.5">{fee}</div>
      </div>
    </section>
  );
}
