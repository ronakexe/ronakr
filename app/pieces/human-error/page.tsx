import OfficialScriptSection from './OfficialScriptSection'
import StillsGallery from '@/components/StillsGallery'

const BG = 'var(--bg)'

const STILLS_BASE = 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Human%20Error'
const STILLS_FILES = [
  '%20.jpg',
  'main_01_00_11_12.jpg',
  'main_01_00_40_14.jpg',
  'main_01_01_23_00.jpg',
  'main_01_03_12_20.jpg',
  'main_01_03_36_15.jpg',
  'main_01_03_47_21.jpg',
  'main_01_04_05_16.jpg',
  'main_01_04_18_12.jpg',
  'main_01_05_02_16.jpg',
  'main_01_05_03_14.jpg',
  'main_01_05_28_17.jpg',
]
const STILLS = STILLS_FILES.map((file) => `${STILLS_BASE}/${file}`)

export default function HumanErrorPage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        <h1
          className="text-[32px] md:text-[40px] leading-none"
          style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", letterSpacing: '-0.02em', margin: 0, padding: '56px 40px 0' }}
        >
          Human Error
        </h1>

        {/* Content */}
        <section
          className="relative grid grid-cols-1 md:grid-cols-3 mid:grid-cols-4 md:items-center"
          style={{ paddingTop: 64, paddingLeft: 40, paddingRight: 40, paddingBottom: 64 }}
        >
          {/* Video — spans all but the last column */}
          <div className="md:col-span-2 mid:col-span-3">
            <div className="mx-0" style={{ background: BG, padding: 5 }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/DY51tBN6Lso?si=2FKkUT95jKUJlMYj"
                  title="Human Error"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Synopsis — last column */}
          <div className="md:col-start-3 mid:col-start-4 mt-12 md:mt-0" style={{ paddingLeft: 12, paddingRight: 8 }}>
            <p
              className="text-[15px] md:text-[18px]"
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--text)',
              }}
            >
              Human Error is about an angel who is trying to impress God by interviewing
              humans to get feedback for an Earth v2 project. Throughout the interview,
              she can&apos;t keep the humans in control, ending up with no feedback for God,
              forcing her to confront the one being she&apos;s been trying to impress.
            </p>
          </div>
        </section>

        {/* Stills — frame viewer with thumbnail strip */}
        <StillsGallery images={STILLS} />

        {/* Official Script — client component owns draft state, icons, and script box */}
        <OfficialScriptSection />
      </div>
    </main>
  )
}
