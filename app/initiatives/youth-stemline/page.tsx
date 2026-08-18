const BG = 'var(--bg)'

export default function YouthStemlinePage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        {/* Text column — capped at 1.5x the pieces-page synopsis width (338px * 1.5 = 507px, plus 40px side padding) */}
        <div className="md:max-w-[587px]">
          <h1
            className="text-[32px] md:text-[40px] leading-none"
            style={{ fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif", letterSpacing: '-0.02em', margin: 0, padding: '56px 40px 0' }}
          >
            Youth Stemline
          </h1>

          <p
            className="text-[15px] md:text-[18px]"
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--text)',
              margin: 0,
              padding: '16px 40px 0',
            }}
          >
            A youth-led STEM publication hosting workshops across the Dallas area.
          </p>

          <h2
            className="text-[15px] md:text-[18px]"
            style={{ fontFamily: 'var(--font-garamond)', fontWeight: 700, color: 'var(--text)', margin: 0, padding: '48px 40px 0' }}
          >
            About the project
          </h2>

          <p
            className="text-[15px] md:text-[18px]"
            style={{
              fontFamily: 'var(--font-garamond)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--text)',
              margin: 0,
              padding: '16px 40px 0',
            }}
          >
            As an online publication, we&apos;ve created a community of 40+ student writers
            who are sharing their passion for STEM with the world. The organization provides
            an outlet for students to express their interests without a high pressure
            structure or any deadlines. Moreover, for readers, we make STEM information
            accessible and engaging for teens. That same mission extends beyond the website
            and into TomorrowMakers, our hands-on workshop for students 4 to 12.
          </p>
        </div>
      </div>
    </main>
  )
}
