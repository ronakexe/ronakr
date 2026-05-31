import Image, { StaticImageData } from 'next/image'
import doubleTrouble from './piece-assets/double trouble/double-trouble-icon.png'
import failedComic from './piece-assets/failed comic/failed-comic-icon.png'
import humanError from './piece-assets/human error/human-error-icon.png'
import jimmySidewalk from './piece-assets/jimmy sidewalk/sidewalk-jimmy-icon.png'
import supernova from './piece-assets/supernova/supernova-icon.png'

const pieces = [
  { title: 'Double Trouble', image: doubleTrouble, left: 0,   top: 0   },
  { title: 'Failed Comic',   image: failedComic,   left: 0,   top: 240 },
  { title: 'Human Error',    image: humanError,    left: 350, top: 80  },
  { title: 'Sidewalk Jimmy', image: jimmySidewalk, left: 350, top: 320 },
  { title: 'Supernova',      image: supernova,     left: 700, top: 0   },
]

const CARD_W  = 270
const BLOCK_H = 520

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
              <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '26px', fontWeight: 600, margin: '10px 0 0' }}>
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

const M_CARD_W = 230           // card width
const M_H_GAP  = 20            // horizontal gap between cards
const M_STEP   = M_CARD_W + M_H_GAP
const M_OFFSET = M_STEP / 2   // bottom row shifts right by half a step
const M_V_GAP  = 36            // vertical gap between rows

type Piece = { title: string; image: StaticImageData; left: number; top: number }

function MobilePieces({ pieces }: { pieces: Piece[] }) {
  const topRow    = pieces.filter((_, i) => i % 2 === 0)
  const bottomRow = pieces.filter((_, i) => i % 2 === 1)

  return (
    // `block md:hidden` keeps display out of inline style so md:hidden can override it.
    // overflow-x: scroll on the block container scrolls inline content that overflows.
    <main
      className="block md:hidden"
      style={{
        position: 'fixed',
        top: '90px',
        bottom: '70px',
        left: 0,
        right: 0,
        overflowX: 'scroll',
        overflowY: 'hidden',
      }}
    >
      {/*
        inline-flex: sizes to natural content width → overflows the block parent
        → triggers parent overflow-x scroll. height: 100% + justifyContent: center
        → vertically centers the two rows without any calc magic.
      */}
      <div style={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: '32px',
        paddingRight: '32px',
        gap: `${M_V_GAP}px`,
        verticalAlign: 'top',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', gap: `${M_H_GAP}px` }}>
          {topRow.map(piece => <MobileCard key={piece.title} piece={piece} />)}
        </div>
        {/* Bottom row — zigzag offset */}
        <div style={{ display: 'flex', gap: `${M_H_GAP}px`, paddingLeft: `${M_OFFSET}px` }}>
          {bottomRow.map(piece => <MobileCard key={piece.title} piece={piece} />)}
        </div>
      </div>
    </main>
  )
}

function MobileCard({ piece }: { piece: Piece }) {
  return (
    <div style={{ width: M_CARD_W, flexShrink: 0 }}>
      <Image
        src={piece.image}
        alt={piece.title}
        style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }}
      />
      <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '21px', fontWeight: 600, margin: '8px 0 0' }}>
        {piece.title}
      </h2>
    </div>
  )
}
