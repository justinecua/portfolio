import { useEffect, useRef, useState } from 'react'
import latte from '../../assets/iced-latte-blue.jpg'
import matchaShot from '../../assets/ube-matcha-closeup.jpg'
import bowl from '../../assets/bowl-top.jpg'
import toast from '../../assets/biscoff-french-toast.jpg'
import { menu } from '../../content/menu'
import { Label, T, peso } from './ui'

// One panel per category, in reel order. `pos` crops out text overlaid on the original posts.
const covers = {
  coffee: [latte, '50% 30%', 'Spanish Latte'],
  matcha: [matchaShot, '50% 0%', 'Pigeon Matcha', 'origin-top scale-[1.3]'],
  kitchen: [bowl, '50% 60%', 'Teriyaki Chicken Bowl'],
  sweets: [toast, '50% 55%', 'Biscoff French Toast'],
}

/* Scroll progress (0–1) through a tall section, and whether the sideways reel is active */
function useReel(ref) {
  const [progress, setProgress] = useState(0)
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 1024px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => setWide(mq.matches)
    mq.addEventListener('change', onMq)

    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      mq.removeEventListener('change', onMq)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  return { progress, wide }
}

function Panel({ cat, i, count }) {
  const [src, pos, cap, zoom = ''] = covers[cat.key]
  return (
    <article className="flex w-full shrink-0 flex-col gap-8 px-5 py-12 md:px-10 lg:h-full lg:w-screen lg:flex-row lg:items-center lg:gap-14 lg:py-0">
      <figure className="relative lg:h-[72vh] lg:w-[42%] lg:shrink-0">
        <div className="overflow-hidden rounded-[2rem] lg:h-full">
          <img src={src} alt={cap} style={{ objectPosition: pos }} className={`aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full ${zoom}`} />
        </div>
        <figcaption className="absolute bottom-5 left-5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium backdrop-blur">{cap}</figcaption>
      </figure>

      <div className="min-w-0 flex-1 lg:max-h-[72vh] lg:overflow-y-auto lg:pr-4">
        <Label>
          {String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </Label>
        <h3 className={`${T.h1} mt-3`}>{cat.label}</h3>
        <ul className="mt-8 border-t border-white/10">
          {cat.items.map((item) => (
            <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4">
              <div>
                <p className="text-lg font-semibold tracking-[-0.01em]">
                  {item.name}
                  {item.alt && <span className="ml-2 text-sm font-light text-rl-muted">{item.alt}</span>}
                  {item.tag && <span className="ml-2 rounded-full bg-rl-white px-2 py-0.5 align-middle text-[10px] font-semibold text-black uppercase">{item.tag}</span>}
                </p>
                <p className={`${T.small} text-rl-muted`}>{item.note}</p>
              </div>
              <span className="text-lg font-semibold tabular-nums">{peso(item.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function MenuReel() {
  const ref = useRef(null)
  const { progress, wide } = useReel(ref)
  const n = menu.length
  const active = Math.min(n - 1, Math.round(progress * (n - 1)))

  return (
    <section id="reel" ref={ref} className="relative" style={wide ? { height: `${n * 100}vh` } : undefined}>
      <div className={wide ? 'sticky top-0 flex h-screen flex-col overflow-hidden' : ''}>
        {/* Reel header: title, category ticks, progress */}
        <div className="flex items-end justify-between gap-6 px-5 pt-24 md:px-10">
          <div>
            <Label>01 — Menu</Label>
            <p className={`${T.h3} mt-2`}>What we&rsquo;re pouring</p>
          </div>
          {wide && (
            <ol className="flex gap-6">
              {menu.map((c, i) => (
                <li key={c.key} className={`text-sm transition ${i === active ? 'font-semibold text-rl-white' : 'font-light text-rl-muted'}`}>
                  {c.label}
                </li>
              ))}
            </ol>
          )}
        </div>
        {wide && (
          <div className="mx-5 mt-4 h-px bg-white/10 md:mx-10">
            <div className="h-px bg-rl-white" style={{ width: `${progress * 100}%` }} />
          </div>
        )}

        {/* Track */}
        <div
          className={wide ? 'flex flex-1 will-change-transform' : 'divide-y divide-white/10'}
          style={wide ? { transform: `translateX(-${progress * (n - 1) * 100}vw)` } : undefined}
        >
          {menu.map((c, i) => (
            <Panel key={c.key} cat={c} i={i} count={n} />
          ))}
        </div>
      </div>
    </section>
  )
}
