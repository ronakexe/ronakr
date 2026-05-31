const LINE = '#5387FF'   // blue column lines
const BG   = '#fcf8f8'   // page background (no pattern on piece pages)

export default function SupernovaPage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        {/* Blue column lines — 5 lines at the 4-column boundaries, desktop only.
            Each line fades to transparent at the top and bottom of the page. */}
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

        {/* Content — same 4-column track system so headings/paragraphs sit
            inside the lines and the video spans multiple columns. */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-4 md:items-center"
          style={{ paddingTop: 120, paddingLeft: 40, paddingRight: 40, paddingBottom: 140 }}
        >
          {/* Video — spans the first three columns. The 5px BG-colored frame
              keeps the column lines from touching the black border. */}
          <div className="md:col-span-3">
            {/* inset (desktop only) so the video sits inside the columns rather than
                touching the lines; on mobile it spans the full text width */}
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
              className="text-[16px] md:text-[20px]"
              style={{
                fontFamily: 'var(--font-crimson-pro)',
                fontWeight: 400,
                lineHeight: 1.3,
                color: '#000',
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
