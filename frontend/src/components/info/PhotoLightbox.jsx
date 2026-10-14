import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

// Full-view photo viewer: Esc closes, arrow keys / buttons switch photos.
function PhotoLightbox({ photos, index, onChange, onClose }) {
  const count = photos.length;
  // functional updates so quick repeated key presses each count
  const go = (step) => onChange((i) => (i + step + count) % count);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (count > 1 && e.key === "ArrowRight") onChange((i) => (i + 1) % count);
      if (count > 1 && e.key === "ArrowLeft")
        onChange((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);

    // keep the page from scrolling behind the viewer
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [count, onChange, onClose]);

  // rendered into <body>: the page content is animated with a transform,
  // which would otherwise trap this fixed overlay inside the content column
  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <button
        className="lightbox-btn lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        <FiX size={20} />
      </button>

      {count > 1 && (
        <button
          className="lightbox-btn lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Previous photo"
        >
          <FiChevronLeft size={22} />
        </button>
      )}

      <img
        key={photos[index]}
        src={photos[index]}
        alt=""
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />

      {count > 1 && (
        <button
          className="lightbox-btn lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Next photo"
        >
          <FiChevronRight size={22} />
        </button>
      )}

      {count > 1 && (
        <p className="lightbox-count">
          {index + 1} / {count}
        </p>
      )}
    </div>,
    document.body,
  );
}

export default PhotoLightbox;
