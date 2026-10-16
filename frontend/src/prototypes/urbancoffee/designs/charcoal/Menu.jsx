import { useEffect, useState } from 'react'
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
import { Card, Label, Pair, Reveal, T, peso } from './ui'

// Thumbnails. `pos` crops out the text overlaid on some of the original posts.
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

// Pigeon Matcha gets its own section below
const cats = menu.filter((c) => c.key !== 'matcha')

export default function Menu() {
  const [active, setActive] = useState(cats[0].key)

  // Scrollspy: highlight the category currently in view
  useEffect(() => {
    const els = cats.map((c) => document.getElementById(`cat-${c.key}`)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id.replace('cat-', ''))
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <Pair light="What we" bold="serve" />
        <p className={`${T.body} max-w-sm text-ch-muted`}>Coffee, kitchen, and something sweet. Pigeon Matcha has its own page below.</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        {/* Category nav: sticky sidebar on desktop, sticky chips on mobile */}
        <nav aria-label="Menu categories" className="sticky top-16 z-20 -mx-4 min-w-0 bg-ch-bg/90 px-4 py-3 backdrop-blur lg:top-28 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {cats.map((c) => (
              <li key={c.key}>
                <a
                  href={`#cat-${c.key}`}
                  className={`flex items-center justify-between gap-6 rounded-2xl px-4 py-2.5 text-sm whitespace-nowrap transition lg:py-3 ${
                    active === c.key ? 'bg-ch-matcha font-bold text-ch-bg' : 'font-medium text-ch-muted hover:bg-white/[0.05] hover:text-ch-text'
                  }`}
                >
                  {c.label}
                  <span className="hidden text-xs opacity-60 lg:inline">{c.items.length}</span>
                </a>
              </li>
            ))}
            <li className="lg:mt-4">
              <a href="#matcha" className="flex rounded-2xl px-4 py-2.5 text-sm font-medium whitespace-nowrap text-ch-muted hover:text-ch-text lg:py-3">
                Pigeon Matcha →
              </a>
            </li>
          </ul>
        </nav>

        <div className="min-w-0 space-y-16">
          {cats.map((c) => (
            <div key={c.key} id={`cat-${c.key}`} className="scroll-mt-36">
              <div className="mb-5 flex items-baseline justify-between border-b border-white/[0.08] pb-3">
                <h3 className={`${T.h3} font-extrabold`}>{c.label}</h3>
                <Label>{c.items.length} items</Label>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.items.map((item) => {
                  const photo = photos[item.name]
                  return (
                    <li key={item.name}>
                      <Card className="group flex h-full items-center gap-4 p-3 pr-5 transition hover:bg-ch-raised">
                        {photo ? (
                          <img src={photo[0]} alt="" style={{ objectPosition: photo[1] }} className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
                        ) : (
                          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-ch-raised text-2xl font-extrabold text-ch-matcha">
                            {item.name[0]}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="truncate text-base font-bold">{item.name}</p>
                            <span className="shrink-0 text-base font-extrabold tabular-nums">{peso(item.price)}</span>
                          </div>
                          <p className={`${T.small} line-clamp-2 text-ch-muted`}>{item.note}</p>
                          {item.tag && <span className="mt-1.5 inline-block rounded-full bg-ch-matcha/15 px-2 py-0.5 text-[11px] font-bold text-ch-matcha">{item.tag}</span>}
                        </div>
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
