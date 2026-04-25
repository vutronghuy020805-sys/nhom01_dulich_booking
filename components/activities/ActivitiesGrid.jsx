import ActivityCard from "./ActivityCard";

export default function ActivitiesGrid({ activities, highlightQuery = "" }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center text-slate-500">
        Không tìm thấy hoạt động phù hợp. Hãy thử đổi điểm đến, danh mục hoặc
        từ khoá khác.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          highlightQuery={highlightQuery}
        />
      ))}
    </div>
  );
}
