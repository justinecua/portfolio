import { useEffect, useRef, useState } from 'react'
import { Label, T } from './ui'

const text =
  'Urban started with a roaster and a counter. Then came the kitchen, the second floor, the murals, and the late nights. Somewhere along the way it became a home for the people who make things — and the people who just came for an iced latte.'

const words = text.split(' ')

/* Words brighten as the paragraph scrolls through the viewport */
export default function Statement() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.35)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const lit = Math.round(progress * words.length)

  return (
    <section id="story" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-8 md:grid-cols-12">
        <Label className="md:col-span-3">Our story</Label>
        <p ref={ref} className={`${T.lead} md:col-span-9`}>
          {words.map((w, i) => (
            <span key={i} className={`transition-colors duration-300 ${i < lit ? 'text-nr-text' : 'text-nr-text/15'}`}>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
