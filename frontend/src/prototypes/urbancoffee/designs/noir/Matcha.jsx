import { useRef } from 'react'
import trio from '../../assets/matcha-trio.jpg'
import harbor from '../../assets/harbor-matcha.jpg'
import ube from '../../assets/ube-matcha-scoop.jpg'
import strawberry from '../../assets/ube-strawberry-matcha.jpg'
import { menu } from '../../content/menu'
import { Accent, Head, Label, Reveal, peso } from './ui'

// 4:3 crops anchored to keep each post's overlaid text out of frame
const photos = {
  Soar: [trio, '50% 100%'],
  Glide: [trio, '10% 100%'],
  Perch: [trio, '90% 100%'],
  Harbor: [harbor, '50% 100%'],
  Haven: [trio, '30% 100%'],
  'Ube Cheese Pudding': [ube, '50% 0%'],
  'Strawberry Matcha': [strawberry, '60% 100%'],
}

const drinks = menu.find((c) => c.key === 'matcha').items

export default function Matcha() {
  const track = useRef(null)
  const scroll = (dir) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section id="matcha" className="bg-nr-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Reveal>
          <Head
            n="02"
            label="Pigeon Matcha"
            aside={
              <div className="flex gap-2 md:justify-end">
                {[-1, 1].map((d) => (
                  <button
                    key={d}
                    onClick={() => scroll(d)}
                    aria-label={d < 0 ? 'Previous drinks' : 'Next drinks'}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-nr-text transition hover:bg-nr-text hover:text-nr-bg"
                  >
                    {d < 0 ? '←' : '→'}
                  </button>
                ))}
              </div>
            }
          >
            Seven ways <Accent>to fly</Accent>
          </Head>
        </Reveal>
      </div>

      <div
        ref={track}
        className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] md:mt-20 md:gap-6 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {drinks.map((d, i) => (
          <article key={d.name} className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[24rem]">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={photos[d.name][0]}
                alt={`${d.name} matcha`}
                style={{ objectPosition: photos[d.name][1] }}
                className="aspect-[4/3] w-full object-cover transition duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <Label>
                  {String(i + 1).padStart(2, '0')} {d.alt && `· ${d.alt}`}
                </Label>
                <h3 className="mt-2 text-3xl font-medium tracking-[-0.02em]">
                  {d.name}
                  {d.tag && <span className="ml-3 align-middle text-[10px] font-semibold tracking-[0.2em] text-nr-accent uppercase">{d.tag}</span>}
                </h3>
              </div>
              <span className="pt-6 text-lg font-medium tabular-nums">{peso(d.price)}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-nr-muted">{d.note}</p>
          </article>
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>
    </section>
  )
}
