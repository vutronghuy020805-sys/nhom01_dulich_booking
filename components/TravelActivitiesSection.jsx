"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import TravelActivityCard from "./TravelActivityCard";

const categoryTabs = ["Điểm tham quan", "Tour", "Sân chơi"];

const activitiesByCategory = {
  "Điểm tham quan": [
    {
      id: "att-1",
      category: "Điểm tham quan",
      areaLabel: "Văn Miếu",
      title: "Tour đêm Văn Miếu Quốc Tử Giám - Tinh Hoa Đạo Học",
      price: 199000,
      image:
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/7309267331518/Temple-of-Literature-by-Night-in-Hanoi-86c8bb0d-de0d-4376-8f04-1f1b1f271447.png?_src=imagekit&tr=dpr-2,c-at_max,h-500,q-60,w-740",
      city: "Hà Nội",
    },
    {
      id: "att-2",
      category: "Điểm tham quan",
      areaLabel: "Phú Thượng",
      title: "KidZania tại Hà Nội",
      price: 290134,
      image:
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/5893776513120/KidZania-in-Hanoi-5a03d4ac-b962-4587-b4d1-89ae949947cd.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-500,q-60,w-740",
      city: "Hà Nội",
    },
    {
      id: "att-3",
      category: "Điểm tham quan",
      areaLabel: "Hòa Ninh",
      discountText: "Tiết kiệm 25%",
      title: "Sun World Ba Na Hills tại Đà Nẵng",
      oldPrice: 70000,
      price: 56701,
      image:
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/4234684001188/Sun-World-Ba-Den-Mountain-6fcdf8c0-a646-4ea4-9ad7-cf33115653e5.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-500,q-60,w-740",
      city: "Đà Nẵng",
    },
    {
      id: "att-4",
      category: "Điểm tham quan",
      areaLabel: "Tân Phú",
      discountText: "Tiết kiệm 30%",
      title: "Vé Khu du lịch Văn hóa Suối Tiên",
      oldPrice: 100000,
      price: 92784,
      image:
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/6825879014353/Suoi-Tien-Theme-Park-Tickets-b21a05c7-394d-4307-9b2e-46e85b7034c2.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-500,q-60,w-740",
      city: "TP. Hồ Chí Minh",
    },
    {
      id: "att-5",
      category: "Điểm tham quan",
      areaLabel: "Phú Thượng",
      discountText: "Tiết kiệm 20%",
      title: "Lotte World Aquarium | Hà Nội",
      oldPrice: 191003,
      price: 153509,
      image:
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/5309867582489/Lotte-World-Aquarium-Hanoi-b8b6251f-337c-4fa6-99bf-6ebbea6b2f7a.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-500,q-60,w-740",
      city: "Hà Nội",
    },
    {
      id: "att-6",
      category: "Điểm tham quan",
      areaLabel: "Sài Sơn",
      discountText: "Tiết kiệm 15%",
      title: "Vé xem chương trình Tinh hoa Bắc Bộ",
      oldPrice: 450000,
      price: 391753,
      image:
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/9045542634394/The-Quintessence-of-Tonkin-Show-Tickets-b17e2341-8540-45d2-8c9a-019f29bd78b8.png?_src=imagekit&tr=dpr-2,c-at_max,h-500,q-60,w-740",
      city: "Hà Nội",
    },
    {
      id: "att-7",
      category: "Điểm tham quan",
      areaLabel: "Vĩnh Tuy",
      title: "Vé khu vui chơi giáo dục VinKE & Thủy cung Times City Hà Nội",
      price: 190000,
      image:
        "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2001960416386/VinKE-Vinpearl-Aquarium-Times-City-Hanoi-27a1ccde-b2e2-4b89-a696-66171e253236.jpeg?_src=imagekit&tr=dpr-2,c-at_max,h-500,q-60,w-740",
      city: "Hà Nội",
    },
    {
      id: "att-8",
      category: "Điểm tham quan",
      areaLabel: "Hàng Bạc",
      discountText: "Tiết kiệm 20%",
      title: "Vé show múa rối nước Thăng Long (Không phải xếp hàng)",
      oldPrice: 150400,
      price: 124041,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=75&auto=format&fit=crop",
      city: "Hà Nội",
    },
  ],
  "Tour": [
    {
      id: "tour-1",
      category: "Tour",
      areaLabel: "Quảng Ninh",
      discountText: "Tiết kiệm 20%",
      title: "Tour Hạ Long 1 Ngày - Khám phá Vịnh Di Sản",
      oldPrice: 890000,
      price: 712000,
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=900&q=75&auto=format&fit=crop",
      city: "Hạ Long",
    },
    {
      id: "tour-2",
      category: "Tour",
      areaLabel: "Ninh Bình",
      discountText: "Tiết kiệm 15%",
      title: "Tour Ninh Bình 1 Ngày - Tràng An & Hang Múa",
      oldPrice: 750000,
      price: 637500,
      image:
        "https://ik.imagekit.io/tvlk/blog/2022/10/tour-ninh-binh-1-1024x683.jpeg?tr=dpr-2,w-675",
      city: "Ninh Bình",
    },
    {
      id: "tour-3",
      category: "Tour",
      areaLabel: "Quảng Nam",
      title: "Tour Hội An - Đêm Phố Cổ Lồng Đèn",
      price: 450000,
      image:
        "https://passionate-travel.com/wp-content/uploads/2023/02/dgsdfgdf.jpg",
      city: "Hội An",
    },
    {
      id: "tour-4",
      category: "Tour",
      areaLabel: "Đà Nẵng",
      discountText: "Tiết kiệm 10%",
      title: "Tour Bà Nà Hills - Cầu Vàng & Làng Pháp",
      oldPrice: 1250000,
      price: 1125000,
      image:
        "https://peacetour.com.vn/Upload/TourInformation/115e14b2-1280-4731-b128-95d1d5ba8c87/ba-na-hill-04.jpg",
      city: "Đà Nẵng",
    },
    {
      id: "tour-5",
      category: "Tour",
      areaLabel: "Lâm Đồng",
      discountText: "Tiết kiệm 18%",
      title: "Tour Đà Lạt City - Thành Phố Ngàn Hoa",
      oldPrice: 680000,
      price: 557600,
      image:
        "https://impresstravel.com/wp-content/uploads/2021/06/Love-Valley-in-Dalat.jpg",
      city: "Đà Lạt",
    },
    {
      id: "tour-6",
      category: "Tour",
      areaLabel: "Tiền Giang",
      title: "Tour Mekong 1 Ngày - Miệt Vườn Sông Nước",
      price: 520000,
      image:
        "https://galatravel.vn/pic/tour/3_cr600-4_636742617090669072_HasThumb.jpg",
      city: "Mỹ Tho",
    },
  ],
  "Sân chơi": [
    {
      id: "play-1",
      category: "Sân chơi",
      areaLabel: "Thủ Đức",
      discountText: "Tiết kiệm 25%",
      title: "Vé Công viên nước Đầm Sen",
      oldPrice: 250000,
      price: 187500,
      image:
        "https://www.damsenwaterpark.com.vn/wp-content/uploads/2011/12/khu-du-lich-dam-sen-2-1024x767.webp",
      city: "TP. Hồ Chí Minh",
    },
    {
      id: "play-2",
      category: "Sân chơi",
      areaLabel: "Long Biên",
      title: "Khu vui chơi trẻ em tiNiWorld Aeon Mall",
      price: 120000,
      image:
        "https://mythuattanviet.com/wp-content/uploads/2024/10/lollipop-candy-tree-tiniworld-2048x1536.jpg",
      city: "Hà Nội",
    },
    {
      id: "play-3",
      category: "Sân chơi",
      areaLabel: "Phú Thượng",
      discountText: "Tiết kiệm 18%",
      title: "Lotte World Aquarium | Hà Nội",
      oldPrice: 220000,
      price: 180400,
      image:
        "https://www.commercialinteriordesign.com/cloud/2021/07/08/USxTMAsC-Dubai-Aquarium-Underwater-Zoo.jpg",
      city: "Hà Nội",
    },
    {
      id: "play-4",
      category: "Sân chơi",
      areaLabel: "Phú Quốc",
      discountText: "Tiết kiệm 22%",
      title: "Vinpearl Safari Phú Quốc - Vườn Thú Mở",
      oldPrice: 650000,
      price: 507000,
      image:
        "https://dulichvuivn.com/wp-content/uploads/2023/05/kinh-nghiem-di-safari-phu-quoc-5-min.png",
      city: "Phú Quốc",
    },
    {
      id: "play-5",
      category: "Sân chơi",
      areaLabel: "Gia Lâm",
      discountText: "Tiết kiệm 30%",
      title: "Vé VinWonders Theme Park - Thành Phố Mặt Trời",
      oldPrice: 600000,
      price: 420000,
      image:
        "https://statics.vinpearl.com/vinwonders-phu-quoc-1_1649513067.jpg",
      city: "Hà Nội",
    },
    {
      id: "play-6",
      category: "Sân chơi",
      areaLabel: "Hoàn Kiếm",
      title: "Khu trải nghiệm gia đình Bảo tàng Dân tộc học",
      price: 80000,
      image:
        "https://image.vietgoing.com/destination/vietgoing_sjc2104034540.webp",
      city: "Hà Nội",
    },
  ],
};

function useItemsPerView() {
  const [items, setItems] = useState(4);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      if (w < 1280) return 3;
      return 4;
    };

    const onResize = () => setItems(compute());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return items;
}

export default function TravelActivitiesSection() {
  const [activeCategory, setActiveCategory] = useState("Điểm tham quan");
  const [index, setIndex] = useState(0);
  const itemsPerView = useItemsPerView();

  const activities = useMemo(
    () => activitiesByCategory[activeCategory] || [],
    [activeCategory]
  );

  const maxIndex = Math.max(0, activities.length - itemsPerView);
  const safeIndex = Math.min(index, maxIndex);
  const canPrev = safeIndex > 0;
  const canNext = safeIndex < maxIndex;

  const slideWidthPct = activities.length ? 100 / itemsPerView : 100;
  const translatePct = safeIndex * slideWidthPct;

  const handlePrev = () => canPrev && setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => canNext && setIndex((i) => Math.min(maxIndex, i + 1));

  const handleTabClick = (category) => {
    setActiveCategory(category);
    setIndex(0);
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-9 h-9 rounded-lg bg-[#ff7a8a] text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4l6 6" />
              <path d="M14 14l6 6" />
              <path d="M20 4l-6 6" />
              <path d="M10 14l-6 6" />
            </svg>
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Hoạt động du lịch
          </h2>
        </div>
        <p className="text-gray-500 mb-6 ml-1">
          Đi cùng người thân vừa vui vừa thích
        </p>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1 scrollbar-thin">
          {categoryTabs.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleTabClick(category)}
                className={
                  "shrink-0 px-5 py-2 rounded-full text-sm font-medium transition " +
                  (isActive
                    ? "bg-blue-700 text-white shadow"
                    : "bg-gray-100 text-blue-700 hover:bg-gray-200")
                }
              >
                {category}
              </button>
            );
          })}
        </div>

        {activities.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            Chưa có hoạt động cho danh mục này. Hãy thử chọn tab khác.
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              aria-label="Hoạt động trước"
              onClick={handlePrev}
              disabled={!canPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${translatePct}%)` }}
              >
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="shrink-0 px-2"
                    style={{ width: `${slideWidthPct}%` }}
                  >
                    <TravelActivityCard activity={activity} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Hoạt động tiếp theo"
              onClick={handleNext}
              disabled={!canNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-blue-700 font-semibold px-8 py-3 rounded-full shadow-sm border border-gray-100 transition"
          >
            Xem tất cả
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
