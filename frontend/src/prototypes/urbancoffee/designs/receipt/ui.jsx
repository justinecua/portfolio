import { Bird } from '../shared'

export { Bird, Reveal } from '../shared'

/*
 * One typeface (IBM Plex Mono), one scale - every text style comes from here.
 * Palette is the logo's: black and white (receipt paper is a warm off-white).
 */
export const T = {
  mega: 'text-[clamp(4rem,15vw,13rem)] leading-[0.85] font-bold tracking-[-0.06em]',
  h2: 'text-[clamp(2rem,4.5vw,3.75rem)] leading-[1] font-semibold tracking-[-0.04em]',
  h3: 'text-lg leading-snug font-semibold tracking-[-0.01em]',
  body: 'text-[15px] leading-relaxed font-normal',
  small: 'text-[13px] leading-relaxed font-normal',
  tiny: 'text-[11px] leading-relaxed tracking-[0.12em] uppercase',
}

/* The logo, exactly: white pigeon on black */
export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <span className={`grid shrink-0 place-items-center bg-black ${className}`} aria-hidden="true">
      <Bird className="h-[62%] w-[62%] translate-x-[2%] text-white" />
    </span>
  )
}

/* Name ........ price */
export function Line({ left, right, className = '' }) {
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="min-w-0">{left}</span>
      <span className="mb-[0.3em] min-w-3 flex-1 border-b border-dotted border-current opacity-40" />
      <span className="shrink-0 tabular-nums">{right}</span>
    </div>
  )
}

export function Dashed({ className = '' }) {
  return <div className={`border-t border-dashed border-current opacity-40 ${className}`} />
}

/* Receipt paper with a torn zig-zag bottom edge */
const tear = {
  WebkitMask: 'conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 14px 100%',
  mask: 'conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 14px 100%',
}

export function Paper({ children, className = '' }) {
  return (
    <div style={tear} className={`bg-rc-paper px-6 pt-7 pb-10 text-black ${className}`}>
      {children}
    </div>
  )
}

/* Decorative barcode, generated from a string so each receipt's is different */
export function Barcode({ seed = 'urban', className = '' }) {
  const bars = Array.from({ length: 46 }, (_, i) => {
    const c = seed.charCodeAt(i % seed.length) + i * 7
    return { w: (c % 3) + 1, gap: ((c >> 2) % 2) + 1 }
  })
  return (
    <div className={`flex h-10 items-stretch ${className}`} aria-hidden="true">
      {bars.map((b, i) => (
        <span key={i} className="bg-black" style={{ width: b.w, marginRight: b.gap }} />
      ))}
    </div>
  )
}

export function Tag({ children, inverted = false }) {
  return (
    <span className={`inline-block px-1.5 py-px text-[10px] font-semibold tracking-wider uppercase ${inverted ? 'bg-rc-white text-black' : 'bg-black text-rc-paper'}`}>
      {children}
    </span>
  )
}

export const peso = (n) => `₱${n.toFixed(2)}`
