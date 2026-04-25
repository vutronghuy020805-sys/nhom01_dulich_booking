import HowToBookBusStepCard from "./HowToBookBusStepCard";
import {
  busBookingSteps,
  busBookingGroupVisuals,
} from "./busBookingSteps";

function GroupBlock({ visual, steps }) {
  const visualLeft = visual.layout === "visual-left";

  const visualBlock = (
    <div className="w-full">
      <div
        className="w-full aspect-[4/3] md:aspect-[5/4] rounded-2xl bg-slate-100 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${visual.src}')` }}
        role="img"
        aria-label={visual.alt}
      />
    </div>
  );

  const cardsBlock = (
    <div className="flex flex-col gap-5 md:max-w-md">
      {steps.map((s) => (
        <HowToBookBusStepCard
          key={s.id}
          number={s.id}
          title={s.title}
          description={s.description}
        />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
      {visualLeft ? (
        <>
          <div className="order-1 flex justify-center md:justify-start">
            {visualBlock}
          </div>
          <div className="order-2 flex justify-center md:justify-start">
            {cardsBlock}
          </div>
        </>
      ) : (
        <>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            {visualBlock}
          </div>
          <div className="order-2 md:order-1 flex justify-center md:justify-end">
            {cardsBlock}
          </div>
        </>
      )}
    </div>
  );
}

export default function HowToBookBusSection() {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-20 md:pb-24">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 text-center mb-10 md:mb-14">
        Cách đặt vé xe khách trực tuyến tại VieGo
      </h2>

      <div className="flex flex-col gap-12 md:gap-16">
        {busBookingGroupVisuals.map((g) => {
          const steps = busBookingSteps.filter((s) => s.group === g.group);
          return <GroupBlock key={g.group} visual={g} steps={steps} />;
        })}
      </div>
    </section>
  );
}
