import { CalendarCheck, LogOut, Route, UserRound } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const items = [
  { to: '/trips', label: 'Trips', icon: Route },
  { to: '/ride', label: 'Booking', icon: CalendarCheck },
  { to: '/account', label: 'My Account', icon: UserRound },
];

export default function ProfileSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div className="mb-6 flex items-center gap-2 text-2xl font-semibold lg:mb-10"><span aria-hidden>←</span> Profile</div>
      <nav className="grid grid-cols-3 gap-2 lg:grid-cols-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition lg:justify-start ${isActive ? 'bg-brand-600 text-white shadow-brand' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5'}`}>
            <Icon size={18} /> <span>{label}</span>
          </NavLink>
        ))}
        <button type="button" onClick={handleLogout} className="flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-500 transition hover:bg-rose-50 lg:mt-3 lg:justify-start dark:hover:bg-rose-500/10">
          <LogOut size={18} /> <span>Log Out</span>
        </button>
      </nav>
    </aside>
  );
}
