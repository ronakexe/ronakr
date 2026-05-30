import Image, { StaticImageData } from 'next/image'
import doubleTrouble from './piece-assets/double trouble/double-trouble-icon.png'
import failedComic from './piece-assets/failed comic/failed-comic-icon.png'
import humanError from './piece-assets/human error/human-error-icon.png'
import jimmySidewalk from './piece-assets/jimmy sidewalk/sidewalk-jimmy-icon.png'
import supernova from './piece-assets/supernova/supernova-icon.png'

const pieces = [
  { title: 'Double Trouble', image: doubleTrouble, left: 0,   top: 0   },
  { title: 'Failed Comic',   image: failedComic,   left: 0,   top: 210 },
  { title: 'Human Error',    image: humanError,    left: 280, top: 80  },
  { title: 'Sidewalk Jimmy', image: jimmySidewalk, left: 280, top: 290 },
  { title: 'Supernova',      image: supernova,     left: 560, top: 0   },
]

const CARD_W  = 220
const BLOCK_H = 430

export default function PiecesPage() {
  const contentW = Math.max(...pieces.map(p => p.left)) + CARD_W + 120

  return (
    <>
      {/* Desktop */}
      <main
        className="hidden md:flex"
        style={{
          marginTop: '80px',
          height: 'calc(100vh - 80px)',
          overflowX: 'auto',
          overflowY: 'hidden',
          alignItems: 'center',
          paddingLeft: '40px',
          paddingRight: '40px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ position: 'relative', flexShrink: 0, height: BLOCK_H, width: contentW }}>
          {pieces.map((piece) => (
            <div
              key={piece.title}
              style={{ position: 'absolute', left: piece.left, top: piece.top, width: CARD_W }}
            >
              <Image
                src={piece.image}
                alt={piece.title}
                style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
              />
              <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '22px', fontWeight: 600, margin: '8px 0 0' }}>
                {piece.title}
              </h2>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile — 2-row zigzag horizontal scroll */}
      <MobilePieces pieces={pieces} />
    </>
  )
}

// ─── Mobile zigzag layout ────────────────────────────────────────────────────

const M_CARD_W  = 155          // card width
const M_H_GAP   = 20           // horizontal gap between cards
const M_STEP    = M_CARD_W + M_H_GAP   // one column step
const M_OFFSET  = M_STEP / 2           // row-2 shifts right by half a step
const M_CARD_H  = Math.round(M_CARD_W * 9 / 16)  // image height (16:9)
const M_TITLE_H = 34           // title line height
const M_V_GAP   = 36           // vertical gap between rows
const M_BLOCK_H = M_CARD_H + M_TITLE_H + M_V_GAP + M_CARD_H + M_TITLE_H

type Piece = { title: string; image: StaticImageData; left: number; top: number }

function MobilePieces({ pieces }: { pieces: Piece[] }) {
  // Split into top row (even indices) and bottom row (odd indices)
  const topRow    = pieces.filter((_, i) => i % 2 === 0)
  const bottomRow = pieces.filter((_, i) => i % 2 === 1)

  // Content width: whichever row is wider
  const topW    = topRow.length    * M_STEP - M_H_GAP + 32
  const bottomW = bottomRow.length * M_STEP - M_H_GAP + 32 + M_OFFSET
  const contentW = Math.max(topW, bottomW) + 32   // extra right padding

  return (
    <main
      className="md:hidden"
      style={{
        position: 'fixed',
        top: '90px',
        bottom: '70px',
        left: 0,
        right: 0,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <div style={{
        position: 'relative',
        flexShrink: 0,
        height: M_BLOCK_H,
        width: contentW,
        marginTop: `calc((100vh - 90px - 70px - ${M_BLOCK_H}px) / 2)`,
      }}>
        {/* Top row */}
        {topRow.map((piece, i) => (
          <MobileCard key={piece.title} piece={piece} left={32 + i * M_STEP} top={0} />
        ))}
        {/* Bottom row — offset right by half a step */}
        {bottomRow.map((piece, i) => (
          <MobileCard
            key={piece.title}
            piece={piece}
            left={32 + M_OFFSET + i * M_STEP}
            top={M_CARD_H + M_TITLE_H + M_V_GAP}
          />
        ))}
      </div>
    </main>
  )
}

function MobileCard({ piece, left, top }: { piece: Piece; left: number; top: number }) {
  return (
    <div style={{ position: 'absolute', left, top, width: M_CARD_W }}>
      <Image
        src={piece.image}
        alt={piece.title}
        style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }}
      />
      <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '15px', fontWeight: 600, margin: '6px 0 0' }}>
        {piece.title}
      </h2>
    </div>
  )
}
