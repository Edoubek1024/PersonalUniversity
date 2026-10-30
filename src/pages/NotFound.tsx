import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="card mx-auto max-w-md p-10 text-center animate-rise">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-3">404</p>
      <h1 className="mt-2 text-xl font-semibold">Nothing here</h1>
      <p className="mt-2 text-sm text-ink-2">That subject or lesson does not exist, or its ID changed.</p>
      <Link to="/" className="btn-primary mt-4">
        Back to dashboard
      </Link>
    </div>
  );
}
