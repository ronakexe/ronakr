import Image from 'next/image'
import Link from 'next/link'
import CloverIcon from '@/components/CloverIcon'
import { pieces, finds, initiatives, Piece } from '@/app/pieces/pieces'

// Thumbnails hang in the ul's left indent (absolute, right-full) so the
// entry text never shifts — sized to roughly half the 31.5px/34.5px row
// height, width following each image's native aspect ratio.

const SECTIONS: { label: string; items: Piece[] }[] = [
  { label: 'initiatives', items: initiatives },
  { label: 'pieces', items: pieces },
  { label: 'finds', items: finds },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center px-8 py-16 md:px-16 md:py-20">
      {/* Name left, clover right */}
      <div className="flex items-center justify-between gap-8">
        <h1
          className="text-[44px] leading-none md:text-[76px]"
          style={{
            fontFamily: "'Redaction 35', serif",
            color: 'var(--name)',
            fontWeight: 400,
          }}
        >
          Ronak Ramnani
        </h1>
        <CloverIcon width={68} height={65} className="shrink-0" />
      </div>

      {/* Three columns — grid tracks span the full width and stay evenly
          spaced; only the content inside each column is capped narrower. */}
      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:mt-14 md:grid-cols-3">
        {SECTIONS.map((section) => (
          <section key={section.label} className="md:max-w-[300px]">
            <h2 className="section-label text-[15px] md:text-[16px]">{section.label}</h2>
            <ul className="mt-4 pl-4 md:mt-5">
              {section.items.map((item) => (
                <li key={item.title} className="relative">
                  {item.image && (
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
      <span>{item.date}</span>
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
