export default function AirportTransferResultsHero() {
  return (
    <section className="bg-sky-500">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10 items-center">
          <div className="text-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
              Đến sân bay không còn mệt mỏi
              <br />
              VieGo giúp bạn tận hưởng trọn vẹn chuyến đi
            </h1>
            <p className="mt-4 text-sm md:text-[15px] text-white/90 leading-relaxed max-w-2xl">
              Biến chuyến đi đến và từ sân bay trở nên tiện lợi nhất có thể! Với
              nhiều lựa chọn phương tiện phù hợp với nhu cầu của bạn, hãy đặt
              ngay xe đưa đón sân bay hôm nay để bớt đi một nỗi lo nhé.
            </p>
          </div>

          <div className="justify-self-center lg:justify-self-end w-full max-w-sm">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 420 260"
      className="w-full h-auto drop-shadow-lg"
      role="img"
      aria-label="Dịch vụ đưa đón sân bay VieGo"
    >
      <defs>
        <linearGradient id="phoneGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="60" r="28" fill="#FCD34D" />
      <g fill="#FFFFFF" opacity="0.18">
        <circle cx="60" cy="40" r="8" />
        <circle cx="80" cy="210" r="6" />
        <circle cx="340" cy="220" r="10" />
        <circle cx="380" cy="70" r="5" />
      </g>

      <g transform="translate(130 50)">
        <rect
          x="0"
          y="0"
          width="170"
          height="200"
          rx="22"
          fill="url(#phoneGrad)"
          stroke="#0EA5E9"
          strokeWidth="3"
        />
        <rect x="14" y="20" width="142" height="160" rx="12" fill="#F8FAFC" />

        <g transform="translate(24 34)">
          <rect width="58" height="64" rx="8" fill="url(#cardGrad)" />
          <rect x="8" y="10" width="42" height="20" rx="3" fill="#FFFFFF" opacity="0.9" />
          <text
            x="29"
            y="47"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="#FFFFFF"
          >
            Book
          </text>
        </g>
        <g transform="translate(90 34)">
          <rect width="58" height="64" rx="8" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2" />
          <rect x="8" y="10" width="42" height="20" rx="3" fill="#0EA5E9" opacity="0.15" />
          <text
            x="29"
            y="47"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="#0369A1"
          >
            Booked
          </text>
        </g>

        <circle cx="85" cy="130" r="22" fill="#22C55E" />
        <polyline
          points="75,130 83,138 96,124"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect x="24" y="165" width="122" height="6" rx="3" fill="#E2E8F0" />
      </g>

      <g transform="translate(305 90)">
        <rect x="0" y="40" width="70" height="70" rx="6" fill="#0369A1" />
        <rect x="8" y="48" width="54" height="54" rx="3" fill="#F8FAFC" />
        <rect x="14" y="54" width="42" height="4" fill="#0EA5E9" />
        <rect x="14" y="62" width="32" height="4" fill="#94A3B8" />
        <rect x="14" y="70" width="40" height="4" fill="#94A3B8" />
        <rect x="14" y="78" width="28" height="4" fill="#94A3B8" />
        <rect x="14" y="86" width="36" height="4" fill="#94A3B8" />

        <circle cx="35" cy="18" r="18" fill="#FDE68A" />
        <rect x="22" y="22" width="26" height="16" rx="3" fill="#1F2937" />
        <rect x="26" y="18" width="18" height="8" rx="2" fill="#1F2937" />
        <rect x="28" y="20" width="4" height="3" fill="#FDE68A" />
      </g>
    </svg>
  );
}
