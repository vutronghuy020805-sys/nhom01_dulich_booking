import Link from "next/link";

export const metadata = {
  title: "Đăng nhập - VieGo",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-white">
      {/* Watermark logo giữa nền */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img
          src="/assets/logo-viego.png"
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
              src="/assets/logo-viego.png"
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
              src="/assets/login-banner.png"
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

          <form className="w-full max-w-[420px] flex flex-col gap-4">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="User name"
                className="w-full pl-6 pr-14 py-3.5 rounded-full bg-sky-100/70 text-gray-800 placeholder-gray-500 italic outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/90 transition"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
                </svg>
              </span>
            </div>

            {/* Password */}
            <input
              type="password"
              placeholder="Pass word"
              className="w-full px-6 py-3.5 rounded-full bg-sky-100/70 text-gray-800 placeholder-gray-500 italic outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/90 transition"
            />

            {/* Forget password */}
            <div className="flex justify-end pr-2 -mt-1">
              <a
                href="#"
                className="text-gray-700 italic font-semibold text-sm hover:text-sky-700 transition"
              >
                Foget Password
              </a>
            </div>

            {/* Submit button — pill, gradient xanh đậm */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-b from-sky-500 via-blue-700 to-blue-900 text-white text-lg font-bold tracking-wide shadow-md shadow-blue-900/30 hover:brightness-110 transition"
            >
              Đăng nhập
            </button>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-6 mt-3">
              <button
                type="button"
                aria-label="Đăng nhập với Google"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition"
              >
                <svg viewBox="0 0 48 48" className="w-6 h-6">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Đăng nhập với Facebook"
                className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md hover:scale-105 transition"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                  <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7V13h2.6v8h3.2z" />
                </svg>
              </button>
            </div>

            {/* Slogan */}
            <p className="text-center italic font-bold text-sky-900 mt-2">
              VieGo đồng hành cùng bạn
            </p>
          </form>

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
