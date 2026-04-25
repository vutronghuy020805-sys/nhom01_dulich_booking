"use client";

import { useState } from "react";
import AccountPageHeader from "@/components/account/AccountPageHeader";
import { defaultNotificationPrefs } from "@/data/accountMock";

function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex items-start justify-between gap-4 py-3 cursor-pointer">
      <div className="min-w-0">
        <p className="text-sm md:text-[15px] font-medium text-slate-900">
          {label}
        </p>
        {description ? (
          <p className="mt-0.5 text-xs md:text-sm text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      <span className="relative inline-block shrink-0 mt-0.5">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="block w-10 h-6 rounded-full bg-slate-300 peer-checked:bg-sky-500 transition-colors" />
        <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </span>
    </label>
  );
}

function Group({ title, children }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <div className="mt-2 divide-y divide-slate-100">{children}</div>
    </section>
  );
}

export default function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState(defaultNotificationPrefs);
  const [saved, setSaved] = useState(false);

  const update = (section, key) => (val) => {
    setPrefs((p) => ({ ...p, [section]: { ...p[section], [key]: val } }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <AccountPageHeader
        title="Cài đặt thông báo"
        subtitle="Chọn cách VieGo liên lạc với bạn qua email, SMS và thông báo đẩy."
      />

      <Group title="Email">
        <Toggle
          label="Nhận xác nhận đặt chỗ"
          description="Gửi e-voucher và chi tiết đơn qua email."
          checked={prefs.email.bookingConfirm}
          onChange={update("email", "bookingConfirm")}
        />
        <Toggle
          label="Nhận khuyến mãi"
          description="Ưu đãi du lịch, mã giảm giá độc quyền."
          checked={prefs.email.promotions}
          onChange={update("email", "promotions")}
        />
        <Toggle
          label="Nhận thông báo thay đổi lịch trình"
          description="Khi hãng bay/đối tác thay đổi lịch, chúng tôi sẽ báo ngay."
          checked={prefs.email.scheduleChange}
          onChange={update("email", "scheduleChange")}
        />
      </Group>

      <Group title="SMS">
        <Toggle
          label="Nhắc lịch khởi hành"
          description="Nhắc qua SMS trước ngày đi."
          checked={prefs.sms.departureReminder}
          onChange={update("sms", "departureReminder")}
        />
        <Toggle
          label="OTP / Bảo mật"
          description="Luôn bật để bảo vệ tài khoản của bạn."
          checked={prefs.sms.otpSecurity}
          onChange={update("sms", "otpSecurity")}
        />
      </Group>

      <Group title="Thông báo đẩy (Push)">
        <Toggle
          label="Cập nhật ưu đãi"
          description="Deal flash, giá rẻ bất ngờ hiển thị ngay trên điện thoại."
          checked={prefs.push.deals}
          onChange={update("push", "deals")}
        />
        <Toggle
          label="Nhắc thanh toán"
          description="Khi có đơn chờ thanh toán sắp hết hạn."
          checked={prefs.push.paymentReminder}
          onChange={update("push", "paymentReminder")}
        />
        <Toggle
          label="Nhắc check-in / check-out"
          description="Đừng bỏ lỡ thời gian check-in khách sạn và chuyến bay."
          checked={prefs.push.checkinReminder}
          onChange={update("push", "checkinReminder")}
        />
      </Group>

      <div className="flex items-center justify-end gap-3">
        {saved ? (
          <span className="text-sm text-emerald-600 font-medium">
            Đã lưu thay đổi
          </span>
        ) : null}
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow"
        >
          Lưu thay đổi
        </button>
      </div>
    </>
  );
}
