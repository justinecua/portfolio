import { useState } from 'react'
import latte from '../../assets/iced-latte-blue.jpg'
import bowl from '../../assets/bowl-top.jpg'
import toast from '../../assets/biscoff-french-toast.jpg'
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
import pour from '../../assets/french-toast-pour.jpg'
import tibanga from '../../assets/storefront-dusk.jpg'
import diocesan from '../../assets/diocesan-branch.jpg'
import { menu } from '../../content/menu'
import { contact, eventStatus, events } from '../../content/events'
import { branches, mapsUrl } from '../../content/branches'
import { Label, LogoMark, Reveal, StackCard, T, peso } from './ui'

/* ---------- Menu: accordion ---------- */

const catCover = { coffee: [latte, '50% 30%'], kitchen: [bowl, '50% 60%'], sweets: [toast, '50% 55%'] }
const cats = menu.filter((c) => c.key !== 'matcha')

export function Menu() {
  const [open, setOpen] = useState(cats[0].key)
  return (
    <StackCard id="menu" n="01" label="Menu" title="What we serve.">
      <div className="border-t border-white/10">
        {cats.map((c) => {
          const on = open === c.key
          return (
            <div key={c.key} className="border-b border-white/10">
              <button
                onClick={() => setOpen(on ? null : c.key)}
                aria-expanded={on}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
              >
                <span className="flex items-baseline gap-5">
                  <span className={`${T.h2} transition ${on ? 'text-st-white' : 'text-st-white/35 group-hover:text-st-white/70'}`}>{c.label}</span>
                  <Label>{c.items.length} items</Label>
                </span>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl ring-1 ring-white/20 transition ${on ? 'rotate-45 bg-st-white text-black' : ''}`}>+</span>
              </button>

              <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-10 md:grid-cols-12">
                    <img
                      src={catCover[c.key][0]}
                      alt={c.label}
                      style={{ objectPosition: catCover[c.key][1] }}
                      className="aspect-[4/3] w-full rounded-2xl object-cover md:col-span-4"
                    />
                    <ul className="md:col-span-8">
                      {c.items.map((item) => (
                        <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] py-4 first:pt-0">
                          <div>
                            <p className="text-lg font-bold">
                              {item.name}
                              {item.tag && <span className="ml-2 rounded-full bg-st-white px-2 py-0.5 align-middle text-[10px] font-bold text-black uppercase">{item.tag}</span>}
                            </p>
                            <p className={`${T.small} text-st-muted`}>{item.note}</p>
                          </div>
                          <span className="text-lg font-bold tabular-nums">{peso(item.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </StackCard>
  )
}

/* ---------- Pigeon Matcha (inverted white card) ---------- */

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
  const [i, setI] = useState(0)
  const d = drinks[i]
  return (
    <StackCard id="matcha" n="02" label="Pigeon Matcha" title="Seven ways to fly." light>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl lg:col-span-7">
          {drinks.map((x, n) => (
            <img
              key={x.name}
              src={matchaPhotos[x.name][0]}
              alt={n === i ? `${x.name} matcha` : ''}
              style={{ objectPosition: matchaPhotos[x.name][1] }}
              className={`aspect-[4/3] w-full object-cover transition-opacity duration-700 ${n === i ? 'relative opacity-100' : 'absolute inset-0 opacity-0'}`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-st-white md:p-8">
            <Label className="text-st-white/70">{d.alt ?? 'Pigeon Matcha'}</Label>
            <p className={`${T.h3} mt-1 md:text-4xl`}>{d.name}</p>
            <p className={`${T.small} mt-2 max-w-md text-st-white/80`}>{d.note}</p>
          </div>
        </div>
        <ol className="lg:col-span-5">
          {drinks.map((x, n) => (
            <li key={x.name}>
              <button
                onMouseEnter={() => setI(n)}
                onClick={() => setI(n)}
                aria-pressed={n === i}
                className={`flex w-full items-center gap-4 border-b border-black/10 py-4 text-left transition ${n === i ? 'pl-3' : ''}`}
              >
                <span className={`text-xs font-semibold tabular-nums ${n === i ? 'text-black' : 'text-black/35'}`}>{String(n + 1).padStart(2, '0')}</span>
                <span className={`flex-1 text-xl font-bold tracking-[-0.01em] ${n === i ? 'text-black' : 'text-black/45'}`}>
                  {x.name}
                  {x.tag && <span className="ml-2 rounded-full bg-black px-2 py-0.5 align-middle text-[10px] font-bold text-st-white uppercase">{x.tag}</span>}
                </span>
                <span className={`font-bold tabular-nums ${n === i ? 'text-black' : 'text-black/45'}`}>{peso(x.price)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </StackCard>
  )
}

/* ---------- Events ---------- */

const posters = { tambayan, fiesta, popart }

export function Events() {
  return (
    <StackCard id="events" n="03" label="Events" title="This season.">
      <div className="grid gap-5 md:grid-cols-3">
        {events.map((e, n) => {
          const s = eventStatus(e)
          const live = s.state !== 'past'
          return (
            <Reveal key={e.key} delay={n * 90} className={`overflow-hidden rounded-3xl ${live ? 'bg-st-white text-black' : 'bg-st-card2'}`}>
              <img src={posters[e.key]} alt={`${e.name} poster`} className={`aspect-[4/3] w-full object-cover object-top ${live ? '' : 'opacity-60 grayscale'}`} />
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <Label className={live ? 'text-black/55' : ''}>{e.dates}</Label>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${live ? 'bg-black text-st-white' : 'ring-1 ring-white/20 text-st-muted'}`}>
                    {s.label}
                  </span>
                </div>
                <p className={`${T.h3} mt-3`}>{e.name}</p>
                <p className={`${T.small} mt-2 ${live ? 'text-black/65' : 'text-st-muted'}`}>{e.blurb}</p>
                {live && (
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} — merchant slot`)}`}
                    className="mt-5 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-bold text-st-white transition hover:bg-black/80"
                  >
                    Apply for a slot →
                  </a>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </StackCard>
  )
}

/* ---------- Space ---------- */

export function Space() {
  return (
    <StackCard id="space" n="04" label="Space" title="The tambayan.">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        <img src={interior} alt="Baristas behind the bar" className="col-span-2 row-span-2 aspect-square h-full w-full rounded-3xl object-cover md:aspect-auto" />
        <img src={reading} alt="Customers reading over matcha" className="aspect-square w-full rounded-3xl object-cover object-[30%_50%]" />
        <img src={pour} alt="Biscoff French toast" className="aspect-square w-full rounded-3xl object-cover" />
        <img src={team} alt="The Urban Coffee Studio team" className="col-span-2 aspect-[2/1] w-full rounded-3xl object-cover object-[50%_40%]" />
      </div>
      <div className="mt-3 flex flex-col items-start justify-between gap-5 rounded-3xl bg-st-card2 p-6 sm:flex-row sm:items-center md:p-8">
        <div className="flex items-center gap-4">
          <LogoMark className="h-12 w-12" />
          <div>
            <p className={T.h3}>We&rsquo;re hiring</p>
            <p className={`${T.small} text-st-muted`}>Baristas and kitchen cooks who like people as much as coffee.</p>
          </div>
        </div>
        <a href={`mailto:${contact.hiring}`} className="rounded-full bg-st-white px-5 py-3 text-sm font-bold text-black transition hover:bg-st-white/80">
          {contact.hiring}
        </a>
      </div>
    </StackCard>
  )
}

/* ---------- Visit (inverted white card) ---------- */

const branchImg = { tibanga: [tibanga, '50% 40%'], diocesan: [diocesan, '50% 0%'] }

export function Visit() {
  return (
    <StackCard id="visit" n="05" label="Visit" title="Come through." light>
      <div className="grid gap-10 md:grid-cols-2 md:gap-6">
        {branches.map((b) => (
          <div key={b.key}>
            <img src={branchImg[b.key][0]} alt={`${b.name} branch`} style={{ objectPosition: branchImg[b.key][1] }} className="aspect-[2/1] w-full rounded-3xl object-cover" />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <Label className="text-black/50">{b.tag}</Label>
                <p className={`${T.h3} mt-1 md:text-4xl`}>{b.name}</p>
                <p className={`${T.small} mt-2 max-w-sm text-black/65`}>{b.note}</p>
              </div>
              <a href={mapsUrl(b.query)} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-black px-5 py-2.5 text-sm font-bold text-st-white transition hover:bg-black/80">
                Directions ↗
              </a>
            </div>
            <dl className="mt-5 border-t border-black/15">
              {b.hours.map(([day, h]) => (
                <div key={day} className="flex justify-between border-b border-black/15 py-3 text-sm">
                  <dt className="font-bold">{day}</dt>
                  <dd className="text-black/65 tabular-nums">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </StackCard>
  )
}
