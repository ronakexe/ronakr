'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

const NAV_BTN =
  'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-white/70 text-[20px] text-white hover:border-[var(--name)] hover:text-[var(--name)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)]'

export default function StillsGallery({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const count = images.length

  const close = useCallback(() => setOpenIndex(null), [])
  const goTo = useCallback((i: number) => setOpenIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (openIndex === null) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') goTo(openIndex! - 1)
      if (e.key === 'ArrowRight') goTo(openIndex! + 1)
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [openIndex, close, goTo])

  return (
    <div style={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 96 }}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open frame ${i + 1}`}
            className="relative w-full cursor-pointer border-0 p-0 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--name)]"
            style={{ aspectRatio: '16 / 9', background: '#000' }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Stills viewer"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          onClick={close}
        >
          <button type="button" onClick={close} aria-label="Close" className={`absolute right-4 top-4 ${NAV_BTN}`}>
            ×
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goTo(openIndex - 1) }}
            aria-label="Previous frame"
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${NAV_BTN}`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goTo(openIndex + 1) }}
            aria-label="Next frame"
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${NAV_BTN}`}
          >
            ›
          </button>

          <div className="relative" style={{ width: '90vw', height: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <Image src={images[openIndex]} alt="" fill sizes="90vw" style={{ objectFit: 'contain' }} priority />
          </div>

          <span
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[13px] tracking-[0.04em] text-white"
            style={{ fontFamily: 'var(--font-dm-sans)', fontVariantNumeric: 'tabular-nums' }}
          >
            {String(openIndex + 1).padStart(2, '0')} / {count}
          </span>
        </div>
      )}
    </div>
  )
}
