import { Bird } from '../shared'

export { Bird, Reveal } from '../shared'

/*
 * One typeface (Sora), one scale - every text style comes from here.
 * Palette is the logo's: black and white, with greys between.
 */
export const T = {
  mega: 'text-[24vw] leading-[0.8] font-extrabold tracking-[-0.06em]',
  h1: 'text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.045em]',
  h2: 'text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.04em]',
  h3: 'text-xl leading-snug font-semibold tracking-[-0.02em]',
  body: 'text-base leading-relaxed font-light',
  small: 'text-sm leading-relaxed font-light',
  label: 'text-[11px] font-medium tracking-[0.25em] uppercase',
}

/* The logo, exactly: white pigeon on black */
export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-black ring-1 ring-white/20 ${className}`} aria-hidden="true">
      <Bird className="h-[58%] w-[58%] translate-x-[2%] text-white" />
    </span>
  )
}

export function Label({ children, className = '' }) {
  return <p className={`${T.label} text-rl-muted ${className}`}>{children}</p>
}

export function SectionHead({ n, title, aside }) {
  return (
    <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end">
      <div>
        <Label>{n}</Label>
        <h2 className={`${T.h2} mt-4`}>{title}</h2>
      </div>
      {aside && <div className={`${T.small} max-w-xs text-rl-muted`}>{aside}</div>}
    </div>
  )
}

export const peso = (n) => `₱${n}`
