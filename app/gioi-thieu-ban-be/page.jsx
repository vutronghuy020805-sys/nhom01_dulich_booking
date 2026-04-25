import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import ReferralHero from "@/components/referral/ReferralHero";
import ReferralHowItWorks from "@/components/referral/ReferralHowItWorks";
import ReferralBenefits from "@/components/referral/ReferralBenefits";
import ReferralTerms from "@/components/referral/ReferralTerms";
import ReferralCTA from "@/components/referral/ReferralCTA";

export const metadata = {
  title: "Giới thiệu bạn bè | VieGo Affiliate",
  description:
    "Nhận đến 600.000 Xu VieGo cho mỗi lượt giới thiệu thành công. Tham gia chương trình VieGo Affiliate ngay hôm nay.",
};

export default function ReferAFriendPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Giới thiệu bạn bè" }]} />
        </div>

        <ReferralHero />

        <ReferralHowItWorks />

        <ReferralBenefits />

        <ReferralTerms />

        <ReferralCTA />
      </main>

      <FooterSection />
    </div>
  );
}
