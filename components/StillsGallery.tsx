'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

export default function StillsGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)
  const count = images.length

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goTo(index - 1)
      if (e.key === 'ArrowRight') goTo(index + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, goTo])

  return (
    <div style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 96 }}>
      <div className="relative w-full" style={{ aspectRatio: '16 / 9', background: '#000' }}>
        <Image
          src={images[index]}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1432px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="flex items-center justify-center gap-4" style={{ marginTop: 16 }}>
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous frame"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[var(--text)] bg-[var(--bg)] text-[18px] text-[var(--text)] hover:border-[var(--name)] hover:text-[var(--name)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)]"
        >
          ‹
        </button>

        <span
          className="text-[13px] tracking-[0.04em]"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--muted-foreground)',
            minWidth: 56,
            textAlign: 'center',
          }}
        >
          {String(index + 1).padStart(2, '0')} / {count}
        </span>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next frame"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[var(--text)] bg-[var(--bg)] text-[18px] text-[var(--text)] hover:border-[var(--name)] hover:text-[var(--name)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)]"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to frame ${i + 1}`}
            className={
              'relative w-[72px] flex-none cursor-pointer border border-[var(--border)] p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)] ' +
              (i === index ? 'opacity-100' : 'opacity-55 hover:opacity-90')
            }
            style={{ aspectRatio: '16 / 9', background: '#000' }}
          >
            <Image src={src} alt="" fill sizes="72px" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  )
}
