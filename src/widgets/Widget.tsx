/**
 * Renders one ```interactive block (see ./parse.ts). Each widget in ./w/ is its own chunk, loaded
 * the first time a lesson uses it, so widgets add nothing to the initial page load.
 */
import { Component, lazy, Suspense, type ComponentType, type ReactNode } from 'react';
import { parseBlock } from './parse';
import type { WidgetProps } from './types';

const modules = import.meta.glob<{ default: ComponentType<WidgetProps> }>('./w/*.tsx');
const cache = new Map<string, ComponentType<WidgetProps>>();

function load(name: string): ComponentType<WidgetProps> | null {
  const loader = modules[`./w/${name}.tsx`];
  if (!loader) return null;
  let C = cache.get(name);
  if (!C) {
    C = lazy(loader);
    cache.set(name, C);
  }
  return C;
}

export function Widget({ source }: { source: string }) {
  const block = parseBlock(source);
  const C = load(block.name);
  if (!C) return <WidgetError name={block.name} message={`no interactive named "${block.name}"`} />;
  if (block.error) return <WidgetError name={block.name} message={block.error} />;
  return (
    <div data-widget={block.name} className="not-prose">
      <Boundary name={block.name}>
        <Suspense fallback={<div className="card my-6 flex h-64 items-center justify-center text-sm text-ink-3">Loading interactive…</div>}>
          <C params={block.params} body={block.body} />
        </Suspense>
      </Boundary>
    </div>
  );
}

function WidgetError({ name, message }: { name: string; message: string }) {
  return (
    <div data-widget-error={name} role="alert" className="my-6 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
      Interactive “{name}” could not be shown: {message}
    </div>
  );
}

class Boundary extends Component<{ name: string; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) return <WidgetError name={this.props.name} message={this.state.error.message} />;
    return this.props.children;
  }
}
