import tambayan from '../../assets/tambayan-open.jpg'
import fiesta from '../../assets/fiesta-merkado.jpg'
import popart from '../../assets/pop-art-market.jpg'
import interior from '../../assets/interior.webp'
import reading from '../../assets/reading-corner.jpg'
import team from '../../assets/team-polaroid.jpg'
import night from '../../assets/storefront-night.webp'
import pour from '../../assets/french-toast-pour.jpg'
import tibanga from '../../assets/storefront-dusk.jpg'
import diocesan from '../../assets/diocesan-branch.jpg'
import { contact, eventStatus, events } from '../../content/events'
import { branches, mapsUrl } from '../../content/branches'
import { Label, LogoMark, Reveal, SectionHead, T } from './ui'

const posters = { tambayan, fiesta, popart }

export function Events() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <SectionHead n="02 - Events" title="This season." aside="Markets, music and makers - the space opens up a few times a year." />
      </Reveal>
      <ul className="mt-12">
        {events.map((e, i) => {
          const s = eventStatus(e)
          const live = s.state !== 'past'
          return (
            <Reveal as="li" key={e.key} delay={i * 80} className="grid gap-6 border-b border-white/10 py-8 md:grid-cols-12 md:items-center">
              <img src={posters[e.key]} alt={`${e.name} poster`} className={`aspect-square w-28 rounded-2xl object-cover md:col-span-2 ${live ? '' : 'opacity-50 grayscale'}`} />
              <div className="md:col-span-6">
                <p className={`${T.h2} md:text-5xl ${live ? '' : 'text-rl-white/40'}`}>{e.name}</p>
                <p className={`${T.small} mt-2 max-w-md text-rl-muted`}>{e.blurb}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold">{e.dates}</p>
                <p className={`${T.small} text-rl-muted`}>{e.hours}</p>
              </div>
              <div className="md:col-span-2 md:text-right">
                {live ? (
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} - merchant slot`)}`}
                    className="inline-block rounded-full bg-rl-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-rl-white/80"
                  >
                    {s.label} · Apply
                  </a>
                ) : (
                  <span className="inline-block rounded-full px-4 py-2 text-xs font-medium text-rl-muted ring-1 ring-white/15">{s.label}</span>
                )}
              </div>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}

export function Space() {
  return (
    <section id="space" className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
      <Reveal>
        <SectionHead n="03 - Space" title="The tambayan." aside="Two floors, a roof deck, and room for whatever you’re making." />
      </Reveal>
      <Reveal className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
        <img src={interior} alt="Baristas behind the bar" className="col-span-2 aspect-[4/3] w-full rounded-[2rem] object-cover md:col-span-4 md:row-span-2 md:aspect-auto md:h-full" />
        <img src={reading} alt="Customers reading over matcha" className="aspect-square w-full rounded-[2rem] object-cover object-[30%_50%] md:col-span-2 md:aspect-[4/3]" />
        <img src={pour} alt="Biscoff French toast" className="aspect-square w-full rounded-[2rem] object-cover md:col-span-2 md:aspect-[4/3]" />
        <img src={night} alt="Urban storefront at night" className="aspect-square w-full rounded-[2rem] object-cover md:col-span-3 md:aspect-[16/9]" />
        <img src={team} alt="The Urban Coffee Studio team" className="aspect-square w-full rounded-[2rem] object-cover object-[50%_40%] md:col-span-3 md:aspect-[16/9]" />
      </Reveal>
    </section>
  )
}

const branchImg = { tibanga: [tibanga, '50% 40%'], diocesan: [diocesan, '50% 0%'] }

export function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
      <Reveal>
        <SectionHead n="04 - Visit" title="Come through." />
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {branches.map((b, i) => (
          <Reveal key={b.key} delay={i * 100} className="overflow-hidden rounded-[2rem] bg-rl-panel ring-1 ring-white/[0.06]">
            <img src={branchImg[b.key][0]} alt={`${b.name} branch`} style={{ objectPosition: branchImg[b.key][1] }} className="aspect-[2/1] w-full object-cover" />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label>{b.tag}</Label>
                  <p className={`${T.h2} mt-2 md:text-5xl`}>{b.name}</p>
                </div>
                <a href={mapsUrl(b.query)} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-rl-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-rl-white/80">
                  Directions ↗
                </a>
              </div>
              <p className={`${T.small} mt-3 text-rl-muted`}>{b.note}</p>
              <dl className="mt-5 border-t border-white/10">
                {b.hours.map(([d, h]) => (
                  <div key={d} className="flex justify-between border-b border-white/10 py-3 text-sm">
                    <dt className="font-medium">{d}</dt>
                    <dd className="font-light text-rl-muted tabular-nums">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-rl-white p-7 text-black sm:flex-row sm:items-center md:p-10">
        <div className="flex items-center gap-4">
          <LogoMark className="h-14 w-14" />
          <div>
            <p className={T.h3}>Questions, collabs, or a job?</p>
            <p className={`${T.small} text-black/60`}>We&rsquo;re hiring baristas and kitchen cooks.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`mailto:${contact.email}`} className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-rl-white transition hover:bg-black/80">
            Email us
          </a>
          <a href={`mailto:${contact.hiring}`} className="rounded-full px-5 py-3 text-sm font-semibold ring-1 ring-black/20 transition hover:bg-black/5">
            Apply to work here
          </a>
        </div>
      </Reveal>
    </section>
  )
}
