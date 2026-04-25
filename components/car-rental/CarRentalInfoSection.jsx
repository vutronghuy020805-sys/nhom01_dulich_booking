import { carRentalInfoSections } from "@/data/carRentalInfoSections";
import CarRentalInfoBlock from "./CarRentalInfoBlock";

export default function CarRentalInfoSection() {
  return (
    <section className="bg-white py-14 md:py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
        {carRentalInfoSections.map((block) => (
          <CarRentalInfoBlock key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
