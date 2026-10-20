import popart from '../../assets/pop-art-market.jpg'
import red from '../../assets/artists-red.jpg'
import slots from '../../assets/slots-open.jpg'
import { Mono, Reveal, SectionHead, Star } from './ui'

const details = [
  { k: 'Dates', v: 'Oct. 19 – 25' },
  { k: 'Hours', v: '5 PM – 12 AM' },
  { k: 'Venue', v: 'Tibanga Branch' },
  { k: 'Entry', v: 'Free' },
]

const crafts = ['Tattoo artists', 'Graphic designers', 'Illustrators', 'Painters', 'Crafts, atbp.']

const posters = [
  { src: popart, alt: 'Pop Art Market poster with Halloween icons', cap: 'No. 1 - The announcement' },
  { src: red, alt: 'Urban Coffee Studio has always had a thing for artists', cap: 'No. 2 - The confession' },
  { src: slots, alt: 'Slots are still open - calling all artists', cap: 'No. 3 - The call' },
]

/* Each letter in its own frame, like the poster */
function Framed({ word, className = '' }) {
  return (
    <span className={`flex gap-1.5 sm:gap-2 ${className}`}>
      {word.split('').map((ch, i) => (
        <span
          key={i}
          className="flex aspect-[3/4] w-[clamp(2.6rem,9vw,6.5rem)] items-center justify-center border-2 border-paper font-serif text-[clamp(2.4rem,8vw,6rem)] leading-none"
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Market() {
  return (
    <section id="market" className="bg-urban text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHead letter="E" title="Notices & Events" page="5" className="border-paper/60" />

        <div className="grid gap-12 pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Mono className="text-paper/75">Celebrate National Artists Month with us</Mono>

            <div className="relative mt-6 inline-flex flex-col gap-2">
              <Framed word="POP" />
              <Framed word="ART" className="pl-[clamp(1.5rem,5vw,4rem)]" />
              <span className="-mt-[0.35em] ml-[18%] -rotate-6 font-serif text-[clamp(3.5rem,11vw,8rem)] leading-none text-ink italic">
                market
              </span>
              <Star points={8} className="absolute -top-4 -right-16 h-14 w-14 text-paper animate-spin-slow" />
            </div>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/90">
              For one week the café becomes a night market of local makers. Tattoo flash, prints, paintings, stickers,
              crafts - and the bar open the whole time.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs tracking-wider uppercase">
              {crafts.map((c, i) => (
                <li key={c} className="flex items-center gap-3">
                  {c}
                  {i < crafts.length - 1 && <span className="text-paper/50">|</span>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <div className="border-2 border-paper bg-paper p-1.5 text-ink">
              <div className="border border-ink p-6">
                <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                  <Mono className="font-bold">Admit one · Vendor</Mono>
                  <Star className="h-5 w-5 text-urban" />
                </div>
                <dl className="grid grid-cols-2 gap-x-6">
                  {details.map((d) => (
                    <div key={d.k} className="border-b border-ink/20 py-4">
                      <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">{d.k}</dt>
                      <dd className="mt-1 font-serif text-2xl leading-tight">{d.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 font-serif text-4xl leading-none italic">Slots are still open.</p>
                <p className="mt-2 text-sm text-ink/70">Message the page with your name, craft, and a few photos of your work.</p>
                <a
                  href="#visit"
                  className="mt-6 flex items-center justify-between bg-ink px-5 py-4 font-mono text-xs tracking-[0.15em] text-paper uppercase transition hover:bg-urban-deep"
                >
                  Apply for a table <span>→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 grid gap-6 sm:grid-cols-3">
          {posters.map((p, i) => (
            <figure key={p.cap} className={`transition duration-500 hover:-translate-y-2 hover:rotate-0 ${['-rotate-2', 'rotate-1', '-rotate-1'][i]}`}>
              <img src={p.src} alt={p.alt} className="aspect-[4/5] w-full object-cover shadow-[8px_8px_0_0_var(--color-ink)]" />
              <figcaption className="mt-4 font-mono text-[10px] tracking-[0.2em] text-paper/75 uppercase">{p.cap}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
