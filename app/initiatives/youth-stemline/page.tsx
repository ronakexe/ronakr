const BG = 'var(--bg)'

export default function YouthStemlinePage() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
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
          Youth Stemline started when Aravli wanted a place to write about STEM topics
          without any deadlines or competitions. She had been writing for a club, but it
          was primarily politics-focused and wasn&apos;t exactly organized. She contacted
          me in June of 2025 asking to help design and make the website to actually host
          the articles. At the time I was at my school&apos;s summer video production
          class, working on Supernova and didn&apos;t expect it to become a major part of
          my life. So I decided to help out.
        </p>
      </div>
    </main>
  )
}
