import { useRef } from 'react'
import storefront from '../../assets/storefront-dusk.jpg'
import latte from '../../assets/iced-latte-blue.jpg'
import trio from '../../assets/matcha-trio.jpg'
import harbor from '../../assets/harbor-matcha.jpg'
import ube from '../../assets/ube-matcha-scoop.jpg'
import strawberry from '../../assets/ube-strawberry-matcha.jpg'
import interior from '../../assets/interior.webp'
import reading from '../../assets/reading-corner.jpg'
import pour from '../../assets/french-toast-pour.jpg'
import team from '../../assets/team-polaroid.jpg'
import night from '../../assets/storefront-night.webp'
import bowl from '../../assets/bowl-top.jpg'
import tambayan from '../../assets/tambayan-open.jpg'
import fiesta from '../../assets/fiesta-merkado.jpg'
import popart from '../../assets/pop-art-market.jpg'
import diocesan from '../../assets/diocesan-branch.jpg'
import { menu } from '../../content/menu'
import { contact, eventStatus, events } from '../../content/events'
import { branches, mapsUrl } from '../../content/branches'
import { Label, Reveal, T, peso, useProgress } from './ui'

const lerp = (a, b, t) => a + (b - a) * t

/* ---------- Hero: a framed photo that zooms to full screen as you scroll ---------- */

export function Hero() {
  const ref = useRef(null)
  const p = useProgress(ref, true)
  const e = 1 - Math.pow(1 - p, 3) // ease-out

  return (
    <section id="top" ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Title above the frame - fades as the photo grows */}
        <div className="absolute inset-x-0 top-24 px-5 text-center md:top-28" style={{ opacity: 1 - e * 1.6 }}>
          <Label>Roastery + Kitchen · {contact.city}</Label>
          <h1 className={`${T.display} mt-4`}>Urban Coffee Studio</h1>
        </div>

        <div
         
          className="relative overflow-hidden"
          style={{
            width: `${lerp(window.innerWidth < 768 ? 78 : 38, 100, e)}vw`,
            height: `${lerp(window.innerWidth < 768 ? 42 : 50, 100, e)}vh`,
            borderRadius: `${lerp(24, 0, e)}px`,
            marginTop: `${lerp(window.innerWidth < 768 ? 30 : 22, 0, e)}vh`,
          }}
        >
          <img src={storefront} alt="Urban Roastery + Kitchen storefront at dusk" className="absolute inset-0 h-full w-full object-cover object-[50%_40%]" style={{ transform: `scale(${lerp(1.25, 1, e)})` }} />
          <div className="absolute inset-0 bg-black" style={{ opacity: lerp(0, 0.45, e) }} />
        </div>

        {/* Tagline over the full-screen photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-14 md:px-10 md:pb-16" style={{ opacity: Math.max(0, (e - 0.6) / 0.4) }}>
          <p className={`${T.display} max-w-5xl`}>{contact.tagline}</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- Chapter opener: full-bleed photo with a slow parallax drift ---------- */

export function Chapter({ id, n, title, img, pos = '50% 50%' }) {
  const ref = useRef(null)
  const p = useProgress(ref)
  return (
    <div id={id} ref={ref} className="relative h-[70vh] scroll-mt-0 overflow-hidden md:h-[85vh]">
      <img src={img} alt="" style={{ objectPosition: pos, transform: `translateY(${lerp(-8, 8, p)}%) scale(1.2)` }} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ln-bg via-black/20 to-black/30" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 md:px-10 md:pb-14">
        <Label className="text-ln-white/70">Chapter {n}</Label>
        <h2 className={`${T.display} mt-3`}>{title}</h2>
      </div>
    </div>
  )
}

/* ---------- Menu ---------- */

export function Menu() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-x-16 gap-y-16 md:grid-cols-2">
        {menu
          .filter((c) => c.key !== 'matcha')
          .map((cat) => (
            <Reveal key={cat.key}>
              <div className="flex items-baseline justify-between border-b border-white/15 pb-3">
                <p className={T.h3}>{cat.label}</p>
                <Label>{cat.items.length}</Label>
              </div>
              <ul>
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] py-4">
                    <div>
                      <p className="font-medium">
                        {item.name}
                        {item.tag && <span className="ml-2 text-[11px] font-medium tracking-wider text-ln-muted uppercase">· {item.tag}</span>}
                      </p>
                      <p className={`${T.small} text-ln-muted`}>{item.note}</p>
                    </div>
                    <span className="font-medium tabular-nums">{peso(item.price)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        <Reveal className="relative min-h-[320px] overflow-hidden rounded-xl">
          <img src={latte} alt="Spanish latte" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
        </Reveal>
      </div>
    </div>
  )
}

/* ---------- Pigeon Matcha ---------- */

const matchaPhotos = {
  Soar: [trio, '50% 100%'],
  Glide: [trio, '10% 100%'],
  Perch: [trio, '90% 100%'],
  Harbor: [harbor, '50% 100%'],
  Haven: [trio, '30% 100%'],
  'Ube Cheese Pudding': [ube, '50% 0%'],
  'Strawberry Matcha': [strawberry, '60% 100%'],
}

export function Matcha() {
  const drinks = menu.find((c) => c.key === 'matcha').items
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <Reveal className="grid gap-6 md:grid-cols-12">
        <p className={`${T.h2} md:col-span-7`}>Seven drinks, named after how a pigeon moves through the city.</p>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {drinks.map((d, i) => (
          <Reveal key={d.name} delay={(i % 4) * 70} className={i === 0 ? 'col-span-2 md:row-span-2' : ''}>
            <div className="overflow-hidden rounded-xl">
              <img
                src={matchaPhotos[d.name][0]}
                alt={`${d.name} matcha`}
                style={{ objectPosition: matchaPhotos[d.name][1] }}
                className={`w-full object-cover transition duration-700 hover:scale-105 ${i === 0 ? 'aspect-[4/3] md:aspect-[1/1]' : 'aspect-[4/3]'}`}
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <p className="font-medium">
                {d.name}
                {d.alt && <span className="ml-2 font-light text-ln-muted">{d.alt}</span>}
              </p>
              <span className="text-sm tabular-nums">{peso(d.price)}</span>
            </div>
            <p className={`${T.small} mt-1 text-ln-muted ${i === 0 ? '' : 'line-clamp-2'}`}>{d.note}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

/* ---------- Events ---------- */

const posters = { tambayan, fiesta, popart }

export function Events() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-10 md:grid-cols-3 md:gap-6">
        {events.map((e, i) => {
          const s = eventStatus(e)
          const live = s.state !== 'past'
          return (
            <Reveal key={e.key} delay={i * 90}>
              <div className="overflow-hidden rounded-xl">
                <img src={posters[e.key]} alt={`${e.name} poster`} className={`aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105 ${live ? '' : 'opacity-50 grayscale'}`} />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <Label>{e.dates}</Label>
                <span className={`text-[11px] font-medium ${live ? 'text-ln-white' : 'text-ln-muted'}`}>{s.label}</span>
              </div>
              <p className={`${T.h3} mt-2`}>{e.name}</p>
              <p className={`${T.small} mt-1 text-ln-muted`}>{e.blurb}</p>
              {live && (
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} - merchant slot`)}`}
                  className="mt-4 inline-block border-b border-ln-white pb-0.5 text-sm font-medium transition hover:text-ln-muted"
                >
                  Apply for a slot →
                </a>
              )}
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Space: a horizontal filmstrip ---------- */

const strip = [
  [interior, '50% 50%', 'The bar'],
  [reading, '30% 50%', 'Slow afternoons'],
  [bowl, '50% 60%', 'From the kitchen'],
  [pour, '50% 50%', 'Something sweet'],
  [night, '50% 50%', 'After dark'],
  [team, '50% 40%', 'The crew'],
]

export function Space() {
  return (
    <div className="py-20 md:py-28">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
        {strip.map(([src, pos, cap]) => (
          <figure key={cap} className="w-[80vw] shrink-0 snap-start sm:w-[45vw] lg:w-[30vw]">
            <img src={src} alt={cap} style={{ objectPosition: pos }} className="aspect-[4/5] w-full rounded-xl object-cover" />
            <figcaption className={`${T.small} mt-3 text-ln-muted`}>{cap}</figcaption>
          </figure>
        ))}
      </div>
      <Reveal className="mx-auto mt-14 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/15 px-5 pt-8 sm:flex-row sm:items-center md:px-10">
        <p className={T.h3}>We&rsquo;re hiring baristas and kitchen cooks.</p>
        <a href={`mailto:${contact.hiring}`} className="border-b border-ln-white pb-0.5 text-sm font-medium">
          {contact.hiring}
        </a>
      </Reveal>
    </div>
  )
}

/* ---------- Visit ---------- */

const branchImg = { tibanga: [night, '50% 50%'], diocesan: [diocesan, '50% 0%'] }

export function Visit() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-8">
        {branches.map((b, i) => (
          <Reveal key={b.key} delay={i * 100}>
            <div className="overflow-hidden rounded-xl">
              <img src={branchImg[b.key][0]} alt={`${b.name} branch`} style={{ objectPosition: branchImg[b.key][1] }} className="aspect-[16/10] w-full object-cover" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <Label>{b.tag}</Label>
                <p className={`${T.h2} mt-2`}>{b.name}</p>
              </div>
              <a href={mapsUrl(b.query)} target="_blank" rel="noreferrer" className="shrink-0 border-b border-ln-white pb-0.5 text-sm font-medium">
                Directions ↗
              </a>
            </div>
            <p className={`${T.small} mt-3 text-ln-muted`}>{b.note}</p>
            <dl className="mt-5 border-t border-white/15">
              {b.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-white/15 py-3 text-sm">
                  <dt>{d}</dt>
                  <dd className="text-ln-muted tabular-nums">{h}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
