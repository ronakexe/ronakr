import StillsGallery from '@/components/StillsGallery'

const BG = 'var(--bg)'   // page background (no pattern on piece pages)

const STILLS_BASE = 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Supernova'
const STILLS_FILES = [
  'still_1_2.48.1.jpg',
  'still_2_1.352.2.jpg',
  'still_5_1.324.1.jpg',
  'still_9_1.160.1_2.0.jpg',
  'still_tara_awk_1.178.1_DONE.jpg',
  'still_tara_davis_1.354.2.jpg',
]
const STILLS = STILLS_FILES.map((file) => `${STILLS_BASE}/${file}`)

export default function SupernovaPage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        <h1
          className="text-[32px] md:text-[40px] leading-none px-5 pt-14 md:px-10"
          style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", letterSpacing: '-0.02em', margin: 0 }}
        >
          Supernova
        </h1>

        {/* Content — 4-column track system; the video spans multiple columns. */}
        <section
          className="relative grid grid-cols-1 md:grid-cols-4 md:items-center px-5 md:px-10"
          style={{ paddingTop: 64, paddingBottom: 64 }}
        >
          {/* Video — spans the first three columns */}
          <div className="md:col-span-3">
            {/* inset on desktop; full text width on mobile */}
            <div className="mx-0" style={{ background: BG, padding: 5 }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/f5JlmgTjRJ8?si=CjKjyZOht8WZDfzL"
                  title="Supernova"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Synopsis — last column */}
          <div className="md:col-start-4 mt-12 md:mt-0 md:pl-3 md:pr-2">
            <p
              className="text-[18px]"
              style={{
                fontFamily: 'var(--font-garamond)',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--text)',
              }}
            >
              Nova is a teenage girl who hosts a party in an attempt to achieve the approval
              of the people there. However, as she starts drinking, her hidden insecurities
              come to life in the form of the fake thoughts of those around her. As she
              becomes more disoriented, she pushes away her best friend and snowballs into
              self-sabotaging madness.
            </p>
          </div>
        </section>

        {/* Stills — frame viewer with thumbnail strip */}
        <StillsGallery images={STILLS} />
      </div>
    </main>
  )
}
