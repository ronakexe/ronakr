import Script from 'next/script'

const BG = 'var(--bg)'

export default function FailedComicPage() {
  return (
    <>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
        <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
          <h1
            className="text-[32px] md:text-[40px] leading-none"
            style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", letterSpacing: '-0.02em', margin: 0, padding: '56px 40px 0' }}
          >
            Failed Comic
          </h1>

          {/* Content */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-4 md:items-center"
            style={{ paddingTop: 28, paddingLeft: 40, paddingRight: 40, paddingBottom: 96 }}
          >
            {/* Video — spans the first three columns */}
            <div className="md:col-span-3">
              <div className="mx-0" style={{ background: BG, padding: 5 }}>
                <div
                  style={{
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
              <h2
                className="text-[14px] uppercase"
                style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", fontStyle: 'italic', letterSpacing: '0.14em', opacity: 0.5, margin: 0 }}
              >
                Synopsis
              </h2>
              <p
                className="text-[15px] md:text-[18px]"
                style={{
                  fontFamily: 'var(--font-garamond)',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'var(--text)',
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
