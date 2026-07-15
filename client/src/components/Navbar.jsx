import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Search, User, ChevronDown, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/sign-in');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <img
            src="/client/public/logo.svg"
            alt="Go Sharm Logo"
            className="h-8 w-auto"
          />  
        </Link>

        <div className="mx-auto hidden max-w-md flex-1 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 dark:border-slate-700 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Explore Sharm Elsheikh"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <nav className="ml-auto flex items-center gap-3">
          <Link
            to="/explore"
            className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200 sm:flex"
          >
            <Compass size={18} />
            Explore
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          

          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-1 rounded-full border border-slate-200 p-1 pr-2 dark:border-slate-700"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
                    <User size={16} />
                  </span>
                )}
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-card dark:border-slate-700 dark:bg-slate-900">
                  <p className="truncate px-4 py-2 text-xs text-slate-400">{user?.email}</p>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/trips"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Trips
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/sign-in"
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="hidden text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200 sm:block"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
