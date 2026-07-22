import MasonryGrid from '@/components/MasonryGrid'

const BASE = 'https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club'

// width/height are each photo's true pixel size — see MasonryGrid.
const FILES = [
  // IMG_3250 is really 4270x5694 — cropped here to 4270x5124.6 (bottom 10%
  // off) so it doesn't dominate the column; MasonryGrid's object-fit: cover
  // does the actual cropping, anchored to the top.
  { file: 'IMG_3250.jpeg', width: 4270, height: 5124.6 },
  { file: 'IMG_3251.jpeg', width: 4284, height: 5712 },
  { file: 'IMG_3252.jpeg', width: 4284, height: 5712 },
  { file: 'IMG_3253.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3255.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3256.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3257.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3258.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3259.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3260.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3261.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3262.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3264.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3265.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3266.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3267.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3268.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3269.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3270.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3271.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3272.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3273.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3274.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3275.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3276.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3279.jpeg', width: 4032, height: 3024 },
  { file: 'IMG_3280.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3281.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3282.jpeg', width: 5712, height: 4284 },
  { file: 'IMG_3283.jpeg', width: 4032, height: 3024 },
]

const IMAGES = FILES.map((f) => `${BASE}/${f.file}`)
const DIMENSIONS = Object.fromEntries(FILES.map((f) => [`${BASE}/${f.file}`, { width: f.width, height: f.height }]))

export default function TheBreadClubPage() {
  return <MasonryGrid title="The Bread Club" images={IMAGES} dimensions={DIMENSIONS} />
}
