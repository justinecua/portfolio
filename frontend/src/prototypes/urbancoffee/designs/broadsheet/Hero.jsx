import storefront from '../../assets/storefront-dusk.jpg'
import iced from '../../assets/iced-coffees.jpg'
import { Mono, O, Photo, Reveal, Star } from './ui'

function marketStatus(now = new Date()) {
  const start = new Date(now.getFullYear(), 9, 19, 17)
  const end = new Date(now.getFullYear(), 9, 26)
  if (now < start) {
    const days = Math.ceil((start - now) / 864e5)
    return days === 1 ? 'Opens tomorrow' : `${days} days to go`
  }
  if (now < end) return 'On now - tonight, 5 PM'
  return null
}

export default function Hero() {
  const today = new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const status = marketStatus()

  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
      {/* Edition strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink pb-2">
        <Mono>Vol. III · Tibanga Edition</Mono>
        <Mono className="hidden sm:block">{today}</Mono>
        <Mono className="hidden sm:block">Roastery + Kitchen</Mono>
      </div>

      {/* Masthead */}
      <h1 className="py-2 text-center font-serif text-[clamp(3.6rem,15.5vw,14.5rem)] leading-[0.95] tracking-[-0.02em] whitespace-nowrap">
        Urban C<O points={8} />ffee
      </h1>

      <div className="rule-double flex items-center justify-between gap-4 border-b border-ink py-2">
        <Mono className="hidden lg:block">Est. as a roastery</Mono>
        <p className="flex-1 text-center font-serif text-xl leading-tight italic md:text-2xl">
          Wherever life takes you, there will always be an <span className="text-urban">Urban</span>.
        </p>
        <Mono className="hidden lg:block">Free · Always</Mono>
      </div>

      {/* Front page grid */}
      <div className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-0">
        <Reveal className="lg:col-span-3 lg:border-r lg:border-ink/25 lg:pr-7">
          <Mono className="text-urban">Lead story</Mono>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95]">
            Coffee roasted in-house, poured <em>late</em>.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/80 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8]">
            Behind the big white letters on the corner is a roaster, a bar, a kitchen, and two floors of tables that fill
            up after dark. Beans are sourced green and roasted here - so the cup you get tastes the way we meant it to.
          </p>
          <a href="#studio" className="mt-5 inline-block font-mono text-[11px] tracking-[0.15em] uppercase underline decoration-urban decoration-2 underline-offset-4">
            Continued on p. 2 →
          </a>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:px-7">
          <Photo
            src={storefront}
            alt="Urban Roastery + Kitchen storefront lit up at dusk"
            className="aspect-[4/3]"
            caption="The Tibanga storefront at dusk. Look for the glowing bird over the door."
          />
        </Reveal>

        <Reveal delay={240} className="flex flex-col gap-6 lg:col-span-3 lg:border-l lg:border-ink/25 lg:pl-7">
          <div>
            <Mono className="text-urban">Today’s pour</Mono>
            <Photo src={iced} alt="Three iced lattes in Urban Coffee cups" className="mt-3 aspect-square" imgClass="object-top" />
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-2xl">Iced Spanish Latte</span>
              <span className="leaders" />
              <span className="font-mono text-sm font-bold">₱165</span>
            </div>
          </div>

          <a href="#market" className="group relative block overflow-hidden bg-urban p-5 text-paper">
            <Star points={8} className="absolute -top-5 -right-5 h-20 w-20 text-paper/20 animate-spin-slow" />
            <Mono>Notice · Oct 19 – 25</Mono>
            <p className="mt-2 font-serif text-4xl leading-none">Pop Art Market</p>
            <p className="mt-3 text-sm text-paper/85">Artists’ night market at the café, 5 PM – 12 AM.</p>
            <Mono className="mt-4 flex items-center justify-between border-t border-paper/40 pt-3">
              <span>{status ?? 'See you next year'}</span>
              <span className="transition group-hover:translate-x-1">→</span>
            </Mono>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
