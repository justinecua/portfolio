/* Marks the site as an unofficial concept and routes interested owners to the portfolio chat. Not part of any design. */
const CHAT_URL =
  '/?chat=open&msg=' + encodeURIComponent("Hi Justine, I saw the Urban Coffee Studio prototype and I'm interested.")

export default function ConceptBadge() {
  return (
    <div className="fixed right-4 bottom-4 z-[200] flex items-center border border-neutral-300 bg-white font-[system-ui] text-xs text-neutral-500 shadow-sm">
      <a href="/" className="hidden py-2 pr-2.5 pl-2.5 hover:text-neutral-900 sm:block">
        Concept by Justine Cua · not the official site
      </a>
      <a
        href={CHAT_URL}
        className="border-neutral-300 bg-neutral-900 px-2.5 py-2 font-medium text-white hover:bg-neutral-700 sm:border-l"
      >
        Interested? Let's talk →
      </a>
    </div>
  )
}
