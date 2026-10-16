import spirit from '../../assets/urban-spirit.jpg'
import { Mono, Reveal, SectionHead } from './ui'

const lines = ['Late nights.', 'Loud playlists.', 'Iced chocolate.', 'Ink on the tables.']

export default function Spirit() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHead letter="F" title="The Night Edition" page="6" className="border-paper/40" />

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
              {lines.map((l, i) => (
                <Reveal key={l} delay={i * 140} className="block" style={{ paddingLeft: `${i * 6}%` }}>
                  {i === 2 ? <em className="text-urban">{l}</em> : l}
                </Reveal>
              ))}
            </h2>
            <Reveal delay={600} className="mt-10 max-w-md border-l-2 border-urban pl-5">
              <p className="text-paper/70">
                The Urban spirit is whatever happens after the sun goes down and the bar is still pouring.
              </p>
              <Mono className="mt-3 text-paper/40">Weather tonight: humid, with a chance of espresso</Mono>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-5">
            <figure>
              <img
                src={spirit}
                alt="A glimpse of the Urban spirit — hands with silver nails holding an iced chocolate wrapped in smoke"
                className="w-full border border-paper/20"
              />
              <figcaption className="mt-2 font-mono text-[10px] tracking-[0.2em] text-paper/50 uppercase">
                <span className="text-urban">▲</span> A glimpse of the Urban spirit.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
