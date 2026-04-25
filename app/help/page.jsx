import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import HelpCenter from "@/components/help/HelpCenter";

export const metadata = {
  title: "Trung tâm Hỗ trợ | VieGo",
  description:
    "Trung tâm hỗ trợ khách hàng VieGo - câu hỏi thường gặp, liên hệ và phân loại theo sản phẩm.",
};

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <HelpCenter />
      </main>

      <FooterSection />
    </div>
  );
}
