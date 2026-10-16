import interior from '../../assets/interior.webp'
import reading from '../../assets/reading-corner.jpg'
import night from '../../assets/storefront-night.webp'
import team from '../../assets/team-polaroid.jpg'
import pour from '../../assets/french-toast-pour.jpg'
import tibanga from '../../assets/storefront-dusk.jpg'
import diocesan from '../../assets/diocesan-branch.jpg'
import { branches, mapsUrl } from '../../content/branches'
import { contact } from '../../content/events'
import { Accent, Arrow, Head, Label, Reveal, T } from './ui'

const shots = [
  { src: interior, alt: 'Baristas behind the bar', cls: 'md:col-span-7 aspect-[16/10]', cap: 'The bar, ground floor' },
  { src: pour, alt: 'Cream poured over Biscoff French toast', cls: 'md:col-span-5 aspect-[16/10] md:aspect-auto', cap: 'From the kitchen', pos: '50% 50%' },
  { src: reading, alt: 'Customers reading over matcha', cls: 'md:col-span-4 aspect-square', cap: 'Slow afternoons', pos: '30% 50%' },
  { src: night, alt: 'Urban storefront at night', cls: 'md:col-span-4 aspect-square', cap: 'Lights on till late' },
  { src: team, alt: 'The Urban Coffee Studio team', cls: 'md:col-span-4 aspect-square', cap: 'The crew', pos: '50% 40%' },
]

export function Space() {
  return (
    <section id="space" className="bg-nr-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Head n="04" label="The space" aside={<p className="text-sm">Two floors, a roof deck, murals, and room for whatever you&rsquo;re making.</p>}>
            A <Accent>tambayan</Accent> for the city
          </Head>
        </Reveal>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12">
          {shots.map((s, i) => (
            <Reveal key={s.cap} delay={(i % 3) * 90} className={`group relative overflow-hidden rounded-2xl ${s.cls}`}>
              <img src={s.src} alt={s.alt} style={{ objectPosition: s.pos ?? '50% 50%' }} className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <Label className="absolute bottom-5 left-5 text-nr-text opacity-0 transition duration-500 group-hover:opacity-100">{s.cap}</Label>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const imgs = { tibanga: [tibanga, '50% 40%'], diocesan: [diocesan, '50% 0%'] }

export function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
      <Reveal>
        <Head n="05" label="Visit">
          Come <Accent>through</Accent>
        </Head>
      </Reveal>

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-6">
        {branches.map((b, i) => (
          <Reveal key={b.key} delay={i * 120}>
            <div className="overflow-hidden rounded-2xl">
              <img src={imgs[b.key][0]} alt={`${b.name} branch`} style={{ objectPosition: imgs[b.key][1] }} className="aspect-[2/1] w-full object-cover" />
            </div>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <Label>{b.tag}</Label>
                <h3 className="mt-2 text-4xl font-medium tracking-[-0.03em]">{b.name}</h3>
                <p className="mt-2 max-w-sm text-sm text-nr-muted">{b.note}</p>
              </div>
              <a
                href={mapsUrl(b.query)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Directions to ${b.name}`}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition hover:bg-nr-text hover:text-nr-bg"
              >
                <Arrow />
              </a>
            </div>
            <dl className="mt-6 border-t border-white/10">
              {b.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-white/10 py-3 text-sm">
                  <dt>{d}</dt>
                  <dd className="text-nr-muted tabular-nums">{h}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-12 md:items-end">
        <p className={`${T.h2} md:col-span-8`}>
          Collabs, markets, or <Accent>just hello</Accent>?
        </p>
        <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
          <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-3 rounded-full bg-nr-text px-6 py-3.5 text-sm font-semibold text-nr-bg transition hover:bg-nr-accent">
            {contact.email} <Arrow className="transition group-hover:rotate-45" />
          </a>
          <a href={`mailto:${contact.hiring}`} className="text-sm text-nr-muted underline-offset-4 hover:text-nr-text hover:underline">
            Hiring baristas &amp; cooks · {contact.hiring}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
