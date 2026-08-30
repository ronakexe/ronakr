const BG = 'var(--bg)'

const h2Style = {
  fontFamily: 'var(--font-garamond)',
  fontWeight: 700,
  lineHeight: 1.6,
  color: 'var(--text)',
  margin: '40px 0 12px',
} as const

const pStyle = {
  fontFamily: 'var(--font-garamond)',
  fontWeight: 400,
  lineHeight: 1.6,
  color: 'var(--text)',
  margin: '0 0 20px',
} as const

const footnoteStyle = {
  fontFamily: 'var(--font-garamond)',
  fontWeight: 400,
  lineHeight: 1.5,
  color: 'var(--text)',
  margin: '0 0 10px',
} as const

function Ref({ n }: { n: number }) {
  return (
    <sup id={`fnref-${n}`} style={{ fontSize: '0.7em', lineHeight: 0 }}>
      <a href={`#fn-${n}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        {n}
      </a>
    </sup>
  )
}

export default function GoogleCloudIn2026Page() {
  return (
    <main className="relative w-full" style={{ minHeight: '100vh', background: BG }}>
      <div className="relative mx-auto" style={{ maxWidth: 1512, minHeight: '100vh' }}>
        <h1
          className="text-[32px] md:text-[40px] leading-none"
          style={{
            fontFamily: "'Redaction 20', var(--font-dm-sans), sans-serif",
            letterSpacing: '-0.02em',
            margin: 0,
            padding: '56px 40px 0',
          }}
        >
          Google Cloud in 2026
        </h1>

        <section style={{ padding: '48px 40px 96px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {/* Lede — sits above the summary proper. */}
            <div>
              <p className="text-[18px]" style={pStyle}>
                This executive summary was written on the research I completed with Stanford GSB
                professor Raj Joshi. It boils down my research and analysis of Google Cloud&rsquo;s
                evolution from 2024-2026 into a concise overview.
              </p>
              <p className="text-[18px]" style={pStyle}>
                Currently Google might look like it&rsquo;s falling off in the AI race. Despite
                having all the data an AI lab could dream of, Gemini is lacking when you compare
                them to other frontier AI models on the benchmarks. A closer look, however, tells a
                different story. While their models aren&rsquo;t at the forefront of the rankings,
                they&rsquo;re positioning within the AI boom is perfect.
              </p>
            </div>

            <h2 className="text-[18px]" style={h2Style}>
              Introduction
            </h2>
            <p className="text-[18px]" style={pStyle}>
              In 2019, when Thomas Kurian joined Google Cloud, he was given an under-performing
              company and tasked with turning it into—at the very least—a viable business. To say
              he over delivered is an understatement. By investing in the full stack, building on
              an open ecosystem, and fostering an employee culture of success, Kurian grew Google
              Cloud from $5.8B in revenue in 2018 to a conservatively estimated $94B in 2026.<Ref n={1} />
            </p>
            <p className="text-[18px]" style={pStyle}>
              Throughout this overview, the three major overarching explanations for Google&apos;s
              unimaginably immense growth will be covered. While the sections are organized into
              the full stack, customer growth, and their open culture, they do still overlap and
              support each other.
            </p>

            <h2 className="text-[18px]" style={h2Style}>
              Full Stack Strategy
            </h2>
            <p className="text-[18px]" style={pStyle}>
              To control quality over each layer, Kurian had made sure Google Cloud invested in
              owning the full stack. That included the models, the compute, and specifically, the
              chips. That bet would pay off in the coming years as they would have control over
              every layer in the AI boom. They could sell the models, sell their compute to run
              other models, and sell the TPU&rsquo;s to those who needed control over the compute
              themselves. The business model was further complicated as they needed to work with
              entities that were simultaneously buying Google&rsquo;s compute and chips but also
              competing with Google as they trained, ran and sold their own models. More on this
              in the Open Culture portion.
            </p>
            <p className="text-[18px]" style={pStyle}>
              Because the AI boom created such demand for each layer, Google was able to capture a
              large portion of AI spending and it&rsquo;s largely paying off, showing up in revenue
              and margin growth across the business. The demand itself, however, had outgrown their
              supply, and Google Cloud agreements just continued to pile up. This backlog partly
              explained the increase in revenue over the past few years, but to understand it
              better, we need to see the full picture—the customers.
            </p>

            <h2 className="text-[18px]" style={h2Style}>
              Customer Growth
            </h2>
            <p className="text-[18px]" style={pStyle}>
              The most interesting thing about Google Cloud&rsquo;s growth over the past few years
              was, although they have already grown exponentially, that it did not seem to be
              decelerating. While the underlying reason is their investment in the full stack, the
              revenue acceleration was seen through the parallel growth in customers and how much
              they were buying.
            </p>
            <p className="text-[18px]" style={pStyle}>
              The reason Google Cloud was seeing such a backlog was due to two things. First,
              existing customers who were trying to get in on the AI race were spending more than
              they had previously.
            </p>
            <p className="text-[18px]" style={pStyle}>
              That increase in customer spending had contributed to revenue growth already, but the
              boom had created a massive wave of new customers. These new companies were, even if
              not fully, also using Google Cloud. In a Goldman Sachs interview, Kurian shared that
              nine of the top ten frontier labs were using Google Cloud. While he didn&rsquo;t
              specifically mention it, I believe the only reason they did not have all ten was due
              to geographic restrictions; Google Cloud does not work with DeepSeek which, to be
              fair, does not use Azure or AWS either.
            </p>
            <p className="text-[18px]" style={pStyle}>
              The increase in existing and new customers had created a backlog that Google simply
              could not keep up with. Every couple of months, Google Cloud&apos;s new supply, funded
              by CapEx roughly doubling year over year, released a portion of their $514B backlog,
              converting it into revenue. But that customer growth, however, would probably not be
              as magnificent if it hadn&rsquo;t been for the open culture which Kurian originally
              bet on.
            </p>

            <h2 className="text-[18px]" style={h2Style}>
              Continuing The Open Culture
            </h2>
            <p className="text-[18px]" style={pStyle}>
              In an effort to let Google Cloud have a chance of competing with the big dogs in the
              cloud sector, Kurian had built it up with a culture of not locking customers into
              their own products. That philosophy has continued on and expanded into all of Google
              Cloud&apos;s products.
            </p>
            <p className="text-[18px]" style={pStyle}>
              The first example of this doctrine could be seen through the products they had built
              on top of Gemini. While businesses might be hosting their data on other cloud
              platforms, storing was only a part of the problem for any business. To make any data
              or information useful, analyzing it and acting upon it was a necessity.
              Google&rsquo;s investment into the full stack allowed them to provide tools for that.
              Since models were included in that stack, Google had been able to build solutions
              upon their Gemini suite which companies were free to use regardless of the cloud
              provider.
            </p>
            <p className="text-[18px]" style={pStyle}>
              The more obvious instance though, was who they&rsquo;re selling compute/TPU to. I
              touched on this briefly in the Full Stack Strategy section, but there is a lot to
              unpack here. In the AI boom, there have been two sides. The gold miners and the
              people selling shovels. Google has been playing both sides, and it has been working
              for now. On one side, they have been developing their own family of AI products
              (apps, API, models, etc) via Google DeepMind. On the other side, they have been
              selling the pickaxes too, and just like the pickaxe sellers, they have been winning
              more than the former. There&rsquo;s a balance to keep though. They aren&rsquo;t in a
              position like Nvidia where they can, or should, go completely into compute
              infrastructure, but they also aren&rsquo;t in a position where they can, or should,
              become only a frontier lab like OpenAI or Anthropic. While it might seem counter
              intuitive to supply the competitor, it makes a lot of sense once you follow the flow
              of money. Currently, the gold miners aren&rsquo;t making any profit, only the pickaxe
              sellers are. So if you&rsquo;re able to fund the gold mining yourself without
              breathing, eating, and drinking venture capital money, you completely should. That is
              exactly what Google is doing now, and it&rsquo;s working pretty well. The only
              question is where will this go and if it&rsquo;s sustainable.
            </p>
            <p className="text-[18px]" style={pStyle}>
              I personally don&rsquo;t see a world where this goes wrong unless the sun explodes.
              Google has positioned itself in the most successful way possible. It&rsquo;s no
              surprise they are one of the top three most valuable companies in the world. They are
              providing the two most difficult solutions to provide. Creating these models requires
              the greatest talent, infinite money, and all the data in the world. Google has all of
              that. Compute infrastructure on the other hand, even with the money, is hard to break
              into when Nvidia, TSMC, and established cloud infrastructure companies already own
              the market. Even if the AI race leads to locally hosted open weight models, they
              still win as these models would either way run on chips, which Google sells. It also
              can&rsquo;t be left out that Google is one of the most prominent leaders in the
              open-weight AI space.
            </p>
            <p className="text-[18px]" style={pStyle}>
              The most beautiful part of this whole story is that Google helped lay the foundation
              for the AI boom it now profits from. Google researchers developed the transformer
              architecture years before it became mainstream with its use in ChatGPT and other
              large language models. Without Google&rsquo;s breakthrough, November 30th<Ref n={2} />{' '}
              wouldn&rsquo;t have happened.
            </p>

            <hr
              style={{
                border: 0,
                borderTop: '1px solid var(--text)',
                opacity: 0.25,
                margin: '48px 0 20px',
                width: 200,
              }}
            />
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li id="fn-1" className="text-[15px]" style={footnoteStyle}>
                <a href="#fnref-1" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <sup style={{ fontSize: '0.7em', lineHeight: 0 }}>1</sup>
                </a>{' '}
                2026 estimate assumes Q3 and Q4 each match Q2&rsquo;s $24.8B, added to actual Q1
                ($20.0B) and Q2 ($24.8B) revenue; A conservative approach since growth has been
                accelerating each quarter rather than leveling off.
              </li>
              <li id="fn-2" className="text-[15px]" style={footnoteStyle}>
                <a href="#fnref-2" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <sup style={{ fontSize: '0.7em', lineHeight: 0 }}>2</sup>
                </a>{' '}
                The day GPT-3.5 was released to the public.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}
