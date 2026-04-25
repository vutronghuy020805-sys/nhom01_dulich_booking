import WhyBuyBusItem from "./WhyBuyBusItem";
import { busBenefits } from "./busBenefits";

export default function WhyBuyBusOnlineSection() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-14 md:pt-16 pb-16 md:pb-20">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 text-center mb-10 md:mb-14">
        Vì sao bạn nên mua vé xe khách trực tuyến tại VieGo?
      </h2>

      <div className="flex flex-col gap-10 md:gap-14">
        {busBenefits.map((item) => (
          <WhyBuyBusItem
            key={item.id}
            title={item.title}
            description={item.description}
            illustration={item.illustration}
            layout={item.layout}
          />
        ))}
      </div>
    </section>
  );
}
