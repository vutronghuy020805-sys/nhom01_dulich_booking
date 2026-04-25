import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import VillaHero from "./VillaHero";
import VillaSearchCard from "./VillaSearchCard";
import VillaHighlightsSection from "./VillaHighlightsSection";
import VillaBenefitsSection from "./VillaBenefitsSection";
import VillaRecommendedDestinations from "./VillaRecommendedDestinations";
import VillaInfoContentSection from "./VillaInfoContentSection";

// Template page chung cho 2 trang lưu trú riêng tư:
// /biet-thu (villaContent) và /can-ho (apartmentContent).
export default function StayPage({ content }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Khách sạn" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: content.breadcrumbLabel }]} />
        </div>

        <VillaHero
          title={content.hero.title}
          description={content.hero.description}
        />

        <div className="max-w-350 mx-auto px-4 lg:px-10 -mt-24 md:-mt-32 relative z-10">
          <VillaSearchCard
            basePath={content.basePath}
            placeholder={content.search.placeholder}
          />
        </div>

        <VillaHighlightsSection
          title={content.highlights.title}
          description={content.highlights.description}
          items={content.highlights.items}
        />

        <VillaBenefitsSection
          title={content.benefits.title}
          items={content.benefits.items}
        />

        <VillaRecommendedDestinations
          title={content.destinations.title}
          items={content.destinations.items}
          basePath={content.basePath}
        />

        <VillaInfoContentSection
          title={content.info.title}
          blocks={content.info.blocks}
        />
      </main>

      <FooterSection />
    </div>
  );
}
