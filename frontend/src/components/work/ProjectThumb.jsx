import { useState } from "react";

// YouTube answers a missing thumbnail size with a 120x90 grey placeholder,
// so treat anything that small as missing too.
const PLACEHOLDER_WIDTH = 120;

// Shows the first image in `sources` that actually loads; if none do,
// shows `fallback` instead of a broken-image icon.
function ProjectThumb({ sources = [], alt = "", fallback = null, ...props }) {
  const [index, setIndex] = useState(0);
  const src = sources[index];
  if (!src) return fallback;

  const next = () => setIndex((i) => i + 1);

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      onError={next}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= PLACEHOLDER_WIDTH) next();
      }}
      {...props}
    />
  );
}

export default ProjectThumb;
