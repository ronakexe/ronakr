import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import doubleTrouble from './piece-assets/double trouble/double-trouble-icon.png'
import failedComic from './piece-assets/failed comic/failed-comic-icon.png'
import humanError from './piece-assets/human error/human-error-icon.png'
import jimmySidewalk from './piece-assets/jimmy sidewalk/sidewalk-jimmy-icon.png'
import supernova from './piece-assets/supernova/supernova-icon.png'

type Source   = { title: string; image: StaticImageData | null; href?: string }
type Placed   = Source & { left: number; top: number; colIdx: number }

// ─── Pieces: 5 real + 20 placeholder, in display order ───────────────────────
const sources: Source[] = [
  { title: 'Human Error',    image: humanError, href: '/pieces/human-error' },
  { title: 'Supernova',      image: supernova, href: '/pieces/supernova' },
  { title: 'Double Trouble', image: doubleTrouble, href: '/pieces/double-trouble' },
  { title: 'Sidewalk Jimmy', image: jimmySidewalk },
  { title: 'Failed Comic',   image: failedComic, href: '/pieces/failed-comic' },
  ...['I','II','III','IV','V','VI','VII','VIII','IX','X',
      'XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX']
    .map(n => ({ title: `Untitled ${n}`, image: null as StaticImageData | null })),
]

// ─── Honeycomb layout math ───────────────────────────────────────────────────
const CARD_W = 270 * 0.75                    // thumbnails at 75% of the original size
const IMG_H  = Math.round(CARD_W * 562 / 1000) // height from the true 1000×562 ratio (no crop)
const CARD_H = IMG_H + 48          // image + title
const STEP   = CARD_H + 24         // vertical distance between cards in a column
const COL_W  = CARD_W + 50         // horizontal distance between columns

// Column card-counts repeat 2,3 — 2-card columns sit a half-step lower so they
// nestle into the gaps of the neighboring 3-card columns (hexagonal packing).
const COL_COUNTS = [2, 3, 2, 3, 2, 3, 2, 3, 2, 3] // = 25 cards

function buildLayout(): { cards: Placed[]; width: number; height: number } {
  const cards: Placed[] = []
  let idx = 0
  let maxBottom = 0
  COL_COUNTS.forEach((count, colIdx) => {
    const isTall   = count === 3
    const startTop = isTall ? 0 : STEP / 2   // 2-card columns drop half a step
    const left     = 20 + colIdx * COL_W
    for (let row = 0; row < count && idx < sources.length; row++) {
      const top = startTop + row * STEP
      cards.push({ ...sources[idx], left, top, colIdx })
      maxBottom = Math.max(maxBottom, top + CARD_H)
      idx++
    }
  })
  const width = 20 + (COL_COUNTS.length - 1) * COL_W + CARD_W + 60
  return { cards, width, height: maxBottom + 20 }
}

const { cards: PLACED, width: BLOCK_W, height: BLOCK_H } = buildLayout()

export default function PiecesPage() {
  return (
    <main
      className="flex"
      style={{
        marginTop: '80px',
        height: 'calc(100vh - 80px)',
        overflowX: 'auto',
        overflowY: 'hidden',
        alignItems: 'center',
        paddingLeft: '40px',
        paddingRight: '80px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0, height: BLOCK_H, width: BLOCK_W }}>
        {PLACED.map((piece) => (
          <Card key={piece.title} piece={piece} />
        ))}
      </div>
    </main>
  )
}

function Card({ piece }: { piece: Placed }) {
  const thumb = (
    <div style={{ width: '100%', height: IMG_H, borderRadius: '12px', overflow: 'hidden' }}>
      {piece.image ? (
        <Image
          src={piece.image}
          alt={piece.title}
          width={CARD_W}
          height={IMG_H}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e2e2' }} />
      )}
    </div>
  )

  const delay = `${piece.colIdx * 60}ms`

  return (
    <div
      style={{
        position: 'absolute',
        left: piece.left,
        top: piece.top,
        width: CARD_W,
        animation: `piece-in 400ms ease both`,
        animationDelay: delay,
      }}
    >
      {piece.href ? (
        <Link href={piece.href} style={{ display: 'block' }}>{thumb}</Link>
      ) : (
        thumb
      )}
      <h2 style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '18px',
        fontWeight: 600,
        margin: '10px 0 0',
      }}>
        {piece.title}
      </h2>
    </div>
  )
}
