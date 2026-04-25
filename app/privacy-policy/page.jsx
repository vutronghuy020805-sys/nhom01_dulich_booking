import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import PrivacyPolicyPage from "@/components/legal/PrivacyPolicyPage";

export const metadata = {
  title: "Chính sách quyền riêng tư | VieGo",
  description:
    "VieGo cam kết bảo vệ thông tin cá nhân và quyền riêng tư của người dùng khi sử dụng nền tảng của chúng tôi.",
};

export default function PrivacyPolicyRoute() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <PrivacyPolicyPage />
      </main>

      <FooterSection />
    </div>
  );
}
