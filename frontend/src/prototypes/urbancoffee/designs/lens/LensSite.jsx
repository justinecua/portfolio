import { useEffect, useState } from 'react'
import trio from '../../assets/matcha-trio.jpg'
import bowl from '../../assets/bowl-top.jpg'
import popart from '../../assets/artists-collab.jpg'
import interior from '../../assets/interior.webp'
import storefront from '../../assets/storefront-dusk.jpg'
import { contact } from '../../content/events'
import { Chapter, Events, Hero, Matcha, Menu, Space, Visit } from './Sections'
import { Label, LogoMark, T } from './ui'

const links = [
  ['#menu', 'Menu'],
  ['#matcha', 'Matcha'],
  ['#events', 'Events'],
  ['#space', 'Space'],
  ['#visit', 'Visit'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-ln-bg/90 to-ln-bg/0 backdrop-blur-[2px]">
      <nav className="flex h-18 items-center justify-between px-5 text-white md:px-10">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <LogoMark className="h-9 w-9" />
          <span className="text-base tracking-[-0.02em]">
            <span className="font-light">Urban</span>
            <span className="font-semibold">Coffee</span>
          </span>
        </a>
        <ul className="hidden gap-8 text-sm md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="transition hover:opacity-60">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="text-sm md:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul className="px-5 pb-6 text-white md:hidden">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className={`block py-2 ${T.h2}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative h-[80vh] overflow-hidden">
      <img src={storefront} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_40%] opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ln-bg via-ln-bg/60 to-ln-bg" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-24 md:px-10">
        <LogoMark className="h-16 w-16" />
        <p className={`${T.display} mt-8 max-w-4xl`}>{contact.tagline}</p>
        <div className={`${T.small} mt-10 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-ln-muted md:flex-row`}>
          <a href={`mailto:${contact.email}`} className="hover:text-ln-white">
            {contact.email}
          </a>
          <span>Tibanga · Diocesan · {contact.city}</span>
          <Label className="text-ln-white">{contact.hashtag}</Label>
        </div>
      </div>
    </footer>
  )
}

export default function LensSite() {
  return (
    <div className="min-h-screen bg-ln-bg font-geist text-ln-white antialiased selection:bg-ln-white selection:text-black">
      <Nav />
      <main>
        <Hero />
        <Chapter id="menu" n="01" title="What we serve." img={bowl} pos="50% 60%" />
        <Menu />
        <Chapter id="matcha" n="02" title="Pigeon Matcha." img={trio} pos="50% 100%" />
        <Matcha />
        <Chapter id="events" n="03" title="This season." img={popart} pos="50% 30%" />
        <Events />
        <Chapter id="space" n="04" title="The tambayan." img={interior} />
        <Space />
        <section id="visit" className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28">
            <Label>Chapter 05</Label>
            <h2 className={`${T.display} mt-3`}>Come through.</h2>
          </div>
          <Visit />
        </section>
      </main>
      <Footer />
    </div>
  )
}
