import { menu } from '../../content/menu'

const quotes = menu.flatMap((c) => c.items).map((i, n) => ({ name: i.name, price: i.price, up: n % 3 !== 1 }))

export default function Ticker() {
  const row = [...quotes, ...quotes]
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-2.5 text-paper" aria-hidden="true">
      <div className="flex w-max animate-ticker">
        {row.map((q, i) => (
          <span key={i} className="flex items-center gap-2 px-5 font-mono text-xs tracking-wider uppercase">
            {q.name}
            <span className="font-bold">₱{q.price}</span>
            <span className={q.up ? 'text-[#7bd88f]' : 'text-urban'}>{q.up ? '▲' : '▼'}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
