import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme/ThemeProvider";
import ChatbotLauncher from "@/components/chatbot/ChatbotLauncher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VieGo — Du lịch thông minh",
  description: "Đặt chỗ khách sạn, vé máy bay, vé xe, hoạt động và nhiều hơn nữa trên VieGo.",
};

// Inline script chạy trước khi React hydrate để set class="dark" ngay, tránh
// flash of unstyled theme khi reload trong dark mode.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('viego-theme');
    var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    var root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50">
        <ThemeProvider>
          {children}
          <ChatbotLauncher />
        </ThemeProvider>
      </body>
    </html>
  );
}
