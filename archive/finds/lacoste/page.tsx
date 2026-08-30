import MasonryGrid from '@/components/MasonryGrid'

const BASE = 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Lacoste'

// width/height are each photo's true pixel size — see MasonryGrid.
const FILES = [
  { file: 'IMG_1772.jpeg', width: 2014, height: 3580 },
  { file: 'IMG_1775.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_1776.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_1777.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_1778.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_2183.jpeg', width: 2014, height: 3580 },
  { file: 'IMG_2184.jpeg', width: 5712, height: 4284 },
]

const IMAGES = FILES.map((f) => `${BASE}/${f.file}`)
const DIMENSIONS = Object.fromEntries(FILES.map((f) => [`${BASE}/${f.file}`, { width: f.width, height: f.height }]))

export default function LacostePage() {
  return <MasonryGrid title="Lacoste" images={IMAGES} dimensions={DIMENSIONS} />
}
