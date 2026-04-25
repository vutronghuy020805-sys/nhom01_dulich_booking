import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import TermsConditionsPage from "@/components/legal/TermsConditionsPage";

export const metadata = {
  title: "Điều khoản & Điều kiện | VieGo",
  description:
    "Điều khoản và điều kiện sử dụng dịch vụ VieGo: tài khoản, đặt chỗ, thanh toán, hủy/đổi/hoàn tiền, quyền và trách nhiệm các bên.",
};

export default function TermsConditionsRoute() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Điều khoản & Điều kiện" }]} />
        </div>

        <TermsConditionsPage />
      </main>

      <FooterSection />
    </div>
  );
}
