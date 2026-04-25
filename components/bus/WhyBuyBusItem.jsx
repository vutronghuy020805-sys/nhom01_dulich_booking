export default function WhyBuyBusItem({
  title,
  description,
  illustration,
  layout,
}) {
  const rightImage = layout === "right-image";

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
      <div
        className={
          "shrink-0 flex justify-center md:w-64 " +
          (rightImage ? "md:order-2" : "")
        }
      >
        {illustration}
      </div>
      <div
        className={
          "flex-1 max-w-2xl w-full text-center md:text-left " +
          (rightImage ? "md:order-1" : "")
        }
      >
        <h3 className="text-lg md:text-xl font-bold text-slate-900">
          {title}
        </h3>
        <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
