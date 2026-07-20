import { StaticImageData } from 'next/image'
import doubleTrouble from './piece-assets/double trouble/double-trouble-icon.png'
import failedComic from './piece-assets/failed comic/failed-comic-icon.png'
import humanError from './piece-assets/human error/human-error-icon.png'
import jimmySidewalk from './piece-assets/jimmy sidewalk/sidewalk-jimmy-icon.png'
import supernova from './piece-assets/supernova/supernova-icon.png'

export type Piece = {
  title: string
  image: StaticImageData | null
  href?: string
  date: string
}

export const pieces: Piece[] = [
  { title: 'Human Error', image: humanError, href: '/pieces/human-error', date: 'Dec 2025' },
  { title: 'Supernova', image: supernova, href: '/pieces/supernova', date: 'July 2025' },
  { title: 'Double Trouble', image: doubleTrouble, href: '/pieces/double-trouble', date: 'May 2025' },
  { title: 'Sidewalk Jimmy', image: jimmySidewalk, href: '/pieces/sidewalk-jimmy', date: 'Feb 2025' },
  { title: 'Failed Comic', image: failedComic, href: '/pieces/failed-comic', date: 'Jun 2024' },
  { title: 'Mime Time', image: null, date: 'Coming soon' },
]

export const finds: Piece[] = []
