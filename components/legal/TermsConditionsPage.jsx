import LegalTableOfContents from "./LegalTableOfContents";

const SECTIONS = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "pham-vi", label: "Phạm vi áp dụng" },
  { id: "tai-khoan", label: "Tài khoản người dùng" },
  { id: "dat-cho", label: "Quy trình đặt chỗ và xác nhận dịch vụ" },
  { id: "thanh-toan", label: "Giá cả và thanh toán" },
  { id: "huy-doi", label: "Chính sách hủy, đổi lịch, hoàn tiền" },
  { id: "trach-nhiem-nguoi-dung", label: "Quyền và trách nhiệm của người dùng" },
  { id: "trach-nhiem-viego", label: "Quyền và trách nhiệm của VieGo" },
  { id: "ben-thu-ba", label: "Nội dung và liên kết bên thứ ba" },
  { id: "gioi-han-trach-nhiem", label: "Giới hạn trách nhiệm" },
  { id: "so-huu-tri-tue", label: "Sở hữu trí tuệ" },
  { id: "thay-doi", label: "Thay đổi điều khoản" },
  { id: "luat-ap-dung", label: "Luật áp dụng và giải quyết tranh chấp" },
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

export default function TermsConditionsPage() {
  return (
    <article className="bg-slate-50">
      <section className="bg-linear-to-b from-sky-50 to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-14 text-center">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            Pháp lý
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Điều khoản &amp; Điều kiện
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng dịch vụ trên nền
            tảng VieGo trước khi đặt chỗ hoặc sử dụng dịch vụ của chúng tôi.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Phiên bản cập nhật: 25/04/2026
          </p>
        </div>
      </section>

      <div className="max-w-350 mx-auto px-4 md:px-6 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8 md:gap-12 items-start">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 max-w-3xl">
            <Section id="gioi-thieu" number={1} title="Giới thiệu">
              <p>
                Chào mừng bạn đến với VieGo. VieGo cung cấp nền tảng đặt dịch vụ
                du lịch trực tuyến, bao gồm vé máy bay, vé xe khách, khách sạn,
                biệt thự, căn hộ, thuê xe, đưa đón sân bay, hoạt động và các
                dịch vụ liên quan khác.
              </p>
              <p>
                Bằng việc truy cập hoặc sử dụng website, ứng dụng và bất kỳ dịch
                vụ nào của VieGo, bạn xác nhận đã đọc, hiểu và đồng ý bị ràng
                buộc bởi các Điều khoản &amp; Điều kiện này. Nếu bạn không đồng
                ý với bất kỳ nội dung nào, vui lòng ngừng sử dụng dịch vụ.
              </p>
            </Section>

            <Section id="pham-vi" number={2} title="Phạm vi áp dụng">
              <p>
                Điều khoản này áp dụng cho mọi người dùng truy cập, đăng ký, sử
                dụng tính năng hoặc đặt dịch vụ thông qua nền tảng VieGo, bao
                gồm cả khách vãng lai và thành viên đã đăng ký tài khoản.
              </p>
              <p>
                Một số dịch vụ cụ thể trên VieGo có thể đi kèm điều khoản riêng
                của đối tác cung cấp dịch vụ. Trong trường hợp đó, điều khoản
                riêng và Điều khoản &amp; Điều kiện chung này được áp dụng song
                song.
              </p>
            </Section>

            <Section id="tai-khoan" number={3} title="Tài khoản người dùng">
              <ul className="space-y-3">
                <Bullet>
                  Bạn chịu trách nhiệm cung cấp thông tin chính xác, đầy đủ và
                  cập nhật khi đăng ký hoặc sử dụng tài khoản VieGo.
                </Bullet>
                <Bullet>
                  Bạn có trách nhiệm bảo mật mật khẩu và mọi hoạt động phát sinh
                  trên tài khoản của mình. Vui lòng thông báo ngay cho VieGo nếu
                  phát hiện truy cập trái phép.
                </Bullet>
                <Bullet>
                  VieGo có quyền tạm ngưng, hạn chế hoặc chấm dứt tài khoản
                  trong trường hợp phát hiện vi phạm điều khoản, có dấu hiệu
                  gian lận hoặc gây ảnh hưởng đến hệ thống.
                </Bullet>
              </ul>
            </Section>

            <Section
              id="dat-cho"
              number={4}
              title="Quy trình đặt chỗ và xác nhận dịch vụ"
            >
              <p>
                Đặt chỗ chỉ được xem là hoàn tất khi bạn nhận được thông báo xác
                nhận thành công từ hệ thống VieGo và/hoặc từ đối tác cung cấp
                dịch vụ.
              </p>
              <ul className="space-y-3">
                <Bullet>
                  Một số dịch vụ phụ thuộc vào tình trạng chỗ trống tại thời
                  điểm đặt và có thể yêu cầu thời gian xác nhận từ đối tác.
                </Bullet>
                <Bullet>
                  Bạn cần kiểm tra cẩn thận thông tin (họ tên, ngày giờ, số
                  lượng khách, giấy tờ tuỳ thân…) trước khi tiến hành thanh
                  toán.
                </Bullet>
                <Bullet>
                  VieGo không chịu trách nhiệm cho các sai sót do thông tin
                  người dùng cung cấp không chính xác.
                </Bullet>
              </ul>
            </Section>

            <Section id="thanh-toan" number={5} title="Giá cả và thanh toán">
              <p>
                Giá hiển thị trên VieGo có thể thay đổi theo thời điểm, chương
                trình ưu đãi và điều kiện cụ thể của từng dịch vụ. Mức giá cuối
                cùng được ghi nhận tại bước xác nhận đơn đặt chỗ.
              </p>
              <ul className="space-y-3">
                <Bullet>
                  Bạn cần thanh toán đúng phương thức được hệ thống hỗ trợ (thẻ
                  quốc tế, thẻ nội địa/ATM, ví điện tử, chuyển khoản, mã QR…).
                </Bullet>
                <Bullet>
                  VieGo có thể hợp tác với các cổng thanh toán và đối tác trung
                  gian để xử lý giao dịch một cách an toàn.
                </Bullet>
                <Bullet>
                  Giao dịch chỉ được xác nhận khi thanh toán thành công và nhận
                  được phản hồi từ hệ thống thanh toán.
                </Bullet>
              </ul>
            </Section>

            <Section
              id="huy-doi"
              number={6}
              title="Chính sách hủy, đổi lịch, hoàn tiền"
            >
              <p>
                Mỗi dịch vụ và đối tác có chính sách hủy, đổi lịch và hoàn tiền
                riêng. Bạn vui lòng đọc kỹ các điều kiện hiển thị tại bước đặt
                chỗ trước khi xác nhận thanh toán.
              </p>
              <ul className="space-y-3">
                <Bullet>
                  Một số dịch vụ có thể không cho phép hủy, đổi lịch hoặc hoàn
                  tiền sau khi đã đặt thành công.
                </Bullet>
                <Bullet>
                  Trong các trường hợp được phép hoàn tiền, thời gian xử lý phụ
                  thuộc vào phương thức thanh toán và đối tác (thường từ 7–14
                  ngày làm việc).
                </Bullet>
                <Bullet>
                  Việc đổi lịch (nếu có) có thể phát sinh phụ phí và chỉ được
                  thực hiện trong khung thời gian quy định của từng dịch vụ.
                </Bullet>
              </ul>
            </Section>

            <Section
              id="trach-nhiem-nguoi-dung"
              number={7}
              title="Quyền và trách nhiệm của người dùng"
            >
              <ul className="space-y-3">
                <Bullet>
                  Cung cấp thông tin chính xác, đầy đủ khi đặt chỗ và sử dụng
                  dịch vụ.
                </Bullet>
                <Bullet>
                  Sử dụng nền tảng VieGo đúng mục đích hợp pháp, tuân thủ pháp
                  luật Việt Nam và quy định liên quan.
                </Bullet>
                <Bullet>
                  Không thực hiện hành vi gian lận, lạm dụng ưu đãi, mã giảm
                  giá, chương trình giới thiệu hoặc khuyến mãi.
                </Bullet>
                <Bullet>
                  Không can thiệp, tấn công, dò quét, hoặc cố ý làm gián đoạn hệ
                  thống VieGo bằng bất kỳ hình thức nào.
                </Bullet>
              </ul>
            </Section>

            <Section
              id="trach-nhiem-viego"
              number={8}
              title="Quyền và trách nhiệm của VieGo"
            >
              <ul className="space-y-3">
                <Bullet>
                  Cung cấp nền tảng đặt dịch vụ du lịch hoạt động ổn định, an
                  toàn và liên tục cải thiện trải nghiệm người dùng.
                </Bullet>
                <Bullet>
                  Hỗ trợ người dùng thông qua các kênh chăm sóc khách hàng trong
                  phạm vi hợp lý.
                </Bullet>
                <Bullet>
                  Cập nhật thông tin, giá và điều kiện dịch vụ từ đối tác một
                  cách kịp thời. VieGo không bảo đảm 100% sự không thay đổi từ
                  phía đối tác.
                </Bullet>
                <Bullet>
                  Có quyền từ chối, hủy hoặc tạm ngưng giao dịch khi phát hiện
                  rủi ro, sai sót, gian lận, sự cố hệ thống hoặc lý do bất khả
                  kháng.
                </Bullet>
              </ul>
            </Section>

            <Section
              id="ben-thu-ba"
              number={9}
              title="Nội dung và liên kết bên thứ ba"
            >
              <p>
                Nhiều dịch vụ trên VieGo được cung cấp bởi các đối tác (hãng
                bay, khách sạn, nhà xe, đơn vị vận chuyển…). Bạn có thể cần tuân
                thủ thêm điều khoản riêng của các đối tác này khi sử dụng dịch
                vụ.
              </p>
              <p>
                VieGo có thể hiển thị liên kết hoặc nội dung từ bên thứ ba (như
                mạng xã hội, cổng thanh toán, dịch vụ bản đồ). VieGo không chịu
                trách nhiệm về nội dung, tính chính xác hay chính sách của các
                bên đó.
              </p>
            </Section>

            <Section
              id="gioi-han-trach-nhiem"
              number={10}
              title="Giới hạn trách nhiệm"
            >
              <ul className="space-y-3">
                <Bullet>
                  VieGo nỗ lực cung cấp dịch vụ ổn định nhưng không bảo đảm
                  tuyệt đối việc dịch vụ sẽ không bao giờ bị gián đoạn, chậm trễ
                  hoặc gặp lỗi kỹ thuật.
                </Bullet>
                <Bullet>
                  VieGo không chịu trách nhiệm cho thiệt hại phát sinh do lỗi
                  của đối tác cung cấp dịch vụ, sự kiện bất khả kháng (thiên
                  tai, dịch bệnh, đình công, sự cố hệ thống quốc gia…), hoặc
                  thông tin do người dùng cung cấp không chính xác.
                </Bullet>
                <Bullet>
                  Trong mọi trường hợp, trách nhiệm của VieGo được giới hạn
                  trong phạm vi giá trị giao dịch liên quan trực tiếp tới sự
                  việc, theo quy định của pháp luật Việt Nam.
                </Bullet>
              </ul>
            </Section>

            <Section id="so-huu-tri-tue" number={11} title="Sở hữu trí tuệ">
              <p>
                Toàn bộ giao diện, nội dung, văn bản, hình ảnh, video, thiết kế,
                mã nguồn, logo và nhãn hiệu &quot;VieGo&quot; thuộc quyền sở hữu
                của VieGo hoặc bên cấp phép hợp pháp.
              </p>
              <p>
                Bạn không được sao chép, sửa đổi, phân phối, đăng tải lại hoặc
                sử dụng cho mục đích thương mại bất kỳ phần nào của nội dung
                trên VieGo nếu không có văn bản chấp thuận trước.
              </p>
            </Section>

            <Section id="thay-doi" number={12} title="Thay đổi điều khoản">
              <p>
                VieGo có quyền cập nhật, điều chỉnh hoặc bổ sung Điều khoản
                &amp; Điều kiện này theo thời gian để phù hợp với hoạt động kinh
                doanh và quy định pháp luật.
              </p>
              <p>
                Phiên bản mới sẽ được đăng tải công khai trên website và có hiệu
                lực kể từ thời điểm đăng tải. Bạn nên kiểm tra trang này định kỳ
                để cập nhật. Việc tiếp tục sử dụng dịch vụ sau khi điều khoản
                được cập nhật đồng nghĩa với việc bạn chấp nhận phiên bản mới.
              </p>
            </Section>

            <Section
              id="luat-ap-dung"
              number={13}
              title="Luật áp dụng và giải quyết tranh chấp"
            >
              <p>
                Điều khoản &amp; Điều kiện này được điều chỉnh và giải thích
                theo pháp luật nước Cộng hoà Xã hội Chủ nghĩa Việt Nam.
              </p>
              <p>
                Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết thông qua
                thương lượng, hoà giải. Trong trường hợp không thể giải quyết,
                các bên có quyền đưa vụ việc ra Toà án có thẩm quyền tại Việt
                Nam để giải quyết theo quy định pháp luật hiện hành.
              </p>
            </Section>

            <Section id="lien-he" number={14} title="Thông tin liên hệ">
              <p>
                Nếu bạn có bất kỳ câu hỏi, góp ý hoặc khiếu nại nào liên quan
                đến Điều khoản &amp; Điều kiện này, vui lòng liên hệ với VieGo
                qua các kênh sau:
              </p>
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 md:p-5 not-prose">
                <ul className="space-y-2 text-sm md:text-[15px] text-slate-700">
                  <li>
                    <span className="font-semibold text-slate-900">Email:</span>{" "}
                    <a
                      href="mailto:legal@viego.vn"
                      className="text-sky-700 hover:text-sky-800 hover:underline"
                    >
                      legal@viego.vn
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Hotline:
                    </span>{" "}
                    1900 1234 (8:00 – 22:00, hằng ngày)
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">
                      Địa chỉ:
                    </span>{" "}
                    123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh, Việt Nam
                  </li>
                </ul>
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
