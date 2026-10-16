import { useEffect, useRef } from 'react'
import bird from '../assets/bird.png'

/* Hand-cut six/eight point star, lifted from the Pop Art Market posters */
export function Star({ points = 6, className = '' }) {
  const inner = points > 6 ? 14 : 18
  const d = Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : inner
    const a = (Math.PI / points) * i - Math.PI / 2
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`
  }).join(' ')
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <polygon points={d} fill="currentColor" />
    </svg>
  )
}

/* Bird mark, used as an alpha mask so it takes on currentColor. */
export function Bird({ className = '' }) {
  const mask = {
    maskImage: `url(${bird})`,
    WebkitMaskImage: `url(${bird})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  }
  return <span aria-hidden="true" className={`inline-block bg-current ${className}`} style={mask} />
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}
