import { useEffect, useState } from 'react'
import { Bird } from './ui'

const links = [
  { href: '#studio', label: 'The Studio' },
  { href: '#menu', label: 'Price List' },
  { href: '#kitchen', label: 'Kitchen' },
  { href: '#market', label: 'Pop Art Market' },
  { href: '#visit', label: 'Visit' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`sticky top-0 z-50 border-b border-ink bg-paper transition-shadow ${scrolled ? 'shadow-[0_6px_0_-3px_rgb(21_19_17/0.08)]' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#top" onClick={() => setOpen(false)} className="flex items-center gap-2">
          <Bird className="h-8 w-8" />
          <span className="font-serif text-2xl leading-none">
            Urban <span className="italic">Coffee</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-mono text-[11px] tracking-[0.15em] uppercase decoration-urban decoration-2 underline-offset-4 hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#visit"
          className="hidden border border-ink bg-ink px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-paper uppercase transition hover:bg-urban hover:border-urban lg:inline-block"
        >
          Find us →
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="border border-ink px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div className={`fixed inset-x-0 top-16 bottom-0 bg-paper transition-all duration-300 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <ol className="px-5 pt-4">
          {links.map((l, i) => (
            <li key={l.href} className="border-b border-ink/25">
              <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-5">
                <span className="font-mono text-xs text-urban">{String.fromCharCode(65 + i)}</span>
                <span className="font-serif text-5xl">{l.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </header>
  )
}
