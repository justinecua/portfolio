import interior from '../../assets/interior.webp'
import reading from '../../assets/reading-corner.jpg'
import team from '../../assets/team-polaroid.jpg'
import pour from '../../assets/french-toast-pour.jpg'
import ube from '../../assets/ube-matcha-closeup.jpg'
import salmonCoffee from '../../assets/salmon-bowl-coffee.jpg'
import katsu from '../../assets/katsu-bowl.jpg'
import salad from '../../assets/caesar-salad-side.jpg'
import tibanga from '../../assets/storefront-dusk.jpg'
import diocesan from '../../assets/diocesan-branch.jpg'
import { branches, mapsUrl } from '../../content/branches'
import { contact } from '../../content/events'
import { Btn, Card, Label, LogoMark, Pair, Reveal, T } from './ui'

// Two rows scrolling in opposite directions. [src, objectPosition]
const rowA = [[interior, '50% 50%'], [pour, '50% 50%'], [reading, '30% 50%'], [salmonCoffee, '50% 50%'], [team, '50% 40%']]
const rowB = [[ube, '50% 0%'], [katsu, '50% 60%'], [salad, '50% 60%'], [interior, '20% 50%'], [pour, '50% 30%']]

function Row({ shots, reverse }) {
  const all = [...shots, ...shots]
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max animate-ticker gap-3 md:gap-4 ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {all.map(([src, pos], i) => (
          <img key={i} src={src} alt="" style={{ objectPosition: pos }} className="h-48 w-72 shrink-0 rounded-3xl object-cover md:h-64 md:w-96" />
        ))}
      </div>
    </div>
  )
}

export function Gallery() {
  return (
    <section id="space" className="py-8" aria-label="Inside Urban">
      <div className="mx-auto mb-10 max-w-7xl px-4 md:px-6">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <Pair light="The" bold="tambayan" />
          <p className={`${T.body} max-w-sm text-ch-muted`}>Freelancers, friends, and artists - two floors and a roof deck of them.</p>
        </Reveal>
      </div>
      <div className="space-y-3 md:space-y-4" aria-hidden="true">
        <Row shots={rowA} />
        <Row shots={rowB} reverse />
      </div>
    </section>
  )
}

const imgs = { tibanga: [tibanga, '50% 40%'], diocesan: [diocesan, '50% 0%'] }

export function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <Reveal>
        <Pair light="Come" bold="through" />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {branches.map((b, i) => (
          <Reveal key={b.key} delay={i * 100}>
            <Card className="overflow-hidden">
              <img src={imgs[b.key][0]} alt={`${b.name} branch`} style={{ objectPosition: imgs[b.key][1] }} className="aspect-[2/1] w-full object-cover" />
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className={`${T.h3} font-extrabold`}>{b.name}</p>
                  <Label className="text-ch-matcha">{b.tag}</Label>
                </div>
                <p className={`${T.small} mt-2 text-ch-muted`}>{b.note}</p>
                <dl className="mt-5 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {b.hours.map(([d, h]) => (
                    <div key={d} className="flex justify-between py-3 text-sm">
                      <dt className="font-semibold">{d}</dt>
                      <dd className="text-ch-muted tabular-nums">{h}</dd>
                    </div>
                  ))}
                </dl>
                <Btn href={mapsUrl(b.query)} target="_blank" rel="noreferrer" className="mt-6">
                  Get directions ↗
                </Btn>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <Card className="flex flex-col items-start justify-between gap-6 bg-ch-matcha p-8 text-ch-bg ring-0 md:flex-row md:items-center md:p-10">
          <div className="flex items-center gap-4">
            <LogoMark className="h-12 w-12" />
            <Pair light="Say" bold="hello" as="p" size={T.h3} />
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className="rounded-full bg-ch-bg px-6 py-3 text-sm font-bold text-ch-text transition hover:bg-ch-raised">
              {contact.email}
            </a>
            <a href={`mailto:${contact.hiring}`} className="rounded-full px-6 py-3 text-sm font-bold ring-1 ring-ch-bg/30 transition hover:bg-ch-bg/10">
              We&rsquo;re hiring
            </a>
          </div>
        </Card>
      </Reveal>
    </section>
  )
}
