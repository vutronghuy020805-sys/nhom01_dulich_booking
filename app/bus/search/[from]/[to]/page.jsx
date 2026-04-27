import { notFound } from "next/navigation";
import { Suspense } from "react";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import { busLocations } from "@/components/bus/busLocations";
import {
  findBusLocationById,
  generateBusSearchResults,
} from "@/components/bus/busSearchResults";
import BusSearchPageClient from "@/components/bus/BusSearchPageClient";

export function generateStaticParams() {
  const params = [];
  for (const f of busLocations) {
    for (const t of busLocations) {
      if (f.id !== t.id) params.push({ from: f.id, to: t.id });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { from, to } = await params;
  const fromLoc = findBusLocationById(from);
  const toLoc = findBusLocationById(to);
  if (!fromLoc || !toLoc) {
    return { title: "Không tìm thấy chuyến xe | VieGo" };
  }
  return {
    title: `Vé xe ${fromLoc.name} → ${toLoc.name} | VieGo`,
    description: `Tìm và đặt vé xe khách từ ${fromLoc.name} đến ${toLoc.name} trên VieGo.`,
  };
}

export default async function BusSearchPage({ params }) {
  const { from, to } = await params;
  const fromLoc = findBusLocationById(from);
  const toLoc = findBusLocationById(to);
  if (!fromLoc || !toLoc || fromLoc.id === toLoc.id) notFound();

  const { bestResults, allResults } = generateBusSearchResults(
    fromLoc.id,
    toLoc.id
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Vé xe khách" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb
            items={[
              { label: "Vé xe khách", href: "/bus" },
              { label: `${fromLoc.name} → ${toLoc.name}` },
            ]}
          />
        </div>

        <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-12">
          <Suspense fallback={null}>
            <BusSearchPageClient
              fromLoc={fromLoc}
              toLoc={toLoc}
              bestResults={bestResults}
              allResults={allResults}
            />
          </Suspense>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
