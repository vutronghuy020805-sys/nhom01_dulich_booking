import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import AboutMemberCard from "@/components/about/AboutMemberCard";
import { aboutMembers } from "@/data/aboutMembers";

export const metadata = {
  title: "Về chúng tôi | VieGo",
  description:
    "Đội ngũ phát triển website VieGo - nhóm sinh viên đam mê du lịch và công nghệ.",
};

export default function AboutPage() {
  const leftMembers = aboutMembers.filter((m) => m.column === "left");
  const rightMembers = aboutMembers.filter((m) => m.column === "right");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="" />

      <main className="flex-1 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nhom01_dulich_booking/assets/logo-viego.png"
            alt=""
            className="w-[min(90vw,900px)] h-auto opacity-[0.06] select-none"
          />
        </div>

        <div className="relative max-w-350 mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-10 md:mb-14">
            <span className="text-slate-900">About </span>
            <span className="text-sky-500">us</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 items-start">
            <div className="space-y-5 md:space-y-6">
              {leftMembers.map((member) => (
                <AboutMemberCard key={member.mssv} member={member} />
              ))}
            </div>

            <div className="space-y-5 md:space-y-6 lg:-mt-10">
              {rightMembers.map((member) => (
                <AboutMemberCard key={member.mssv} member={member} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
