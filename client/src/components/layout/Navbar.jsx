import { ChevronDown, Compass, Menu, Moon, Search, Sun, UserCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import Logo from '../common/Logo';

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  if (['/login', '/register'].includes(location.pathname)) return null;

  const links = (
    <>
      <NavLink to="/explore" onClick={() => setOpen(false)} className="nav-link"><Compass size={17} /> Explore</NavLink>
      {isAuthenticated ? (
        <Link to="/account" onClick={() => setOpen(false)} className="nav-link"><UserCircle2 size={19} /> <span className="max-w-24 truncate">{user?.name?.split(' ')[0] || 'Profile'}</span></Link>
      ) : (
        <>
          <Link to="/login" onClick={() => setOpen(false)} className="btn-primary !px-6 !py-2.5">Sign in</Link>
          <Link to="/register" onClick={() => setOpen(false)} className="nav-link">Register</Link>
        </>
      )}
      <button type="button" onClick={toggleTheme} className="icon-btn" aria-label="Toggle color theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
      <div className="container-page flex h-[82px] items-center justify-between gap-5">
        <Logo />
        <label className="relative hidden w-full max-w-[390px] md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input className="h-11 w-full rounded-full border border-slate-300 bg-transparent pl-11 pr-4 text-sm outline-none focus:border-brand-500 dark:border-white/15" placeholder="Explore Sharm ElSheikh" />
        </label>
        <nav className="hidden items-center gap-5 lg:flex">{links}</nav>
        <button type="button" className="icon-btn lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container-page flex flex-col gap-2 border-t border-slate-200 py-4 lg:hidden dark:border-white/10">{links}</nav>}
    </header>
  );
}
