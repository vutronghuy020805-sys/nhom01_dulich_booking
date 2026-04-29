import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";

export const metadata = {
  title: "Đăng nhập - VieGo",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-white">
      {/* Watermark logo giữa nền */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img
          src="/nhom01_dulich_booking/assets/logo-viego.png"
          alt=""
          className="w-[640px] h-[640px] object-contain opacity-[0.12] mix-blend-screen"
        />
      </div>

      {/* Layout 2 cột */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 max-w-[1280px] mx-auto min-h-screen px-6 lg:px-10 py-10">
        {/* ===== LEFT PANEL ===== */}
        <aside className="w-full lg:w-[40%] max-w-[520px] bg-sky-300/45 rounded-[48px] shadow-xl backdrop-blur-[2px] p-6 lg:p-8 flex flex-col">
          {/* Header: logo + Welcome text */}
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <img
              src="/nhom01_dulich_booking/assets/logo-viego.png"
              alt="VieGo Travel"
              className="w-16 h-16 object-contain mix-blend-screen shrink-0"
            />
            <h2 className="text-white text-2xl lg:text-[28px] font-extrabold italic leading-tight drop-shadow-md">
              Welcome to
              <br />
              VieGO
            </h2>
          </div>

          {/* Image — thụt vào trong panel, bo góc lớn */}
          <div className="mx-3 mb-3 lg:mx-4 lg:mb-4 rounded-[32px] overflow-hidden shadow-lg">
            {/*
              Ảnh banner bên trái. File: public/assets/login-banner.png
              mx-* và mb-* tạo khoảng đệm bên trong panel để ảnh thụt vào,
              lộ viền xanh của panel bao quanh.
            */}
            <img
              src="/nhom01_dulich_booking/assets/login-banner.png"
              alt="VieGo travel"
              className="w-full h-[440px] lg:h-[480px] object-cover"
            />
          </div>
        </aside>

        {/* ===== RIGHT PANEL ===== */}
        <section className="w-full lg:w-[44%] max-w-[520px] flex flex-col items-center">
          <h1 className="text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-[0.08em] mb-8 lg:mb-10">
            ĐĂNG NHẬP
          </h1>

          <LoginForm />

          {/* Back link */}
          <Link
            href="/"
            className="mt-6 text-xs text-gray-600 hover:text-sky-700 transition"
          >
            ← Quay lại trang chủ
          </Link>
        </section>
      </div>
    </div>
  );
}
