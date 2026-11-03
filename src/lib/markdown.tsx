import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { Element, ElementContent } from 'hast';
import { Widget } from '@/widgets/Widget';

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

/**
 * remark-math renders `$$...$$` written on one line as inline math. Give each such line its own
 * `$$` fences so it renders as display math, as the author meant. Code blocks are left alone.
 */
export function fenceDisplayMath(src: string): string {
  if (!src.includes('$$')) return src;
  let inCode = false;
  return src
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inCode = !inCode;
      const m = inCode ? null : /^(\s*)\$\$((?:(?!\$\$).)+)\$\$\s*$/.exec(line);
      return m ? `${m[1]}$$\n${m[1]}${m[2]}\n${m[1]}$$` : line;
    })
    .join('\n');
}

/** The source of a ```interactive fenced block, or null for any other <pre>. */
function interactiveSource(pre: Element | undefined): string | null {
  const code = pre?.children[0];
  if (!code || code.type !== 'element' || code.tagName !== 'code') return null;
  const cls = code.properties.className;
  if (!Array.isArray(cls) || !cls.includes('language-interactive')) return null;
  const text = (n: ElementContent): string => (n.type === 'text' ? n.value : n.type === 'element' ? n.children.map(text).join('') : '');
  return code.children.map(text).join('');
}

/** Renders curriculum Markdown with GFM tables, LaTeX math and ```interactive widgets. */
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
          pre: ({ node, children }) => {
            const src = interactiveSource(node);
            return src === null ? <pre>{children}</pre> : <Widget source={src} />;
          },
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {fenceDisplayMath(children)}
      </ReactMarkdown>
    </div>
  );
}
