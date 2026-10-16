import night from '../../assets/storefront-night.webp'
import { Bird, Mono, Photo, Reveal, SectionHead } from './ui'

// Hours are placeholders — confirm with the store.
const hours = [
  { d: 'Mon – Thu', h: '7 AM – 11 PM' },
  { d: 'Fri – Sat', h: '7 AM – 12 MN' },
  { d: 'Sunday', h: '8 AM – 11 PM' },
]

const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Urban+Coffee+Studio+Tibanga'

function Ad({ title, children, className = '' }) {
  return (
    <div className={`border border-ink p-5 ${className}`}>
      <p className="border-b border-ink pb-2 text-center font-sans text-sm font-black tracking-[0.2em] uppercase">{title}</p>
      <div className="pt-4">{children}</div>
    </div>
  )
}

export default function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHead letter="G" title="Classifieds" page="7" />

      <Reveal className="pt-10">
        <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
          Wanted: <em>you</em>, at a table, <br className="hidden md:block" />
          with something iced.
        </h2>
      </Reveal>

      <Reveal delay={120} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Ad title="Location" className="lg:col-span-1">
          <p className="font-serif text-3xl leading-tight">Urban Coffee Studio</p>
          <p className="mt-1 text-sm text-ink/70">Tibanga Branch. Big white letters, glowing bird over the door, stairs on the right.</p>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-5 block bg-ink px-4 py-3 text-center font-mono text-[11px] tracking-[0.15em] text-paper uppercase transition hover:bg-urban">
            Get directions ↗
          </a>
        </Ad>

        <Ad title="Hours">
          <dl className="space-y-3">
            {hours.map((r) => (
              <div key={r.d} className="flex items-baseline gap-2">
                <dt className="text-sm font-bold">{r.d}</dt>
                <span className="leaders" />
                <dd className="font-mono text-xs">{r.h}</dd>
              </div>
            ))}
          </dl>
          <Mono className="mt-5 text-urban">Kitchen closes an hour earlier</Mono>
        </Ad>

        <Photo
          src={night}
          alt="Urban Roastery + Kitchen at night, sign glowing"
          className="aspect-[4/3] md:col-span-2 lg:aspect-auto"
        />

        <Ad title="Help wanted" className="md:col-span-2">
          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <Bird className="h-16 w-16 text-urban" />
            <p className="text-sm leading-relaxed text-ink/75">
              <strong className="text-ink">Artists, makers, musicians:</strong> we&rsquo;re always looking for walls to
              hang, tables to fill, and corners to play in. Send us your work — the next market, mural, or acoustic night
              might be yours.
            </p>
          </div>
        </Ad>

        <Ad title="Contact" className="md:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.facebook.com/search/top?q=Urban%20Coffee%20Studio"
              target="_blank"
              rel="noreferrer"
              className="flex-1 border border-ink px-4 py-3 text-center font-mono text-[11px] tracking-[0.15em] uppercase transition hover:bg-ink hover:text-paper"
            >
              Message on Facebook
            </a>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 border border-ink px-4 py-3 text-center font-mono text-[11px] tracking-[0.15em] uppercase transition hover:bg-ink hover:text-paper"
            >
              Read the reviews
            </a>
          </div>
        </Ad>
      </Reveal>
    </section>
  )
}
