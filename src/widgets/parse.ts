/**
 * Interactive widgets are embedded in lesson Markdown as a fenced block:
 *
 *   ```interactive
 *   function-explorer
 *   {"f": "a*sin(b*x)", "params": {"a": [1, -3, 3]}}
 *   ---
 *   optional free text (code for the Python cell, for example)
 *   ```
 *
 * Line 1 names the widget (a file in src/widgets/w/). If the rest starts with `{`, everything up
 * to a line containing only `---` (or the end) is a JSON object of parameters, and anything after
 * that line is the body. Otherwise the whole rest is the body. This file has no React or Vite
 * dependencies so the validator can use it.
 */

export interface WidgetBlock {
  name: string;
  params: Record<string, unknown>;
  body: string;
  /** Set when the parameters are not a valid JSON object. */
  error?: string;
}

export function parseBlock(source: string): WidgetBlock {
  const lines = source.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n');
  const name = (lines.shift() ?? '').trim();
  const rest = lines.join('\n');
  if (!rest.trimStart().startsWith('{')) return { name, params: {}, body: rest };
  const sep = lines.findIndex((l) => l.trim() === '---');
  const json = sep === -1 ? rest : lines.slice(0, sep).join('\n');
  const body = sep === -1 ? '' : lines.slice(sep + 1).join('\n');
  try {
    const params = JSON.parse(json) as unknown;
    if (!params || typeof params !== 'object' || Array.isArray(params)) {
      return { name, params: {}, body, error: 'parameters must be a JSON object' };
    }
    return { name, params: params as Record<string, unknown>, body };
  } catch (e) {
    return { name, params: {}, body, error: `invalid JSON parameters: ${(e as Error).message}` };
  }
}

const FENCE = /^[ \t]*```interactive[ \t]*\n([\s\S]*?)\n[ \t]*```[ \t]*$/gm;

/** Every interactive block in a Markdown string, in order. */
export function findBlocks(markdown: string): WidgetBlock[] {
  return [...markdown.replace(/\r\n/g, '\n').matchAll(FENCE)].map((m) => parseBlock(m[1]));
}

/** The Markdown with interactive blocks removed, for word counts. */
export function stripBlocks(markdown: string): string {
  return markdown.replace(/\r\n/g, '\n').replace(FENCE, '');
}
