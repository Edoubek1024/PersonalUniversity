import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Bookmark, GraduationCap, LayoutDashboard, Library, Menu, Moon, NotebookPen, Route, Search, Settings, Sun, X } from 'lucide-react';
import { useTheme } from '@/store/theme';
import { SearchDialog } from './SearchDialog';

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/subjects', label: 'Subjects', icon: Library },
  { to: '/paths', label: 'Learning paths', icon: Route },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/notes', label: 'Notes', icon: NotebookPen },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navItems = (
    <ul className="flex flex-col gap-0.5">
      {nav.map((n) => (
        <li key={n.to}>
          <NavLink
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
              }`
            }
          >
            <n.icon size={16} aria-hidden />
            {n.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-surface/80 p-4 backdrop-blur lg:flex" aria-label="Primary">
        <NavLink to="/" className="mb-6 flex items-center gap-2 px-2 text-[15px] font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <GraduationCap size={16} aria-hidden />
          </span>
          Teach Me
        </NavLink>
        <button type="button" onClick={() => setSearchOpen(true)} className="btn-outline mb-4 justify-between text-ink-3">
          <span className="inline-flex items-center gap-2">
            <Search size={14} aria-hidden /> Search
          </span>
          <span className="kbd">⌘K</span>
        </button>
        <nav aria-label="Main navigation">{navItems}</nav>
        <div className="mt-auto flex items-center justify-between px-2 pt-4 text-xs text-ink-3">
          <span>Personal university</span>
          <button type="button" onClick={toggle} className="btn-ghost p-2" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </aside>

      {/* Top bar (mobile) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface/80 px-4 py-3 backdrop-blur lg:hidden">
        <NavLink to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <GraduationCap size={16} aria-hidden />
          </span>
          Teach Me
        </NavLink>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setSearchOpen(true)} className="btn-ghost p-2" aria-label="Search">
            <Search size={18} />
          </button>
          <button type="button" onClick={toggle} className="btn-ghost p-2" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} className="btn-ghost p-2" aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobile-nav">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main navigation" className="border-b border-line bg-surface p-3 lg:hidden animate-fade">
          {navItems}
        </nav>
      )}

      <div className="lg:pl-60">
        <main id="main" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
