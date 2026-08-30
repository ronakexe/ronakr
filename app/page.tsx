import Image from 'next/image'
import Link from 'next/link'
import { pieces, finds, initiatives, Piece } from '@/app/pieces/pieces'

// Thumbnails hang in the ul's left indent (absolute, right-full) so the
// entry text never shifts — sized to roughly half the 31.5px/34.5px row
// height, width following each image's native aspect ratio.

// Route remote (blob-hosted) thumbnails through Next's image optimizer so the
// ~17px icon isn't fetched as a multi-MB original — same trick as MasonryGrid.
function optimizedSrc(url: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=75`
}
const THUMB_WIDTHS = [32, 64, 96]

const SECTIONS: { label: string; items: Piece[] }[] = [
  { label: 'initiatives', items: initiatives },
  { label: 'pieces', items: pieces },
  { label: 'finds', items: finds },
]

export default function Home() {
  return (
    <main className="px-8 pb-16 home:px-14 home:pb-20">
      {/* Three columns — grid tracks span the full width and stay evenly
          spaced; only the content inside each column is capped narrower.
          Labels themselves live in SiteChrome, directly above this grid.
          Switches at the custom `home` breakpoint, not `md` — below it a
          hover-scaled thumbnail collides with the neighboring column. */}
      <div className="mt-5 grid grid-cols-1 gap-x-12 gap-y-10 home:mt-7 home:grid-cols-3">
        {SECTIONS.map((section) => (
          <section key={section.label} className="home:max-w-[300px]">
            <h2 className="section-label mb-3 text-[13px] home:hidden">{section.label}</h2>
            <ul className="pl-4">
              {section.items.map((item) => (
                <li key={item.title} className="group relative">
                  <Thumbnail item={item} isFind={section.label === 'finds'} />
                  <Entry item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}

// Shared position/size for every hover layer — a fixed row-height icon that
// pivots from its own bottom-right corner, so scaling it up on hover grows
// it toward the upper-left without that corner ever shifting.
const THUMB_BASE =
  'absolute right-full top-1/2 mr-1.5 h-[16.75px] w-auto -translate-y-1/2 origin-bottom-right transition-all duration-300 ease-out md:h-[18.25px]'

// Fully-written class strings, not built by interpolating a variable —
// Tailwind's build-time scanner only picks up utility names that appear
// verbatim in the source, so each hover variant needs its own literal.
const HOVER_PIECE = 'group-hover:z-30 group-hover:scale-[3] group-hover:rotate-[-8deg]'
const HOVER_FIND_PRIMARY = 'group-hover:z-30 group-hover:scale-[2.5] group-hover:rotate-[-8deg]'
const HOVER_FIND_PREVIEW_1 =
  'opacity-0 group-hover:z-20 group-hover:scale-[2.5] group-hover:rotate-[5deg] group-hover:opacity-100'
const HOVER_FIND_PREVIEW_2 =
  'opacity-0 group-hover:z-10 group-hover:scale-[2.5] group-hover:rotate-[16deg] group-hover:opacity-100'

function cropStyle(crop?: { width: number; height: number }) {
  return crop
    ? { aspectRatio: `${crop.width} / ${crop.height}`, objectFit: 'cover' as const, objectPosition: 'top' as const }
    : {}
}

// Finds entries fan their thumbnail out alongside the gallery's next two
// photos on hover (each pivoting from the same bottom-right corner, so the
// three just spread open like a dealt hand); pieces just grow in place.
function Thumbnail({ item, isFind }: { item: Piece; isFind: boolean }) {
  if (!item.image) return null

  const [preview1, preview2] = isFind ? (item.previewImages ?? []) : []

  return (
    <>
      {typeof item.image === 'string' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={optimizedSrc(item.image, 64)}
          srcSet={THUMB_WIDTHS.map((w) => `${optimizedSrc(item.image as string, w)} ${w}w`).join(', ')}
          sizes="32px"
          alt={item.title}
          className={`${THUMB_BASE} ${isFind ? HOVER_FIND_PRIMARY : HOVER_PIECE}`}
          style={{ borderRadius: 1, ...cropStyle(item.imageCrop) }}
        />
      ) : item.imageDark ? (
        <>
          <Image
            src={item.image}
            alt={item.title}
            className={`theme-img-light ${THUMB_BASE} ${isFind ? HOVER_FIND_PRIMARY : HOVER_PIECE}`}
            style={{ borderRadius: 1 }}
          />
          <Image
            src={item.imageDark}
            alt={item.title}
            className={`theme-img-dark ${THUMB_BASE} ${isFind ? HOVER_FIND_PRIMARY : HOVER_PIECE}`}
            style={{ borderRadius: 1 }}
          />
        </>
      ) : (
        <Image
          src={item.image}
          alt={item.title}
          className={`${THUMB_BASE} ${isFind ? HOVER_FIND_PRIMARY : HOVER_PIECE}`}
          style={{ borderRadius: 1, ...(item.thumbHeightPx ? { height: item.thumbHeightPx } : {}) }}
        />
      )}
      {preview1 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={optimizedSrc(preview1, 64)}
          srcSet={THUMB_WIDTHS.map((w) => `${optimizedSrc(preview1, w)} ${w}w`).join(', ')}
          sizes="32px"
          alt=""
          className={`${THUMB_BASE} ${HOVER_FIND_PREVIEW_1}`}
          style={{ borderRadius: 1 }}
        />
      )}
      {preview2 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={optimizedSrc(preview2, 64)}
          srcSet={THUMB_WIDTHS.map((w) => `${optimizedSrc(preview2, w)} ${w}w`).join(', ')}
          sizes="32px"
          alt=""
          className={`${THUMB_BASE} ${HOVER_FIND_PREVIEW_2}`}
          style={{ borderRadius: 1 }}
        />
      )}
    </>
  )
}

function Entry({ item }: { item: Piece }) {
  const row = (
    <div
      className="flex items-baseline justify-between gap-6 py-[3px] text-[17px] md:text-[19px]"
      style={{ fontFamily: 'var(--font-garamond), serif' }}
    >
      <span>{item.title}</span>
      <span className="italic">{item.date}</span>
    </div>
  )

  return item.href ? (
    <Link href={item.href} className="block transition-opacity hover:opacity-60">
      {row}
    </Link>
  ) : (
    row
  )
}
