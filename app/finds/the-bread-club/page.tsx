import MasonryGrid from '@/components/MasonryGrid'

const IMAGES = [
  'IMG_3250.jpeg',
  'IMG_3251.jpeg',
  'IMG_3252.jpeg',
  'IMG_3253.jpeg',
  'IMG_3255.jpeg',
  'IMG_3256.jpeg',
  'IMG_3257.jpeg',
  'IMG_3258.jpeg',
  'IMG_3259.jpeg',
  'IMG_3260.jpeg',
  'IMG_3261.jpeg',
  'IMG_3262.jpeg',
  'IMG_3264.jpeg',
  'IMG_3265.jpeg',
  'IMG_3266.jpeg',
  'IMG_3267.jpeg',
  'IMG_3268.jpeg',
  'IMG_3269.jpeg',
  'IMG_3270.jpeg',
  'IMG_3271.jpeg',
  'IMG_3272.jpeg',
  'IMG_3273.jpeg',
  'IMG_3274.jpeg',
  'IMG_3275.jpeg',
  'IMG_3276.jpeg',
  'IMG_3279.jpeg',
  'IMG_3280.jpeg',
  'IMG_3281.jpeg',
  'IMG_3282.jpeg',
  'IMG_3283.jpeg',
].map((file) => `https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club/${file}`)

// IMG_3250 is 4270x5694 — crop the bottom 10% (visible aspect ratio 4270/5124.6).
const CROPS = {
  [`https://escupwsgyrre2c6k.public.blob.vercel-storage.com/The%20Bread%20Club/IMG_3250.jpeg`]: {
    aspectRatio: '4270 / 5124.6',
  },
}

export default function TheBreadClubPage() {
  return <MasonryGrid title="The Bread Club" images={IMAGES} crops={CROPS} />
}
