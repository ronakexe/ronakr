const BG = 'var(--bg)'

export default function YouthStemlinePage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        {/* Text column — capped at 1.5x the pieces-page synopsis width (338px * 1.5 = 507px, plus 40px side padding) */}
        <div className="md:max-w-[587px]">
          <h1
            className="text-[32px] md:text-[40px] leading-none px-5 md:px-10"
            style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", letterSpacing: '-0.02em', margin: 0, paddingTop: '56px' }}
          >
            Youth Stemline
          </h1>

          <p
            className="text-[18px] px-5 md:px-10"
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--text)',
              margin: 0,
              paddingTop: '16px',
            }}
          >
            A youth-led STEM publication hosting workshops across the Dallas area.
          </p>

          <h2
            className="text-[18px] px-5 md:px-10"
            style={{ fontFamily: 'var(--font-garamond)', fontWeight: 700, color: 'var(--text)', margin: 0, paddingTop: '48px' }}
          >
            About the project
          </h2>

          <p
            className="text-[18px] px-5 md:px-10"
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--text)',
              margin: 0,
              paddingTop: '16px',
            }}
          >
            As an online publication, we&apos;ve created a community of 40+ student writers
            sharing their passion for STEM with the world. The organization provides an outlet
            for students to express their interests without a high pressure structure or any
            deadlines. Moreover, for readers, we make STEM information accessible and engaging
            for teens. That same mission extends beyond the website and into our hands-on
            workshops.
          </p>

          <p
            className="text-[18px] px-5 md:px-10"
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--text)',
              margin: 0,
              paddingTop: '16px',
            }}
          >
            TomorrowMakers is a program for kids where we explore STEM topics in an
            interactive environment, built around project-based learning and group discussions.
            At our core, we believe reading and writing are indispensable, so each lesson
            includes a Youth Stemline article, paired with a worksheet to test learning before
            and after. We&apos;ve run sessions with the Dallas Police Association and Preston
            Royal Branch Library, with more planned at University Park Public Library and
            Farmers Branch Manske Library.
          </p>

          <p
            className="text-[18px] px-5 md:px-10"
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--text)',
              margin: 0,
              paddingTop: '16px',
            }}
          >
            Together, we hope to use these initiatives to build curiosity in kids by making
            STEM pressure free and accessible.
          </p>
        </div>
      </div>
    </main>
  )
}
