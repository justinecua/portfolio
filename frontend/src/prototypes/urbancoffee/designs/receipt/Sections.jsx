import { useEffect, useState } from 'react'
import storefront from '../../assets/storefront-dusk.jpg'
import latte from '../../assets/iced-latte-blue.jpg'
import interior from '../../assets/interior.webp'
import reading from '../../assets/reading-corner.jpg'
import bowl from '../../assets/bowl-top.jpg'
import pour from '../../assets/french-toast-pour.jpg'
import team from '../../assets/team-polaroid.jpg'
import night from '../../assets/storefront-night.webp'
import tambayan from '../../assets/tambayan-open.jpg'
import fiesta from '../../assets/fiesta-merkado.jpg'
import popart from '../../assets/pop-art-market.jpg'
import { menu } from '../../content/menu'
import { contact, eventStatus, events } from '../../content/events'
import { branches, mapsUrl } from '../../content/branches'
import { Barcode, Dashed, Line, LogoMark, Paper, Reveal, T, Tag, peso } from './ui'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

function SectionHead({ n, title, note }) {
  return (
    <Reveal className="mb-12 flex flex-col justify-between gap-4 border-t border-rc-white/20 pt-5 md:flex-row md:items-end">
      <div>
        <p className={`${T.tiny} text-rc-muted`}>[{n}]</p>
        <h2 className={`${T.h2} mt-3`}>{title}</h2>
      </div>
      {note && <p className={`${T.small} max-w-sm text-rc-muted`}>{note}</p>}
    </Reveal>
  )
}

/* ---------- Hero ---------- */

export function Hero() {
  const now = useClock()
  const next = events.find((e) => eventStatus(e).state !== 'past')
  const date = now.toLocaleDateString('en-PH', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const time = now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <section id="top" className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-10 md:pt-32">
      <div className={`flex flex-wrap justify-between gap-2 border-b border-rc-white/20 pb-3 ${T.tiny} text-rc-muted`}>
        <span>Order no. 0001</span>
        <span className="tabular-nums">
          {date} · {time}
        </span>
        <span>{contact.city}</span>
      </div>

      <div className="grid gap-12 pt-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <h1 className={T.mega}>
            URBAN
            <span className="block text-rc-muted">COFFEE_</span>
          </h1>
          <p className={`${T.body} mt-8 max-w-md text-rc-white/80`}>&gt; {contact.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <a href="#menu" className="bg-rc-white px-5 py-3 text-black transition hover:bg-rc-white/80">
              [ View menu ]
            </a>
            <a href="#visit" className="px-5 py-3 ring-1 ring-rc-white/30 transition hover:bg-rc-white/10">
              [ Find us ]
            </a>
          </div>
        </Reveal>

        {/* Today's receipt */}
        <Reveal delay={150} className="lg:col-span-5">
          <Paper className="mx-auto max-w-sm -rotate-1">
            <div className="flex flex-col items-center text-center">
              <LogoMark className="h-12 w-12" />
              <p className="mt-3 font-semibold">URBAN COFFEE STUDIO</p>
              <p className={T.tiny}>Roastery + Kitchen</p>
            </div>
            <Dashed className="my-4" />
            <div className={`${T.small} space-y-1.5`}>
              <Line left="Spanish Latte" right="1 × 165.00" />
              <Line left="Pigeon Matcha · Soar" right="1 × 180.00" />
              <Line left="Teriyaki Chicken Bowl" right="1 × 245.00" />
            </div>
            <Dashed className="my-4" />
            <div className={`${T.small} space-y-1.5`}>
              <Line left="Branches" right="Tibanga, Diocesan" />
              {next && <Line left="Next event" right={next.name} />}
              {next && <Line left="Status" right={eventStatus(next).label} />}
            </div>
            <Dashed className="my-4" />
            <p className={`${T.tiny} text-center`}>Thank you · come again</p>
            <Barcode seed="tibanga" className="mx-auto mt-3 justify-center" />
          </Paper>
        </Reveal>
      </div>

      <Reveal className="mt-16 grid grid-cols-3 gap-3">
        {[
          [storefront, '50% 40%', 'IMG_0001 — Tibanga'],
          [latte, '50% 30%', 'IMG_0002 — Spanish Latte'],
          [interior, '50% 50%', 'IMG_0003 — The bar'],
        ].map(([src, pos, cap]) => (
          <figure key={cap} className="group">
            <img src={src} alt={cap.split(' — ')[1]} style={{ objectPosition: pos }} className="aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
            <figcaption className={`${T.tiny} mt-2 hidden text-rc-muted sm:block`}>{cap}</figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  )
}

/* ---------- Menu: one receipt per category ---------- */

const tilt = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.75deg]']

export function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-7xl px-5 py-20 md:px-10">
      <SectionHead n="01" title="The menu, printed." note="Four receipts, one for each part of the counter. Prices in PHP." />
      <div className="grid items-start gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {menu.map((cat, i) => (
          <Reveal key={cat.key} delay={i * 90} className={`${tilt[i % tilt.length]} transition duration-300 hover:rotate-0`}>
            <Paper>
              <div className="text-center">
                <p className={T.tiny}>Urban Coffee Studio</p>
                <p className={`${T.h3} mt-1 uppercase`}>{cat.label}</p>
                <p className={`${T.tiny} mt-1 opacity-60`}>
                  Receipt {String(i + 1).padStart(2, '0')}/{String(menu.length).padStart(2, '0')}
                </p>
              </div>
              <Dashed className="my-4" />
              <ul className={`${T.small} space-y-3`}>
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Line left={<span className="font-semibold">{item.name}</span>} right={peso(item.price)} />
                    <p className="text-[12px] leading-snug opacity-60">
                      {item.alt && `(${item.alt}) `}
                      {item.note}
                    </p>
                    {item.tag && (
                      <div className="mt-1">
                        <Tag>{item.tag}</Tag>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <Dashed className="my-4" />
              <Line className={`${T.small} font-semibold`} left="ITEMS" right={cat.items.length} />
              <Barcode seed={cat.key} className="mt-4" />
            </Paper>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- Events: order tickets ---------- */

const posters = { tambayan, fiesta, popart }

export function Events() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-20 md:px-10">
      <SectionHead n="02" title="Now serving: events." note="Markets, music and makers — the space opens up a few times a year." />
      <div className="space-y-4">
        {events.map((e, i) => {
          const s = eventStatus(e)
          const live = s.state !== 'past'
          return (
            <Reveal key={e.key} delay={i * 80} className={`grid border sm:grid-cols-[auto_1fr_auto] ${live ? 'border-rc-white bg-rc-white text-black' : 'border-rc-white/20 text-rc-white/55'}`}>
              <div className={`flex items-center justify-center border-b px-6 py-4 sm:border-r sm:border-b-0 ${live ? 'border-black/20' : 'border-rc-white/20'}`}>
                <p className="text-5xl font-bold tracking-[-0.05em] tabular-nums">#{String(i + 1).padStart(2, '0')}</p>
              </div>
              <div className="flex gap-5 p-5">
                <img src={posters[e.key]} alt={`${e.name} poster`} className={`hidden h-24 w-20 shrink-0 object-cover sm:block ${live ? '' : 'grayscale'}`} />
                <div>
                  <p className={T.tiny}>
                    {e.dates} · {e.hours}
                  </p>
                  <p className={`${T.h3} mt-1 md:text-2xl`}>{e.name}</p>
                  <p className={`${T.small} mt-1 max-w-xl opacity-70`}>{e.blurb}</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 border-t border-dashed p-5 sm:flex-col sm:justify-center sm:border-t-0 sm:border-l ${live ? 'border-black/30' : 'border-rc-white/20'}`}>
                <p className={`${T.tiny} font-semibold`}>{live ? s.label : 'Served'}</p>
                {live && (
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} — merchant slot`)}`}
                    className="bg-black px-4 py-2 text-xs font-semibold text-rc-paper transition hover:bg-black/80"
                  >
                    [ Apply ]
                  </a>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Space: contact sheet ---------- */

const sheet = [
  [interior, '50% 50%', 'The bar'],
  [reading, '30% 50%', 'Slow afternoons'],
  [bowl, '50% 60%', 'Teriyaki bowl'],
  [pour, '50% 50%', 'French toast'],
  [night, '50% 50%', 'After dark'],
  [team, '50% 40%', 'The crew'],
]

export function Space() {
  return (
    <section id="space" className="mx-auto max-w-7xl px-5 py-20 md:px-10">
      <SectionHead n="03" title="Contact sheet." note="Two floors, a roof deck, and room for whatever you’re making. Hover for colour." />
      <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {sheet.map(([src, pos, cap], i) => (
          <figure key={cap} className="group">
            <img src={src} alt={cap} style={{ objectPosition: pos }} className="aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
            <figcaption className={`${T.tiny} mt-2 flex justify-between text-rc-muted`}>
              <span>{cap}</span>
              <span>{String(i + 4).padStart(4, '0')}</span>
            </figcaption>
          </figure>
        ))}
      </Reveal>
      <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 border border-rc-white/20 p-6 sm:flex-row sm:items-center">
        <p className={T.body}>&gt; Now hiring: baristas + kitchen cooks.</p>
        <a href={`mailto:${contact.hiring}`} className="text-sm font-semibold underline underline-offset-4">
          {contact.hiring}
        </a>
      </Reveal>
    </section>
  )
}

/* ---------- Visit ---------- */

export function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-7xl px-5 py-20 md:px-10">
      <SectionHead n="04" title="Where to find us." />
      <div className="grid gap-8 md:grid-cols-2">
        {branches.map((b, i) => (
          <Reveal key={b.key} delay={i * 100} className="border border-rc-white/20 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={`${T.tiny} text-rc-muted`}>{b.tag}</p>
                <p className={`${T.h2} mt-2`}>{b.name}</p>
              </div>
              <a href={mapsUrl(b.query)} target="_blank" rel="noreferrer" className="shrink-0 bg-rc-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-rc-white/80">
                [ Map ↗ ]
              </a>
            </div>
            <p className={`${T.small} mt-3 text-rc-white/70`}>{b.note}</p>
            <div className={`${T.small} mt-5 space-y-2`}>
              {b.hours.map(([d, h]) => (
                <Line key={d} left={d} right={h} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
