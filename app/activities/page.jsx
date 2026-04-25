import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import ActivitiesClient from "@/components/activities/ActivitiesClient";
import MotionReveal from "@/components/motion/MotionReveal";

export const metadata = {
  title: "Hoạt động du lịch | VieGo",
  description:
    "Khám phá điểm tham quan, trải nghiệm ẩm thực, văn hoá, trò chơi và tour du lịch cùng VieGo.",
};

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Hoạt động" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Hoạt động" }]} />
        </div>

        <MotionReveal>
          <ActivitiesClient />
        </MotionReveal>
      </main>

      <FooterSection />
    </div>
  );
}
