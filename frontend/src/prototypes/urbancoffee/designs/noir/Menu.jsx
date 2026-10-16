import { useRef, useState } from 'react'
import latte from '../../assets/iced-latte-blue.jpg'
import teriyaki from '../../assets/bowl-top.jpg'
import katsu from '../../assets/katsu-donburi.jpg'
import salmon from '../../assets/salmon-bowl.jpg'
import salad from '../../assets/caesar-salad.jpg'
import breakfast from '../../assets/breakfast-plate.jpg'
import chicken from '../../assets/crispy-chicken-fries.jpg'
import toast from '../../assets/biscoff-french-toast.jpg'
import cake from '../../assets/chocolate-cake.jpg'
import { menu } from '../../content/menu'
import { Accent, Head, Label, Reveal, peso } from './ui'

// Preview photos. `pos` crops out the text overlaid on some of the original posts.
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
}

// Pigeon Matcha gets its own section
const cats = menu.filter((c) => c.key !== 'matcha')

export default function Menu() {
  const [tab, setTab] = useState(cats[0].key)
  const [hover, setHover] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const listRef = useRef(null)
  const cat = cats.find((c) => c.key === tab)

  const onMove = (e) => {
    const r = listRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <section id="menu" className="mx-auto max-w-[1440px] px-5 pb-28 md:px-10 md:pb-40">
      <Reveal>
        <Head
          n="01"
          label="Menu"
          aside={
            <div role="tablist" aria-label="Menu categories" className="flex flex-wrap gap-2 md:justify-end">
              {cats.map((c) => (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={tab === c.key}
                  onClick={() => setTab(c.key)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    tab === c.key ? 'border-nr-text bg-nr-text text-nr-bg' : 'border-white/15 text-nr-text/70 hover:border-white/40 hover:text-nr-text'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          }
        >
          What we&rsquo;re <Accent>serving</Accent>
        </Head>
      </Reveal>

      <div ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative mt-14 md:mt-20">
        {/* Cursor-following preview (desktop) */}
        {hover && photos[hover] && (
          <img
            src={photos[hover][0]}
            alt=""
            aria-hidden="true"
            style={{ left: pos.x, top: pos.y, objectPosition: photos[hover][1] }}
            className="pointer-events-none absolute z-20 hidden aspect-[4/5] w-56 -translate-x-1/2 -translate-y-1/2 rotate-3 rounded-xl object-cover shadow-2xl shadow-black lg:block"
          />
        )}

        <ul key={tab}>
          {cat.items.map((item, i) => {
            const photo = photos[item.name]
            return (
              <li
                key={item.name}
                onMouseEnter={() => setHover(item.name)}
                style={{ animationDelay: `${i * 50}ms` }}
                className="group grid animate-[rise_.5s_ease_both] grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-b border-white/10 py-6 transition-colors hover:border-white/30 md:grid-cols-12 md:py-8"
              >
                <span className="text-[11px] text-nr-muted md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex items-center gap-4 md:col-span-6">
                  {photo && (
                    <img src={photo[0]} alt="" style={{ objectPosition: photo[1] }} className="h-14 w-14 shrink-0 rounded-lg object-cover lg:hidden" />
                  )}
                  <p className="text-2xl font-medium tracking-[-0.02em] transition group-hover:translate-x-2 md:text-4xl">
                    {item.name}
                    {item.tag && <span className="ml-3 align-middle text-[10px] font-semibold tracking-[0.2em] text-nr-accent uppercase">{item.tag}</span>}
                  </p>
                </div>
                <p className="col-span-3 text-sm text-nr-muted md:col-span-4 md:col-start-8 md:row-start-1">{item.note}</p>
                <span className="col-start-3 row-start-1 text-lg font-medium tabular-nums md:col-span-1 md:col-start-12 md:text-right">{peso(item.price)}</span>
              </li>
            )
          })}
        </ul>
        <Label className="mt-6">Prices in PHP · Oat milk and extra shots available</Label>
      </div>
    </section>
  )
}
