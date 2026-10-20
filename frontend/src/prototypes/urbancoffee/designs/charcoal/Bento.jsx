import latte from '../../assets/iced-latte-blue.jpg'
import trio from '../../assets/matcha-trio.jpg'
import salmon from '../../assets/salmon-bowl.jpg'
import storefront from '../../assets/storefront-night.webp'
import { contact, eventStatus, events } from '../../content/events'
import { Btn, Card, Label, LogoMark, Reveal, T, openStatus } from './ui'

export default function Bento() {
  const status = openStatus()
  const next = events.find((e) => eventStatus(e).state !== 'past')
  const nextStatus = next && eventStatus(next)

  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pt-24 md:px-6 md:pt-28">
      <div className="grid auto-rows-[minmax(150px,auto)] gap-3 md:grid-cols-4 md:gap-4">
        {/* Headline */}
        <Reveal className="md:col-span-3 md:row-span-2">
          <Card className="flex h-full flex-col justify-between gap-10 p-7 md:p-10">
            <div className="flex items-center justify-between">
              <Label>Roastery + Kitchen · {contact.city}</Label>
              <LogoMark className="h-11 w-11" />
            </div>
            <div>
              <h1 className="text-[clamp(2.75rem,5.8vw,5.25rem)] leading-[0.98] tracking-[-0.03em]">
                <span className="font-light">Wherever life takes you,</span>
                <br />
                <span className="font-extrabold">there&rsquo;s an Urban.</span>
              </h1>
              <p className={`${T.body} mt-6 max-w-lg text-ch-muted`}>
                Coffee roasted in-house, the Pigeon Matcha series, and a kitchen that runs late - across two branches in
                Iligan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href="#menu" primary>
                  Browse the menu →
                </Btn>
                <Btn href="#visit">Find a branch</Btn>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Open status */}
        <Reveal delay={80}>
          <Card className="flex h-full flex-col justify-between p-6">
            <Label>Tibanga today</Label>
            <div>
              <p className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight">
                <span className={`h-3 w-3 rounded-full ${status.on ? 'animate-pulse bg-ch-matcha' : 'bg-ch-muted'}`} />
                {status.text}
              </p>
              <p className={`${T.small} mt-1 text-ch-muted`}>{status.sub}</p>
            </div>
          </Card>
        </Reveal>

        {/* Latte photo */}
        <Reveal delay={120} className="row-span-2 min-h-[320px]">
          <div className="relative h-full overflow-hidden rounded-3xl">
            <img src={latte} alt="Iced latte in an Urban cup" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <Label className="text-ch-text/70">House favourite</Label>
              <p className={`${T.h3} mt-1 font-bold`}>Spanish Latte</p>
            </div>
          </div>
        </Reveal>

        {/* Matcha */}
        <Reveal delay={160} className="md:col-span-2">
          <a href="#matcha" className="group relative block h-full min-h-[200px] overflow-hidden rounded-3xl">
            <img src={trio} alt="Pigeon Matcha trio" className="absolute inset-0 h-full w-full object-cover object-[50%_72%] transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <Label className="text-ch-matcha">7 drinks</Label>
              <p className={`${T.h3} mt-1`}>
                <span className="font-light">Pigeon</span> <span className="font-extrabold">Matcha</span>
              </p>
            </div>
          </a>
        </Reveal>

        {/* Next event */}
        <Reveal delay={200}>
          <a href="#events" className="block h-full">
            <Card className="flex h-full flex-col justify-between bg-ch-matcha p-6 text-ch-bg ring-0 transition hover:brightness-105">
              <Label className="text-ch-bg/60">Next up</Label>
              {next ? (
                <div>
                  <p className="text-sm font-bold">{nextStatus.label}</p>
                  <p className={`${T.h3} font-extrabold`}>{next.name}</p>
                  <p className="text-sm font-medium">{next.dates}</p>
                </div>
              ) : (
                <p className={`${T.h3} font-extrabold`}>More soon</p>
              )}
            </Card>
          </a>
        </Reveal>

        {/* New dish */}
        <Reveal delay={240} className="md:col-span-2">
          <Card className="flex h-full items-center gap-5 p-4 pr-6">
            <img src={salmon} alt="Honey sriracha salmon bowl" className="h-28 w-28 shrink-0 rounded-2xl object-cover md:h-32 md:w-32" />
            <div>
              <Label className="text-ch-matcha">New in the kitchen</Label>
              <p className={`${T.h3} mt-1 font-bold`}>Honey Sriracha Salmon</p>
              <p className={`${T.small} text-ch-muted`}>Salmon, soft egg, nori, pickled onion, rice</p>
            </div>
          </Card>
        </Reveal>

        {/* Storefront */}
        <Reveal delay={280} className="md:col-span-2">
          <a href="#visit" className="group relative block h-full min-h-[200px] overflow-hidden rounded-3xl">
            <img src={storefront} alt="Urban storefront at night" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-0 flex w-full items-end justify-between p-6">
              <p className={`${T.h3}`}>
                <span className="font-light">Two</span> <span className="font-extrabold">branches</span>
              </p>
              <Label className="text-ch-text/70">Tibanga · Diocesan</Label>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
