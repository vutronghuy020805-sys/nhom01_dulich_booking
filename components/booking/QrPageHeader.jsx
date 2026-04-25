import Link from "next/link";

export default function QrPageHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-3">
        <Link href="/" className="inline-flex items-center">
          <img
            src="/assets/logo-viego.png"
            alt="VieGo Travel"
            className="w-12 h-12 object-contain brightness-0"
          />
        </Link>
      </div>
    </header>
  );
}
