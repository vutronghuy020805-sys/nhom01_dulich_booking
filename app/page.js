import Hero from "@/components/Hero";
import StickyHeader from "@/components/StickyHeader";
import OffersSection from "@/components/OffersSection";
import DestinationsSection from "@/components/DestinationsSection";
import HotelChoicesSection from "@/components/HotelChoicesSection";
import TravelActivitiesSection from "@/components/TravelActivitiesSection";
import WhyBookSection from "@/components/WhyBookSection";
import FooterSection from "@/components/FooterSection";
import MotionReveal from "@/components/motion/MotionReveal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyHeader />

      <main className="flex-1">
        <Hero />

        <MotionReveal>
          <OffersSection />
        </MotionReveal>

        <MotionReveal>
          <DestinationsSection />
        </MotionReveal>

        <MotionReveal>
          <HotelChoicesSection />
        </MotionReveal>

        <MotionReveal>
          <TravelActivitiesSection />
        </MotionReveal>

        <MotionReveal>
          <WhyBookSection />
        </MotionReveal>
      </main>

      <FooterSection />
    </div>
  );
}
