import MasonryGrid from '@/components/MasonryGrid'

const IMAGES = [
  'IMG_0780.jpeg',
  'IMG_0781.jpeg',
  'IMG_0782.jpeg',
  'IMG_0783.jpeg',
  'IMG_0784.jpeg',
  'IMG_0785.jpeg',
  'IMG_0786.jpeg',
  'IMG_0787.jpeg',
  'IMG_0788.jpeg',
].map((file) => `https://escupwsgyrre2c6k.public.blob.vercel-storage.com/Mario%20Keyboard/${file}`)

export default function MarioKeyboardPage() {
  return <MasonryGrid title="Mario Keyboard" images={IMAGES} />
}
