// Shared by every design prototype. Hours are placeholders - confirm with the client.
export const branches = [
  {
    key: 'tibanga',
    name: 'Tibanga',
    note: 'The original roastery + kitchen. Two floors, a roof deck, and the glowing bird over the door.',
    hours: [['Mon – Thu', '7 AM – 11 PM'], ['Fri – Sun', '7 AM – 12 MN']],
    query: 'Urban Coffee Studio Tibanga Iligan',
    tag: 'Flagship',
  },
  {
    key: 'diocesan',
    name: 'Diocesan',
    note: 'Our newer spot for a quick matcha or a slow afternoon.',
    hours: [['Mon – Sun', '8 AM – 10 PM']],
    query: 'Urban Coffee Studio Diocesan Iligan',
    tag: 'New',
  },
]

export const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
