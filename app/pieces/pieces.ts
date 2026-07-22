import { StaticImageData } from 'next/image'
import doubleTrouble from './piece-assets/double trouble/double-trouble-icon.png'
import failedComic from './piece-assets/failed comic/failed-comic-icon.png'
import humanError from './piece-assets/human error/human-error-icon.png'
import jimmySidewalk from './piece-assets/jimmy sidewalk/sidewalk-jimmy-icon.png'
import supernova from './piece-assets/supernova/supernova-icon.png'

export type Piece = {
  title: string
  image: StaticImageData | string | null
  href?: string
  date: string
  // Visible (cropped) width/height for the home-page thumbnail, when the
  // full image needs the same bottom crop as its gallery — keep in sync with
  // the crop in the corresponding finds page.
  imageCrop?: { width: number; height: number }
  // The next two photos in this find's gallery — fanned out alongside the
  // thumbnail on hover, home page only.
  previewImages?: string[]
}

export const pieces: Piece[] = [
  { title: 'Mime Time', image: null, date: 'Coming Soon' },
  { title: 'Human Error', image: humanError, href: '/pieces/human-error', date: 'Dec 2025' },
  { title: 'Supernova', image: supernova, href: '/pieces/supernova', date: 'Jul 2025' },
  { title: 'Sidewalk Jimmy', image: jimmySidewalk, href: '/pieces/sidewalk-jimmy', date: 'Feb 2025' },
  { title: 'Failed Comic', image: failedComic, href: '/pieces/failed-comic', date: 'Jun 2024' },
  { title: 'Double Trouble', image: doubleTrouble, href: '/pieces/double-trouble', date: 'May 2025' },
]

export const finds: Piece[] = [
  { title: 'NYC Subway', image: null, date: 'x' },
  {
    title: 'Mario Keyboard',
    image: 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Mario%20Keyboard/IMG_0780.jpeg',
    href: '/finds/mario-keyboard',
    date: '9',
    previewImages: [
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Mario%20Keyboard/IMG_0781.jpeg',
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Mario%20Keyboard/IMG_0782.jpeg',
    ],
  },
  {
    title: 'Uffizi Galleries',
    image: 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Uffizi%20Galleries/IMG_1722.jpeg',
    href: '/finds/uffizi-galleries',
    date: '15',
    previewImages: [
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Uffizi%20Galleries/IMG_1724.jpeg',
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Uffizi%20Galleries/IMG_1728.jpeg',
    ],
  },
  {
    title: 'Lacoste store',
    image: 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Lacoste/IMG_1772.jpeg',
    href: '/finds/lacoste',
    date: '7',
    previewImages: [
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Lacoste/IMG_1775.jpeg',
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Lacoste/IMG_1776.jpeg',
    ],
  },
  {
    title: 'The Bread Club',
    image:
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club/IMG_3250.jpeg',
    href: '/finds/the-bread-club',
    date: '30',
    // IMG_3250 is really 4270x5694 — cropped to 4270x5124.6 (bottom 10% off),
    // matching the finds page.
    imageCrop: { width: 4270, height: 5124.6 },
    previewImages: [
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club/IMG_3251.jpeg',
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club/IMG_3252.jpeg',
    ],
  },
  { title: 'Profile Pictures', image: null, date: 'x' },
  { title: 'Kith', image: null, date: 'x' },
  { title: 'Etc.', image: null, date: 'x' },
]

export const initiatives: Piece[] = [
  { title: 'Super Daisy', image: null, date: 'May 2026 - now' },
  { title: 'Youth Stemline', image: null, date: 'Jun 2025 - now' },
  { title: 'SoberSense', image: null, date: 'Nov 2024 - May 2026' },
]
