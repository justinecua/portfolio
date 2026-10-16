import trio from '../../assets/matcha-trio.jpg'
import harbor from '../../assets/harbor-matcha.jpg'
import ube from '../../assets/ube-matcha-scoop.jpg'
import strawberry from '../../assets/ube-strawberry-matcha.jpg'
import { menu } from '../../content/menu'
import { Label, Pair, Reveal, T, peso } from './ui'

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
  return (
    <section id="matcha" className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="rounded-[2rem] bg-ch-matcha-deep/40 p-5 ring-1 ring-ch-matcha/15 md:p-10">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Label className="text-ch-matcha">The Pigeon series</Label>
            <Pair light="Pigeon" bold="Matcha" className="mt-3" />
          </div>
          <p className={`${T.body} max-w-sm text-ch-text/70`}>Seven drinks, each named after how a pigeon moves through the city.</p>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {drinks.map((d, i) => (
            <Reveal as="li" key={d.name} delay={(i % 4) * 70} className={i === 0 ? 'sm:col-span-2' : ''}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-ch-card ring-1 ring-white/[0.06]">
                <div className="overflow-hidden">
                  <img
                    src={photos[d.name][0]}
                    alt={`${d.name} matcha`}
                    style={{ objectPosition: photos[d.name][1] }}
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 ? 'aspect-[4/3] sm:aspect-[8/3]' : 'aspect-[4/3]'}`}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className={`${T.h3} font-extrabold`}>
                      {d.name}
                      {d.alt && <span className="ml-2 text-base font-light text-ch-muted">{d.alt}</span>}
                    </p>
                    <span className="text-base font-extrabold text-ch-matcha tabular-nums">{peso(d.price)}</span>
                  </div>
                  <p className={`${T.small} mt-1.5 text-ch-muted`}>{d.note}</p>
                  {d.tag && <span className="mt-3 inline-block rounded-full bg-ch-matcha px-2.5 py-0.5 text-[11px] font-bold text-ch-bg">{d.tag}</span>}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
