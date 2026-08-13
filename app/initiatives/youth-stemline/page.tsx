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
      </div>
    </main>
  )
}
