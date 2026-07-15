import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Map, Ticket, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/trips', label: 'Trips', icon: Map },
  { to: '/trips#booking', label: 'Booking', icon: Ticket },
  { to: '/account', label: 'My Account', icon: User },
];

export default function ProfileLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-[220px_1fr] lg:px-8">
      <aside>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100"
        >
          <ArrowLeft size={20} /> Profile
        </button>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to.split('#')[0];
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={18} /> Log Out
          </button>
        </nav>
      </aside>

      <main>{children}</main>
    </div>
  );
}
