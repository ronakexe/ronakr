import MasonryGrid from '@/components/MasonryGrid'

const BASE = 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Uffizi%20Galleries'

// width/height are each photo's true pixel size — see MasonryGrid.
const FILES = [
  { file: 'IMG_1722.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_1724.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_1728.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_1730.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_1731.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_1734.jpeg', width: 3968, height: 5290 },
  { file: 'IMG_1735.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_1737.jpeg', width: 5712, height: 3213 },
  { file: 'IMG_1738.jpeg', width: 5712, height: 3213 },
  { file: 'IMG_1739.jpeg', width: 5712, height: 3213 },
  { file: 'IMG_1740.jpeg', width: 4032, height: 2268 },
  { file: 'IMG_1741.jpeg', width: 2268, height: 4032 },
  { file: 'IMG_1742.jpeg', width: 3213, height: 5712 },
  { file: 'IMG_1743.jpeg', width: 2268, height: 4032 },
  { file: 'IMG_1744.jpeg', width: 4032, height: 3024 },
]

const IMAGES = FILES.map((f) => `${BASE}/${f.file}`)
const DIMENSIONS = Object.fromEntries(FILES.map((f) => [`${BASE}/${f.file}`, { width: f.width, height: f.height }]))

export default function UffiziGalleriesPage() {
  return <MasonryGrid title="Uffizi Galleries" images={IMAGES} dimensions={DIMENSIONS} />
}
