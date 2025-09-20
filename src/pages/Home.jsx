import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const IMAGES = [
  '/backgrounds/vecteezy_a-wooden-table-with-many-different-types-of-tools_70238682.jpeg',
  '/backgrounds/vecteezy_artisan-crafts-aesthetic_25431017.jpg',
  '/backgrounds/vecteezy_cane-furninture-and-dishes_11932840.jpg',
  '/backgrounds/vecteezy_cane-furninture-and-dishes_11932840_1.jpg',
  '/backgrounds/vecteezy_handcrafted-baskets-and-pottery-showcasing-intricate-designs_68513905.jpeg',
  '/backgrounds/vecteezy_handicrafts-from-rattan-exhibited-by-the-dayak-tribe-the_13856664.jpg',
]

export default function Home() {
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPrev(index)
      setIndex((i) => (i + 1) % IMAGES.length)
    }, 5500)
    return () => clearInterval(timerRef.current)
  }, [index])

  const currentImg = IMAGES[index]
  const prevImg = prev != null ? IMAGES[prev] : null

  return (
    <div className="relative isolate">
      {/* Background slideshow */}
      <div className="absolute inset-0 overflow-hidden z-0 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        {prevImg && (
          <img
            key={`prev-${prev}`}
            src={prevImg}
            alt="Artisan background"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-50 animate-fade-out"
          />
        )}
        <img
          key={`cur-${index}`}
          src={currentImg}
          alt="Artisan background"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-60 animate-fade-in animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Hero content */}
      <section className="relative z-10 pt-24 pb-20 sm:pt-28 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-xl animate-slide-up gradient-text">
            AI-Powered Marketplace Assistant
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-200 max-w-3xl mx-auto animate-slide-up" style={{animationDelay:'100ms'}}>
            Empowering Local Artisans with Smart Listings, Fair Pricing, and AI Chat Support.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up" style={{animationDelay:'150ms'}}>
            <Link to="/upload" className="btn btn-primary text-white">
              Start Selling Now
            </Link>
            <Link to="/marketplace" className="btn btn-outline">
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
