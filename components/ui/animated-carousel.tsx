"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  tag: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/slide-1.jpg",
    title: "Modern Architecture",
    subtitle: "Where design meets function in perfect harmony",
    tag: "Design",
  },
  {
    id: 2,
    image: "/images/slide-2.jpg",
    title: "Coastal Horizons",
    subtitle: "Discover the beauty of untouched landscapes",
    tag: "Nature",
  },
  {
    id: 3,
    image: "/images/slide-3.jpg",
    title: "Speed & Elegance",
    subtitle: "The art of automotive engineering redefined",
    tag: "Automotive",
  },
  {
    id: 4,
    image: "/images/slide-4.jpg",
    title: "Future Cities",
    subtitle: "A glimpse into tomorrow's urban landscapes",
    tag: "Technology",
  },
  {
    id: 5,
    image: "/images/slide-5.jpg",
    title: "Crafted Luxury",
    subtitle: "Premium materials, timeless aesthetics",
    tag: "Fashion",
  },
]

export function AnimatedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const AUTOPLAY_INTERVAL = 4000

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      resetAutoplay()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      resetAutoplay()
    }
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
        resetAutoplay()
      }
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const resetAutoplay = useCallback(() => {
    setProgress(0)
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }, [])

  // Autoplay with progress
  useEffect(() => {
    if (!emblaApi || isHovered) {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      return
    }

    const step = 50
    let elapsed = 0

    autoplayRef.current = setInterval(() => {
      elapsed += step
      setProgress((elapsed / AUTOPLAY_INTERVAL) * 100)

      if (elapsed >= AUTOPLAY_INTERVAL) {
        emblaApi.scrollNext()
        elapsed = 0
        setProgress(0)
      }
    }, step)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [emblaApi, isHovered, selectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out ${
                    selectedIndex === index ? "scale-100" : "scale-105"
                  }`}
                  priority={index === 0}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20">
                  <div
                    className={`transition-all duration-700 ease-out ${
                      selectedIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="mb-3 inline-block rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-foreground backdrop-blur-sm">
                      {slide.tag}
                    </span>
                    <h2 className="mb-2 text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance">
                      {slide.title}
                    </h2>
                    <p className="max-w-lg text-sm text-primary-foreground/70 md:text-base lg:text-lg leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md transition-all hover:bg-primary-foreground/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md transition-all hover:bg-primary-foreground/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Bottom bar: dots + progress */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 pb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`group relative h-2.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedIndex === index
                  ? "w-10 bg-primary-foreground"
                  : "w-2.5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress fill inside active dot */}
              {selectedIndex === index && (
                <div
                  ref={progressRef}
                  className="absolute inset-0 rounded-full bg-primary-foreground/60 origin-left"
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: "transform 50ms linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Full-width progress bar */}
        <div className="h-0.5 w-full bg-primary-foreground/10">
          <div
            className="h-full bg-primary-foreground/60 transition-none"
            style={{
              width: `${progress}%`,
              transition: "width 50ms linear",
            }}
          />
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-md md:right-8 md:top-8">
        <span className="tabular-nums">
          {String(selectedIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-primary-foreground/40">/</span>
        <span className="tabular-nums text-primary-foreground/60">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  )
}
