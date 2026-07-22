'use client'

const BG = 'var(--bg)'

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

// Each image's visible width/height, keyed by its original (un-optimized)
// src URL. Sets the masonry cell's aspect-ratio before the photo itself has
// loaded, so every cell is already the right size on first paint — images
// simply fade in in place as they arrive instead of snapping to size and
// shoving the rest of the column down. To show an image cropped (see The
// Bread Club's IMG_3250), pass its cropped/visible dimensions rather than
// the file's own — object-fit: cover crops the difference off the bottom.
type Dimensions = Record<string, { width: number; height: number }>

export default function MasonryGrid({
  title,
  images,
  dimensions,
}: {
  title: string
  images: string[]
  dimensions: Dimensions
}) {
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
          {title}
        </h1>

        {/* Pinterest-style masonry grid — CSS columns, each cell pre-sized to
            its image's aspect ratio so column heights are known up front. */}
        <div
          className="columns-2 gap-x-9 sm:columns-3 sm:gap-x-12 md:columns-4"
          style={{ padding: '28px 40px 96px' }}
        >
          {images.map((src) => {
            const { width, height } = dimensions[src]
            return (
              <div
                key={src}
                className="mb-9 w-full break-inside-avoid overflow-hidden sm:mb-12"
                style={{ aspectRatio: `${width} / ${height}`, borderRadius: 2 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={optimizedSrc(src, 750)}
                  srcSet={WIDTHS.map((w) => `${optimizedSrc(src, w)} ${w}w`).join(', ')}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  ref={(el) => {
                    if (el?.complete) el.style.opacity = '1'
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                  className="h-full w-full"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
