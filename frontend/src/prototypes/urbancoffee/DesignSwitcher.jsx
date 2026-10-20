import { useEffect } from 'react'

/* Prototype picker for client reviews - a plain dropdown, deliberately unstyled-looking. Not part of any design. */
export default function DesignSwitcher({ designs, current, onChange }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return
      const n = Number(e.key)
      if (n >= 1 && n <= designs.length) onChange(designs[n - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [designs, onChange])

  return (
    <label className="fixed bottom-4 left-4 z-[200] flex items-center gap-2 border border-neutral-300 bg-white py-1 pr-1 pl-2.5 font-[system-ui] text-xs text-neutral-500 shadow-sm">
      Prototype
      <select
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer border-l border-neutral-300 bg-white py-1 pr-1 pl-2 text-xs font-medium text-neutral-900 outline-none"
      >
        {designs.map((d) => (
          <option key={d.id} value={d.id}>
            {d.letter} - {d.name}
          </option>
        ))}
      </select>
    </label>
  )
}
