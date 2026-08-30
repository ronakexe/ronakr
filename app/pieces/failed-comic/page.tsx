import Script from 'next/script'

const BG = 'var(--bg)'

export default function FailedComicPage() {
  return (
    <>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
        <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
          <h1
            className="text-[32px] md:text-[40px] leading-none px-5 pt-14 md:px-10"
            style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", letterSpacing: '-0.02em', margin: 0 }}
          >
            Failed Comic
          </h1>

          {/* Content */}
          <section
            className="relative grid grid-cols-1 md:grid-cols-4 md:items-center px-5 md:px-10"
            style={{ paddingTop: 64, paddingBottom: 64 }}
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
                A struggling comedian on the verge of being fired gets one last shot to save
                his career. Desperate for material that lands, he stumbles onto an
                unconventional source of &ldquo;inspiration.&rdquo;
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
