import { useEffect, useState } from 'react'
import { contact } from '../../content/events'
import Hero from './Hero'
import MenuReel from './MenuReel'
import { Events, Space, Visit } from './Sections'
import { Label, LogoMark, T } from './ui'

const links = [
  ['#reel', 'Menu'],
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'bg-rl-bg/85 backdrop-blur-xl' : ''}`}>
      <nav className="flex h-18 items-center justify-between px-5 md:px-10">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <span className="text-lg tracking-[-0.02em]">
            <span className="font-light">Urban</span>
            <span className="font-bold">Coffee</span>
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-sm font-light text-rl-white/70 transition hover:text-rl-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="text-sm font-medium md:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul className="px-5 pb-6 md:hidden">
          {links.map(([href, label]) => (
            <li key={href} className="border-b border-white/10">
              <a href={href} onClick={() => setOpen(false)} className={`block py-4 ${T.h2}`}>
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
    <footer className="border-t border-white/10 px-5 pt-16 pb-28 md:px-10">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div className="flex items-center gap-5">
          <LogoMark className="h-16 w-16" />
          <p className={`${T.h3} max-w-sm`}>{contact.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-light text-rl-muted">
          <a href={`mailto:${contact.email}`} className="hover:text-rl-white">
            {contact.email}
          </a>
          <span>{contact.city}</span>
          <span className="font-semibold text-rl-white">{contact.hashtag}</span>
        </div>
      </div>
      <Label className="mt-12">© {new Date().getFullYear()} Urban Coffee Studio · Roastery + Kitchen</Label>
    </footer>
  )
}

export default function ReelSite() {
  return (
    <div className="min-h-screen bg-rl-bg font-sora text-rl-white antialiased selection:bg-rl-white selection:text-black">
      <Nav />
      <main>
        <Hero />
        <MenuReel />
        <Events />
        <Space />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
