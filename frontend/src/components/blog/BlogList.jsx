import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiSearch, FiX } from "react-icons/fi";
import Spinner from "../Spinner";
import PageTitle from "../layout/PageTitle";
import FilterChips from "../layout/FilterChips";
import { chipOptions } from "../../utils/chipOptions";
import { formatDate } from "../../utils/formatDate";

const yearOf = (iso) => (iso || "").slice(0, 4) || "Undated";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}posts/`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p) => ({
          id: p.id,
          title: p.title,
          tag: p.tag,
          excerpt: p.excerpt,
          min: p.read_time,
          date: p.published_date,
        }));
        // newest first
        formatted.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
        setPosts(formatted);
      })
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  if (!posts.length)
    return (
      <div className="tab-content center">
        <div className="empty-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <p className="muted">No posts yet.</p>
        <p className="muted-sub">
          Check back soon - something's being written.
        </p>
      </div>
    );

  const q = query.trim().toLowerCase();
  const shown = posts.filter(
    (p) =>
      (!tag || p.tag === tag) &&
      (!q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q)),
  );
  // the newest post is featured unless the reader is searching/filtering
  const filtering = Boolean(q || tag);
  const [featured, ...rest] = filtering ? [null, ...shown] : shown;

  const byYear = rest.reduce((groups, post) => {
    const y = yearOf(post.date);
    (groups[y] ||= []).push(post);
    return groups;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="tab-content">
      <div className="section-wrap">
        <PageTitle light="Blog" count={posts.length}>
          <label className="search">
            <FiSearch size={15} />
            <input
              type="search"
              placeholder="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search posts"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
          </label>
          {chipOptions(posts, (p) => p.tag).length > 2 && (
            <FilterChips
              options={chipOptions(posts, (p) => p.tag)}
              value={tag}
              onChange={setTag}
              label="Filter posts"
            />
          )}
        </PageTitle>

        {featured && (
          <Link to={`/blog/${featured.id}`} className="bfeat">
            <div className="bfeat-meta">
              <span className="feat-badge">Latest</span>
              {featured.tag && <span>{featured.tag}</span>}
              <span>{formatDate(featured.date)}</span>
              {featured.min && <span>{featured.min} min read</span>}
            </div>
            <h2 className="bfeat-title">{featured.title}</h2>
            {featured.excerpt && (
              <p className="bfeat-excerpt">{featured.excerpt}</p>
            )}
            <span className="bfeat-cta">
              Read post <FiArrowRight size={15} />
            </span>
          </Link>
        )}

        {shown.length === 0 && (
          <p className="blog-empty">
            No posts match “{query || tag}”.{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag(null);
              }}
            >
              Clear filters
            </button>
          </p>
        )}

        {years.map((year) => (
          <section key={year} className="byear">
            <h2 className="byear-label">{year}</h2>
            <div className="blist">
              {byYear[year].map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="bcard">
                  <div className="bcard-side">
                    <span>{formatDate(post.date)}</span>
                    {post.min && <span>{post.min} min read</span>}
                  </div>

                  <div className="bcard-main">
                    {post.tag && <span className="bcard-tag">{post.tag}</span>}
                    <h3 className="bcard-title">{post.title}</h3>
                    {post.excerpt && (
                      <p className="bcard-excerpt">{post.excerpt}</p>
                    )}
                  </div>

                  <FiArrowUpRight className="bcard-arrow" size={18} />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
