const benefits = [
  {
    id: "fit",
    title: "Phù hợp",
    description:
      "Với VieGo, nhiều lựa chọn từ xe riêng đến xe buýt sân bay, bạn có thể dễ dàng tìm lựa chọn phương tiện đến sân bay phù hợp nhất.",
    image: "/assets/airport-transfer/benefits/benefit-fit.png",
  },
  {
    id: "no-worry",
    title: "Không cần lo lắng",
    description:
      "Đặt trước để không phải xếp hàng tại sân bay. Giá cuối cùng đã bao gồm phí cầu đường và đậu xe, bạn không cần phải lo lắng phải trả thêm phí.",
    image: "/assets/airport-transfer/benefits/benefit-no-worry.png",
  },
  {
    id: "best-partner",
    title: "Đối tác tốt nhất",
    description:
      "Sự thoải mái của bạn là ưu tiên của chúng tôi. Vì thế, chúng tôi luôn chọn làm việc cùng những đối tác có nhiều kinh nghiệm tốt nhất trên thị trường.",
    image: "/assets/airport-transfer/benefits/benefit-best-partner.png",
  },
];

export default function AirportTransferBenefitsSection() {
  return (
    <section className="bg-white">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-14 md:py-20">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-10 md:mb-14">
          Tại sao tôi nên đặt xe đưa đón sân bay qua VieGo?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-14">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-36 h-36 md:w-40 md:h-40 flex items-center justify-center mb-4 md:mb-5">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-xs">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
