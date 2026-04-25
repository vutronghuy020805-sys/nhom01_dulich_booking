function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] || "";
  const prev = parts[parts.length - 2] || "";
  return (prev.charAt(0) + last.charAt(0)).toUpperCase();
}

export default function AboutMemberCard({ member }) {
  const { name, mssv, role, github, image } = member;
  const initials = getInitials(name);

  return (
    <article className="bg-slate-100/80 backdrop-blur-sm rounded-3xl p-4 md:p-5 shadow-sm flex items-start gap-4 md:gap-5">
      <div className="relative shrink-0 w-24 h-28 md:w-28 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <span className="text-2xl md:text-3xl font-bold text-slate-500 select-none">
          {initials}
        </span>
      </div>

      <div className="flex-1 min-w-0 pt-1">
        <h3 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
          {name}
        </h3>
        <dl className="mt-2 space-y-1 text-sm text-slate-700">
          <div>
            <span className="font-semibold">MSSV: </span>
            <span>{mssv}</span>
          </div>
          <div>
            <span className="font-semibold">Vai trò: </span>
            <span>{role || ""}</span>
          </div>
          <div className="truncate">
            <span className="font-semibold">Github: </span>
            {github ? (
              <a
                href={
                  github.startsWith("http") ? github : `https://${github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-700 hover:underline"
              >
                {github}
              </a>
            ) : (
              <span />
            )}
          </div>
        </dl>
      </div>
    </article>
  );
}
