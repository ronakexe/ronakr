const LINE = '#5387FF'   // blue column lines
const BG   = '#fcf8f8'   // page background (no pattern on piece pages)

export default function HumanErrorPage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        {/* Blue column lines — 5 lines at the 4-column boundaries, desktop only. */}
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
              Human Error is about an angel who is trying to impress God by interviewing
              humans to get feedback for an Earth v2 project. Throughout the interview,
              she can&apos;t keep the humans in control, ending up with no feedback for God,
              forcing her to confront the one being she&apos;s been trying to impress.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
