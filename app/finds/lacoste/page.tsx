import MasonryGrid from '@/components/MasonryGrid'

const IMAGES = ['IMG_1772.jpeg', 'IMG_1775.jpeg', 'IMG_1776.jpeg', 'IMG_1777.jpeg', 'IMG_1778.jpeg', 'IMG_2183.jpeg', 'IMG_2184.jpeg'].map(
  (file) => `https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Lacoste/${file}`
)

export default function LacostePage() {
  return <MasonryGrid title="Lacoste" images={IMAGES} />
}
