"use client";

import { useState } from "react";

const seed = (str) => {
  let h = 0;
  for (const c of String(str || "")) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return h;
};

const amenityMatches = (amenities, patterns) => {
  if (!Array.isArray(amenities)) return false;
  return amenities.some((a) => patterns.some((p) => p.test(a)));
};

const featureMatches = (roomSections, patterns) => {
  if (!Array.isArray(roomSections)) return false;
  return roomSections.some((section) =>
    (section.features || []).some((f) => patterns.some((p) => p.test(f)))
  );
};

const ratePlanMatches = (roomSections, patterns) => {
  if (!Array.isArray(roomSections)) return false;
  return roomSections.some((section) =>
    (section.ratePlans || []).some((plan) =>
      patterns.some(
        (p) =>
          p.test(plan.headline || "") ||
          p.test(plan.planLabel || "") ||
          (plan.benefits || []).some((b) => p.test(b.text || ""))
      )
    )
  );
};

const buildHotelGuestFaq = (hotel) => {
  const amenities = hotel.amenities || [];
  const rooms = hotel.roomSections || [];
  const name = hotel.name;
  const hash = seed(hotel.id || name);

  const hasBreakfast =
    amenityMatches(amenities, [/bữa sáng/i]) ||
    ratePlanMatches(rooms, [/bữa sáng|ăn sáng/i]);

  const hasParking = amenityMatches(amenities, [
    /bãi đỗ xe/i,
    /chỗ đậu xe/i,
    /parking/i,
  ]);

  const hasRestaurant =
    amenityMatches(amenities, [/nhà hàng/i]) ||
    hotel.type === "Resort" ||
    hotel.stars >= 5;

  const hasShuttle =
    amenityMatches(amenities, [/đưa đón sân bay|shuttle|sân bay/i]) ||
    (hotel.stars >= 5 && hash % 3 !== 2);

  const hasSpa =
    amenityMatches(amenities, [/spa/i]) ||
    hotel.type === "Resort" ||
    (hotel.stars === 5 && hash % 4 !== 0);

  const hasWifi = amenityMatches(amenities, [/wifi|wi-fi/i]);

  const allowPet =
    amenityMatches(amenities, [/thú nuôi|pet/i]) || hash % 5 === 0;

  const hasPool = amenityMatches(amenities, [/hồ bơi|bể bơi|pool/i]);

  const hasPrivateBathroom =
    featureMatches(rooms, [/vòi tắm|phòng tắm/i]) || true;

  const hasBalcony = featureMatches(rooms, [/ban công|sân hiên/i]);

  return [
    {
      id: "breakfast",
      q: "Họ có phục vụ bữa sáng không?",
      a: hasBreakfast
        ? `Có. Tại ${name} bạn có thể chọn gói phòng đã bao gồm bữa sáng — xem lựa chọn "Có Ăn Sáng" trong phần Chọn phòng. Một số gói khác chưa bao gồm bữa sáng, vui lòng kiểm tra từng gói trước khi đặt.`
        : `Hiện không phải gói phòng nào tại ${name} cũng bao gồm bữa sáng. Bạn nên kiểm tra từng lựa chọn trong phần Chọn phòng hoặc liên hệ trực tiếp chỗ nghỉ để xác nhận.`,
    },
    {
      id: "parking",
      q: "Chỗ nghỉ có chỗ đỗ xe không?",
      a: hasParking
        ? `Có. ${name} có bãi đỗ xe dành cho khách lưu trú. Vui lòng xác nhận với lễ tân khi nhận phòng nếu bạn đến bằng xe riêng.`
        : `Chúng tôi chưa ghi nhận bãi đỗ xe riêng tại ${name}. Bạn có thể liên hệ trực tiếp chỗ nghỉ để hỏi về phương án đỗ xe lân cận.`,
    },
    {
      id: "restaurant",
      q: "Chỗ nghỉ có nhà hàng không?",
      a: hasRestaurant
        ? `Có. ${name} có nhà hàng phục vụ khách lưu trú. Thực đơn và giờ hoạt động có thể được xác nhận thêm với lễ tân.`
        : `${name} hiện không có nhà hàng ngay trong khuôn viên. Trong khu vực có nhiều lựa chọn ẩm thực, bạn có thể tham khảo các nhà hàng lân cận.`,
    },
    {
      id: "shuttle",
      q: "Chỗ nghỉ có dịch vụ đưa đón sân bay không?",
      a: hasShuttle
        ? `Có. ${name} hỗ trợ dịch vụ đưa đón sân bay — vui lòng liên hệ chỗ nghỉ trước ít nhất 24 giờ để sắp xếp lịch đón tiễn.`
        : `Chúng tôi chưa ghi nhận dịch vụ đưa đón sân bay chính thức tại ${name}. Bạn có thể liên hệ lễ tân để được tư vấn về taxi hoặc xe riêng.`,
    },
    {
      id: "spa",
      q: "Chỗ nghỉ có spa không?",
      a: hasSpa
        ? `Có. ${name} có khu spa phục vụ khách lưu trú. Vui lòng liên hệ lễ tân để đặt lịch trải nghiệm dịch vụ.`
        : `Hiện chưa có thông tin về dịch vụ spa tại ${name}. Trong khu vực có thể có các spa lân cận mà bạn có thể tham khảo.`,
    },
    {
      id: "wifi",
      q: "Chỗ nghỉ có chính sách Wi-Fi ra sao?",
      a: hasWifi
        ? `${name} cung cấp Wi-Fi miễn phí ở khu vực chung và trong phòng. Bạn có thể yêu cầu mật khẩu tại lễ tân khi nhận phòng.`
        : `Vui lòng kiểm tra trực tiếp với ${name} về chính sách Wi-Fi trước khi đến, vì chúng tôi chưa có thông tin xác nhận.`,
    },
    {
      id: "pet",
      q: "Chỗ nghỉ có cho mang thú nuôi không?",
      a: allowPet
        ? `${name} có thể chấp nhận thú nuôi theo quy định. Vui lòng liên hệ chỗ nghỉ trước để xác nhận phụ phí và điều kiện cụ thể.`
        : `${name} hiện không hỗ trợ khách mang theo thú nuôi. Nếu có nhu cầu đặc biệt, bạn nên hỏi chỗ nghỉ trước để được tư vấn phương án.`,
    },
    {
      id: "pool",
      q: "Hồ bơi có hoạt động không?",
      a: hasPool
        ? `Có. ${name} có hồ bơi phục vụ khách lưu trú. Giờ hoạt động có thể thay đổi theo mùa — vui lòng kiểm tra với lễ tân khi nhận phòng.`
        : `Hiện chưa có thông tin về hồ bơi tại ${name}. Bạn có thể liên hệ chỗ nghỉ để biết thêm chi tiết.`,
    },
    {
      id: "bathroom",
      q: "Chỗ nghỉ có phòng có phòng tắm riêng không?",
      a: hasPrivateBathroom
        ? `Các phòng tại ${name} đều có phòng tắm riêng với vòi tắm đứng. Chi tiết tiện nghi từng hạng phòng bạn có thể xem ở phần Chọn phòng.`
        : `Tùy theo hạng phòng. Vui lòng xem chi tiết trong phần Chọn phòng hoặc liên hệ lễ tân để biết thêm thông tin.`,
    },
    {
      id: "balcony",
      q: "Chỗ nghỉ có phòng có ban công không?",
      a: hasBalcony
        ? `Một số loại phòng tại ${name} có ban công hoặc sân hiên riêng — bạn có thể xem chi tiết từng hạng phòng trong phần Chọn phòng để chọn loại phù hợp.`
        : `Không phải tất cả phòng tại ${name} đều có ban công. Vui lòng xem chi tiết từng hạng phòng trong phần Chọn phòng trước khi đặt.`,
    },
  ];
};

const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 text-slate-500 shrink-0 mt-0.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    className={
      "w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform " +
      (open ? "rotate-90" : "")
    }
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function GuestQuestionItem({ item, isOpen, onToggle }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-slate-50 transition"
      >
        <ChatIcon />
        <span className="flex-1 text-base font-medium text-slate-800 leading-snug">
          {item.q}
        </span>
        <ChevronIcon open={isOpen} />
      </button>
      {isOpen && (
        <div className="px-5 pb-4 pl-14 -mt-1 text-sm text-slate-600 leading-relaxed">
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function HotelGuestQuestionsSection({ hotel }) {
  const items = buildHotelGuestFaq(hotel);
  const [openId, setOpenId] = useState(null);
  const leftItems = items.slice(0, 5);
  const rightItems = items.slice(5);

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  const renderColumn = (list) => (
    <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100 bg-white overflow-hidden">
      {list.map((item) => (
        <GuestQuestionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );

  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">
        Thắc mắc của du khách
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {renderColumn(leftItems)}
        {renderColumn(rightItems)}
      </div>
    </section>
  );
}
