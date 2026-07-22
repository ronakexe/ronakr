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
  },
  {
    title: 'Uffizi Galleries',
    image: 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Uffizi%20Galleries/IMG_1722.jpeg',
    href: '/finds/uffizi-galleries',
    date: '15',
  },
  {
    title: 'Lacoste store',
    image: 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Lacoste/IMG_1772.jpeg',
    href: '/finds/lacoste',
    date: '7',
  },
  {
    title: 'The Bread Club',
    image:
      'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club/IMG_3250.jpeg',
    href: '/finds/the-bread-club',
    date: '30',
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
