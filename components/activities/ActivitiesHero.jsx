import ActivitiesSearchBar from "./ActivitiesSearchBar";
import ActivitiesCategoryTabs from "./ActivitiesCategoryTabs";

export default function ActivitiesHero({
  destination,
  onDestinationChange,
  keyword,
  onKeywordChange,
  onSearch,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <section id="activities-search" className="relative">
      <div
        className="relative h-[420px] md:h-[480px] w-full bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            "url('/nhom01_dulich_booking/assets/activities/hero/activities-hero.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />

        <div className="relative z-30 w-full max-w-350 mx-auto px-4 lg:px-10 pb-16 md:pb-20">
          <ActivitiesSearchBar
            destination={destination}
            onDestinationChange={onDestinationChange}
            keyword={keyword}
            onKeywordChange={onKeywordChange}
            onSearch={onSearch}
          />
        </div>
      </div>

      <div className="relative z-20 max-w-350 mx-auto px-4 lg:px-10 -mt-8 md:-mt-10">
        <ActivitiesCategoryTabs
          activeCategory={activeCategory}
          onChange={onCategoryChange}
        />
      </div>
    </section>
  );
}
