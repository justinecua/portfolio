// Writes public/sitemap.xml before each build: the fixed pages plus every
// blog post from the API. If the API can't be reached, only the fixed pages
// are listed and the build carries on.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://justinecua.online";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function apiBase() {
  if (process.env.VITE_API_BASE_URL) return process.env.VITE_API_BASE_URL;
  try {
    const env = readFileSync(resolve(root, ".env"), "utf8");
    const line = env.split("\n").find((l) => l.startsWith("VITE_API_BASE_URL="));
    return line?.slice("VITE_API_BASE_URL=".length).trim().replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/projects", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/certificates", priority: "0.6", changefreq: "monthly" },
  { path: "/prototypes", priority: "0.6", changefreq: "monthly" },
];

const base = apiBase();
if (base) {
  try {
    const res = await fetch(`${base}posts/`, { signal: AbortSignal.timeout(8000) });
    const posts = await res.json();
    for (const p of posts) {
      pages.push({
        path: `/blog/${p.id}`,
        priority: "0.7",
        changefreq: "monthly",
        lastmod: p.published_date?.slice(0, 10),
      });
    }
    console.log(`sitemap: added ${posts.length} blog posts`);
  } catch (err) {
    console.warn(`sitemap: could not fetch posts (${err.message}); fixed pages only`);
  }
} else {
  console.warn("sitemap: VITE_API_BASE_URL not set; fixed pages only");
}

const urls = pages
  .map(
    ({ path, priority, changefreq, lastmod }) =>
      `  <url>\n    <loc>${SITE_URL}${path}</loc>\n` +
      (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : "") +
      `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join("\n");

writeFileSync(
  resolve(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
