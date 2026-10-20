import { useLayoutEffect } from "react";
import App from "./App";
import css from "./index.css?inline";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Archivo:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&family=Urbanist:ital,wght@0,300..900;1,300..900&family=Inter+Tight:ital,wght@0,300..800;1,300..800&family=Manrope:wght@300..800&family=Onest:wght@300..800&family=Geist:wght@300..800&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Sora:wght@300..800&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap";

// Tailwind (with its preflight reset) is only mounted while this page is
// open, so it never leaks into the rest of the portfolio
function useScopedStyles() {
  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = FONTS_URL;
    document.head.append(fonts, style);
    return () => {
      style.remove();
      fonts.remove();
    };
  }, []);
}

export default function UrbanCoffee() {
  useScopedStyles();

  return (
    <>
      <title>Urban Coffee Studio - Concept by Justine Cua</title>
      {/* unofficial concept: keep it out of search so it never competes with the real business */}
      <meta name="robots" content="noindex, nofollow" />
      <App />
    </>
  );
}
