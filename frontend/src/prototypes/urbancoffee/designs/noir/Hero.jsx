import { useState } from 'react'
import latte from '../../assets/iced-latte-blue.jpg'
import matcha from '../../assets/ube-matcha-scoop.jpg'
import bowl from '../../assets/bowl-top.jpg'
import { contact } from '../../content/events'
import { Accent, Arrow, Label, Reveal, T } from './ui'

const panels = [
  { src: latte, alt: 'Iced latte in an Urban cup', label: 'Coffee', sub: 'Roasted in-house', pos: '50% 30%' },
  { src: matcha, alt: 'Ube cheese pudding matcha', label: 'Pigeon Matcha', sub: 'Seven ways to fly', pos: '50% 0%' },
  { src: bowl, alt: 'Teriyaki chicken bowl', label: 'Kitchen', sub: 'Bowls, breakfast, sweets', pos: '50% 60%' },
]

export default function Hero() {
  const [open, setOpen] = useState(0)

  return (
    <section id="top" className="mx-auto max-w-[1440px] px-5 pt-32 md:px-10 md:pt-40">
      <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
        <h1 className={`${T.display} md:col-span-9`}>
          Coffee for <br className="hidden sm:block" />
          the <Accent>city</Accent> that <br className="hidden sm:block" />
          stays up late.
        </h1>
        <div className="space-y-6 md:col-span-3 md:pb-3">
          <p className="max-w-xs text-nr-muted">{contact.tagline}</p>
          <a href="#menu" className="group inline-flex items-center gap-3 rounded-full bg-nr-text px-6 py-3.5 text-sm font-semibold text-nr-bg transition hover:bg-nr-accent">
            View the menu <Arrow className="transition group-hover:rotate-45" />
          </a>
        </div>
      </Reveal>

      {/* Expanding panels */}
      <Reveal delay={150} className="mt-14 flex h-[80svh] min-h-[480px] flex-col gap-3 md:mt-20 md:h-[70vh] md:flex-row">
        {panels.map((p, i) => (
          <button
            key={p.label}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onClick={() => setOpen(i)}
            aria-label={p.label}
            className={`group relative overflow-hidden rounded-2xl text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
              open === i ? 'flex-[4]' : 'flex-[1]'
            }`}
          >
            <img src={p.src} alt={p.alt} style={{ objectPosition: p.pos }} className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
              <div>
                <Label className="text-nr-text/70">0{i + 1}</Label>
                <p className="mt-1 text-2xl font-medium tracking-tight md:text-3xl">{p.label}</p>
                <p className={`text-sm text-nr-text/70 transition-opacity duration-500 ${open === i ? 'opacity-100' : 'opacity-0'}`}>{p.sub}</p>
              </div>
            </div>
          </button>
        ))}
      </Reveal>

      <div className="flex flex-wrap items-center justify-between gap-4 py-6">
        <Label>Roastery + Kitchen · {contact.city}</Label>
        <Label className="hidden sm:block">Tibanga · Diocesan</Label>
        <Label>Scroll ↓</Label>
      </div>
    </section>
  )
}
