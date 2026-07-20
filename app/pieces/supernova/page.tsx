const BG = 'var(--bg)'   // page background (no pattern on piece pages)

export default function SupernovaPage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        <h1
          className="text-[32px] md:text-[40px] font-bold leading-none"
          style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", letterSpacing: '-0.02em', margin: 0, padding: '56px 40px 0' }}
        >
          Supernova
        </h1>

        {/* Content — 4-column track system; the video spans multiple columns. */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-4 md:items-center"
          style={{ paddingTop: 28, paddingLeft: 40, paddingRight: 40, paddingBottom: 96 }}
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
                fontFamily: 'var(--font-crimson-pro)',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--text)',
                marginTop: 12,
              }}
            >
              Nova is a teenage girl who hosts a party in an attempt to achieve the approval
              of the people there. However, as she starts drinking, her hidden insecurities
              come to life in the form of the fake thoughts of those around her. As she
              becomes more disoriented, she pushes away her best friend and snowballs into
              self-sabotaging madness.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
