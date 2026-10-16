import { useState } from 'react'
import { contact } from '../../content/events'
import { Events, Hero, Menu, Space, Visit } from './Sections'
import { Barcode, LogoMark, T } from './ui'

const links = [
  ['#menu', 'Menu'],
  ['#events', 'Events'],
  ['#space', 'Space'],
  ['#visit', 'Visit'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rc-white/15 bg-rc-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <LogoMark className="h-9 w-9 ring-1 ring-rc-white/20" />
          <span className="text-sm font-semibold">urban_coffee</span>
        </a>
        <ul className="hidden gap-8 text-sm md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-rc-white/60 transition hover:text-rc-white">
                /{label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="text-sm md:hidden">
          {open ? '[ close ]' : '[ menu ]'}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-rc-white/15 px-5 py-3 md:hidden">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className={`block py-3 ${T.h3}`}>
                /{label.toLowerCase()}
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
    <footer className="mx-auto max-w-7xl px-5 pt-10 pb-24 md:px-10">
      <div className="border-t border-rc-white/20 pt-10">
        <p className={`${T.h2} max-w-3xl`}>{contact.tagline}</p>
        <div className={`${T.small} mt-10 flex flex-col justify-between gap-4 text-rc-muted md:flex-row`}>
          <a href={`mailto:${contact.email}`} className="hover:text-rc-white">
            {contact.email}
          </a>
          <span>{contact.city} · Tibanga · Diocesan</span>
          <span className="text-rc-white">{contact.hashtag}</span>
        </div>
        <div className="mt-10 bg-rc-paper p-4">
          <Barcode seed="wherever life takes you" className="justify-center" />
        </div>
        <p className={`${T.tiny} mt-3 text-center text-rc-muted`}>© {new Date().getFullYear()} Urban Coffee Studio · Thank you, come again</p>
      </div>
    </footer>
  )
}

export default function ReceiptSite() {
  return (
    <div className="min-h-screen bg-rc-bg font-plex text-rc-white antialiased selection:bg-rc-white selection:text-black">
      <Nav />
      <main>
        <Hero />
        <Menu />
        <Events />
        <Space />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
