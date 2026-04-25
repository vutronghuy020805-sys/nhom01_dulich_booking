import ActivityGallery from "./ActivityGallery";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function ActivityDetailHero({ activity }) {
  return (
    <section className="bg-white">
      <div className="max-w-350 mx-auto px-4 lg:px-10 pt-6">
        <div className="relative bg-linear-to-br from-sky-500 via-sky-400 to-blue-500 rounded-tl-[48px] rounded-tr-2xl rounded-bl-2xl rounded-br-[120px] px-5 md:px-9 pt-5 md:pt-6 pb-10 md:pb-14">
          <div className="flex items-center gap-2 text-white text-sm md:text-base font-medium mb-4 md:mb-5">
            <span className="text-lime-300">
              <PinIcon />
            </span>
            <span>{activity.location}</span>
          </div>

          <ActivityGallery gallery={activity.gallery} title={activity.title} />
        </div>
      </div>
    </section>
  );
}
