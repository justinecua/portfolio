import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { sectionId } from "../../utils/sectionId";

function CodeBlock({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — nothing to do
    }
  };

  return (
    <figure className="post-code">
      <figcaption className="post-code-bar">
        <span className="post-code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <button type="button" onClick={copy} className="post-code-copy">
          {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre>
        <code>{text}</code>
      </pre>
    </figure>
  );
}

function PostBody({ content }) {
  if (!content || !content.length)
    return <p className="muted">No content available.</p>;

  // the first paragraph is styled as a larger "lead"
  const leadIndex = content.findIndex(
    (b) => b.type !== "h2" && b.type !== "code",
  );

  return (
    <div className="post-body">
      {content.map((block, i) => {
        if (block.type === "h2")
          return (
            <h2 key={i} id={sectionId(i)} className="post-h2">
              <a href={`#${sectionId(i)}`} className="post-anchor">
                #
              </a>
              {block.text}
            </h2>
          );

        if (block.type === "code")
          return <CodeBlock key={i} text={block.text} />;

        return (
          <p key={i} className={`post-p ${i === leadIndex ? "post-lead" : ""}`}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default PostBody;
