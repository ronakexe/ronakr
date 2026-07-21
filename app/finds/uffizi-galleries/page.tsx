import MasonryGrid from '@/components/MasonryGrid'

const IMAGES = [
  'IMG_1722.jpeg',
  'IMG_1724.jpeg',
  'IMG_1728.jpeg',
  'IMG_1730.jpeg',
  'IMG_1731.jpeg',
  'IMG_1734.jpeg',
  'IMG_1735.jpeg',
  'IMG_1737.jpeg',
  'IMG_1738.jpeg',
  'IMG_1739.jpeg',
  'IMG_1740.jpeg',
  'IMG_1741.jpeg',
  'IMG_1742.jpeg',
  'IMG_1743.jpeg',
  'IMG_1744.jpeg',
].map((file) => `https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Uffizi%20Galleries/${file}`)

export default function UffiziGalleriesPage() {
  return <MasonryGrid title="Uffizi Galleries" images={IMAGES} />
}
