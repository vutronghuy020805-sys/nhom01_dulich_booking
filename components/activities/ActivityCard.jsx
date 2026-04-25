import Image from "next/image";
import Link from "next/link";
import HighlightedText from "@/components/search/HighlightedText";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-slate-400 shrink-0"
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

export default function ActivityCard({ activity, highlightQuery = "" }) {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      aria-label={`Xem chi tiết ${activity.title}`}
    >
      <article>
        <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-4 pt-4 pb-5">
          <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
            <HighlightedText text={activity.title} query={highlightQuery} />
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <PinIcon />
            <span className="truncate">
              <HighlightedText text={activity.location} query={highlightQuery} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
