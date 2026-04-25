import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1 max-w-350 mx-auto px-4 lg:px-10 py-6 md:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
          <AccountSidebar />
          <div className="space-y-6 md:space-y-8 min-w-0">{children}</div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
