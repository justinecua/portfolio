import { useEffect, useState } from 'react'
import { contact } from '../../content/events'
import Hero from './Hero'
import Statement from './Statement'
import Menu from './Menu'
import Matcha from './Matcha'
import Events from './Events'
import { Space, Visit } from './Space'
import { Bird, Label, T } from './ui'

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
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? 'border-b border-white/10 bg-nr-bg/80 backdrop-blur-xl' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <Bird className="h-7 w-7 text-nr-text" />
          <span className="text-lg font-semibold tracking-[-0.02em]">Urban</span>
          <span className="hidden text-lg text-nr-muted sm:inline">Coffee Studio</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-sm text-nr-text/70 transition hover:text-nr-text">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#visit" className="hidden rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition hover:bg-nr-text hover:text-nr-bg md:inline-block">
          Find us
        </a>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="text-sm font-medium md:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul className="h-[calc(100svh-4rem)] px-5 pt-6 md:hidden">
          {links.map(([href, label], i) => (
            <li key={href} className="border-b border-white/10">
              <a href={href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5 text-4xl font-medium tracking-[-0.03em]">
                {label}
                <span className="text-xs text-nr-muted">0{i + 1}</span>
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
    <footer className="overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <p className={`${T.quote} max-w-sm text-nr-text/80 md:col-span-5`}>{contact.tagline}</p>
          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-7 md:grid-cols-3">
            <div>
              <Label className="mb-3">Explore</Label>
              {links.map(([href, label]) => (
                <a key={href} href={href} className="block py-1 text-nr-text/70 hover:text-nr-text">
                  {label}
                </a>
              ))}
            </div>
            <div>
              <Label className="mb-3">Branches</Label>
              <p className="py-1 text-nr-text/70">Tibanga</p>
              <p className="py-1 text-nr-text/70">Diocesan</p>
              <p className="py-1 text-nr-muted">{contact.city}</p>
            </div>
            <div>
              <Label className="mb-3">Say hi</Label>
              <a href={`mailto:${contact.email}`} className="block py-1 break-all text-nr-text/70 hover:text-nr-text">
                {contact.email}
              </a>
              <p className="py-1 text-nr-accent">{contact.hashtag}</p>
            </div>
          </div>
        </div>
        <p aria-hidden="true" className="mt-16 text-center text-[27vw] leading-[0.8] font-semibold tracking-[-0.06em] text-nr-raised select-none md:text-[24vw]">
          urban
        </p>
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between border-t border-white/10 px-5 pt-6 pb-24 text-xs text-nr-muted md:px-10">
        <span>© {new Date().getFullYear()} Urban Coffee Studio</span>
        <span>Roastery + Kitchen</span>
      </div>
    </footer>
  )
}

export default function NoirSite() {
  return (
    <div className="min-h-screen bg-nr-bg font-tight text-nr-text antialiased selection:bg-nr-accent selection:text-nr-bg">
      <Nav />
      <main>
        <Hero />
        <Statement />
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
