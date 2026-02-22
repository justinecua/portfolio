import { useEffect, useState, useRef } from "react";

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function GithubActivity() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const repoRes = await fetch(
          "https://api.github.com/users/justinecua/repos?per_page=10&sort=updated",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          },
        );
        if (!repoRes.ok) throw new Error("rate-limited");
        const repos = await repoRes.json();

        const results = await Promise.all(
          repos.map((r) =>
            fetch(
              `https://api.github.com/repos/justinecua/${r.name}/commits?per_page=3`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
              },
            )
              .then((res) => (res.ok ? res.json() : []))
              .catch(() => []),
          ),
        );

        const flat = results
          .flat()
          .filter((c) => c?.commit)
          .map((c) => ({
            message: c.commit.message.split("\n")[0].slice(0, 72),
            repo: c.html_url.split("/")[4],
            url: c.html_url,
            date: c.commit.author.date,
            sha: c.sha?.slice(0, 7),
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        setCommits(flat);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="gh-wrap">
      {/* header row */}
      <div className="gh-header">
        <span className="gh-eyebrow">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginRight: "0.4rem", verticalAlign: "middle" }}
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub Activity
        </span>
        <a
          href="https://github.com/justinecua"
          target="_blank"
          rel="noreferrer"
          className="gh-profile-link"
        >
          @justinecua ↗
        </a>
      </div>

      {/* commit list */}
      <div className="gh-list">
        {loading &&
          [0, 1, 2].map((i) => (
            <div key={i} className="gh-item gh-skeleton-item">
              <div
                className="gh-skeleton"
                style={{ width: "40%", height: "10px", marginBottom: "6px" }}
              />
              <div
                className="gh-skeleton"
                style={{ width: "85%", height: "10px" }}
              />
            </div>
          ))}

        {error && (
          <p className="gh-error">
            GitHub API rate limit reached. Try again in a moment.
          </p>
        )}

        {!loading &&
          !error &&
          commits.map((c, i) => (
            <a
              key={i}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="gh-item"
            >
              <div className="gh-item-top">
                <span className="gh-repo">{c.repo}</span>
                <span className="gh-sha">{c.sha}</span>
                <span className="gh-time">{timeAgo(c.date)}</span>
              </div>
              <p className="gh-msg">{c.message}</p>
            </a>
          ))}

        {!loading && !error && commits.length === 0 && (
          <p className="gh-error">No public commits found.</p>
        )}
      </div>
    </div>
  );
}
