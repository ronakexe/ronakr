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
            and into our hands-on workshops.
          </p>

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
            TomorrowMakers is a series for elementary and middle schoolers where we explore
            topics such as engineering, weather, space, and AI in an interactive environment.
            Sessions are built around project-based learning and group discussions to extend
            learning beyond the classroom. At our core, we still believe that reading and
            writing are indispensable, especially in a world where AI can automate those
            processes, so we make sure to include a Youth Stemline article in each course. To
            support their learning and track growth, we pair our articles with a worksheet and
            test their learning before and after the reading. So far, we&apos;ve brought
            TomorrowMakers to the Dallas Police Association and Preston Royal Branch Library,
            with future sessions planned at University Park Public Library and Farmers Branch
            Manske Library.
          </p>

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
            Together, we hope to use these initiatives to build curiosity in kids by making
            STEM pressure free and accessible.
          </p>
        </div>
      </div>
    </main>
  )
}
