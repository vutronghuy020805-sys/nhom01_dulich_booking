"use client";

import { useState } from "react";
import FaqAccordionItem from "./FaqAccordionItem";

const faqs = [
  {
    id: "faq-1",
    question: "Cần đến trước giờ bay bao lâu?",
    answer:
      "Bạn nên có mặt tại sân bay trước giờ khởi hành khoảng 2 tiếng đối với chuyến bay nội địa và 3 tiếng đối với chuyến bay quốc tế.",
  },
  {
    id: "faq-2",
    question: "Giấy tờ cần mang khi check-in gồm những gì?",
    answer:
      "Bạn cần mang giấy tờ tùy thân hợp lệ như CCCD, hộ chiếu hoặc giấy khai sinh đối với trẻ em, tùy theo quy định của hãng bay.",
  },
  {
    id: "faq-3",
    question: "Tôi có thể mua vé trước và trả tiền sau được không?",
    answer:
      "Tùy từng chương trình và đối tác thanh toán, VieGo có thể hỗ trợ các hình thức thanh toán linh hoạt cho một số dịch vụ nhất định.",
  },
  {
    id: "faq-4",
    question: "Mua vé bay trên VieGo có xuất hóa đơn VAT không?",
    answer:
      "Bạn có thể kiểm tra thông tin xuất hóa đơn trong quá trình đặt vé hoặc liên hệ bộ phận hỗ trợ để được hướng dẫn chi tiết.",
  },
  {
    id: "faq-5",
    question:
      "Giá vé dành cho trẻ em sẽ được tính như thế nào trên các chuyến bay?",
    answer:
      "Giá vé trẻ em phụ thuộc vào từng hãng bay, độ tuổi của trẻ và loại hành trình, vui lòng kiểm tra điều kiện vé khi đặt chỗ.",
  },
  {
    id: "faq-6",
    question: "Tôi có thể thay đổi hoặc hủy vé sau khi đặt không?",
    answer:
      "Chính sách đổi/hủy phụ thuộc vào loại vé và hãng bay. Vui lòng xem điều kiện vé trước khi đặt hoặc liên hệ VieGo để được hỗ trợ.",
  },
];

export default function HotelFaqSection() {
  const [openId, setOpenId] = useState(faqs[0].id);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
          Câu hỏi thường gặp
        </h2>

        <div className="border-t border-gray-200">
          {faqs.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
