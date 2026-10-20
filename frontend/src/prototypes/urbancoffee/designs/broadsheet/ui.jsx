import { Star } from '../shared'

export { Bird, Reveal, Star } from '../shared'

/* An "O" with a star punched in the middle - the posters' signature letter */
export function O({ points = 6, starClass = 'text-urban' }) {
  return (
    <span className="relative">
      O
      <Star
        points={points}
        className={`absolute top-[52%] left-1/2 h-[0.32em] w-[0.32em] -translate-x-1/2 -translate-y-1/2 rotate-12 ${starClass}`}
      />
    </span>
  )
}

export function Mono({ children, className = '' }) {
  return <p className={`font-mono text-[11px] tracking-[0.18em] uppercase ${className}`}>{children}</p>
}

/* Newspaper section header: "Section B --- The Studio --- p. 2" */
export function SectionHead({ letter, title, page, className = 'border-ink' }) {
  return (
    <div className={`flex items-center gap-4 border-y py-2 ${className}`}>
      <Mono>Section {letter}</Mono>
      <span className="hidden h-px flex-1 bg-current opacity-30 sm:block" />
      <Mono className="font-bold">{title}</Mono>
      <span className="h-px flex-1 bg-current opacity-30" />
      <Mono>p. {page}</Mono>
    </div>
  )
}

/* Grayscale halftone photo that blooms into colour on hover */
export function Photo({ src, alt, className = '', imgClass = '', caption }) {
  return (
    <figure className={`flex flex-col ${className}`}>
      <div className="halftone min-h-0 flex-1">
        <img src={src} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${imgClass}`} />
      </div>
      {caption && (
        <figcaption className="mt-2 flex gap-2 font-mono text-[10px] leading-snug tracking-wider text-ink/60 uppercase">
          <span className="text-urban">▲</span> {caption}
        </figcaption>
      )}
    </figure>
  )
}
