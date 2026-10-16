import { Suspense, useCallback, useEffect, useState } from 'react'
import { designs } from './designs/registry'
import DesignSwitcher from './DesignSwitcher'
import ConceptBadge from './ConceptBadge'

const STORAGE_KEY = 'urban-design'

function initialDesign() {
  const fromUrl = new URLSearchParams(window.location.search).get('design')
  if (designs.some((d) => d.id === fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (designs.some((d) => d.id === saved)) return saved
  } catch {
    /* storage unavailable */
  }
  return designs[0].id
}

export default function App() {
  const [current, setCurrent] = useState(initialDesign)

  const choose = useCallback((id) => {
    setCurrent(id)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Keep the URL shareable: ?design=golden opens that prototype directly.
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('design', current)
    window.history.replaceState(null, '', url)
    try {
      localStorage.setItem(STORAGE_KEY, current)
    } catch {
      /* storage unavailable */
    }
  }, [current])

  const { Component } = designs.find((d) => d.id === current)

  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Component key={current} />
      </Suspense>
      <DesignSwitcher designs={designs} current={current} onChange={choose} />
      <ConceptBadge />
    </>
  )
}
