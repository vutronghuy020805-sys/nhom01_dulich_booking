import Breadcrumb from "@/components/common/Breadcrumb";

export default function BusDestinationHero({
  title,
  heroImage,
  breadcrumbLabel,
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-slate-700"
        style={{ backgroundImage: `url('${heroImage}')` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-900/40 to-slate-900/60" />

      <div className="relative max-w-375 mx-auto px-6 lg:px-10 pt-6 md:pt-8 pb-48 md:pb-56">
        <Breadcrumb
          variant="light"
          items={[
            { label: "Vé xe khách", href: "/bus" },
            { label: breadcrumbLabel },
          ]}
        />

        <h1 className="mt-6 md:mt-10 text-2xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow">
          {title}
        </h1>
      </div>
    </section>
  );
}
