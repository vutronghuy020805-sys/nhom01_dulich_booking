"use client";

import { useState } from "react";
import AccountPageHeader from "@/components/account/AccountPageHeader";
import { defaultAccountProfile } from "@/data/accountMock";

function Section({ title, description, children }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      ) : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-400";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: defaultAccountProfile.fullName,
    email: defaultAccountProfile.email,
    phone: defaultAccountProfile.phone,
  });
  const [editProfile, setEditProfile] = useState(false);

  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  const [locale, setLocale] = useState({
    language: defaultAccountProfile.language,
    currency: defaultAccountProfile.currency,
  });

  const [twoFactor, setTwoFactor] = useState(defaultAccountProfile.twoFactor);

  return (
    <>
      <AccountPageHeader
        title="Cài đặt"
        subtitle="Quản lý thông tin tài khoản, bảo mật và tuỳ chọn hiển thị."
      />

      <Section
        title="Thông tin tài khoản"
        description="Những thông tin cơ bản được dùng để xác nhận và liên hệ đặt chỗ."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Họ và tên">
            <input
              className={inputCls}
              value={profile.fullName}
              disabled={!editProfile}
              onChange={(e) =>
                setProfile((p) => ({ ...p, fullName: e.target.value }))
              }
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              className={inputCls}
              value={profile.email}
              disabled={!editProfile}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
            />
          </Field>
          <Field label="Số điện thoại">
            <input
              className={inputCls}
              value={profile.phone}
              disabled={!editProfile}
              onChange={(e) =>
                setProfile((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </Field>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          {editProfile ? (
            <>
              <button
                type="button"
                onClick={() => setEditProfile(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={() => setEditProfile(false)}
                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow"
              >
                Lưu thay đổi
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditProfile(true)}
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </Section>

      <Section
        title="Đổi mật khẩu"
        description="Mật khẩu mạnh gồm tối thiểu 8 ký tự, có chữ hoa và số."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Mật khẩu hiện tại">
            <input
              type="password"
              className={inputCls}
              value={pwd.current}
              onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
            />
          </Field>
          <Field label="Mật khẩu mới">
            <input
              type="password"
              className={inputCls}
              value={pwd.next}
              onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
            />
          </Field>
          <Field label="Xác nhận mật khẩu">
            <input
              type="password"
              className={inputCls}
              value={pwd.confirm}
              onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
            />
          </Field>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setPwd({ current: "", next: "", confirm: "" })}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </Section>

      <Section title="Ngôn ngữ & Tiền tệ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Ngôn ngữ">
            <select
              className={inputCls}
              value={locale.language}
              onChange={(e) =>
                setLocale((p) => ({ ...p, language: e.target.value }))
              }
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="Tiền tệ hiển thị">
            <select
              className={inputCls}
              value={locale.currency}
              onChange={(e) =>
                setLocale((p) => ({ ...p, currency: e.target.value }))
              }
            >
              <option value="VND">VND — Việt Nam đồng</option>
              <option value="USD">USD — US Dollar</option>
              <option value="JPY">JPY — Japanese Yen</option>
            </select>
          </Field>
        </div>
      </Section>

      <Section
        title="Bảo mật"
        description="Giữ tài khoản VieGo an toàn với xác minh 2 bước và kiểm tra thiết bị."
      >
        <label className="flex items-start justify-between gap-4 py-2 cursor-pointer">
          <div>
            <p className="text-sm md:text-[15px] font-medium text-slate-900">
              Xác minh 2 bước
            </p>
            <p className="mt-0.5 text-xs md:text-sm text-slate-500">
              Yêu cầu nhập mã OTP khi đăng nhập từ thiết bị mới.
            </p>
          </div>
          <span className="relative inline-block shrink-0 mt-0.5">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
            />
            <span className="block w-10 h-6 rounded-full bg-slate-300 peer-checked:bg-sky-500 transition-colors" />
            <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
          </span>
        </label>

        <div className="mt-5">
          <h4 className="text-sm font-semibold text-slate-900">
            Thiết bị đăng nhập gần đây
          </h4>
          <ul className="mt-2 divide-y divide-slate-100 border border-slate-100 rounded-lg">
            {defaultAccountProfile.devices.map((d) => (
              <li
                key={d.id}
                className="px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {d.name}{" "}
                    {d.current ? (
                      <span className="ml-1 text-[11px] font-semibold text-emerald-600">
                        · Thiết bị này
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-slate-500">
                    {d.location} · Hoạt động {d.lastActive}
                  </p>
                </div>
                {!d.current ? (
                  <button
                    type="button"
                    className="shrink-0 text-sm font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Đăng xuất
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
