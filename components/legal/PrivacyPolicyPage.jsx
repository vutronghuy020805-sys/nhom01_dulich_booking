import LegalTableOfContents from "./LegalTableOfContents";

const SECTIONS = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "thu-thap", label: "Thông tin chúng tôi thu thập" },
  { id: "muc-dich", label: "Mục đích sử dụng thông tin" },
  { id: "chia-se", label: "Chia sẻ thông tin với bên thứ ba" },
  { id: "bao-mat", label: "Bảo mật thông tin" },
  { id: "cookie", label: "Cookie và công nghệ theo dõi" },
  { id: "quyen-nguoi-dung", label: "Quyền của người dùng" },
  { id: "luu-tru", label: "Thời gian lưu trữ dữ liệu" },
  { id: "lien-ket", label: "Liên kết bên thứ ba" },
  { id: "cap-nhat", label: "Cập nhật chính sách" },
  { id: "lien-he", label: "Thông tin liên hệ" },
];

function Section({ id, number, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 mb-10 md:mb-12">
      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-4 md:mb-5">
        <span className="text-sky-500 mr-2">
          {String(number).padStart(2, "0")}.
        </span>
        {title}
      </h2>
      <div className="space-y-4 text-[15px] md:text-base text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-slate-50">
      <section className="bg-linear-to-b from-sky-50 to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-14 text-center">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            Pháp lý & Quyền riêng tư
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Chính sách quyền riêng tư
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            VieGo cam kết bảo vệ thông tin cá nhân và quyền riêng tư của người
            dùng khi sử dụng nền tảng của chúng tôi.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Phiên bản cập nhật: 15/04/2026
          </p>
        </div>
      </section>

      <div className="max-w-350 mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8 md:gap-12 items-start">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 max-w-3xl">
            <Section id="gioi-thieu" number={1} title="Giới thiệu">
              <p>
                VieGo (sau đây gọi là &quot;chúng tôi&quot;) tôn trọng quyền riêng tư và
                cam kết bảo vệ thông tin cá nhân của người dùng khi sử dụng
                website, ứng dụng và các dịch vụ do VieGo cung cấp.
              </p>
              <p>
                Chính sách quyền riêng tư này giải thích rõ cách VieGo thu thập,
                sử dụng, lưu trữ, chia sẻ và bảo vệ dữ liệu cá nhân của bạn.
                Bằng việc truy cập hoặc sử dụng dịch vụ của VieGo, bạn đồng ý
                với các điều khoản được nêu trong chính sách này.
              </p>
            </Section>

            <Section id="thu-thap" number={2} title="Thông tin chúng tôi thu thập">
              <p>
                Chúng tôi có thể thu thập các loại thông tin sau đây khi bạn sử
                dụng dịch vụ:
              </p>
              <ul className="space-y-2">
                <Bullet>
                  <strong>Thông tin định danh:</strong> họ tên, ngày sinh, giới
                  tính, số CCCD/hộ chiếu (khi cần cho đặt vé).
                </Bullet>
                <Bullet>
                  <strong>Thông tin liên hệ:</strong> email, số điện thoại, địa
                  chỉ liên lạc.
                </Bullet>
                <Bullet>
                  <strong>Thông tin đặt chỗ:</strong> điểm đến, ngày đi, hành
                  khách, yêu cầu đặc biệt.
                </Bullet>
                <Bullet>
                  <strong>Thông tin thanh toán:</strong> phương thức thanh toán,
                  mã giao dịch, thông tin thẻ ở mức cần thiết (qua cổng thanh
                  toán bảo mật, VieGo không lưu trữ số thẻ đầy đủ).
                </Bullet>
                <Bullet>
                  <strong>Thông tin thiết bị / trình duyệt:</strong> địa chỉ IP,
                  loại thiết bị, hệ điều hành, trình duyệt, cookie.
                </Bullet>
                <Bullet>
                  <strong>Dữ liệu sử dụng dịch vụ:</strong> trang đã xem, hành
                  vi tìm kiếm, lịch sử đặt chỗ, tương tác trên ứng dụng.
                </Bullet>
                <Bullet>
                  <strong>Vị trí:</strong> khi bạn chủ động cấp quyền để nhận
                  gợi ý dịch vụ theo vị trí.
                </Bullet>
              </ul>
            </Section>

            <Section id="muc-dich" number={3} title="Mục đích sử dụng thông tin">
              <p>
                Dữ liệu thu thập được chỉ sử dụng cho các mục đích chính đáng và
                cần thiết, bao gồm:
              </p>
              <ul className="space-y-2">
                <Bullet>Xử lý và xác nhận đơn đặt chỗ, cung cấp dịch vụ.</Bullet>
                <Bullet>
                  Liên hệ, hỗ trợ khách hàng, gửi thông báo giao dịch và nhắc
                  nhở quan trọng.
                </Bullet>
                <Bullet>
                  Cải thiện trải nghiệm người dùng, phân tích hành vi sử dụng và
                  tối ưu sản phẩm.
                </Bullet>
                <Bullet>
                  Phát hiện, ngăn chặn gian lận và bảo vệ an toàn hệ thống.
                </Bullet>
                <Bullet>
                  Gửi thông tin khuyến mãi, ưu đãi hoặc khảo sát khi bạn đồng ý.
                </Bullet>
                <Bullet>
                  Tuân thủ các nghĩa vụ pháp lý của VieGo tại Việt Nam.
                </Bullet>
              </ul>
            </Section>

            <Section id="chia-se" number={4} title="Chia sẻ thông tin với bên thứ ba">
              <p>
                VieGo có thể chia sẻ dữ liệu của bạn với các bên thứ ba uy tín
                chỉ ở mức độ cần thiết để cung cấp dịch vụ bạn yêu cầu:
              </p>
              <ul className="space-y-2">
                <Bullet>
                  Đối tác cung cấp dịch vụ: hãng hàng không, khách sạn, nhà xe,
                  nhà cung cấp hoạt động, dịch vụ đưa đón sân bay, cho thuê xe.
                </Bullet>
                <Bullet>
                  Đơn vị xử lý thanh toán và ngân hàng đối tác.
                </Bullet>
                <Bullet>
                  Nhà cung cấp dịch vụ kỹ thuật (lưu trữ đám mây, phân tích dữ
                  liệu, gửi email) đã ký cam kết bảo mật với VieGo.
                </Bullet>
                <Bullet>
                  Cơ quan nhà nước có thẩm quyền khi có yêu cầu hợp pháp theo
                  quy định của pháp luật Việt Nam.
                </Bullet>
              </ul>
              <p>
                VieGo <strong>không bán</strong> dữ liệu cá nhân của bạn cho bên
                thứ ba vì mục đích thương mại.
              </p>
            </Section>

            <Section id="bao-mat" number={5} title="Bảo mật thông tin">
              <p>
                Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp nhằm
                bảo vệ dữ liệu cá nhân của bạn khỏi truy cập trái phép, mất mát,
                thay đổi hoặc tiết lộ bất hợp pháp, bao gồm:
              </p>
              <ul className="space-y-2">
                <Bullet>Mã hoá dữ liệu khi truyền (HTTPS/TLS).</Bullet>
                <Bullet>
                  Kiểm soát truy cập nội bộ — chỉ nhân viên được phân quyền mới
                  có thể truy cập dữ liệu.
                </Bullet>
                <Bullet>
                  Sao lưu định kỳ, giám sát an ninh và đánh giá rủi ro liên tục.
                </Bullet>
                <Bullet>
                  Đào tạo nhân viên về thực hành bảo mật và bảo vệ dữ liệu.
                </Bullet>
              </ul>
              <p>
                Mặc dù chúng tôi nỗ lực tối đa, không có hệ thống trực tuyến nào
                đảm bảo an toàn 100%. Chúng tôi khuyến khích bạn bảo vệ mật khẩu
                tài khoản và thông báo ngay cho VieGo nếu nghi ngờ có hoạt động
                bất thường.
              </p>
            </Section>

            <Section id="cookie" number={6} title="Cookie và công nghệ theo dõi">
              <p>
                VieGo sử dụng cookie và các công nghệ tương tự để ghi nhớ tuỳ
                chọn, phân tích hành vi sử dụng và cải thiện dịch vụ. Các loại
                cookie chính:
              </p>
              <ul className="space-y-2">
                <Bullet>
                  <strong>Cookie cần thiết:</strong> duy trì phiên đăng nhập và
                  chức năng cơ bản của trang.
                </Bullet>
                <Bullet>
                  <strong>Cookie phân tích:</strong> đo lường lượt truy cập,
                  thời gian trên trang và đường đi của người dùng.
                </Bullet>
                <Bullet>
                  <strong>Cookie tiếp thị:</strong> cá nhân hoá ưu đãi và hiển
                  thị quảng cáo phù hợp.
                </Bullet>
              </ul>
              <p>
                Bạn có thể điều chỉnh hoặc tắt cookie trong cài đặt trình duyệt.
                Lưu ý rằng một số chức năng của website có thể không hoạt động
                đầy đủ nếu bạn tắt toàn bộ cookie.
              </p>
            </Section>

            <Section id="quyen-nguoi-dung" number={7} title="Quyền của người dùng">
              <p>
                Với tư cách chủ dữ liệu cá nhân, bạn có các quyền sau:
              </p>
              <ul className="space-y-2">
                <Bullet>Quyền xem và yêu cầu bản sao dữ liệu VieGo đang lưu trữ về bạn.</Bullet>
                <Bullet>Quyền yêu cầu chỉnh sửa, cập nhật dữ liệu nếu thông tin sai hoặc thay đổi.</Bullet>
                <Bullet>Quyền yêu cầu xoá hoặc hạn chế xử lý dữ liệu trong các trường hợp phù hợp.</Bullet>
                <Bullet>Quyền rút lại sự đồng ý nhận email marketing bất cứ lúc nào.</Bullet>
                <Bullet>Quyền khiếu nại về cách VieGo xử lý dữ liệu cá nhân của bạn.</Bullet>
              </ul>
              <p>
                Để thực hiện các quyền trên, vui lòng liên hệ theo thông tin ở
                mục 11. Chúng tôi sẽ phản hồi trong thời hạn tối đa 30 ngày kể
                từ khi nhận được yêu cầu hợp lệ.
              </p>
            </Section>

            <Section id="luu-tru" number={8} title="Thời gian lưu trữ dữ liệu">
              <p>
                VieGo chỉ lưu trữ dữ liệu cá nhân trong khoảng thời gian cần
                thiết để:
              </p>
              <ul className="space-y-2">
                <Bullet>Cung cấp dịch vụ bạn đã đặt và hỗ trợ sau đặt chỗ.</Bullet>
                <Bullet>Tuân thủ nghĩa vụ pháp lý, thuế và kế toán theo quy định.</Bullet>
                <Bullet>Giải quyết tranh chấp và thực thi các thoả thuận.</Bullet>
              </ul>
              <p>
                Sau khi các mục đích trên hoàn tất, dữ liệu sẽ được xoá hoặc ẩn
                danh theo quy trình nội bộ của VieGo.
              </p>
            </Section>

            <Section id="lien-ket" number={9} title="Liên kết bên thứ ba">
              <p>
                Website VieGo có thể chứa liên kết tới các website hoặc dịch vụ
                của bên thứ ba (ví dụ: đối tác thanh toán, đối tác cung cấp dịch
                vụ du lịch). Chính sách quyền riêng tư này chỉ áp dụng cho
                VieGo.
              </p>
              <p>
                Chúng tôi khuyến khích bạn đọc kỹ chính sách quyền riêng tư của
                các bên thứ ba khi truy cập các liên kết đó. VieGo không chịu
                trách nhiệm về nội dung hoặc thực hành bảo mật của những website
                này.
              </p>
            </Section>

            <Section id="cap-nhat" number={10} title="Cập nhật chính sách">
              <p>
                VieGo có thể cập nhật Chính sách quyền riêng tư này theo thời
                gian để phản ánh thay đổi trong dịch vụ, công nghệ hoặc quy định
                pháp luật. Phiên bản mới sẽ được đăng trên website kèm ngày cập
                nhật ở đầu trang.
              </p>
              <p>
                Nếu có thay đổi quan trọng ảnh hưởng tới quyền của bạn, VieGo sẽ
                thông báo qua email hoặc thông báo nổi bật trên website trước
                khi áp dụng.
              </p>
            </Section>

            <Section id="lien-he" number={11} title="Thông tin liên hệ">
              <p>
                Nếu bạn có câu hỏi, khiếu nại hoặc yêu cầu liên quan đến Chính
                sách quyền riêng tư, vui lòng liên hệ:
              </p>
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 md:p-6 mt-3">
                <dl className="space-y-2.5 text-sm md:text-[15px]">
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-slate-900 w-32 shrink-0">
                      Email bảo mật:
                    </dt>
                    <dd>
                      <a
                        href="mailto:privacy@viego.vn"
                        className="text-sky-600 hover:underline"
                      >
                        privacy@viego.vn
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-slate-900 w-32 shrink-0">
                      Hotline:
                    </dt>
                    <dd>
                      <a
                        href="tel:19001234"
                        className="text-sky-600 hover:underline"
                      >
                        1900 1234
                      </a>{" "}
                      (08:00 – 22:00 mỗi ngày)
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-slate-900 w-32 shrink-0">
                      Địa chỉ:
                    </dt>
                    <dd>
                      123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh, Việt Nam
                    </dd>
                  </div>
                </dl>
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <LegalTableOfContents items={SECTIONS} />
          </aside>
        </div>
      </div>
    </article>
  );
}
