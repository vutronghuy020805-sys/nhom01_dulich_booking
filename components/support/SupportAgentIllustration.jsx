export default function SupportAgentIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      role="img"
      aria-label="Nhân viên hỗ trợ khách hàng VieGo"
    >
      <defs>
        <linearGradient id="lap-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="shirt-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>

      <g fill="#CBD5E1" opacity="0.6">
        <path d="M40 210c6-8 8-20 8-30 0-18-6-28-6-40 0-8 4-12 10-14-2 12 0 22 4 30 6 12 10 24 6 38-2 8-6 14-12 18z" />
        <path d="M25 210c3-6 5-15 5-22 0-12-4-18-4-24 0-6 3-9 7-10-1 8 0 14 3 20 4 8 6 16 4 26-1 5-3 9-7 12z" />
      </g>
      <g fill="#CBD5E1" opacity="0.6">
        <path d="M360 210c-6-8-8-20-8-30 0-18 6-28 6-40 0-8-4-12-10-14 2 12 0 22-4 30-6 12-10 24-6 38 2 8 6 14 12 18z" />
        <path d="M375 210c-3-6-5-15-5-22 0-12 4-18 4-24 0-6-3-9-7-10 1 8 0 14-3 20-4 8-6 16-4 26 1 5 3 9 7 12z" />
      </g>

      <g transform="translate(90 70)">
        <rect
          x="0"
          y="0"
          width="220"
          height="130"
          rx="8"
          fill="url(#lap-grad)"
          stroke="#94A3B8"
          strokeWidth="2"
        />
        <rect
          x="10"
          y="10"
          width="200"
          height="110"
          rx="4"
          fill="#F8FAFC"
        />
        <rect x="22" y="24" width="70" height="6" rx="3" fill="#BAE6FD" />
        <rect x="22" y="36" width="50" height="4" rx="2" fill="#E2E8F0" />
        <rect x="22" y="46" width="80" height="4" rx="2" fill="#E2E8F0" />
        <rect x="22" y="56" width="60" height="4" rx="2" fill="#E2E8F0" />
        <rect x="22" y="72" width="90" height="6" rx="3" fill="#BAE6FD" />
        <rect x="22" y="84" width="70" height="4" rx="2" fill="#E2E8F0" />
        <rect x="22" y="94" width="50" height="4" rx="2" fill="#E2E8F0" />

        <path
          d="M0 130h220l10 10H-10z"
          fill="#CBD5E1"
        />
      </g>

      <g transform="translate(170 110)">
        <path
          d="M15 35c-3-2-6-6-6-12 0-12 9-21 21-21s21 9 21 21c0 6-3 10-6 12v8c0 4-7 7-15 7s-15-3-15-7z"
          fill="#FDE68A"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        <path
          d="M9 23c0-14 10-24 21-24s21 10 21 24c0 3-1 5-2 7-1-8-4-14-10-17-4-2-9-2-13 0-5 2-7 6-9 10-3 5-5 7-7 7-1-2-1-4-1-7z"
          fill="#1F2937"
        />
        <circle cx="22" cy="25" r="2" fill="#1F2937" />
        <circle cx="38" cy="25" r="2" fill="#1F2937" />
        <path
          d="M24 32c2 3 5 4 6 4s4-1 6-4"
          fill="none"
          stroke="#1F2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M28 28c0-1 1-1 2-1M36 28c0-1 1-1 2-1"
          fill="none"
          stroke="#1F2937"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path
          d="M7 21c-3 0-5 2-5 5v4c0 3 2 5 5 5M53 21c3 0 5 2 5 5v4c0 3-2 5-5 5"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="2" y="30" width="6" height="8" rx="2" fill="#0EA5E9" />
        <rect x="52" y="30" width="6" height="8" rx="2" fill="#0EA5E9" />

        <path
          d="M10 60c3-8 9-12 20-12s17 4 20 12l4 20H6z"
          fill="url(#shirt-grad)"
        />
        <path
          d="M24 48c3 4 9 4 12 0l-3 8h-6z"
          fill="#F8FAFC"
        />
        <path
          d="M22 58c-3 5-5 10-6 14M38 58c3 5 5 10 6 14"
          fill="none"
          stroke="#FCD34D"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      <g fill="#FCD34D">
        <circle cx="110" cy="85" r="3" />
        <circle cx="300" cy="90" r="2.5" />
        <circle cx="305" cy="130" r="2" />
        <circle cx="95" cy="125" r="2" />
      </g>
      <g stroke="#FCD34D" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M108 75l4 4M310 80l-4 4M100 110l-4-2" />
      </g>
    </svg>
  );
}
