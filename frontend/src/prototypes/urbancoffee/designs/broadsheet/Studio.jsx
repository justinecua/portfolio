import interior from '../../assets/interior.webp'
import { Mono, Photo, Reveal, SectionHead, Star } from './ui'

const facts = [
  { n: '01', k: 'Roasted here', v: 'Green beans in, house roast out — every shot pulled from our own batches.' },
  { n: '02', k: 'Two floors', v: 'The bar downstairs, murals and long tables upstairs, a deck up top.' },
  { n: '03', k: 'Open late', v: 'Most nights the lights stay on until midnight.' },
]

export default function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <SectionHead letter="B" title="The Studio" page="2" />

      <div className="grid gap-10 pt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-tight">
            We&rsquo;ve always had a thing for <em className="text-urban">artists</em>.
          </h2>
          <Photo
            src={interior}
            alt="Baristas working the bar inside Urban Coffee Studio"
            className="mt-10 aspect-[16/9]"
            caption="Behind the bar on a busy afternoon. The roaster sits just out of frame."
          />
        </Reveal>

        <Reveal delay={150} className="lg:col-span-5 lg:border-l lg:border-ink/25 lg:pl-10">
          <div className="columns-1 gap-8 text-[15px] leading-relaxed text-ink/80 sm:columns-2 lg:columns-1">
            <p className="mb-4 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-urban">
              Urban started with a roaster and a counter. Then the kitchen came. Then the second floor, the murals, the
              late nights.
            </p>
            <p className="mb-4">
              Somewhere along the way the space became a place where tattoo artists, illustrators, painters, and
              crafters set up shop next to people who just came for an iced latte. If you&rsquo;ve visited, you&rsquo;ve
              probably noticed.
            </p>
            <p className="mb-4">We like it that way — and we keep making room for it.</p>
          </div>

          <blockquote className="my-8 border-y border-ink py-6 text-center">
            <Star points={8} className="mx-auto mb-3 h-5 w-5 text-urban" />
            <p className="font-serif text-3xl leading-tight italic">“Come for the coffee. Stay because somebody is drawing on the next table.”</p>
            <Mono className="mt-3 text-ink/60">— The house rules, more or less</Mono>
          </blockquote>

          <dl className="divide-y divide-ink/20">
            {facts.map((f) => (
              <div key={f.n} className="grid grid-cols-[2.5rem_1fr] gap-x-3 py-4">
                <dt className="row-span-2 font-mono text-xs text-urban">{f.n}</dt>
                <dt className="font-serif text-2xl leading-none">{f.k}</dt>
                <dd className="mt-1 text-sm text-ink/70">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
