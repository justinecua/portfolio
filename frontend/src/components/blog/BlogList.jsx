import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setPosts(formatted);
      })
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
          Check back soon — something's being written.
        </p>
      </div>
    );

  return (
    <div className="tab-content">
      <div className="section-wrap">
        <div className="blog-list">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="blog-row">
              <span className="blog-date">{post.date}</span>
              <span className="blog-title">{post.title}</span>
              <span className="blog-tag">{post.tag}</span>
              <span className="blog-min">{post.min}</span>
              <span className="blog-arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
