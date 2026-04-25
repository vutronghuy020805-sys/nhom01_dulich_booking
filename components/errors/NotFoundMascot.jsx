export default function NotFoundMascot({ className = "" }) {
  return (
    <svg
      viewBox="0 0 260 320"
      className={className}
      role="img"
      aria-label="Nhân vật VieGo buồn vì bị lạc"
    >
      <defs>
        <radialGradient id="glow404" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#DBEAFE" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="furGrad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="60%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>

        <linearGradient id="jersey" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      <ellipse cx="130" cy="150" rx="120" ry="130" fill="url(#glow404)" />

      <g filter="url(#softBlur)">
        <ellipse
          cx="130"
          cy="130"
          rx="90"
          ry="88"
          fill="url(#furGrad)"
        />
      </g>

      <g fill="#93C5FD" opacity="0.55">
        <circle cx="55" cy="100" r="10" />
        <circle cx="68" cy="75" r="9" />
        <circle cx="95" cy="55" r="11" />
        <circle cx="130" cy="48" r="13" />
        <circle cx="165" cy="55" r="11" />
        <circle cx="195" cy="75" r="9" />
        <circle cx="210" cy="102" r="10" />
        <circle cx="215" cy="135" r="9" />
        <circle cx="50" cy="135" r="9" />
        <circle cx="60" cy="165" r="10" />
        <circle cx="205" cy="165" r="10" />
      </g>
      <g fill="#DBEAFE" opacity="0.8">
        <circle cx="80" cy="75" r="4" />
        <circle cx="105" cy="58" r="4" />
        <circle cx="180" cy="65" r="4" />
        <circle cx="200" cy="90" r="4" />
      </g>

      <ellipse cx="42" cy="128" rx="16" ry="22" fill="url(#furGrad)" />
      <ellipse cx="218" cy="128" rx="16" ry="22" fill="url(#furGrad)" />

      <g stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M98 115 q7 -8 18 -4" />
        <path d="M162 115 q-7 -8 -18 -4" />
      </g>
      <g fill="#0F172A">
        <ellipse cx="108" cy="135" rx="5.5" ry="6.5" />
        <ellipse cx="152" cy="135" rx="5.5" ry="6.5" />
      </g>
      <g fill="#FFFFFF">
        <circle cx="110" cy="132" r="1.8" />
        <circle cx="154" cy="132" r="1.8" />
      </g>

      <g fill="#F8A5B5" opacity="0.7">
        <ellipse cx="95" cy="160" rx="11" ry="8" />
        <ellipse cx="165" cy="160" rx="11" ry="8" />
      </g>

      <path
        d="M116 168 q14 12 28 0 q-2 12 -14 12 q-12 0 -14 -12z"
        fill="#BE123C"
      />
      <path
        d="M124 175 q6 4 12 0"
        fill="#F472B6"
        opacity="0.6"
      />

      <g transform="translate(0 10)">
        <path
          d="M70 225 q60 -20 120 0 l10 60 q-70 15 -140 0z"
          fill="url(#jersey)"
        />
        <path
          d="M78 233 q52 -17 104 0 l-3 10 q-50 -15 -98 0z"
          fill="#DBEAFE"
          opacity="0.9"
        />
        <rect x="75" y="255" width="110" height="14" fill="#F8FAFC" />
        <rect x="110" y="275" width="40" height="22" rx="3" fill="#FBBF24" />
        <path
          d="M118 285 l4 -10 h16 l4 10 v7 h-24z"
          fill="#F87171"
        />
        <rect x="126" y="278" width="8" height="6" fill="#DC2626" />

        <path
          d="M70 225 q-10 5 -10 18 q0 10 8 15 l6 -15z"
          fill="url(#jersey)"
        />
        <path
          d="M190 225 q10 5 10 18 q0 10 -8 15 l-6 -15z"
          fill="url(#jersey)"
        />
        <ellipse cx="62" cy="255" rx="10" ry="12" fill="url(#furGrad)" />
        <ellipse cx="198" cy="255" rx="10" ry="12" fill="url(#furGrad)" />
      </g>

      <ellipse cx="130" cy="310" rx="70" ry="6" fill="#BFDBFE" opacity="0.5" />
    </svg>
  );
}
