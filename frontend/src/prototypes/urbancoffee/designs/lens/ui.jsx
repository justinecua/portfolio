import { useEffect, useState } from 'react'
import { Bird } from '../shared'

export { Bird, Reveal } from '../shared'

/*
 * One typeface (Geist), one scale - every text style comes from here.
 * Palette is the logo's: black and white, with greys between.
 */
export const T = {
  display: 'text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.05em]',
  h2: 'text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.04em]',
  h3: 'text-xl leading-snug font-medium tracking-[-0.02em]',
  body: 'text-base leading-relaxed font-light',
  small: 'text-sm leading-relaxed font-light',
  label: 'text-[11px] font-medium tracking-[0.2em] uppercase',
}

/* The logo, exactly: white pigeon on black */
export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-md bg-black ring-1 ring-white/20 ${className}`} aria-hidden="true">
      <Bird className="h-[62%] w-[62%] translate-x-[2%] text-white" />
    </span>
  )
}

export function Label({ children, className = '' }) {
  return <p className={`${T.label} text-ln-muted ${className}`}>{children}</p>
}

/* 0 → 1 progress of an element moving through the viewport (or through its own height when `pinned`) */
export function useProgress(ref, pinned = false) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const v = pinned ? -r.top / (el.offsetHeight - vh) : (vh - r.top) / (vh + r.height)
      setP(Math.min(1, Math.max(0, v)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, pinned])
  return p
}

export const peso = (n) => `₱${n}`
