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

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous frame"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-black/45 text-[18px] text-white hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)]"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next frame"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-black/45 text-[18px] text-white hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)]"
        >
          ›
        </button>

        <span
          className="absolute right-3 bottom-3 text-[12px] tracking-[0.04em] text-white"
          style={{ fontFamily: 'var(--font-dm-sans)', fontVariantNumeric: 'tabular-nums', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
        >
          {String(index + 1).padStart(2, '0')} / {count}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to frame ${i + 1}`}
            className={
              'relative w-[72px] flex-none cursor-pointer p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)] ' +
              (i === index
                ? 'border-2 border-[var(--name)] opacity-100'
                : 'border border-[var(--border)] opacity-55 hover:opacity-90')
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
