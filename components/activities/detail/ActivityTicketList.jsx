import ActivityTicketCard from "./ActivityTicketCard";

export default function ActivityTicketList({ slug, tickets }) {
  return (
    <section className="bg-white">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-8 md:py-10">
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-5">
          Có vé trống cho bạn
        </h2>
        <div className="space-y-3 md:space-y-4">
          {tickets.map((ticket) => (
            <ActivityTicketCard
              key={ticket.id}
              slug={slug}
              ticket={ticket}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
