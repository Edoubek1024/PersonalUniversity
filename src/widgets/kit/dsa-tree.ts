/**
 * Binary search tree, AVL tree and left-leaning red-black tree (Sedgewick's LLRB, the binary
 * encoding of a 2-3 tree) with step recording. Every structural change is followed by a snapshot
 * of the whole tree taken from the real root, so rotations are shown one at a time.
 * Pure TypeScript, testable with `npx tsx`.
 */
export type TreeMode = 'bst' | 'avl' | 'rb';
export type THl = 'path' | 'compare' | 'found' | 'new' | 'remove' | 'succ' | 'rot';

export interface TNode {
  id: number;
  key: number;
  left: TNode | null;
  right: TNode | null;
  /** AVL: stored height (leaf = 0). */
  h: number;
  /** LLRB: the link from the parent to this node is red. */
  red: boolean;
}

export interface FlatNode {
  id: number;
  key: number;
  l: number | null;
  r: number | null;
  red: boolean;
}

export interface TreeSnap {
  nodes: FlatNode[];
  root: number | null;
  hl: Record<number, THl>;
  labels: Record<number, string>;
  d: string;
  /** Comparisons made by the current operation so far. */
  cmp: number;
}

export interface TreeRun {
  snaps: TreeSnap[];
  root: TNode | null;
}

let nextId = 1;
const mk = (key: number, red = false): TNode => ({ id: nextId++, key, left: null, right: null, h: 0, red });

export function cloneTree(t: TNode | null): TNode | null {
  if (!t) return null;
  return { ...t, left: cloneTree(t.left), right: cloneTree(t.right) };
}

const ht = (t: TNode | null): number => (t ? t.h : -1);
const upd = (t: TNode) => {
  t.h = 1 + Math.max(ht(t.left), ht(t.right));
};
const bfOf = (t: TNode) => ht(t.left) - ht(t.right);
const isRed = (t: TNode | null) => !!t && t.red;

class Rec {
  snaps: TreeSnap[] = [];
  path: Record<number, THl> = {};
  cmp = 0;
  constructor(
    public root: TNode | null,
    public quiet = false,
  ) {}
  snap(d: string, hl: Record<number, THl> = {}, labels: Record<number, string> = {}) {
    if (this.quiet) return;
    const nodes: FlatNode[] = [];
    const walk = (t: TNode | null) => {
      if (!t) return;
      nodes.push({ id: t.id, key: t.key, l: t.left?.id ?? null, r: t.right?.id ?? null, red: t.red });
      walk(t.left);
      walk(t.right);
    };
    walk(this.root);
    this.snaps.push({ nodes, root: this.root?.id ?? null, hl: { ...this.path, ...hl }, labels, d, cmp: this.cmp });
  }
}

/* ------------------------------------------------------------------ plain BST */

function bstSearch(R: Rec, key: number): { node: TNode | null; parent: TNode | null; side: 'left' | 'right' | null; stack: { node: TNode; side: 'left' | 'right' }[] } {
  let t = R.root;
  let parent: TNode | null = null;
  let side: 'left' | 'right' | null = null;
  const stack: { node: TNode; side: 'left' | 'right' }[] = [];
  while (t) {
    R.cmp++;
    if (key === t.key) {
      return { node: t, parent, side, stack };
    }
    const goLeft = key < t.key;
    R.snap(`Compare ${key} with ${t.key}: ${goLeft ? `smaller, go left` : `larger, go right`}.`, { [t.id]: 'compare' });
    R.path[t.id] = 'path';
    parent = t;
    side = goLeft ? 'left' : 'right';
    stack.push({ node: t, side });
    t = goLeft ? t.left : t.right;
  }
  return { node: null, parent, side, stack };
}

function attach(R: Rec, parent: TNode | null, side: 'left' | 'right' | null, n: TNode | null) {
  if (!parent || !side) R.root = n;
  else parent[side] = n;
}

/* ------------------------------------------------------------------ AVL helpers */

function rotRight(x: TNode): TNode {
  const y = x.left!;
  x.left = y.right;
  y.right = x;
  upd(x);
  upd(y);
  return y;
}
function rotLeft(x: TNode): TNode {
  const y = x.right!;
  x.right = y.left;
  y.left = x;
  upd(x);
  upd(y);
  return y;
}

/** Walk back up `stack` (root first) updating heights and rotating where |bf| = 2. */
function avlRebalance(R: Rec, stack: { node: TNode; side: 'left' | 'right' }[], insert: boolean) {
  for (let k = stack.length - 1; k >= 0; k--) {
    const x = stack[k].node;
    const parent = k > 0 ? stack[k - 1].node : null;
    const pside = k > 0 ? stack[k - 1].side : null;
    const oldH = x.h;
    upd(x);
    const bf = bfOf(x);
    if (Math.abs(bf) < 2) {
      R.snap(`Back up at ${x.key}: height ${x.h}, balance factor h(left) − h(right) = ${bf > 0 ? '+' : ''}${bf}. Fine.`, { [x.id]: 'compare' });
      if (insert && x.h === oldH) {
        R.snap(`The height of ${x.key}'s subtree did not change, so no ancestor's balance changed either: stop.`, {});
        return;
      }
      continue;
    }
    const setChild = (n: TNode) => attach(R, parent, pside, n);
    if (bf === 2) {
      const y = x.left!;
      if (bfOf(y) >= 0) {
        R.snap(`${x.key} has balance factor +2 and its left child ${y.key} has ${bfOf(y) > 0 ? '+1' : '0'}: LL case, rotate right at ${x.key}.`, { [x.id]: 'rot', [y.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y' });
        const n = rotRight(x);
        setChild(n);
        R.snap(`Rotated right: ${y.key} moved up, ${x.key} became its right child. In-order sequence unchanged.`, { [n.id]: 'rot', [x.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y' });
      } else {
        const z = y.right!;
        R.snap(`${x.key} has balance factor +2 but its left child ${y.key} leans right (−1): LR case, rotate left at ${y.key}, then right at ${x.key}.`, { [x.id]: 'rot', [y.id]: 'rot', [z.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y', [z.id]: 'Z' });
        x.left = rotLeft(y);
        R.snap(`Step 1: rotated left at ${y.key}; now it is an LL shape.`, { [x.id]: 'rot', [y.id]: 'rot', [z.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y', [z.id]: 'Z' });
        const n = rotRight(x);
        setChild(n);
        R.snap(`Step 2: rotated right at ${x.key}; ${z.key} is the new subtree root with ${y.key} and ${x.key} as children.`, { [x.id]: 'rot', [y.id]: 'rot', [z.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y', [z.id]: 'Z' });
      }
    } else {
      const y = x.right!;
      if (bfOf(y) <= 0) {
        R.snap(`${x.key} has balance factor −2 and its right child ${y.key} has ${bfOf(y) < 0 ? '−1' : '0'}: RR case, rotate left at ${x.key}.`, { [x.id]: 'rot', [y.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y' });
        const n = rotLeft(x);
        setChild(n);
        R.snap(`Rotated left: ${y.key} moved up, ${x.key} became its left child. In-order sequence unchanged.`, { [n.id]: 'rot', [x.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y' });
      } else {
        const z = y.left!;
        R.snap(`${x.key} has balance factor −2 but its right child ${y.key} leans left (+1): RL case, rotate right at ${y.key}, then left at ${x.key}.`, { [x.id]: 'rot', [y.id]: 'rot', [z.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y', [z.id]: 'Z' });
        x.right = rotRight(y);
        R.snap(`Step 1: rotated right at ${y.key}; now it is an RR shape.`, { [x.id]: 'rot', [y.id]: 'rot', [z.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y', [z.id]: 'Z' });
        const n = rotLeft(x);
        setChild(n);
        R.snap(`Step 2: rotated left at ${x.key}; ${z.key} is the new subtree root with ${x.key} and ${y.key} as children.`, { [x.id]: 'rot', [y.id]: 'rot', [z.id]: 'rot' }, { [x.id]: 'X', [y.id]: 'Y', [z.id]: 'Z' });
      }
    }
    if (insert) {
      R.snap(`After an insertion one rebalance restores this subtree's old height, so nothing above changes: done.`, {});
      return;
    }
  }
}

/* ------------------------------------------------------------------ BST / AVL ops */

function bstInsert(R: Rec, key: number, avl: boolean) {
  const s = bstSearch(R, key);
  if (s.node) {
    R.path[s.node.id] = 'path';
    R.snap(`${key} is already in the tree: nothing to insert.`, { [s.node.id]: 'found' });
    return;
  }
  const n = mk(key);
  attach(R, s.parent, s.side, n);
  R.snap(s.parent ? `Fell off the tree as the ${s.side} child of ${s.parent.key}: attach ${key} there as a new leaf.` : `The tree is empty: ${key} becomes the root.`, { [n.id]: 'new' });
  if (avl) avlRebalance(R, s.stack, true);
}

function bstDelete(R: Rec, key: number, avl: boolean) {
  const s = bstSearch(R, key);
  if (!s.node) {
    R.snap(`${key} is not in the tree: nothing to delete.`);
    return;
  }
  const z = s.node;
  R.path[z.id] = 'path';
  const stack = s.stack;
  if (!z.left && !z.right) {
    R.snap(`Found ${key}. Case 1: it is a leaf, so simply remove it.`, { [z.id]: 'remove' });
    attach(R, s.parent, s.side, null);
    delete R.path[z.id];
    R.snap(`Removed ${key}.`);
  } else if (!z.left || !z.right) {
    const c = (z.left ?? z.right)!;
    R.snap(`Found ${key}. Case 2: it has one child (${c.key}), so the child takes its place.`, { [z.id]: 'remove', [c.id]: 'succ' });
    attach(R, s.parent, s.side, c);
    delete R.path[z.id];
    R.snap(`Replaced ${key} by its child ${c.key}; everything in that subtree is still on the correct side of ${s.parent ? s.parent.key : 'the root'}.`, { [c.id]: 'succ' });
  } else {
    R.snap(`Found ${key}. Case 3: two children. Its in-order successor is the minimum of the right subtree: go right once, then left as far as possible.`, { [z.id]: 'remove' });
    stack.push({ node: z, side: 'right' });
    let p = z;
    let side: 'left' | 'right' = 'right';
    let t = z.right!;
    while (t.left) {
      R.cmp++;
      R.path[t.id] = 'path';
      R.snap(`${t.key} has a left child: keep going left.`, { [z.id]: 'remove', [t.id]: 'compare' });
      stack.push({ node: t, side: 'left' });
      p = t;
      side = 'left';
      t = t.left;
    }
    R.snap(`The successor is ${t.key} (no left child). Copy ${t.key} into the node holding ${key}.`, { [z.id]: 'remove', [t.id]: 'succ' }, { [t.id]: 's' });
    const old = z.key;
    z.key = t.key;
    R.snap(`Copied: the node now holds ${t.key}. Remove the old successor node, which has at most one child (case 1 or 2).`, { [z.id]: 'found', [t.id]: 'remove' }, { [t.id]: 's' });
    p[side] = t.right;
    delete R.path[t.id];
    R.snap(`Removed the duplicate ${t.key}${t.right ? `, its right child ${t.right.key} moves up` : ''}. ${old} is gone and the BST order holds.`, { [z.id]: 'found' });
  }
  if (avl) avlRebalance(R, stack, false);
}

function bstFind(R: Rec, key: number) {
  const s = bstSearch(R, key);
  if (s.node) {
    R.path[s.node.id] = 'path';
    R.snap(`Compare ${key} with ${s.node.key}: equal. Found after ${R.cmp} comparison${R.cmp === 1 ? '' : 's'} on a path of length ${s.stack.length}.`, { [s.node.id]: 'found' });
  } else R.snap(`Reached an empty child: ${key} is not in the tree (${R.cmp} comparisons). An insert would attach it right here.`);
}

/* ------------------------------------------------------------------ LLRB */

type Attach = (n: TNode | null) => void;

function rbRotL(R: Rec, h: TNode, at: Attach): TNode {
  const x = h.right!;
  h.right = x.left;
  x.left = h;
  x.red = h.red;
  h.red = true;
  at(x);
  R.snap(`Right-leaning red link at ${h.key}: rotate left, so ${x.key} moves up and the red link leans left.`, { [x.id]: 'rot', [h.id]: 'rot' }, { [h.id]: 'h', [x.id]: 'x' });
  return x;
}
function rbRotR(R: Rec, h: TNode, at: Attach, why: string): TNode {
  const x = h.left!;
  h.left = x.right;
  x.right = h;
  x.red = h.red;
  h.red = true;
  at(x);
  R.snap(`${why}: rotate right at ${h.key}, so ${x.key} moves up.`, { [x.id]: 'rot', [h.id]: 'rot' }, { [h.id]: 'h', [x.id]: 'x' });
  return x;
}
function rbFlip(R: Rec, h: TNode, why: string) {
  h.red = !h.red;
  if (h.left) h.left.red = !h.left.red;
  if (h.right) h.right.red = !h.right.red;
  R.snap(`${why}: flip the colours of ${h.key} and its two children.`, { [h.id]: 'rot', ...(h.left ? { [h.left.id]: 'rot' as THl } : {}), ...(h.right ? { [h.right.id]: 'rot' as THl } : {}) });
}
function rbBalance(R: Rec, h: TNode, at: Attach): TNode {
  if (isRed(h.right) && !isRed(h.left)) h = rbRotL(R, h, at);
  if (isRed(h.left) && isRed(h.left!.left)) h = rbRotR(R, h, at, `Two red links in a row below ${h.key} (a temporary 4-node)`);
  if (isRed(h.left) && isRed(h.right)) rbFlip(R, h, `Both children of ${h.key} are red (a 4-node)`);
  return h;
}

function rbPut(R: Rec, h: TNode | null, key: number, at: Attach): TNode {
  if (!h) {
    const n = mk(key, true);
    at(n);
    R.snap(`Attach ${key} as a new node with a red link to its parent (it joins the parent's 2-3 node).`, { [n.id]: 'new' });
    return n;
  }
  R.cmp++;
  if (key === h.key) {
    R.snap(`${key} is already in the tree.`, { [h.id]: 'found' });
    return h;
  }
  const goLeft = key < h.key;
  R.snap(`Compare ${key} with ${h.key}: go ${goLeft ? 'left' : 'right'}.`, { [h.id]: 'compare' });
  R.path[h.id] = 'path';
  if (goLeft) rbPut(R, h.left, key, (n) => (h.left = n));
  else rbPut(R, h.right, key, (n) => (h.right = n));
  return rbBalance(R, h, at);
}

function rbMoveRedLeft(R: Rec, h: TNode, at: Attach): TNode {
  rbFlip(R, h, `Going left from ${h.key} into a 2-node: borrow by combining`);
  if (isRed(h.right!.left)) {
    h.right = rbRotR(R, h.right!, (n) => (h.right = n), `The right sibling has a key to spare`);
    h = rbRotL(R, h, at);
    rbFlip(R, h, `Split the borrowed key back off`);
  }
  return h;
}
function rbMoveRedRight(R: Rec, h: TNode, at: Attach): TNode {
  rbFlip(R, h, `Going right from ${h.key} into a 2-node: borrow by combining`);
  if (isRed(h.left!.left)) {
    h = rbRotR(R, h, at, `The left sibling has a key to spare`);
    rbFlip(R, h, `Split the borrowed key back off`);
  }
  return h;
}
function rbDeleteMin(R: Rec, h: TNode, at: Attach): TNode | null {
  if (!h.left) {
    at(null);
    R.snap(`Removed the old successor node.`);
    return null;
  }
  if (!isRed(h.left) && !isRed(h.left.left)) h = rbMoveRedLeft(R, h, at);
  rbDeleteMin(R, h.left!, (n) => (h.left = n));
  return rbBalance(R, h, at);
}
function rbDel(R: Rec, h: TNode, key: number, at: Attach): TNode | null {
  R.path[h.id] = 'path';
  if (key < h.key) {
    R.cmp++;
    R.snap(`Compare ${key} with ${h.key}: go left.`, { [h.id]: 'compare' });
    if (!isRed(h.left) && !isRed(h.left!.left)) h = rbMoveRedLeft(R, h, at);
    rbDel(R, h.left!, key, (n) => (h.left = n));
  } else {
    if (isRed(h.left)) h = rbRotR(R, h, at, `Lean the red link right so a key can be removed from the right`);
    if (key === h.key && !h.right) {
      at(null);
      delete R.path[h.id];
      R.snap(`${key} is at the bottom in a 3-node: remove it.`);
      return null;
    }
    R.cmp++;
    if (!isRed(h.right) && !isRed(h.right!.left)) h = rbMoveRedRight(R, h, at);
    if (key === h.key) {
      let m = h.right!;
      while (m.left) m = m.left;
      R.snap(`Found ${key}: replace it by its successor ${m.key}, the minimum of the right subtree, then delete that minimum.`, { [h.id]: 'found', [m.id]: 'succ' }, { [m.id]: 's' });
      h.key = m.key;
      rbDeleteMin(R, h.right!, (n) => (h.right = n));
    } else {
      R.snap(`Compare ${key} with ${h.key}: go right.`, { [h.id]: 'compare' });
      rbDel(R, h.right!, key, (n) => (h.right = n));
    }
  }
  return rbBalance(R, h, at);
}

function contains(t: TNode | null, key: number): boolean {
  while (t) {
    if (key === t.key) return true;
    t = key < t.key ? t.left : t.right;
  }
  return false;
}

/* ------------------------------------------------------------------ public API */

export type TreeOp = { op: 'insert' | 'delete' | 'search'; key: number };

export function runTreeOp(root: TNode | null, op: TreeOp, mode: TreeMode, quiet = false): TreeRun {
  const R = new Rec(cloneTree(root), quiet);
  const k = op.key;
  const verb = op.op === 'insert' ? 'Insert' : op.op === 'delete' ? 'Delete' : 'Search for';
  R.snap(`${verb} ${k}${mode === 'avl' ? ' (AVL)' : mode === 'rb' ? ' (left-leaning red-black)' : ''}: start at the root.`);
  if (op.op === 'search') bstFind(R, k);
  else if (mode !== 'rb') {
    if (op.op === 'insert') bstInsert(R, k, mode === 'avl');
    else bstDelete(R, k, mode === 'avl');
  } else if (op.op === 'insert') {
    R.root = rbPut(R, R.root, k, (n) => (R.root = n));
    if (R.root.red) {
      R.root.red = false;
      R.snap(`The root is always black: recolour it.`, { [R.root.id]: 'rot' });
    }
  } else {
    if (!contains(R.root, k)) R.snap(`${k} is not in the tree: nothing to delete.`);
    else {
      const root = R.root!;
      if (!isRed(root.left) && !isRed(root.right)) root.red = true;
      R.root = rbDel(R, root, k, (n) => (R.root = n));
      if (R.root && R.root.red) {
        R.root.red = false;
        R.snap(`Recolour the root black.`);
      }
    }
  }
  R.path = {};
  R.snap(`Done. ${R.cmp} key comparison${R.cmp === 1 ? '' : 's'}.`);
  return { snaps: R.snaps, root: R.root };
}

/** Apply a sequence of operations silently. */
export function replay(ops: TreeOp[], mode: TreeMode): TNode | null {
  let root: TNode | null = null;
  for (const o of ops) if (o.op !== 'search') root = runTreeOp(root, o, mode, true).root;
  return root;
}

/** Height in edges (empty tree −1). */
export function heightOf(t: TNode | null): number {
  return t ? 1 + Math.max(heightOf(t.left), heightOf(t.right)) : -1;
}
export function sizeOf(t: TNode | null): number {
  return t ? 1 + sizeOf(t.left) + sizeOf(t.right) : 0;
}

/** Throws if the tree breaks the invariants of its mode (used by tests). */
export function check(t: TNode | null, mode: TreeMode): void {
  const keys: number[] = [];
  const inorder = (x: TNode | null) => {
    if (!x) return;
    inorder(x.left);
    keys.push(x.key);
    inorder(x.right);
  };
  inorder(t);
  for (let i = 1; i < keys.length; i++) if (!(keys[i - 1] < keys[i])) throw new Error('BST order broken');
  if (mode === 'avl') {
    const h = (x: TNode | null): number => {
      if (!x) return -1;
      const l = h(x.left);
      const r = h(x.right);
      if (Math.abs(l - r) > 1) throw new Error(`AVL balance broken at ${x.key}`);
      if (x.h !== 1 + Math.max(l, r)) throw new Error(`stale height at ${x.key}`);
      return 1 + Math.max(l, r);
    };
    h(t);
  }
  if (mode === 'rb') {
    if (t && t.red) throw new Error('red root');
    const bh = (x: TNode | null): number => {
      if (!x) return 0;
      if (isRed(x.right)) throw new Error(`right-leaning red at ${x.key}`);
      if (x.red && isRed(x.left)) throw new Error(`two reds at ${x.key}`);
      const l = bh(x.left);
      const r = bh(x.right);
      if (l !== r) throw new Error(`black height differs at ${x.key}`);
      return l + (x.red ? 0 : 1);
    };
    bh(t);
  }
}

/** A single snapshot of a tree with no highlights. */
export function stillSnap(root: TNode | null, d: string): TreeSnap {
  const R = new Rec(root);
  R.snap(d);
  return R.snaps[0];
}
