import { menu } from '../../content/menu'
import { Mono, Reveal, SectionHead, Star } from './ui'

export default function Menu() {
  return (
    <section id="menu" className="bg-paper-deep">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHead letter="C" title="The Price List" page="3" />

        <Reveal className="mt-10 border-2 border-ink p-1.5">
          <div className="border border-ink px-5 py-10 md:px-10">
            <div className="text-center">
              <Mono className="text-ink/60">Posted daily at the bar</Mono>
              <h2 className="mt-2 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-none">
                What we&rsquo;re <em>pouring</em>
              </h2>
              <div className="mx-auto mt-5 flex max-w-xs items-center gap-3 text-urban">
                <span className="h-px flex-1 bg-current" />
                <Star className="h-3 w-3" />
                <Star points={8} className="h-4 w-4" />
                <Star className="h-3 w-3" />
                <span className="h-px flex-1 bg-current" />
              </div>
            </div>

            <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-10 xl:grid-cols-4 xl:gap-0">
              {menu.map((cat, c) => (
                <div key={cat.key} className={`xl:px-6 ${c > 0 ? 'xl:border-l xl:border-ink/25' : 'xl:pl-0'} ${c === menu.length - 1 ? 'xl:pr-0' : ''}`}>
                  <div className="mb-6 flex items-baseline justify-between border-b-2 border-ink pb-2">
                    <h3 className="font-serif text-4xl">{cat.label}</h3>
                    <Mono className="text-ink/50">{String(cat.items.length).padStart(2, '0')} items</Mono>
                  </div>
                  <ul className="space-y-5">
                    {cat.items.map((item) => (
                      <li key={item.name}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[15px] font-bold tracking-tight uppercase">
                            {item.name}
                            {item.alt && <span className="ml-1.5 font-serif text-base font-normal normal-case italic text-ink/60">{item.alt}</span>}
                          </span>
                          <span className="leaders" />
                          <span className="font-mono text-sm font-bold">₱{item.price}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-ink/60">
                          {item.note}
                          {item.tag && (
                            <span className="ml-2 inline-block bg-urban px-1.5 py-px align-middle font-mono text-[9px] tracking-wider text-paper uppercase">
                              {item.tag}
                            </span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Mono className="mt-12 border-t border-ink/25 pt-4 text-center text-ink/50">
              Oat milk + extra shot available · Ask the bar about this week’s single origin
            </Mono>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
