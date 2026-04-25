"use client";

import { useState } from "react";

export default function AirportTransferPartnerLogo({ partner }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="h-20 md:h-24 bg-white rounded-lg border border-slate-100 flex items-center justify-center p-3 md:p-4 transition hover:border-slate-200 hover:shadow-sm"
      title={partner.name}
    >
      {failed || !partner.logo ? (
        <span className="text-xs md:text-sm font-semibold text-slate-700 text-center">
          {partner.name}
        </span>
      ) : (
        <img
          src={partner.logo}
          alt={partner.name}
          onError={() => setFailed(true)}
          className="max-w-full max-h-10 md:max-h-12 object-contain"
          loading="lazy"
        />
      )}
    </div>
  );
}
