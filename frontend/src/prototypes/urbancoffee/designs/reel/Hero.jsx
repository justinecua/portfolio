import storefront from '../../assets/storefront-dusk.jpg'
import latte from '../../assets/iced-latte-blue.jpg'
import { contact } from '../../content/events'
import { Label, Reveal, T } from './ui'

export default function Hero() {
  return (
    <section id="top" className="flex flex-col justify-end px-5 pt-32 pb-10 md:min-h-[100svh] md:px-10">
      {/* Giant wordmark with the storefront photo showing through the letters */}
      <Reveal>
        <h1
          className={`${T.mega} bg-cover bg-clip-text text-center text-transparent`}
          style={{ backgroundImage: `url(${latte})`, backgroundPosition: '50% 45%', WebkitBackgroundClip: 'text' }}
        >
          URBAN
        </h1>
        <span className="sr-only">Urban Coffee Studio</span>
      </Reveal>

      <Reveal delay={150} className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-12 md:items-end">
        <p className={`${T.h3} md:col-span-5 md:text-3xl md:leading-tight`}>{contact.tagline}</p>

        <div className="flex items-center gap-4 md:col-span-4">
          <img src={storefront} alt="Urban storefront at dusk" className="h-20 w-20 shrink-0 rounded-full object-cover object-[45%_40%]" />
          <p className={`${T.small} text-rl-muted`}>
            Roastery + Kitchen in {contact.city}. Coffee roasted in-house, the Pigeon Matcha series, and a kitchen that runs
            late.
          </p>
        </div>

        <div className="flex gap-3 md:col-span-3 md:justify-end">
          <a href="#reel" className="rounded-full bg-rl-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-rl-white/80">
            The menu ↓
          </a>
          <a href="#visit" className="rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-white/10">
            Visit
          </a>
        </div>
      </Reveal>

      <div className="mt-8 flex justify-between">
        <Label>Tibanga · Diocesan</Label>
        <Label>Scroll</Label>
      </div>
    </section>
  )
}
