export { Bird, Reveal } from '../shared'

/*
 * One typeface (Inter Tight), one scale. Every text style in this design comes from here.
 * Emphasis comes from weight + colour (light, warm accent) - never a second font.
 */
export const T = {
  display: 'text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.88] font-medium tracking-[-0.045em]',
  h2: 'text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.035em]',
  lead: 'text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.12] font-medium tracking-[-0.025em]',
  quote: 'text-3xl leading-tight font-light tracking-[-0.02em]',
}

export function Label({ children, className = '' }) {
  return <p className={`text-[11px] font-medium tracking-[0.22em] text-nr-muted uppercase ${className}`}>{children}</p>
}

/* Section header: index number, label, then a big tight headline with an optional light accent */
export function Head({ n, label, children, aside, className = '' }) {
  return (
    <div className={`grid gap-8 border-t border-white/10 pt-6 md:grid-cols-12 ${className}`}>
      <div className="flex gap-6 md:col-span-3">
        <span className="text-[11px] font-medium text-nr-accent">{n}</span>
        <Label>{label}</Label>
      </div>
      <h2 className={`${T.h2} md:col-span-6`}>{children}</h2>
      {aside && <div className="text-nr-muted md:col-span-3 md:self-end">{aside}</div>}
    </div>
  )
}

export function Accent({ children }) {
  return <span className="font-light text-nr-accent">{children}</span>
}

export function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

export const peso = (n) => `₱${n}`
