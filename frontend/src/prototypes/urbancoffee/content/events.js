// Shared by every design prototype. Dates and details come from Urban's 2026 event posters.
export const events = [
  {
    key: 'tambayan',
    name: 'Urban Pigeon Tambayan',
    blurb: 'Coffee. Community. Curated finds. A July flea market with local merchants by day and acoustic nights after dark.',
    dates: 'Jul 17 – 19',
    hours: 'All day',
    start: '2026-07-17',
    end: '2026-07-19',
    tags: ['Flea market', 'Acoustic nights'],
  },
  {
    key: 'fiesta',
    name: 'Fiesta de Merkado',
    blurb: 'The Urban Flea Market for Diyandi Festival — unique finds, local crafts, and the festive magic of the season.',
    dates: 'Sep 18 – 20 · 25 – 27',
    hours: '5 PM – 12 MN',
    start: '2026-09-18',
    end: '2026-09-27',
    tags: ['Diyandi Festival', 'Local merchants'],
  },
  {
    key: 'popart',
    name: 'Pop Art Market',
    blurb: 'Celebrate National Artists Month with tattoo artists, graphic designers, illustrators, painters, and crafters.',
    dates: 'Oct 19 – 25',
    hours: '5 PM – 12 AM',
    start: '2026-10-19',
    end: '2026-10-25',
    tags: ['Artists Month', 'Slots open'],
  },
]

export function eventStatus(e, now = new Date()) {
  const start = new Date(`${e.start}T00:00:00`)
  const end = new Date(`${e.end}T23:59:59`)
  if (now < start) {
    const days = Math.ceil((start - now) / 864e5)
    return { state: 'upcoming', label: days === 1 ? 'Tomorrow' : `In ${days} days` }
  }
  if (now <= end) return { state: 'live', label: 'Happening now' }
  return { state: 'past', label: 'Wrapped' }
}

export const contact = {
  email: 'urbancoffeestudiotibanga@gmail.com',
  hiring: 'urban.hrofficer@gmail.com',
  city: 'Iligan City',
  tagline: 'Wherever life takes you, there will always be an Urban.',
  hashtag: '#FYKYK',
}
