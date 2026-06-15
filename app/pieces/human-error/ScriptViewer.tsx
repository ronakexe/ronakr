'use client'
import { useState, useRef } from 'react'

const DRAFTS = [
  { id: 'draft1',   label: 'Draft 1',  folder: 'human-error-draft-1', pages: 5, rotation: -7 },
  { id: 'draft2',   label: 'Draft 2',  folder: 'human-error-draft-2', pages: 6, rotation:  5 },
  { id: 'draft3',   label: 'Draft 3',  folder: 'human-error-draft-3', pages: 8, rotation: -3 },
  { id: 'official', label: 'Official', folder: 'human-error-script',   pages: 8, rotation:  0 },
] as const

type DraftId = (typeof DRAFTS)[number]['id']

function DocIcon({ rotation, active }: { rotation: number; active: boolean }) {
  const ink  = active ? '#000' : '#bbb'
  const fill = active ? '#111' : '#efefef'
  const line = active ? '#fff' : '#d0d0d0'
  return (
    <svg
      width="34" height="48"
      viewBox="0 0 34 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 250ms ease, opacity 250ms ease' }}
    >
      <path d="M2 2 L24 2 L32 10 L32 46 L2 46 Z" fill={fill} stroke={ink} strokeWidth="1.5" />
      <path d="M24 2 L24 10 L32 10" fill={active ? '#333' : '#d8d8d8'} stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="7" y1="18" x2="27" y2="18" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="24" x2="27" y2="24" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="30" x2="20" y2="30" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function ScriptViewer() {
  const [active, setActive] = useState<DraftId>('official')
  const boxRef = useRef<HTMLDivElement>(null)

  const draft = DRAFTS.find(d => d.id === active)!

  function select(id: DraftId) {
    setActive(id)
    if (boxRef.current) boxRef.current.scrollTop = 0
  }

  return (
    <>
      {/* Script box */}
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

      {/* Draft selectors */}
      <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'center' }}>
        {DRAFTS.map(d => (
          <button
            key={d.id}
            onClick={() => select(d.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 7,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            <DocIcon rotation={d.rotation} active={active === d.id} />
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '12px',
                fontWeight: active === d.id ? 600 : 400,
                color: active === d.id ? '#000' : '#999',
                transition: 'color 200ms ease, font-weight 200ms ease',
              }}
            >
              {d.label}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
