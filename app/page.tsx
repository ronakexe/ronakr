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
    <main className="px-8 pb-16 md:px-16 md:pb-20">
      {/* Three columns — grid tracks span the full width and stay evenly
          spaced; only the content inside each column is capped narrower.
          Labels themselves live in SiteChrome, directly above this grid. */}
      <div className="mt-5 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-7 md:grid-cols-3">
        {SECTIONS.map((section) => (
          <section key={section.label} className="md:max-w-[300px]">
            <h2 className="section-label mb-3 text-[13px] md:hidden">{section.label}</h2>
            <ul className="pl-4">
              {section.items.map((item) => (
                <li key={item.title} className="relative">
                  {item.image && typeof item.image === 'string' && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={optimizedSrc(item.image, 64)}
                      srcSet={THUMB_WIDTHS.map((w) => `${optimizedSrc(item.image as string, w)} ${w}w`).join(', ')}
                      sizes="32px"
                      alt={item.title}
                      className="absolute right-full top-1/2 mr-1.5 h-[16.75px] w-auto -translate-y-1/2 md:h-[18.25px]"
                      style={{ borderRadius: 1 }}
                    />
                  )}
                  {item.image && typeof item.image !== 'string' && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="absolute right-full top-1/2 mr-1.5 h-[16.75px] w-auto -translate-y-1/2 md:h-[18.25px]"
                      style={{ borderRadius: 1 }}
                    />
                  )}
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
