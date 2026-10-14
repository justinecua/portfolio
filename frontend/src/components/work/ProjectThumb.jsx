import { useState } from "react";

// YouTube answers a missing thumbnail size with a 120x90 grey placeholder,
// so treat anything that small as missing too.
const PLACEHOLDER_WIDTH = 120;

// Shows the first image in `sources` that actually loads.
function ProjectThumb({ sources = [], alt = "", ...props }) {
  const [index, setIndex] = useState(0);
  const src = sources[index];
  if (!src) return null;

  const next = () => setIndex((i) => (i + 1 < sources.length ? i + 1 : i));

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
