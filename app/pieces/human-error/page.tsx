import Link from 'next/link'
import ScriptViewer from './ScriptViewer'

const LINE = '#5387FF'   // blue column lines
const BG   = '#fcf8f8'   // page background (no pattern on piece pages)

// Vertical column guides. `count` lines mark the boundaries of `count - 1`
// columns, evenly spaced between the left/right page gutters.
function BlueLines({ count, className }: { count: number; className: string }) {
  const step = 100 / (count - 1)
  return (
    <div
      aria-hidden
      className={`${className} absolute pointer-events-none`}
      style={{ top: 0, bottom: 0, left: 40, right: 40 }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${i * step}%`,
            width: 9,
            transform: i === 0 ? 'none' : i === count - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
            background: `linear-gradient(to bottom, transparent 0px, transparent 100px, ${LINE} 150px, ${LINE} calc(100% - 130px), transparent 100%)`,
          }}
        />
      ))}
    </div>
  )
}

export default function HumanErrorPage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        {/* Blue column guides: 5 lines (4 columns) at full width; below 1000px the
            layout drops to 3 columns, so the guides drop to 4 lines to match. */}
        <BlueLines count={5} className="hidden mid:block" />
        <BlueLines count={4} className="hidden md:block mid:hidden" />

        {/* Content */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-3 mid:grid-cols-4 md:items-center"
          style={{ paddingTop: 120, paddingLeft: 40, paddingRight: 40, paddingBottom: 140 }}
        >
          {/* Video — spans all but the last column */}
          <div className="md:col-span-2 mid:col-span-3">
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
          <div className="md:col-start-3 mid:col-start-4 mt-12 md:mt-0" style={{ paddingLeft: 12, paddingRight: 8 }}>
            <h1
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#000',
                margin: 0,
                whiteSpace: 'nowrap',
                // Shares the Official Script formula so both section titles shrink
                // in lockstep — uniform size at every width, one line each.
                fontSize: 'clamp(32px, calc(3.74vw - 6.6px), 48px)',
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
              Human Error is about an angel who is trying to impress God by interviewing
              humans to get feedback for an Earth v2 project. Throughout the interview,
              she can&apos;t keep the humans in control, ending up with no feedback for God,
              forcing her to confront the one being she&apos;s been trying to impress.
            </p>
          </div>
        </div>

        {/* Official Script */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-3 mid:grid-cols-4 md:items-start"
          style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 160 }}
        >
          {/* Write-up — first two columns at mid, first column at md */}
          <div className="md:col-span-1 mid:col-span-2" style={{ paddingLeft: 12, paddingRight: 8, minWidth: 0 }}>
            <h1
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#000',
                margin: 0,
                whiteSpace: 'nowrap',
                // 48px at the 1512 design width; scales down on narrower windows
                // so the two-word title always stays on one line within its column.
                fontSize: 'clamp(32px, calc(3.74vw - 6.6px), 48px)',
              }}
            >
              Official Script
            </h1>
            <div
              className="text-[15px] md:text-[18px]"
              style={{
                fontFamily: 'var(--font-crimson-pro)',
                fontWeight: 400,
                lineHeight: 1.3,
                color: '#000',
                marginTop: 16,
              }}
            >
              <p style={{ margin: 0 }}>
                This was the script used on set for Human Error. It was the first script I had
                ever really written; Previous films had been either written by someone else, or
                we just winged it (like{' '}
                <Link href="/pieces/double-trouble" style={{ color: '#d90f0f', textDecoration: 'underline' }}>
                  Double Trouble
                </Link>
                ).
              </p>
              <p style={{ marginTop: 16 }}>
                As you would expect, the original script was quite different. Originally, there
                were going to be 5 humans, but due to actor constraints, I had to narrow it down
                to 3.
              </p>
              <p style={{ marginTop: 16 }}>
                One of the main problems with the original draft was the lack of reason to care
                for Sarah. We knew she had a problem&mdash;she was nervous about interviewing the
                humans&mdash;but we didn&apos;t know why. Why was she nervous? Why did she not want
                to interview them? So what, she&apos;s interviewing humans!?
              </p>
              <p style={{ marginTop: 16 }}>
                That&apos;s why I added the &lsquo;progress report&rsquo; coming up in the calendar,
                but I still don&apos;t think it was shown clear enough in the film.
              </p>
            </div>
          </div>

          {/* Script pages — columns 3–4 at mid, columns 2–3 at md */}
          <div className="md:col-start-2 md:col-span-2 mid:col-start-3 mt-10 md:mt-0" style={{ paddingLeft: 16 }}>
            <ScriptViewer />
          </div>
        </div>
      </div>
    </main>
  )
}
