import StayTypeCard from "./StayTypeCard";

const stays = [
  {
    id: "villa-vungtau",
    title: "Villa Vũng Tàu",
    category: "Villa",
    city: "Vũng Tàu",
    image: "/assets/stays/villa-vungtau.jpg",
  },
  {
    id: "villa-dalat",
    title: "Biệt thự ở Đà Lạt",
    category: "Biệt thự",
    city: "Đà Lạt",
    image: "/assets/stays/villa-dalat.jpg",
  },
  {
    id: "villa-danang",
    title: "Biệt thự ở Đà Nẵng",
    category: "Biệt thự",
    city: "Đà Nẵng",
    image: "/assets/stays/villa-danang.jpg",
  },
  {
    id: "homestay-hanoi",
    title: "Homestay Hà Nội",
    category: "Homestay",
    city: "Hà Nội",
    image: "/assets/stays/homestay-hanoi.jpg",
  },
  {
    id: "homestay-hue",
    title: "Homestay Huế",
    category: "Homestay",
    city: "Huế",
    image: "/assets/stays/homestay-hue.jpg",
  },
  {
    id: "apartment-nhatrang",
    title: "Căn hộ Nha Trang",
    category: "Căn hộ",
    city: "Nha Trang",
    image: "/assets/stays/apartment-nhatrang.webp",
  },
];

export default function MoreThanHotelsSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          Chúng tôi không chỉ có khách sạn
        </h2>
        <p className="text-gray-500 mb-8">
          Khám phá nhiều loại hình lưu trú phù hợp với nhu cầu du lịch của bạn
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stays.map((stay) => (
            <StayTypeCard key={stay.id} stay={stay} />
          ))}
        </div>
      </div>
    </section>
  );
}
