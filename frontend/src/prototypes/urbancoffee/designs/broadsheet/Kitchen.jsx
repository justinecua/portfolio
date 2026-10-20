import top from '../../assets/bowl-top.jpg'
import angle from '../../assets/bowl-angle.jpg'
import closeup from '../../assets/bowl-closeup.jpg'
import hands from '../../assets/bowl-hands.jpg'
import { Mono, Photo, Reveal, SectionHead } from './ui'

const anatomy = [
  'Crispy fried chicken',
  'Sweet-savoury teriyaki glaze',
  'Kewpie drizzle',
  'Black + white sesame',
  'Pickled radish',
  'Snap peas, cucumber, carrot',
  'Steamed Japanese rice',
]

export default function Kitchen() {
  return (
    <section id="kitchen" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHead letter="D" title="From the Kitchen" page="4" />

      <div className="grid gap-10 pt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Mono className="text-urban">Review · New on the menu</Mono>
          <h2 className="mt-3 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.9]">
            The teriyaki bowl, <em>reviewed</em> by the people who made it.
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/80">
            Our newest bowl is built for the coffee that comes after it - glazed, crunchy, a little sweet, and finished
            with enough pickles to keep you coming back. Verdict: biased, but correct.
          </p>

          <div className="mt-8 border-2 border-ink p-5">
            <div className="flex items-baseline justify-between border-b border-ink pb-2">
              <Mono className="font-bold">Fig. 1 - Anatomy</Mono>
              <span className="font-mono text-sm font-bold">₱245</span>
            </div>
            <ol className="mt-3 space-y-1.5">
              {anatomy.map((a, i) => (
                <li key={a} className="flex gap-3 text-sm">
                  <span className="w-5 font-mono text-urban">{String(i + 1).padStart(2, '0')}</span>
                  {a}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex items-center gap-2" aria-label="Rated 5 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="font-serif text-3xl text-urban">★</span>
            ))}
            <Mono className="ml-2 text-ink/60">Five stars, unsurprisingly</Mono>
          </div>
        </Reveal>

        <Reveal delay={150} className="grid grid-cols-2 gap-4 lg:col-span-8">
          <Photo src={hands} alt="Hands presenting the teriyaki chicken bowl" className="col-span-2 aspect-[16/10] sm:col-span-1 sm:row-span-2 sm:aspect-auto" imgClass="object-[50%_70%]" caption="Plate 1 - Served." />
          <Photo src={top} alt="Teriyaki chicken bowl from above" className="aspect-square" imgClass="object-[50%_60%]" caption="Plate 2 - From above." />
          <Photo src={closeup} alt="Close-up of glazed chicken with sesame and kewpie" className="aspect-square" imgClass="object-[50%_65%]" caption="Plate 3 - The glaze." />
          <Photo src={angle} alt="Teriyaki bowl on a wooden table" className="col-span-2 hidden aspect-[21/8] sm:flex" imgClass="object-[50%_70%]" caption="Plate 4 - On the table, briefly." />
        </Reveal>
      </div>
    </section>
  )
}
