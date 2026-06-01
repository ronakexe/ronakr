import Script from 'next/script'

const LINE = '#5387FF'
const BG   = '#fcf8f8'

export default function FailedComicPage() {
  return (
    <>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
        <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
          {/* Blue column lines */}
          <div
            aria-hidden
            className="hidden md:block absolute pointer-events-none"
            style={{ top: 0, bottom: 0, left: 40, right: 40 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${i * 25}%`,
                  width: 9,
                  transform: i === 0 ? 'none' : i === 4 ? 'translateX(-100%)' : 'translateX(-50%)',
                  background: `linear-gradient(to bottom, transparent 0px, transparent 100px, ${LINE} 150px, ${LINE} calc(100% - 130px), transparent 100%)`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-4 md:items-center"
            style={{ paddingTop: 120, paddingLeft: 40, paddingRight: 40, paddingBottom: 140 }}
          >
            {/* Video — spans the first three columns */}
            <div className="md:col-span-3">
              <div className="mx-0 md:mx-[7%]" style={{ background: BG, padding: 5 }}>
                <div
                  style={{
                    border: '2.5px solid #000',
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                  }}
                >
                  <iframe
                    src="https://player.vimeo.com/video/958536656?badge=0&autopause=0&player_id=0&app_id=58479"
                    title="Failed Comic Final Cut"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
                  />
                </div>
              </div>
            </div>

            {/* Synopsis — last column */}
            <div className="md:col-start-4 mt-12 md:mt-0" style={{ paddingLeft: 12, paddingRight: 8 }}>
              <h1
                className="text-[32px] md:text-[52px]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: '#000',
                  margin: 0,
                }}
              >
                Synopsis
              </h1>
              <p
                className="text-[15px] md:text-[18px]"
                style={{
                  fontFamily: 'var(--font-crimson-pro)',
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: '#000',
                  marginTop: 12,
                }}
              >
                A struggling comedian on the verge of being fired gets one last shot to save
                his career. Desperate for material that lands, he stumbles onto an
                unconventional source of &ldquo;inspiration.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
