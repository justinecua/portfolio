import { useEffect, useState } from 'react'
import { contact } from '../../content/events'
import Bento from './Bento'
import Menu from './Menu'
import Matcha from './Matcha'
import Events from './Events'
import { Gallery, Visit } from './Visit'
import { Label, LogoMark, T, Wordmark } from './ui'

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-300 ${
          scrolled || open ? 'bg-ch-card/85 ring-1 ring-white/[0.08] backdrop-blur-xl' : ''
        }`}
      >
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-2 text-xl">
          <LogoMark className="h-9 w-9" />
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-4 py-2 text-sm font-medium text-ch-muted transition hover:bg-white/[0.06] hover:text-ch-text">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#visit" className="hidden rounded-full bg-ch-matcha px-5 py-2.5 text-sm font-bold text-ch-bg transition hover:bg-ch-text md:inline-block">
          Visit us
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-full bg-white/[0.08] px-4 py-2 text-sm font-bold md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul className="mx-auto mt-2 max-w-7xl rounded-3xl bg-ch-card p-2 ring-1 ring-white/[0.08] md:hidden">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className={`block rounded-2xl px-4 py-3 ${T.h3} font-bold hover:bg-white/[0.05]`}>
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
    <footer className="mx-auto max-w-7xl px-4 pb-28 md:px-6">
      <div className="rounded-[2rem] bg-ch-card p-8 ring-1 ring-white/[0.06] md:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <LogoMark className="mb-6 h-16 w-16" />
            <Wordmark className="text-[clamp(2.75rem,7vw,5.5rem)] leading-none" />
            <p className={`${T.body} mt-4 max-w-sm text-ch-muted`}>{contact.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <Label className="mb-3">Explore</Label>
              {links.map(([href, label]) => (
                <a key={href} href={href} className="block py-1 font-medium text-ch-text/75 hover:text-ch-text">
                  {label}
                </a>
              ))}
            </div>
            <div>
              <Label className="mb-3">Contact</Label>
              <a href={`mailto:${contact.email}`} className="block py-1 font-medium break-all text-ch-text/75 hover:text-ch-text">
                {contact.email}
              </a>
              <p className="py-1 font-medium text-ch-text/75">{contact.city}</p>
              <p className="py-1 font-bold text-ch-matcha">{contact.hashtag}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-white/[0.08] pt-6 text-xs text-ch-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Urban Coffee Studio</span>
          <span>Roastery + Kitchen · Tibanga · Diocesan</span>
        </div>
      </div>
    </footer>
  )
}

export default function CharcoalSite() {
  return (
    <div className="min-h-screen bg-ch-bg font-urbanist text-ch-text antialiased selection:bg-ch-matcha selection:text-ch-bg">
      <Nav />
      <main>
        <Bento />
        <Menu />
        <Matcha />
        <Events />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
