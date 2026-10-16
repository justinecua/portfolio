import storefront from '../../assets/storefront-dusk.jpg'
import latte from '../../assets/iced-latte-blue.jpg'
import bowl from '../../assets/bowl-top.jpg'
import katsu from '../../assets/katsu-donburi.jpg'
import salmon from '../../assets/salmon-bowl.jpg'
import salad from '../../assets/caesar-salad.jpg'
import breakfast from '../../assets/breakfast-plate.jpg'
import chicken from '../../assets/crispy-chicken-fries.jpg'
import toast from '../../assets/biscoff-french-toast.jpg'
import cake from '../../assets/chocolate-cake.jpg'
import trio from '../../assets/matcha-trio.jpg'
import harbor from '../../assets/harbor-matcha.jpg'
import ube from '../../assets/ube-matcha-scoop.jpg'
import strawberry from '../../assets/ube-strawberry-matcha.jpg'
import tambayan from '../../assets/tambayan-open.jpg'
import fiesta from '../../assets/fiesta-merkado.jpg'
import popart from '../../assets/pop-art-market.jpg'
import interior from '../../assets/interior.webp'
import reading from '../../assets/reading-corner.jpg'
import team from '../../assets/team-polaroid.jpg'
import night from '../../assets/storefront-night.webp'
import pour from '../../assets/french-toast-pour.jpg'
import diocesan from '../../assets/diocesan-branch.jpg'
import { menu } from '../../content/menu'
import { contact, eventStatus, events } from '../../content/events'
import { branches, mapsUrl } from '../../content/branches'
import { Label, LogoMark, Reveal, Rule, T, peso } from './ui'

// `pos` crops out the text overlaid on some of the original posts
const thumbs = {
  'Spanish Latte': [latte, '50% 30%'],
  'Teriyaki Chicken Bowl': [bowl, '50% 60%'],
  'Katsu Chicken Donburi': [katsu, '50% 60%'],
  'Honey Sriracha Salmon': [salmon, '50% 50%'],
  'Caesar Salad': [salad, '50% 60%'],
  'Urban Breakfast': [breakfast, '50% 15%'],
  'Crispy Chicken & Fries': [chicken, '50% 20%'],
  'Biscoff French Toast': [toast, '50% 55%'],
  'Chocolate Cake': [cake, '50% 20%'],
}
const matchaPhotos = {
  Soar: [trio, '50% 100%'],
  Glide: [trio, '10% 100%'],
  Perch: [trio, '90% 100%'],
  Harbor: [harbor, '50% 100%'],
  Haven: [trio, '30% 100%'],
  'Ube Cheese Pudding': [ube, '50% 0%'],
  'Strawberry Matcha': [strawberry, '60% 100%'],
}

/* Full-width section header: number + title left, blurb right */
function Head({ n, title, blurb }) {
  return (
    <Reveal className="mb-12 grid gap-6 border-t border-sp-ink pt-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Label className="text-sp-gray">{n}</Label>
        <h2 className={`${T.hero} mt-3`}>{title}</h2>
      </div>
      {blurb && <p className={`${T.body} text-sp-ink/65 md:col-span-4`}>{blurb}</p>}
    </Reveal>
  )
}

const wide = 'mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28'

/* Mobile-only heading for the split sections (on desktop the black panel carries the title) */
function MobileHead({ n, title }) {
  return (
    <div className="mb-8 lg:hidden">
      <Label className="text-sp-gray">{n}</Label>
      <h2 className={`${T.h2} mt-2`}>{title}</h2>
    </div>
  )
}

export function Welcome() {
  return (
    <div>
      <Reveal>
        <img src={storefront} alt="Urban Roastery + Kitchen storefront at dusk" className="aspect-[4/3] w-full object-cover" />
      </Reveal>
      <div className="p-6 md:p-12">
        <Reveal>
          <p className={`${T.hero}`}>
            Coffee.
            <br />
            Kitchen.
            <br />
            <span className="text-sp-gray">Tambayan.</span>
          </p>
          <p className={`${T.body} mt-8 max-w-md text-sp-ink/70`}>
            Roasted in-house, poured late, and served to freelancers, friends, and the artists of {contact.city} — at two
            branches, Tibanga and Diocesan.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-3">
          <img src={latte} alt="Iced latte" className="aspect-square w-full object-cover object-[50%_30%]" />
          <img src={bowl} alt="Teriyaki chicken bowl" className="aspect-square w-full object-cover" />
        </Reveal>
      </div>
    </div>
  )
}

export function MenuList() {
  const cats = menu.filter((c) => c.key !== 'matcha')
  return (
    <div className={wide}>
      <Head n="01 — Menu" title="What we serve." blurb="Coffee, kitchen, and something sweet. Hover a dish to see it in colour." />
      <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
        {cats.map((c) => (
          <Reveal key={c.key}>
            <div className="flex items-baseline justify-between">
              <p className={T.h3}>{c.label}</p>
              <Label className="text-sp-gray">{c.items.length} items</Label>
            </div>
            <Rule className="mt-3" />
            <ul>
              {c.items.map((item) => {
                const t = thumbs[item.name]
                return (
                  <li key={item.name} className="group flex items-center gap-4 border-b border-sp-ink/10 py-4">
                    {t ? (
                      <img src={t[0]} alt="" style={{ objectPosition: t[1] }} className="h-16 w-16 shrink-0 object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                    ) : (
                      <span className="grid h-16 w-16 shrink-0 place-items-center bg-sp-ink text-lg font-extrabold text-sp-white">{item.name[0]}</span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-base font-bold">
                          {item.name}
                          {item.tag && <span className="ml-2 bg-sp-black px-1.5 py-0.5 align-middle text-[10px] font-bold tracking-wider text-sp-white uppercase">{item.tag}</span>}
                        </p>
                        <span className="text-base font-extrabold tabular-nums">{peso(item.price)}</span>
                      </div>
                      <p className={`${T.small} text-sp-ink/60`}>{item.note}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function MatchaGrid() {
  const drinks = menu.find((c) => c.key === 'matcha').items
  return (
    <div className={wide}>
      <Head n="02 — Pigeon Matcha" title="Seven ways to fly." blurb="Seven drinks, each named after how a pigeon moves through the city." />
      <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {drinks.map((d, i) => (
          <Reveal key={d.name} delay={(i % 2) * 80} className="group">
            <div className="overflow-hidden">
              <img
                src={matchaPhotos[d.name][0]}
                alt={`${d.name} matcha`}
                style={{ objectPosition: matchaPhotos[d.name][1] }}
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <p className={T.h3}>
                {String(i + 1).padStart(2, '0')} {d.name}
              </p>
              <span className="font-extrabold tabular-nums">{peso(d.price)}</span>
            </div>
            {d.alt && <Label className="mt-1 text-sp-gray">{d.alt}</Label>}
            <p className={`${T.small} mt-2 text-sp-ink/65`}>{d.note}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

const posters = { tambayan, fiesta, popart }

export function EventList() {
  return (
    <div className={wide}>
      <Head n="03 — Events" title="This season." blurb="Markets, music and makers — the space opens up a few times a year." />
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
        {events.map((e) => {
          const s = eventStatus(e)
          const live = s.state !== 'past'
          return (
            <Reveal key={e.key} className="grid gap-6 sm:grid-cols-[200px_1fr] lg:grid-cols-1">
              <img src={posters[e.key]} alt={`${e.name} poster`} className={`aspect-[4/5] w-full object-cover ${live ? '' : 'grayscale'}`} />
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-[10px] font-bold tracking-wider uppercase ${live ? 'bg-sp-black text-sp-white' : 'border border-sp-ink/20 text-sp-gray'}`}>
                    {s.label}
                  </span>
                  <Label className="text-sp-gray">{e.hours}</Label>
                </div>
                <p className={`${T.h2} mt-4 lg:text-4xl`}>{e.name}</p>
                <p className="mt-1 text-lg font-bold">{e.dates}</p>
                <p className={`${T.small} mt-3 text-sp-ink/65`}>{e.blurb}</p>
                {live && (
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} — merchant slot`)}`}
                    className="mt-6 inline-flex w-fit items-center gap-3 bg-sp-black px-5 py-3 text-sm font-bold text-sp-white transition hover:bg-sp-ink/80"
                  >
                    Apply for a slot →
                  </a>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

export function SpaceGrid() {
  return (
    <div className={wide}>
      <Head n="04 — Space" title="The tambayan." blurb="Two floors, a roof deck, and room for whatever you’re making." />
      <Reveal className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <img src={interior} alt="Baristas behind the bar" className="col-span-2 aspect-[16/10] w-full object-cover lg:row-span-2 lg:aspect-auto lg:h-full" />
        <img src={reading} alt="Customers reading over matcha" className="aspect-square w-full object-cover object-[30%_50%]" />
        <img src={pour} alt="Biscoff French toast" className="aspect-square w-full object-cover" />
        <img src={night} alt="Urban storefront at night" className="aspect-square w-full object-cover" />
        <img src={team} alt="The Urban Coffee Studio team" className="aspect-square w-full object-cover object-[50%_40%]" />
      </Reveal>
      <Reveal className="mt-3 flex flex-col items-start gap-5 bg-sp-black p-6 text-sp-white sm:flex-row sm:items-center md:p-8">
        <LogoMark className="h-12 w-12" inverted />
        <div className="flex-1">
          <p className={T.h3}>We&rsquo;re hiring</p>
          <p className={`${T.small} mt-1 text-sp-white/65`}>Baristas and kitchen cooks who like people as much as coffee.</p>
        </div>
        <a href={`mailto:${contact.hiring}`} className="border border-sp-white px-5 py-3 text-sm font-bold transition hover:bg-sp-white hover:text-sp-black">
          {contact.hiring}
        </a>
      </Reveal>
    </div>
  )
}

const branchImg = { tibanga: [storefront, '50% 40%'], diocesan: [diocesan, '50% 0%'] }

export function VisitInfo() {
  return (
    <div className="p-6 md:p-12">
      <MobileHead n="05 — Visit" title="Come through" />
      <div className="space-y-12">
        {branches.map((b) => (
          <Reveal key={b.key}>
            <img src={branchImg[b.key][0]} alt={`${b.name} branch`} style={{ objectPosition: branchImg[b.key][1] }} className="aspect-[2/1] w-full object-cover" />
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <Label className="text-sp-gray">{b.tag}</Label>
                <p className={`${T.h2} mt-1`}>{b.name}</p>
                <p className={`${T.small} mt-2 max-w-sm text-sp-ink/65`}>{b.note}</p>
              </div>
              <a href={mapsUrl(b.query)} target="_blank" rel="noreferrer" className="shrink-0 border border-sp-ink px-4 py-2.5 text-sm font-bold transition hover:bg-sp-black hover:text-sp-white">
                Directions ↗
              </a>
            </div>
            <dl className="mt-5 border-t border-sp-ink/15">
              {b.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-sp-ink/15 py-3 text-sm">
                  <dt className="font-bold">{d}</dt>
                  <dd className="text-sp-ink/65 tabular-nums">{h}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>

      <footer className="mt-20 bg-sp-black p-8 text-sp-white md:p-10">
        <LogoMark className="h-16 w-16" />
        <p className={`${T.h2} mt-8`}>{contact.tagline}</p>
        <a href={`mailto:${contact.email}`} className="mt-6 inline-block text-sm font-bold underline underline-offset-4">
          {contact.email}
        </a>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-5 text-xs text-sp-white/50">
          <span>© {new Date().getFullYear()} Urban Coffee Studio · {contact.city}</span>
          <span className="font-bold text-sp-white">{contact.hashtag}</span>
        </div>
      </footer>
    </div>
  )
}
