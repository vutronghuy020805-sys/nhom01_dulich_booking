const TONE = {
  sky: "bg-sky-50 text-sky-500",
  slate: "bg-slate-100 text-slate-600",
  blue: "bg-blue-50 text-blue-500",
  teal: "bg-teal-50 text-teal-500",
  rose: "bg-rose-50 text-rose-500",
  purple: "bg-purple-50 text-purple-500",
  amber: "bg-amber-50 text-amber-500",
  yellow: "bg-yellow-50 text-yellow-500",
  emerald: "bg-emerald-50 text-emerald-500",
  fuchsia: "bg-fuchsia-50 text-fuchsia-500",
  indigo: "bg-indigo-50 text-indigo-500",
};

const TONE_ACTIVE = {
  sky: "ring-sky-400",
  slate: "ring-slate-400",
  blue: "ring-blue-400",
  teal: "ring-teal-400",
  rose: "ring-rose-400",
  purple: "ring-purple-400",
  amber: "ring-amber-400",
  yellow: "ring-yellow-400",
  emerald: "ring-emerald-400",
  fuchsia: "ring-fuchsia-400",
  indigo: "ring-indigo-400",
};

function Info() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <line x1="12" y1="8" x2="12" y2="8.01" />
    </svg>
  );
}
function User() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function Plane() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.5 15 5 19l-1.5-1.5L7 14l-4.5-4L4 8l5 2 4-4c1-1 3-.5 3.5 0s1 2.5 0 3.5l-4 4 2 5-1.5 1.5-4-4.5z" />
    </svg>
  );
}
function Hotel() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <line x1="8" y1="9" x2="8" y2="9.01" />
      <line x1="12" y1="9" x2="12" y2="9.01" />
      <line x1="16" y1="9" x2="16" y2="9.01" />
      <line x1="8" y1="13" x2="8" y2="13.01" />
      <line x1="12" y1="13" x2="12" y2="13.01" />
      <line x1="16" y1="13" x2="16" y2="13.01" />
      <path d="M10 20v-3h4v3" />
    </svg>
  );
}
function Bag() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V5a3 3 0 0 1 6 0v3" />
    </svg>
  );
}
function Pay() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <text x="12" y="16" fontSize="5" textAnchor="middle" fontWeight="700" fill="currentColor" stroke="none">Pay</text>
    </svg>
  );
}
function Car() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 16h14v-4l-2-4H7l-2 4z" />
      <circle cx="8" cy="17" r="1.5" />
      <circle cx="16" cy="17" r="1.5" />
    </svg>
  );
}
function Points() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <text x="12" y="16" fontSize="10" textAnchor="middle" fontWeight="700" fill="currentColor" stroke="none">P</text>
    </svg>
  );
}
function Bus() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="4" width="14" height="14" rx="2" />
      <line x1="5" y1="10" x2="19" y2="10" />
      <line x1="9" y1="4" x2="9" y2="10" />
      <line x1="15" y1="4" x2="15" y2="10" />
      <circle cx="8" cy="19" r="1" />
      <circle cx="16" cy="19" r="1" />
    </svg>
  );
}
function Combo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 8 5 12l2 1.5-2 1.5 2 1 1.5-2 2 1.5L14 17l6-6z" />
    </svg>
  );
}
function Shield() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 4 6v6c0 4.5 3 8 8 9 5-1 8-4.5 8-9V6z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

const ICONS = {
  info: Info,
  user: User,
  plane: Plane,
  hotel: Hotel,
  bag: Bag,
  pay: Pay,
  car: Car,
  points: Points,
  bus: Bus,
  combo: Combo,
  shield: Shield,
};

export default function HelpCategoryIcon({ icon, color, active }) {
  const Component = ICONS[icon] || Info;
  const toneClass = TONE[color] || TONE.sky;
  const ringClass = active ? `ring-2 ${TONE_ACTIVE[color] || TONE_ACTIVE.sky}` : "";
  return (
    <span
      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${toneClass} ${ringClass} transition`}
    >
      <Component />
    </span>
  );
}
