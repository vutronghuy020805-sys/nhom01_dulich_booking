import Image from "next/image";

function padGallery(images, count = 5) {
  if (!images || images.length === 0) return [];
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(images[i % images.length]);
  }
  return result;
}

export default function ActivityGallery({ gallery, title }) {
  const padded = padGallery(gallery, 5);
  if (padded.length === 0) return null;

  const [main, ...thumbs] = padded;

  return (
    <div className="rounded-3xl overflow-hidden bg-white border-4 border-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1.5">
        <div className="relative md:col-span-7 aspect-4/3 md:aspect-auto md:min-h-90 bg-slate-100">
          <Image
            src={main}
            alt={title}
            fill
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="md:col-span-5 grid grid-cols-2 grid-rows-2 gap-1.5">
          {thumbs.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="relative aspect-4/3 md:aspect-auto md:min-h-44 bg-slate-100"
            >
              <Image
                src={src}
                alt={`${title} - ảnh ${idx + 2}`}
                fill
                sizes="(min-width: 1024px) 240px, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
