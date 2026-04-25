import { Suspense } from "react";
import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import BusDestinationHero from "@/components/bus/BusDestinationHero";
import BusSearchForm from "@/components/bus/BusSearchForm";
import BusNewUserCouponSection from "@/components/bus/BusNewUserCouponSection";
import LatestArticlesSection from "@/components/flights/LatestArticlesSection";
import { busLatestArticles } from "@/components/bus/busLatestArticles";
import {
  busDestinationPages,
  findBusDestinationBySlug,
} from "@/components/bus/busDestinationPages";
import BusDestinationArticleSection from "@/components/bus/BusDestinationArticleSection";
import { getBusDestinationArticle } from "@/components/bus/busDestinationArticles";

export function generateStaticParams() {
  return busDestinationPages.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = findBusDestinationBySlug(slug);
  if (!page) return { title: "Vé xe khách | VieGo" };
  return {
    title: `${page.title} | VieGo`,
    description: `Đặt ${page.title.toLowerCase()} giá tốt và nhiều khuyến mãi qua VieGo.`,
  };
}

export default async function BusDestinationPage({ params }) {
  const { slug } = await params;
  const page = findBusDestinationBySlug(slug);
  if (!page) notFound();

  const articleBlocks = getBusDestinationArticle(slug);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Vé xe khách" />

      <main className="flex-1">
        <div className="relative">
          <BusDestinationHero
            title={page.heroTitle}
            heroImage={page.heroImage}
            breadcrumbLabel={page.breadcrumbLabel}
          />

          <div className="max-w-375 mx-auto px-6 lg:px-10">
            <div className="-mt-36 md:-mt-44 relative z-10">
              <Suspense fallback={null}>
                <BusSearchForm initialToId={page.prefillDestinationId} />
              </Suspense>
            </div>
          </div>
        </div>

        <BusNewUserCouponSection />
        <LatestArticlesSection articles={busLatestArticles} />
        <BusDestinationArticleSection blocks={articleBlocks} />
      </main>

      <FooterSection />
    </div>
  );
}
