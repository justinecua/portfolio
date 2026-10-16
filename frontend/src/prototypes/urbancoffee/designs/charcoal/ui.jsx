import { Bird } from '../shared'

export { Bird, Reveal } from '../shared'

/* Urban's logo as-is: white pigeon on a black square */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-[22%] bg-black ring-1 ring-white/10 ${className}`} aria-hidden="true">
      <Bird className="h-[62%] w-[62%] translate-x-[2%] text-white" />
    </span>
  )
}

/*
 * One typeface (Urbanist), one scale. Every text style in this design comes from here,
 * so weights and sizes stay consistent section to section.
 * Contrast comes from weight — light vs. extra-bold — the way the UrbanCoffee wordmark does it.
 */
export const T = {
  display: 'text-[clamp(3rem,7.5vw,6.75rem)] leading-[0.95] tracking-[-0.03em]',
  h2: 'text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1] tracking-[-0.025em]',
  h3: 'text-2xl leading-tight tracking-[-0.01em]',
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-relaxed',
  label: 'text-xs font-semibold tracking-[0.18em] uppercase',
}

/* "Light Bold" headline pairing, e.g. <Pair light="What we" bold="serve" /> */
export function Pair({ light, bold, as: Tag = 'h2', size = T.h2, className = '' }) {
  return (
    <Tag className={`${size} ${className}`}>
      <span className="font-light">{light}</span> <span className="font-extrabold">{bold}</span>
    </Tag>
  )
}

export function Label({ children, className = '' }) {
  return <p className={`${T.label} text-ch-muted ${className}`}>{children}</p>
}

export function Card({ children, className = '' }) {
  return <div className={`rounded-3xl bg-ch-card ring-1 ring-white/[0.06] ${className}`}>{children}</div>
}

export function Wordmark({ className = '' }) {
  return (
    <span className={`tracking-[-0.02em] ${className}`}>
      <span className="font-light">Urban</span>
      <span className="font-extrabold">Coffee</span>
    </span>
  )
}

export function Btn({ href, children, primary = false, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
        primary ? 'bg-ch-matcha text-ch-bg hover:bg-ch-text' : 'bg-white/[0.06] text-ch-text ring-1 ring-white/10 hover:bg-white/[0.12]'
      } ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

// Placeholder opening hours (24h) — mirrors content/branches.js, confirm with the client.
const HOURS = { 0: [7, 24], 1: [7, 23], 2: [7, 23], 3: [7, 23], 4: [7, 23], 5: [7, 24], 6: [7, 24] }
const fmt = (x) => (x === 24 ? '12 MN' : x > 12 ? `${x - 12} PM` : `${x} AM`)

export function openStatus(now = new Date()) {
  const [open, close] = HOURS[now.getDay()]
  const h = now.getHours() + now.getMinutes() / 60
  return h >= open && h < close ? { on: true, text: 'Open now', sub: `Until ${fmt(close)}` } : { on: false, text: 'Closed', sub: `Opens ${fmt(open)}` }
}

export const peso = (n) => `₱${n}`
