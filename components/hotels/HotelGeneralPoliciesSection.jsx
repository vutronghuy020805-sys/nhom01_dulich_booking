const CheckInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-slate-700 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h13" />
    <polyline points="13 7 18 12 13 17" />
    <path d="M5 4v16" />
  </svg>
);

const CheckOutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-slate-700 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 12h13" />
    <polyline points="14 7 19 12 14 17" />
    <path d="M4 4v16" />
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-slate-700 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const ChildrenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-slate-700 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="6" r="3" />
    <circle cx="16" cy="6" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
    <path d="M13 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
  </svg>
);

const AgeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-slate-700 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="6" r="3" />
    <path d="M12 9v13M8 14h8" />
  </svg>
);

const PetIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 text-slate-700 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="4" r="1.5" />
    <circle cx="18" cy="8" r="1.5" />
    <circle cx="4" cy="8" r="1.5" />
    <circle cx="8" cy="14" r="1.5" />
    <circle cx="14" cy="14" r="1.5" />
    <path d="M7 20c0-2 2-4 5-4s5 2 5 4-1 2-2 2H9c-1 0-2 0-2-2z" />
  </svg>
);

function PolicyRow({ icon, title, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 md:gap-8 px-6 py-5">
      <div className="flex items-start gap-3">
        {icon}
        <h4 className="font-bold text-slate-900">{title}</h4>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}

function CancellationText({ cancellation, linkText }) {
  if (!linkText || !cancellation?.includes(linkText)) {
    return <span>{cancellation}</span>;
  }
  const [before, after] = cancellation.split(linkText);
  return (
    <span>
      {before}
      <a href="#rooms" className="text-sky-600 hover:text-sky-700 underline">
        {linkText}
      </a>
      {after}
    </span>
  );
}

export default function HotelGeneralPoliciesSection({ hotel }) {
  const p = hotel.policies || {};
  const ageTitle = p.ageRestricted
    ? "Yêu cầu độ tuổi"
    : "Không giới hạn độ tuổi";

  return (
    <section
      id="policies"
      className="max-w-375 mx-auto px-6 lg:px-10 pt-12 scroll-mt-32"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
        Quy tắc chung
      </h2>
      <p className="text-slate-500 text-sm md:text-base mb-5">
        {hotel.name}
        {p.specialRequestAccepted ? " nhận" : " không nhận"} yêu cầu đặc biệt -
        gửi yêu cầu trong bước kế tiếp!
      </p>

      <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100 bg-white overflow-hidden">
        <PolicyRow icon={<CheckInIcon />} title="Nhận phòng">
          Từ {p.checkInFrom} - {p.checkInTo}
        </PolicyRow>

        <PolicyRow icon={<CheckOutIcon />} title="Trả phòng">
          Từ {p.checkOutFrom} - {p.checkOutTo}
        </PolicyRow>

        <PolicyRow icon={<InfoIcon />} title="Hủy đặt phòng/ Trả trước">
          <CancellationText
            cancellation={p.cancellation}
            linkText={p.cancellationLinkText}
          />
        </PolicyRow>

        <PolicyRow icon={<ChildrenIcon />} title="Trẻ em và giường">
          <div className="space-y-3">
            <div>
              <h5 className="font-bold text-slate-900 mb-1">
                Chính sách trẻ em
              </h5>
              <div className="whitespace-pre-line">{p.childrenNote}</div>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-1">
                Chính sách nôi (cũi) và giường phụ
              </h5>
              <div>{p.cribExtraBed}</div>
            </div>
          </div>
        </PolicyRow>

        <PolicyRow icon={<AgeIcon />} title={ageTitle}>
          {p.ageRestriction}
        </PolicyRow>

        <PolicyRow icon={<PetIcon />} title="Vật nuôi">
          {p.pets}
        </PolicyRow>
      </div>
    </section>
  );
}
