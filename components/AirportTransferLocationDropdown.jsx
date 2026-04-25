"use client";

export default function AirportTransferLocationDropdown({
  recentLabel,
  recentItems = [],
  sectionLabel,
  items,
  onSelect,
}) {
  const renderItem = (item) => (
    <button
      key={item.id}
      type="button"
      onClick={() => onSelect(item)}
      className="w-full flex items-center justify-between gap-4 px-5 py-3 hover:bg-sky-50 transition-colors text-left border-t border-gray-100"
    >
      <div className="min-w-0 flex-1">
        <div className="font-bold text-gray-900 truncate">{item.name}</div>
        <div className="text-sm text-gray-500 truncate">{item.subtitle}</div>
      </div>
      <span className="shrink-0 text-xs font-semibold text-[#55B6FF] border border-[#55B6FF]/60 bg-sky-50/50 px-3 py-1 rounded-full">
        {item.typeLabel}
      </span>
    </button>
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[560px] max-w-[92vw]">
      {recentItems.length > 0 && recentLabel && (
        <>
          <div className="px-5 pt-4 pb-2">
            <h4 className="font-bold text-gray-900 text-[15px]">{recentLabel}</h4>
          </div>
          {recentItems.map(renderItem)}
        </>
      )}

      <div className="px-5 pt-3 pb-2">
        <h4 className="font-bold text-gray-900 text-[15px]">{sectionLabel}</h4>
      </div>

      <div className="max-h-[360px] overflow-y-auto pb-2">
        {items.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-8">
            Không tìm thấy kết quả phù hợp
          </div>
        ) : (
          items.map(renderItem)
        )}
      </div>
    </div>
  );
}
