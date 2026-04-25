export default function SleepySuitcaseIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      role="img"
      aria-label="Chưa có đặt chỗ"
    >
      <rect x="22" y="34" width="76" height="56" rx="8" fill="#BAE6FD" />
      <rect x="22" y="34" width="76" height="56" rx="8" fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
      <rect x="48" y="26" width="24" height="10" rx="3" fill="none" stroke="#0EA5E9" strokeWidth="1.8" />
      <rect x="56" y="34" width="8" height="56" fill="#7DD3FC" opacity="0.6" />

      <circle cx="46" cy="60" r="2" fill="#0369A1" />
      <path d="M50 65c2 3 6 4 10 4s8-1 10-4" fill="none" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M66 58q2 -3 4 0" fill="none" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" />

      <g transform="translate(74 34)" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#0284C7">
        <text x="0" y="0" fontSize="10">Z</text>
        <text x="7" y="-6" fontSize="8">z</text>
        <text x="12" y="-12" fontSize="6">z</text>
      </g>

      <circle cx="18" cy="86" r="2.5" fill="#0369A1" />
      <circle cx="102" cy="86" r="2.5" fill="#0369A1" />
    </svg>
  );
}
