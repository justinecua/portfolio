import tambayan from '../../assets/tambayan-open.jpg'
import fiesta from '../../assets/fiesta-merkado.jpg'
import popart from '../../assets/pop-art-market.jpg'
import { contact, eventStatus, events } from '../../content/events'
import { Btn, Card, Label, Pair, Reveal, T } from './ui'

const posters = { tambayan, fiesta, popart }

export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <Pair light="This" bold="season" />
        <p className={`${T.body} max-w-sm text-ch-muted`}>Markets, music and makers. The space opens up a few times a year.</p>
      </Reveal>

      {/* Timeline */}
      <div className="relative mt-12">
        <div className="absolute top-[11px] right-0 left-0 hidden h-px bg-white/[0.1] md:block" aria-hidden="true" />
        <ol className="grid gap-4 md:grid-cols-3">
          {events.map((e, i) => {
            const s = eventStatus(e)
            const live = s.state !== 'past'
            return (
              <Reveal as="li" key={e.key} delay={i * 100}>
                <span
                  className={`relative z-10 mb-5 hidden h-[23px] w-[23px] rounded-full border-4 border-ch-bg md:block ${live ? 'bg-ch-matcha' : 'bg-ch-raised'}`}
                  aria-hidden="true"
                />
                <Card className={`overflow-hidden ${live ? 'ring-ch-matcha/40' : ''}`}>
                  <div className="relative">
                    <img src={posters[e.key]} alt={`${e.name} poster`} className={`aspect-[16/10] w-full object-cover object-top ${live ? '' : 'opacity-50 grayscale'}`} />
                    <span
                      className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold ${live ? 'bg-ch-matcha text-ch-bg' : 'bg-ch-bg/80 text-ch-muted backdrop-blur'}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div className="p-6">
                    <Label>{e.dates} · {e.hours}</Label>
                    <p className={`${T.h3} mt-2 font-extrabold`}>{e.name}</p>
                    <p className={`${T.small} mt-2 text-ch-muted`}>{e.blurb}</p>
                    {live && (
                      <Btn href={`mailto:${contact.email}?subject=${encodeURIComponent(`${e.name} - merchant slot`)}`} primary className="mt-5">
                        Apply for a slot →
                      </Btn>
                    )}
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
