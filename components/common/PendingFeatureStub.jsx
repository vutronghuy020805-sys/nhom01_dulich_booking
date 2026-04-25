import Link from "next/link";

export default function PendingFeatureStub({ title = "Tính năng đang hoàn thiện" }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🛠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">{title}</h1>
        <p className="text-gray-600 mb-5 text-sm leading-relaxed">
          Flow này dùng dữ liệu thời gian thực và chỉ chạy được trong môi trường dev.
          Vui lòng chạy{" "}
          <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">npm run dev</code>{" "}
          để trải nghiệm đầy đủ.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
