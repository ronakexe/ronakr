import Image from 'next/image'
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

      {/* Mobile */}
      <main
        className="flex md:hidden flex-col items-center justify-center gap-8"
        style={{
          minHeight: '100vh',
          paddingTop: '90px',
          paddingBottom: '80px',
          paddingLeft: '32px',
          paddingRight: '32px',
          boxSizing: 'border-box',
        }}
      >
        {pieces.map((piece) => (
          <div key={piece.title} style={{ width: '200px', flexShrink: 0 }}>
            <Image
              src={piece.image}
              alt={piece.title}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
            />
            <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '18px', fontWeight: 600, margin: '8px 0 0' }}>
              {piece.title}
            </h2>
          </div>
        ))}
      </main>
    </>
  )
}
