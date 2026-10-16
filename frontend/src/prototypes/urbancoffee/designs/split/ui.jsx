import { Bird } from '../shared'

export { Bird, Reveal } from '../shared'

/*
 * One typeface (Manrope), one scale — every text style comes from here.
 * Palette is strictly the logo's: black, white, and greys between.
 */
export const T = {
  hero: 'text-[clamp(3rem,6vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.04em]',
  h2: 'text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.03em]',
  h3: 'text-xl leading-snug font-bold tracking-[-0.01em]',
  body: 'text-base leading-relaxed font-normal',
  small: 'text-sm leading-relaxed font-normal',
  label: 'text-[11px] font-bold tracking-[0.2em] uppercase',
}

/* The logo, exactly: white pigeon on black */
export function LogoMark({ className = 'h-10 w-10', inverted = false }) {
  return (
    <span className={`grid shrink-0 place-items-center ${inverted ? 'bg-sp-white' : 'bg-sp-black'} ${className}`} aria-hidden="true">
      <Bird className={`h-[62%] w-[62%] translate-x-[2%] ${inverted ? 'text-sp-black' : 'text-sp-white'}`} />
    </span>
  )
}

export function Label({ children, className = '' }) {
  return <p className={`${T.label} ${className}`}>{children}</p>
}

export function Rule({ className = '' }) {
  return <hr className={`border-0 border-t border-current opacity-15 ${className}`} />
}

export const peso = (n) => `₱${n}`
