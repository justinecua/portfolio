import { useEffect, useState } from 'react'
import { contact } from '../../content/events'
import { EventList, MatchaGrid, MenuList, SpaceGrid, VisitInfo, Welcome } from './Sections'
import { Label, LogoMark, T } from './ui'

const links = [
  ['#menu', 'Menu'],
  ['#matcha', 'Matcha'],
  ['#events', 'Events'],
  ['#space', 'Space'],
  ['#visit', 'Visit'],
]

function Brand({ size = 'h-12 w-12' }) {
  return (
    <a href="#welcome" className="flex items-center gap-3">
      <LogoMark className={`${size} ring-1 ring-white/15`} />
      <span className="text-lg">
        <span className="font-light">Urban</span>
        <span className="font-extrabold">Coffee</span>
      </span>
    </a>
  )
}

/* The black half of a split section. Sticks while its content scrolls past on the right. */
function Panel({ n, title, blurb, children }) {
  return (
    <aside className="sticky top-0 hidden h-screen flex-col justify-between bg-sp-black p-10 text-sp-white lg:flex xl:p-14">
      <Brand />
      <div>
        <Label className="text-sp-gray">{n}</Label>
        <h2 className={`${T.hero} mt-4 max-w-xl`}>{title}</h2>
        <p className={`${T.body} mt-6 max-w-sm text-sp-white/60`}>{blurb}</p>
      </div>
      <div className="pb-14">{children}</div>
    </aside>
  )
}

function PanelLinks() {
  return (
    <nav aria-label="Sections">
      <ul className="grid grid-cols-3 gap-x-6 gap-y-2">
        {links.map(([href, label]) => (
          <li key={href}>
            <a href={href} className="flex items-center gap-2 py-1 text-sm text-sp-white/55 transition hover:text-sp-white">
              <span className="h-px w-3 bg-sp-white/40" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* Top bar: always on mobile; on desktop only while the full-width sections are on screen */
function TopBar({ show }) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-sp-black text-sp-white transition-transform duration-300 ${show ? 'translate-y-0' : 'lg:-translate-y-full'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-12">
        <Brand size="h-9 w-9" />
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex gap-8">
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-sm text-sp-white/60 transition hover:text-sp-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Label className="text-sp-gray md:hidden">{contact.city}</Label>
      </div>
    </header>
  )
}

export default function SplitSite() {
  const [showBar, setShowBar] = useState(false)

  // Show the desktop top bar only between the two split sections
  useEffect(() => {
    const onScroll = () => {
      const middle = document.getElementById('middle')
      if (!middle) return
      const r = middle.getBoundingClientRect()
      setShowBar(r.top < 80 && r.bottom > 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-sp-white pt-[60px] font-manrope text-sp-ink antialiased selection:bg-sp-black selection:text-sp-white lg:pt-0">
      <TopBar show={showBar} />

      {/* Split 1 - welcome */}
      <section id="welcome" className="lg:grid lg:grid-cols-2">
        <Panel n="00" title="Wherever life takes you, there will always be an Urban." blurb={`Roastery + Kitchen · ${contact.city}`}>
          <PanelLinks />
        </Panel>
        <Welcome />
      </section>

      {/* Full width - no split */}
      <div id="middle">
        <section id="menu" className="scroll-mt-16">
          <MenuList />
        </section>
        <section id="matcha" className="scroll-mt-16 bg-[#ededea]">
          <MatchaGrid />
        </section>
        <section id="events" className="scroll-mt-16">
          <EventList />
        </section>
        <section id="space" className="scroll-mt-16 bg-[#ededea]">
          <SpaceGrid />
        </section>
      </div>

      {/* Split 2 - visit */}
      <section id="visit" className="scroll-mt-16 lg:grid lg:grid-cols-2 lg:scroll-mt-0">
        <Panel n="05" title="Come through." blurb="Tibanga and Diocesan, both in Iligan City. Look for the white bird.">
          <a href={`mailto:${contact.email}`} className="text-sm font-bold underline underline-offset-4">
            {contact.email}
          </a>
        </Panel>
        <div className="pb-20 lg:pb-24">
          <VisitInfo />
        </div>
      </section>
    </div>
  )
}
