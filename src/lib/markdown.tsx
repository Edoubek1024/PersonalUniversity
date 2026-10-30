import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeKatex];

/**
 * Renders a short single-line string (summary, objective, concept, question)
 * with inline Markdown and LaTeX, without wrapping it in a paragraph.
 * Plain strings with no markup skip the parser entirely.
 */
export function Inline({ children }: { children: string }) {
  if (!/[$*_`[\\]/.test(children)) return <>{children}</>;
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={{
        p: ({ children }) => <>{children}</>,
        code: ({ children }) => <code className="rounded bg-surface-2 px-1 font-mono text-[0.9em] [overflow-wrap:anywhere]">{children}</code>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

/** Renders curriculum Markdown with GFM tables and LaTeX math. */
export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`prose-lesson ${className}`}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={{
          a: ({ href, children }) => (
            <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
