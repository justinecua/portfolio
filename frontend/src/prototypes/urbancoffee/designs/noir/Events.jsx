import tambayan from '../../assets/tambayan-open.jpg'
import fiesta from '../../assets/fiesta-merkado.jpg'
import popart from '../../assets/pop-art-market.jpg'
import { contact, eventStatus, events } from '../../content/events'
import { Accent, Arrow, Head, Reveal } from './ui'

const posters = { tambayan, fiesta, popart }

export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
      <Reveal>
        <Head n="03" label="Events" aside={<p className="text-sm">Markets, music and makers - the space opens up every season.</p>}>
          What&rsquo;s <Accent>on</Accent>
        </Head>
      </Reveal>

      <ul className="mt-14 md:mt-20">
        {events.map((e, i) => {
          const s = eventStatus(e)
          const live = s.state !== 'past'
          return (
            <Reveal as="li" key={e.key} delay={i * 80} className="group border-b border-white/10">
              <a
                href={live ? `mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} - merchant slot`)}` : undefined}
                className={`grid items-center gap-6 py-8 md:grid-cols-12 md:py-10 ${live ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="md:col-span-3">
                  <p className="text-lg font-medium tabular-nums">{e.dates}</p>
                  <p className="text-sm text-nr-muted">{e.hours}</p>
                </div>
                <div className="flex items-center gap-6 md:col-span-6">
                  <img
                    src={posters[e.key]}
                    alt=""
                    className={`hidden aspect-[4/5] w-0 shrink-0 rounded-lg object-cover opacity-0 transition-all duration-500 group-hover:w-24 group-hover:opacity-100 md:block ${s.state === 'past' ? 'grayscale' : ''}`}
                  />
                  <div>
                    <h3 className={`text-3xl font-medium tracking-[-0.025em] md:text-5xl ${s.state === 'past' ? 'text-nr-text/45' : ''}`}>{e.name}</h3>
                    <p className="mt-2 max-w-lg text-sm text-nr-muted">{e.blurb}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider uppercase ${
                      s.state === 'past' ? 'border border-white/15 text-nr-muted' : 'bg-nr-accent text-nr-bg'
                    }`}
                  >
                    {s.label}
                  </span>
                  {live && (
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition group-hover:border-nr-text group-hover:bg-nr-text group-hover:text-nr-bg">
                      <Arrow />
                    </span>
                  )}
                </div>
              </a>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
