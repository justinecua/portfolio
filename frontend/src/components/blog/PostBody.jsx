function PostBody({ content }) {
  if (!content || !content.length)
    return <p className="muted">No content available.</p>;

  return (
    <div className="post-body">
      {content.map((block, i) => {
        if (block.type === "h2")
          return (
            <h2 key={i} className="post-h2">
              {block.text}
            </h2>
          );

        if (block.type === "code")
          return (
            <pre key={i} className="post-code">
              <code>{block.text}</code>
            </pre>
          );

        return (
          <p key={i} className="post-p">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default PostBody;
