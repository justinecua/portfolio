import { useEffect, useState } from 'react'
import { contact } from '../../content/events'
import Hero from './Hero'
import { Events, Matcha, Menu, Space, Visit } from './Sections'
import { Label, LogoMark, T } from './ui'

const links = [
  ['#menu', 'Menu'],
  ['#matcha', 'Matcha'],
  ['#events', 'Events'],
  ['#space', 'Space'],
  ['#visit', 'Visit'],
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl py-2 pr-2 pl-2 transition-all duration-300 ${
          scrolled || open ? 'bg-black/80 ring-1 ring-white/10 backdrop-blur-xl' : ''
        }`}
      >
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-3 text-st-white">
          <LogoMark className="h-10 w-10" />
          <span className="text-lg">
            <span className="font-light">Urban</span>
            <span className="font-extrabold">Coffee</span>
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-4 py-2 text-sm font-medium text-st-white/70 transition hover:bg-white/10 hover:text-st-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-st-white md:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul className="mx-auto mt-2 max-w-7xl rounded-2xl bg-black/95 p-2 ring-1 ring-white/10 md:hidden">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 ${T.h3} text-st-white hover:bg-white/5`}>
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
    <footer className="relative z-10 bg-st-bg px-5 pt-20 pb-28 text-st-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <LogoMark className="h-16 w-16" />
        <p className={`${T.h2} mt-8 max-w-4xl`}>{contact.tagline}</p>
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 text-sm sm:grid-cols-3">
          <div>
            <Label className="mb-3">Say hi</Label>
            <a href={`mailto:${contact.email}`} className="font-medium break-all text-st-white/75 hover:text-st-white">
              {contact.email}
            </a>
          </div>
          <div>
            <Label className="mb-3">Branches</Label>
            <p className="font-medium text-st-white/75">Tibanga · Diocesan · {contact.city}</p>
          </div>
          <div className="sm:text-right">
            <Label className="mb-3">© {new Date().getFullYear()} Urban Coffee Studio</Label>
            <p className="font-bold">{contact.hashtag}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function StackSite() {
  return (
    <div className="min-h-screen bg-st-bg font-jakarta text-st-white antialiased selection:bg-st-white selection:text-black">
      <Nav />
      <Hero />
      <main className="relative">
        <Menu />
        <Matcha />
        <Events />
        <Space />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
