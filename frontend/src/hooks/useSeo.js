import { useEffect } from "react";

export const SITE_URL = "https://justinecua.online";
const SITE_NAME = "Justine Cua";
const DEFAULT_DESCRIPTION =
  "Justine Cua is a mobile and web app developer from Iligan City, Philippines. Projects, blog posts and certificates.";

// Finds (or creates) a <meta>/<link> in <head> and sets one attribute on it.
function setHeadTag(tag, key, keyValue, attr, value) {
  let el = document.head.querySelector(`${tag}[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Per-page title, description, canonical URL, social tags and robots.
// The static defaults in index.html cover crawlers that don't run JS.
export default function useSeo({ title, description, path, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Mobile & Web App Developer`;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = SITE_URL + (path ?? window.location.pathname);

    document.title = fullTitle;
    setHeadTag("meta", "name", "description", "content", desc);
    setHeadTag("meta", "name", "robots", "content", noindex ? "noindex, nofollow" : "index, follow");
    setHeadTag("link", "rel", "canonical", "href", url);
    setHeadTag("meta", "property", "og:title", "content", fullTitle);
    setHeadTag("meta", "property", "og:description", "content", desc);
    setHeadTag("meta", "property", "og:url", "content", url);
    setHeadTag("meta", "name", "twitter:title", "content", fullTitle);
    setHeadTag("meta", "name", "twitter:description", "content", desc);
  }, [title, description, path, noindex]);
}
