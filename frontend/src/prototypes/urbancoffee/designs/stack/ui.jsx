import { useEffect, useRef, useState } from 'react'
import { Bird } from '../shared'

export { Bird, Reveal } from '../shared'

/*
 * One typeface (Plus Jakarta Sans), one scale — every text style comes from here.
 * Palette is the logo's: black and white, with greys between.
 */
export const T = {
  hero: 'text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.9] font-extrabold tracking-[-0.045em]',
  h2: 'text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em]',
  h3: 'text-2xl leading-tight font-bold tracking-[-0.02em]',
  body: 'text-base leading-relaxed font-normal',
  small: 'text-sm leading-relaxed font-normal',
  label: 'text-[11px] font-semibold tracking-[0.22em] uppercase',
}

/* The logo, exactly: white pigeon on black */
export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl bg-black ring-1 ring-white/15 ${className}`} aria-hidden="true">
      <Bird className="h-[62%] w-[62%] translate-x-[2%] text-white" />
    </span>
  )
}

export function Label({ children, className = '' }) {
  return <p className={`${T.label} text-st-muted ${className}`}>{children}</p>
}

/*
 * A stacking card: sticky to the top, so the next card slides up over it.
 * `light` flips it to the logo's inverse (white card, black text).
 */
export function StackCard({ id, n, label, title, light = false, children }) {
  // Cards taller than the screen stick by their bottom edge, so all their content scrolls into view first
  const ref = useRef(null)
  const [top, setTop] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section ref={ref} id={id} style={{ top }} className="sticky scroll-mt-0 pt-3 md:pt-4">
      <div
        className={`min-h-[calc(100svh-1rem)] rounded-t-[2rem] px-5 pt-24 pb-24 shadow-[0_-20px_60px_rgb(0_0_0/0.6)] md:rounded-t-[3rem] md:px-12 md:pt-28 ${
          light ? 'bg-st-white text-black' : 'bg-st-card text-st-white ring-1 ring-white/[0.06]'
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className={`flex items-center justify-between border-b pb-4 ${light ? 'border-black/15' : 'border-white/10'}`}>
            <Label className={light ? 'text-black/50' : ''}>{label}</Label>
            <Label className={light ? 'text-black/50' : ''}>{n}</Label>
          </div>
          <h2 className={`${T.h2} mt-8 md:mt-10`}>{title}</h2>
          <div className="mt-10 md:mt-14">{children}</div>
        </div>
      </div>
    </section>
  )
}

export const peso = (n) => `₱${n}`
