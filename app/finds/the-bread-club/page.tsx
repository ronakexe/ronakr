const BG = 'var(--bg)'

const IMAGES = [
  'IMG_3250.jpeg',
  'IMG_3251.jpeg',
  'IMG_3252.jpeg',
  'IMG_3253.jpeg',
  'IMG_3255.jpeg',
  'IMG_3256.jpeg',
  'IMG_3257.jpeg',
  'IMG_3258.jpeg',
  'IMG_3259.jpeg',
  'IMG_3260.jpeg',
  'IMG_3261.jpeg',
  'IMG_3262.jpeg',
  'IMG_3264.jpeg',
  'IMG_3265.jpeg',
  'IMG_3266.jpeg',
  'IMG_3267.jpeg',
  'IMG_3268.jpeg',
  'IMG_3269.jpeg',
  'IMG_3270.jpeg',
  'IMG_3271.jpeg',
  'IMG_3272.jpeg',
  'IMG_3273.jpeg',
  'IMG_3274.jpeg',
  'IMG_3275.jpeg',
  'IMG_3276.jpeg',
  'IMG_3279.jpeg',
  'IMG_3280.jpeg',
  'IMG_3281.jpeg',
  'IMG_3282.jpeg',
  'IMG_3283.jpeg',
].map(
  (file) =>
    `https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club/${file}`
)

// Route through Next's built-in image optimizer so the browser gets a
// resized JPEG instead of the original multi-MB photo straight off Blob.
// Plain <img> (not next/image) so masonry keeps each photo's true aspect
// ratio without needing known width/height ahead of time.
function optimizedSrc(url: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`
}

// Must match values Next.js is configured to serve (see next.config.ts
// images.deviceSizes) — arbitrary widths get rejected by the optimizer.
const WIDTHS = [384, 750, 1200]

export default function TheBreadClubPage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        <h1
          className="text-[32px] md:text-[40px] leading-none"
          style={{
            fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif",
            letterSpacing: '-0.02em',
            margin: 0,
            padding: '56px 40px 0',
          }}
        >
          The Bread Club
        </h1>

        {/* Pinterest-style masonry grid — CSS columns, images keep their
            natural aspect ratio so column heights fall unevenly. */}
        <div
          className="columns-2 sm:columns-3 md:columns-4"
          style={{ padding: '28px 40px 96px', columnGap: 32 }}
        >
          {IMAGES.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={optimizedSrc(src, 750)}
              srcSet={WIDTHS.map((w) => `${optimizedSrc(src, w)} ${w}w`).join(', ')}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              alt=""
              loading="lazy"
              decoding="async"
              className="mb-8 w-full break-inside-avoid"
              style={{ borderRadius: 4, display: 'block' }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
