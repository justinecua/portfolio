import { useEffect, useMemo, useState } from 'react'
import { Bird, Reveal } from '../shared'
import storefront from '../../assets/storefront-dusk.jpg'
import latte from '../../assets/iced-latte-blue.jpg'
import teriyaki from '../../assets/bowl-top.jpg'
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
import night from '../../assets/storefront-night.webp'
import diocesan from '../../assets/diocesan-branch.jpg'
import { menu } from '../../content/menu'
import { contact, eventStatus, events } from '../../content/events'
import { branches, mapsUrl } from '../../content/branches'

/*
 * One typeface (Onest), one scale — every text style comes from here.
 * Palette is the logo's: black and white, with greys between.
 */
const T = {
  display: 'text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.95] font-semibold tracking-[-0.045em]',
  h2: 'text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-semibold tracking-[-0.035em]',
  h3: 'text-lg leading-snug font-semibold tracking-[-0.01em]',
  small: 'text-sm leading-relaxed font-normal',
  label: 'text-[11px] font-medium tracking-[0.2em] uppercase',
}

const peso = (n) => `₱${n.toLocaleString('en-PH')}`

// Photos keyed by item name. `pos` crops out the text overlaid on some of the original posts.
const photos = {
  'Spanish Latte': [latte, '50% 30%'],
  'Teriyaki Chicken Bowl': [teriyaki, '50% 60%'],
  'Katsu Chicken Donburi': [katsu, '50% 60%'],
  'Honey Sriracha Salmon': [salmon, '50% 50%'],
  'Caesar Salad': [salad, '50% 60%'],
  'Urban Breakfast': [breakfast, '50% 15%'],
  'Crispy Chicken & Fries': [chicken, '50% 20%'],
  'Biscoff French Toast': [toast, '50% 55%'],
  'Chocolate Cake': [cake, '50% 20%'],
  Soar: [trio, '50% 100%'],
  Glide: [trio, '10% 100%'],
  Perch: [trio, '90% 100%'],
  Harbor: [harbor, '50% 100%'],
  Haven: [trio, '30% 100%'],
  'Ube Cheese Pudding': [ube, '50% 0%'],
  'Strawberry Matcha': [strawberry, '60% 100%'],
}

const allItems = menu.flatMap((c) => c.items)
const STORE = 'urban-tray'

function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-lg bg-black ring-1 ring-white/20 ${className}`} aria-hidden="true">
      <Bird className="h-[62%] w-[62%] translate-x-[2%] text-white" />
    </span>
  )
}

function Label({ children, className = '' }) {
  return <p className={`${T.label} text-tr-muted ${className}`}>{children}</p>
}

/* ---------- Tray state (remembered in this browser only) ---------- */

function useTray() {
  const [tray, setTray] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORE)) ?? {}
    } catch {
      return {}
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(tray))
    } catch {
      /* storage unavailable */
    }
  }, [tray])

  const change = (name, d) =>
    setTray((t) => {
      const q = Math.max(0, (t[name] ?? 0) + d)
      const next = { ...t, [name]: q }
      if (!q) delete next[name]
      return next
    })

  const lines = useMemo(
    () => Object.entries(tray).map(([name, qty]) => ({ ...allItems.find((i) => i.name === name), qty })).filter((l) => l.price),
    [tray],
  )
  const count = lines.reduce((s, l) => s + l.qty, 0)
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0)

  return { tray, lines, count, total, add: (n) => change(n, 1), remove: (n) => change(n, -1), clear: () => setTray({}) }
}

function orderMailto(lines, total) {
  const body = [...lines.map((l) => `${l.qty} × ${l.name} — ${peso(l.qty * l.price)}`), '', `Total: ${peso(total)}`, '', 'Name:', 'Pickup time:', 'Branch (Tibanga / Diocesan):'].join('\n')
  return `mailto:${contact.email}?subject=${encodeURIComponent('Order for pickup')}&body=${encodeURIComponent(body)}`
}

/* ---------- Tray panel ---------- */

function Tray({ t, onClose }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-tr-card ring-1 ring-white/[0.07]">
      <div className="flex items-center justify-between border-b border-tr-line px-5 py-4">
        <p className={T.h3}>
          Your tray <span className="font-normal text-tr-muted">({t.count})</span>
        </p>
        {onClose ? (
          <button onClick={onClose} className="text-sm text-tr-muted hover:text-tr-white">
            Close
          </button>
        ) : (
          t.count > 0 && (
            <button onClick={t.clear} className="text-sm text-tr-muted hover:text-tr-white">
              Clear
            </button>
          )
        )}
      </div>

      {t.count === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
          <LogoMark className="h-12 w-12" />
          <p className={`${T.small} max-w-[16rem] text-tr-muted`}>Tap + on anything in the menu to start a tray.</p>
        </div>
      ) : (
        <ul className="flex-1 divide-y divide-tr-line overflow-y-auto px-5">
          {t.lines.map((l) => (
            <li key={l.name} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{l.name}</p>
                <p className="text-xs text-tr-muted tabular-nums">{peso(l.price)} each</p>
              </div>
              <div className="flex items-center gap-2 rounded-full ring-1 ring-tr-line">
                <button onClick={() => t.remove(l.name)} aria-label={`Remove one ${l.name}`} className="h-8 w-8 rounded-full text-tr-muted hover:text-tr-white">
                  −
                </button>
                <span className="w-4 text-center text-sm tabular-nums">{l.qty}</span>
                <button onClick={() => t.add(l.name)} aria-label={`Add one ${l.name}`} className="h-8 w-8 rounded-full text-tr-muted hover:text-tr-white">
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-tr-line p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-tr-muted">Total</span>
          <span className="text-2xl font-semibold tracking-tight tabular-nums">{peso(t.total)}</span>
        </div>
        <a
          href={t.count ? orderMailto(t.lines, t.total) : undefined}
          aria-disabled={!t.count}
          className={`mt-4 block rounded-full py-3 text-center text-sm font-semibold transition ${
            t.count ? 'bg-tr-white text-black hover:bg-tr-white/85' : 'pointer-events-none bg-tr-line text-tr-muted'
          }`}
        >
          Send order for pickup
        </a>
        <p className="mt-2 text-center text-[11px] text-tr-muted">Opens an email to the café. Pay at the counter.</p>
      </div>
    </div>
  )
}

/* ---------- Menu ---------- */

function MenuSection({ t }) {
  const [tab, setTab] = useState(menu[0].key)
  const cat = menu.find((c) => c.key === tab)

  return (
    <section id="menu" className="scroll-mt-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Label>Order</Label>
          <h2 className={`${T.h2} mt-3`}>Build your tray.</h2>
        </div>
        <div role="tablist" aria-label="Menu categories" className="flex flex-wrap gap-2">
          {menu.map((c) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={tab === c.key}
              onClick={() => setTab(c.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === c.key ? 'bg-tr-white text-black' : 'text-tr-muted ring-1 ring-tr-line hover:text-tr-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <ul key={tab} className="mt-8 grid gap-3 sm:grid-cols-2">
        {cat.items.map((item, i) => {
          const p = photos[item.name]
          const qty = t.tray[item.name] ?? 0
          return (
            <li
              key={item.name}
              style={{ animationDelay: `${i * 40}ms` }}
              className={`flex animate-[rise_.4s_ease_both] gap-4 rounded-2xl bg-tr-card p-3 ring-1 transition ${qty ? 'ring-tr-white/40' : 'ring-white/[0.06]'}`}
            >
              {p ? (
                <img src={p[0]} alt="" style={{ objectPosition: p[1] }} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              ) : (
                <span className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-tr-line text-2xl font-semibold text-tr-muted">{item.name[0]}</span>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="font-semibold">
                  {item.name}
                  {item.alt && <span className="ml-1.5 font-normal text-tr-muted">{item.alt}</span>}
                </p>
                <p className="line-clamp-2 text-[13px] leading-snug text-tr-muted">{item.note}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-semibold tabular-nums">
                    {peso(item.price)}
                    {item.tag && <span className="ml-2 text-[10px] font-medium tracking-wider text-tr-muted uppercase">{item.tag}</span>}
                  </span>
                  {qty ? (
                    <div className="flex items-center gap-1 rounded-full bg-tr-white text-black">
                      <button onClick={() => t.remove(item.name)} aria-label={`Remove one ${item.name}`} className="h-8 w-8 rounded-full font-semibold">
                        −
                      </button>
                      <span className="w-4 text-center text-sm font-semibold tabular-nums">{qty}</span>
                      <button onClick={() => t.add(item.name)} aria-label={`Add one ${item.name}`} className="h-8 w-8 rounded-full font-semibold">
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => t.add(item.name)}
                      aria-label={`Add ${item.name} to tray`}
                      className="grid h-8 w-8 place-items-center rounded-full text-lg ring-1 ring-tr-line transition hover:bg-tr-white hover:text-black"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ---------- Page ---------- */

const posters = { tambayan, fiesta, popart }
const branchImg = { tibanga: [night, '50% 50%'], diocesan: [diocesan, '50% 0%'] }

export default function TraySite() {
  const t = useTray()
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawer])

  return (
    <div className="min-h-screen bg-tr-bg font-onest text-tr-white antialiased selection:bg-tr-white selection:text-black">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-tr-line bg-tr-bg/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <span className="tracking-[-0.02em]">
              <span className="font-light">Urban</span>
              <span className="font-semibold">Coffee</span>
            </span>
          </a>
          <ul className="hidden gap-7 text-sm text-tr-muted md:flex">
            {[
              ['#menu', 'Order'],
              ['#events', 'Events'],
              ['#visit', 'Visit'],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="transition hover:text-tr-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={() => setDrawer(true)} className="flex items-center gap-2 rounded-full bg-tr-white px-4 py-2 text-sm font-semibold text-black lg:hidden">
            Tray <span className="tabular-nums">· {t.count}</span>
          </button>
          <span className="hidden text-sm text-tr-muted tabular-nums lg:block">
            {t.count} in tray · {peso(t.total)}
          </span>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-32">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label>Roastery + Kitchen · {contact.city}</Label>
            <h1 className={`${T.display} mt-4`}>Order ahead. Skip the line. Stay a while.</h1>
            <p className={`${T.small} mt-5 max-w-md text-tr-muted`}>
              {contact.tagline} Build your order below and send it over — we&rsquo;ll have it ready at the counter.
            </p>
            <a href="#menu" className="mt-7 inline-block rounded-full bg-tr-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-tr-white/85">
              Start an order
            </a>
          </div>
          <div className="relative overflow-hidden rounded-2xl lg:col-span-5">
            <img src={storefront} alt="Urban storefront at dusk" className="aspect-[4/3] w-full object-cover object-[50%_40%]" />
          </div>
        </Reveal>
      </section>

      {/* Menu + tray */}
      <div className="mx-auto mt-20 grid max-w-7xl gap-8 px-5 md:mt-28 md:px-8 lg:grid-cols-[1fr_340px]">
        <MenuSection t={t} />
        <aside className="hidden lg:block">
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <Tray t={t} />
          </div>
        </aside>
      </div>

      {/* Events */}
      <section id="events" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8 md:py-32">
        <Label>Events</Label>
        <h2 className={`${T.h2} mt-3`}>This season.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {events.map((e, i) => {
            const s = eventStatus(e)
            const live = s.state !== 'past'
            return (
              <Reveal key={e.key} delay={i * 80} className={`flex gap-4 rounded-2xl p-3 ring-1 ${live ? 'bg-tr-white text-black ring-transparent' : 'bg-tr-card ring-white/[0.06]'}`}>
                <img src={posters[e.key]} alt={`${e.name} poster`} className={`h-28 w-24 shrink-0 rounded-xl object-cover ${live ? '' : 'opacity-50 grayscale'}`} />
                <div className="flex min-w-0 flex-col">
                  <p className={`text-[11px] font-medium tracking-wider uppercase ${live ? 'text-black/55' : 'text-tr-muted'}`}>
                    {e.dates} · {s.label}
                  </p>
                  <p className={`${T.h3} mt-1`}>{e.name}</p>
                  <p className={`mt-1 line-clamp-2 text-[13px] leading-snug ${live ? 'text-black/65' : 'text-tr-muted'}`}>{e.blurb}</p>
                  {live && (
                    <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} — merchant slot`)}`} className="mt-auto pt-2 text-sm font-semibold underline underline-offset-4">
                      Apply for a slot
                    </a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-24 md:px-8 md:pb-32">
        <Label>Visit</Label>
        <h2 className={`${T.h2} mt-3`}>Pick up at either branch.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {branches.map((b, i) => (
            <Reveal key={b.key} delay={i * 100} className="overflow-hidden rounded-2xl bg-tr-card ring-1 ring-white/[0.06]">
              <img src={branchImg[b.key][0]} alt={`${b.name} branch`} style={{ objectPosition: branchImg[b.key][1] }} className="aspect-[2/1] w-full object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Label>{b.tag}</Label>
                    <p className={`${T.h2} mt-2`}>{b.name}</p>
                  </div>
                  <a href={mapsUrl(b.query)} target="_blank" rel="noreferrer" className="shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-tr-line transition hover:bg-tr-white hover:text-black">
                    Directions ↗
                  </a>
                </div>
                <dl className="mt-5 divide-y divide-tr-line border-y border-tr-line">
                  {b.hours.map(([d, h]) => (
                    <div key={d} className="flex justify-between py-3 text-sm">
                      <dt>{d}</dt>
                      <dd className="text-tr-muted tabular-nums">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-tr-line px-5 pt-14 pb-28 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex items-center gap-4">
            <LogoMark className="h-14 w-14" />
            <p className={`${T.h3} max-w-sm`}>{contact.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-tr-muted">
            <a href={`mailto:${contact.email}`} className="hover:text-tr-white">
              {contact.email}
            </a>
            <a href={`mailto:${contact.hiring}`} className="hover:text-tr-white">
              We&rsquo;re hiring
            </a>
            <span className="text-tr-white">{contact.hashtag}</span>
          </div>
        </div>
      </footer>

      {/* Mobile tray drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[60] flex items-end bg-black/60 lg:hidden" onClick={() => setDrawer(false)}>
          <div className="h-[80vh] w-full p-3" onClick={(e) => e.stopPropagation()}>
            <Tray t={t} onClose={() => setDrawer(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
