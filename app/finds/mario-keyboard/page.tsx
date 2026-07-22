import MasonryGrid from '@/components/MasonryGrid'

const BASE = 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Mario%20Keyboard'

// width/height are each photo's true pixel size — see MasonryGrid.
const FILES = [
  { file: 'IMG_0780.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0781.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0782.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0783.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0784.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0785.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0786.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0787.jpeg', width: 1206, height: 1507 },
  { file: 'IMG_0788.jpeg', width: 1206, height: 1507 },
]

const IMAGES = FILES.map((f) => `${BASE}/${f.file}`)
const DIMENSIONS = Object.fromEntries(FILES.map((f) => [`${BASE}/${f.file}`, { width: f.width, height: f.height }]))

export default function MarioKeyboardPage() {
  return <MasonryGrid title="Mario Keyboard" images={IMAGES} dimensions={DIMENSIONS} />
}
