import { useEffect, useState } from 'react'
import storefront from '../../assets/storefront-dusk.jpg'
import latte from '../../assets/iced-latte-blue.jpg'
import interior from '../../assets/interior.webp'
import bowl from '../../assets/bowl-top.jpg'
import night from '../../assets/storefront-night.webp'
import { contact } from '../../content/events'
import { Label, T } from './ui'

const slides = [
  { src: storefront, pos: '50% 40%', cap: 'Tibanga, at dusk' },
  { src: latte, pos: '50% 35%', cap: 'Spanish Latte' },
  { src: interior, pos: '50% 50%', cap: 'Behind the bar' },
  { src: bowl, pos: '50% 60%', cap: 'Teriyaki Chicken Bowl' },
  { src: night, pos: '50% 50%', cap: 'Lights on till late' },
]

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="top" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-black">
      {slides.map((s, n) => (
        <img
          key={s.cap}
          src={s.src}
          alt={n === i ? s.cap : ''}
          style={{ objectPosition: s.pos }}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] ease-out ${
            n === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/50" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 md:px-12 md:pb-20">
        <Label className="text-st-white/70">Roastery + Kitchen · {contact.city}</Label>
        <h1 className={`${T.hero} mt-5 max-w-5xl text-st-white`}>
          Wherever life takes you, there&rsquo;s an Urban.
        </h1>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/20 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {/* Slide progress */}
            <div className="flex gap-1.5">
              {slides.map((s, n) => (
                <button
                  key={s.cap}
                  onClick={() => setI(n)}
                  aria-label={`Show ${s.cap}`}
                  className="relative h-1 w-8 overflow-hidden rounded-full bg-white/25 md:w-12"
                >
                  <span
                    key={n === i ? `on-${i}` : 'off'}
                    className={`absolute inset-y-0 left-0 bg-st-white ${n === i ? 'animate-[grow_5s_linear_forwards]' : n < i ? 'w-full' : 'w-0'}`}
                  />
                </button>
              ))}
            </div>
            <p className={`${T.small} text-st-white/70`}>{slides[i].cap}</p>
          </div>
          <div className="flex gap-3">
            <a href="#menu" className="rounded-full bg-st-white px-6 py-3 text-sm font-bold text-black transition hover:bg-st-white/80">
              See the menu
            </a>
            <a href="#visit" className="rounded-full px-6 py-3 text-sm font-bold text-st-white ring-1 ring-white/30 transition hover:bg-white/10">
              Find us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
