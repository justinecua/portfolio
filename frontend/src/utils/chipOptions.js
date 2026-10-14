// Builds chip options ("All" + one per distinct value) from a list.
export function chipOptions(items, getValue) {
  const counts = new Map();
  items.forEach((item) => {
    const v = getValue(item);
    if (v) counts.set(v, (counts.get(v) || 0) + 1);
  });
  return [
    { value: null, label: "All", count: items.length },
    ...[...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([v, count]) => ({ value: v, label: v, count })),
  ];
}
