import { lazy } from 'react'

// Add a new prototype here and it shows up in the switcher.
export const designs = [
  {
    id: 'broadsheet',
    letter: 'A',
    name: 'Broadsheet',
    blurb: 'Printed newspaper / art-zine. Paper, ink, halftone photos, red spot colour.',
    Component: lazy(() => import('./broadsheet/BroadsheetSite')),
  },
  {
    id: 'reel',
    letter: 'B',
    name: 'Reel',
    blurb: 'Dark, black + white. The menu scrolls sideways like a film reel. One typeface (Sora).',
    Component: lazy(() => import('./reel/ReelSite')),
  },
  {
    id: 'noir',
    letter: 'C',
    name: 'Noir',
    blurb: 'Black, minimal and modern. Big type, big photography, quiet motion, one warm accent.',
    Component: lazy(() => import('./noir/NoirSite')),
  },
  {
    id: 'charcoal',
    letter: 'D',
    name: 'Charcoal',
    blurb: 'Dark bento-grid layout, one typeface throughout (Urbanist), soft matcha accent.',
    Component: lazy(() => import('./charcoal/CharcoalSite')),
  },
  {
    id: 'split',
    letter: 'E',
    name: 'Split',
    blurb: 'Black + white like the logo. Split screen: fixed black panel left, content scrolls right. One typeface (Manrope).',
    Component: lazy(() => import('./split/SplitSite')),
  },
  {
    id: 'stack',
    letter: 'F',
    name: 'Stack',
    blurb: 'Dark, black + white. Full-screen photo slideshow, sections stack like cards as you scroll. One typeface (Plus Jakarta Sans).',
    Component: lazy(() => import('./stack/StackSite')),
  },
  {
    id: 'receipt',
    letter: 'G',
    name: 'Receipt',
    blurb: 'Dark, black + white, one monospace typeface. Menu printed like receipts, events like order tickets.',
    Component: lazy(() => import('./receipt/ReceiptSite')),
  },
  {
    id: 'lens',
    letter: 'H',
    name: 'Lens',
    blurb: 'Dark photo lookbook. Hero photo zooms to full screen on scroll, full-bleed chapters. One typeface (Geist).',
    Component: lazy(() => import('./lens/LensSite')),
  },
  {
    id: 'tray',
    letter: 'I',
    name: 'Tray',
    blurb: 'Dark, black + white, one typeface (Onest). Interactive menu: add items to a tray that keeps a running total.',
    Component: lazy(() => import('./tray/TraySite')),
  },
]
