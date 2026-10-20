import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiLink,
} from "react-icons/fi";
import Spinner from "../Spinner";
import PostBody from "./PostBody";
import { formatDate } from "../../utils/formatDate";
import { sectionId } from "../../utils/sectionId";
import profile from "../../assets/profile.jpeg";

const API = import.meta.env.VITE_API_BASE_URL;

const toPost = (p) => ({
  id: p.id,
  title: p.title,
  tag: p.tag,
  excerpt: p.excerpt,
  min: p.read_time,
  date: p.published_date,
  content: p.content || [],
});

// Thin bar across the top of the screen that fills as you read.
function ReadingProgress({ target }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = target.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight;
      setProgress(total > 0 ? Math.min(Math.max(-top / total, 0), 1) : 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  // portal: the page content is animated with a transform, which would
  // otherwise pin this fixed bar to the content column
  return createPortal(
    <div className="read-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>,
    document.body,
  );
}

// "On this page" list of headings; highlights the one being read.
function Contents({ headings }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="post-toc" aria-label="On this page">
      <p className="post-toc-label">On this page</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className={active === h.id ? "active" : ""}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// keyed by id so moving to another post starts from a clean state
function BlogDetail() {
  const { id } = useParams();
  return <PostPage key={id} id={id} />;
}

function PostPage({ id }) {
  const [post, setPost] = useState(null);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef(null);

  useEffect(() => {
    fetch(`${API}posts/${id}/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((p) => setPost(p ? toPost(p) : null))
      .catch((err) => console.error("Error fetching post:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // the other posts, for older / newer links
  useEffect(() => {
    fetch(`${API}posts/`)
      .then((res) => res.json())
      .then((data) =>
        setAll(
          data
            .map(toPost)
            .sort((a, b) => (b.date || "").localeCompare(a.date || "")),
        ),
      )
      .catch(() => {});
  }, []);

  if (loading) return <Spinner />;
  if (!post)
    return (
      <div className="tab-content center">
        <p className="muted">Post not found.</p>
        <Link to="/blog" className="btn-outline btn-sm">
          <FiArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    );

  const headings = post.content
    .map((b, i) =>
      b.type === "h2" ? { id: sectionId(i), text: b.text } : null,
    )
    .filter(Boolean);

  const index = all.findIndex((p) => p.id === post.id);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked - nothing to do
    }
  };

  return (
    <div className="tab-content post-page">
      <ReadingProgress target={articleRef} />

      <Link to="/blog" className="post-back">
        <FiArrowLeft size={14} /> Blog
      </Link>

      <header className="post-head">
        <div className="post-chips">
          {post.tag && <span className="post-chip">{post.tag}</span>}
          <span className="post-chip">
            <FiCalendar size={12} /> {formatDate(post.date)}
          </span>
          {post.min && (
            <span className="post-chip">
              <FiClock size={12} /> {post.min} min read
            </span>
          )}
        </div>

        <h1 className="post-title">{post.title}</h1>
        {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}

        <div className="post-author">
          <span className="post-avatar">
            <img src={profile} alt="" />
          </span>
          <div>
            <p className="post-author-name">Justine Cua</p>
            <p className="post-author-role">Mobile &amp; Web App Developer</p>
          </div>
          <button type="button" className="post-share" onClick={copyLink}>
            {copied ? <FiCheck size={14} /> : <FiLink size={14} />}
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
      </header>

      <div className={`post-layout ${headings.length > 1 ? "has-toc" : ""}`}>
        <article ref={articleRef} className="post-article">
          <PostBody content={post.content} />
        </article>
        {headings.length > 1 && <Contents headings={headings} />}
      </div>

      {(newer || older) && (
        <nav className="post-nav" aria-label="More posts">
          {older ? (
            <Link to={`/blog/${older.id}`} className="post-nav-link">
              <span className="post-nav-dir">
                <FiArrowLeft size={13} /> Older
              </span>
              <span className="post-nav-title" title={older.title}>
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              to={`/blog/${newer.id}`}
              className="post-nav-link post-nav-next"
            >
              <span className="post-nav-dir">
                Newer <FiArrowRight size={13} />
              </span>
              <span className="post-nav-title" title={newer.title}>
                {newer.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

export default BlogDetail;
