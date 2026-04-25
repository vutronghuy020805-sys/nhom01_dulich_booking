import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import BlogClient from "@/components/blog/BlogClient";
import MotionReveal from "@/components/motion/MotionReveal";

export const metadata = {
  title: "VieGo Blog | Cẩm nang du lịch Việt Nam",
  description:
    "Bài viết truyền cảm hứng, kinh nghiệm và mẹo du lịch Việt Nam từ đội ngũ VieGo.",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "VieGo Blog" }]} />
        </div>

        <MotionReveal>
          <BlogClient />
        </MotionReveal>
      </main>

      <FooterSection />
    </div>
  );
}
