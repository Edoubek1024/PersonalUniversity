export interface WidgetProps {
  /** The JSON parameters from the block (empty object when there are none). */
  params: Record<string, unknown>;
  /** Free text after the parameters (after `---`), or the whole block when it has no JSON. */
  body: string;
}
