'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
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
      <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
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
    </>
  )
}
