import { Bird, Mono, O } from './ui'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
      <div className="rule-double border-b border-ink" />
      <p aria-hidden="true" className="py-4 text-center font-serif text-[clamp(3rem,15.5vw,14.5rem)] leading-[0.95] tracking-[-0.02em] whitespace-nowrap select-none">
        Urban C<O points={8} />ffee
      </p>
      <p className="pb-8 text-center font-serif text-2xl italic md:text-4xl">
        Wherever life takes you, there will always be an <span className="text-urban">Urban</span>.
      </p>
      <div className="grid gap-6 border-t border-ink pt-6 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <Bird className="h-10 w-10" />
          <Mono className="leading-relaxed text-ink/60">Roastery + Kitchen<br />Tibanga Branch</Mono>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 md:justify-center">
          {[
            ['#studio', 'Studio'],
            ['#menu', 'Prices'],
            ['#kitchen', 'Kitchen'],
            ['#market', 'Market'],
            ['#visit', 'Visit'],
          ].map(([href, l]) => (
            <a key={href} href={href} className="font-mono text-[11px] tracking-[0.15em] uppercase hover:text-urban">
              {l}
            </a>
          ))}
        </nav>
        <Mono className="text-ink/60 md:text-right">
          © {new Date().getFullYear()} Urban Coffee Studio
          <br />
          Printed on recycled pixels
        </Mono>
      </div>
    </footer>
  )
}
