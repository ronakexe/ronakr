'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import hed1 from '../piece-assets/human error/hed1 icon.png'
import hed2 from '../piece-assets/human error/hed2 icon.png'
import hed3 from '../piece-assets/human error/hed3 icon.png'
import heod from '../piece-assets/human error/heod icon.png'

const DRAFTS = [
  { id: 'draft1',   label: 'Draft 1',  folder: 'human-error-draft-1', pages: 5, icon: hed1 },
  { id: 'draft2',   label: 'Draft 2',  folder: 'human-error-draft-2', pages: 6, icon: hed2 },
  { id: 'draft3',   label: 'Draft 3',  folder: 'human-error-draft-3', pages: 8, icon: hed3 },
  { id: 'official', label: 'Official', folder: 'human-error-script',   pages: 8, icon: heod },
] as const

type DraftId = (typeof DRAFTS)[number]['id']

export default function OfficialScriptSection() {
  const [active, setActive] = useState<DraftId>('official')
  const boxRef = useRef<HTMLDivElement>(null)

  const draft = DRAFTS.find(d => d.id === active)!

  function select(id: DraftId) {
    setActive(id)
    if (boxRef.current) boxRef.current.scrollTop = 0
  }

  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-3 mid:grid-cols-4 md:items-start"
      style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 160 }}
    >
      {/* Write-up + icons — cols 1–2 at mid, col 1 at md */}
      <div className="md:col-span-1 mid:col-span-2" style={{ paddingLeft: 12, paddingRight: 8, minWidth: 0 }}>
        <h1
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#000',
            margin: 0,
            whiteSpace: 'nowrap',
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

        {/* Draft version icons — below write-up */}
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          {DRAFTS.map(d => (
            <button
              key={d.id}
              onClick={() => select(d.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                opacity: active === d.id ? 1 : 0.35,
                transition: 'opacity 200ms ease',
              }}
            >
              <Image
                src={d.icon}
                alt={d.label}
                width={72}
                height={72}
                style={{ display: 'block' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Script box — cols 3–4 at mid, cols 2–3 at md */}
      <div className="md:col-start-2 md:col-span-2 mid:col-start-3 mt-10 md:mt-0" style={{ paddingLeft: 16 }}>
        <div
          ref={boxRef}
          style={{
            background: '#000',
            border: '5px solid #fcf8f8',
            width: '100%',
            aspectRatio: '595 / 842',
            overflowY: 'auto',
          }}
        >
          {Array.from({ length: draft.pages }, (_, i) => (
            <img
              key={`${draft.id}-${i}`}
              src={`/${draft.folder}/page-${i + 1}.svg`}
              alt={`${draft.label} page ${i + 1}`}
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto', background: '#fff' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
