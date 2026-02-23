import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../Spinner";
import PostBody from "./PostBody";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}posts/${id}/`)
      .then((res) => res.json())
      .then((p) =>
        setPost({
          id: p.id,
          title: p.title,
          tag: p.tag,
          excerpt: p.excerpt,
          min: p.read_time,
          date: p.published_date,
          content: p.content || [],
        }),
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-view tab-content">
      {/* back button */}
      <Link to="/blog" className="post-back">
        ← Back to Blog
      </Link>

      <article className="post-article">
        {/* header */}
        <div className="post-header">
          <div className="post-meta-row">
            <span className="blog-tag">{post.tag}</span>
            <span className="blog-min">{post.min}</span>
          </div>

          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>

          <div className="post-byline">
            <span className="post-author">Justine Cua</span>
            <span className="post-sep">·</span>
            <span className="post-date">{post.date}</span>
          </div>
        </div>

        <div className="post-divider" />

        <PostBody content={post.content} />
      </article>
    </div>
  );
}

export default BlogDetail;
