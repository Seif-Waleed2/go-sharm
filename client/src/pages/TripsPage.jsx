import { ArrowRightLeft, CalendarDays, MapPin, ReceiptText } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import ProfileSidebar from '../components/layout/ProfileSidebar';

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => { api.get('/trips').then(({ data }) => setTrips(data.trips || [])).catch(() => setTrips([])).finally(() => setLoading(false)); }, []);
  const visible = useMemo(() => {
    if (filter === 'all') return trips;
    const limit = new Date(); limit.setMonth(limit.getMonth() - Number(filter));
    return trips.filter((trip) => new Date(trip.date) >= limit);
  }, [trips, filter]);

  return (
    <section className="container-page py-8 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
        <ProfileSidebar />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><h1 className="text-4xl font-semibold">Trips</h1><div className="flex gap-3"><select className="h-11 rounded-full bg-slate-100 px-5 text-sm outline-none dark:bg-white/5"><option>All Trips</option></select><select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-11 rounded-full bg-slate-100 px-5 text-sm outline-none dark:bg-white/5"><option value="all">All time</option><option value="3">Last 3 Months</option><option value="6">Last 6 Months</option></select></div></div>
          {loading ? <Loader label="Loading your trips..." /> : visible.length ? <div className="mt-8 space-y-5">{visible.map((trip) => <article key={trip._id} className="surface grid gap-5 p-4 sm:grid-cols-[220px_1fr_auto] sm:p-5"><div className="map-pattern relative min-h-40 overflow-hidden rounded-xl"><div className="absolute left-7 top-7 h-4 w-4 rounded-full bg-brand-600 ring-4 ring-white dark:ring-slate-900" /><div className="absolute bottom-8 right-10 h-4 w-4 rounded-full bg-rose-500 ring-4 ring-white dark:ring-slate-900" /><span className="absolute left-9 top-8 h-0.5 w-[65%] rotate-[18deg] bg-brand-500" /></div><div className="flex min-w-0 flex-col"><p className="text-sm font-semibold">{new Date(trip.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</p><h2 className="mt-4 flex items-start gap-2 text-base font-semibold"><MapPin className="mt-0.5 shrink-0 text-brand-600" size={17} /><span>{trip.pickup} → {trip.destination}</span></h2><p className="mt-2 text-sm text-slate-500">{trip.rideType} · {trip.passengers} passenger{trip.passengers > 1 ? 's' : ''}</p><div className="mt-auto flex flex-wrap gap-3 pt-5"><button className="btn-secondary !min-h-10 !rounded-full !px-4 !py-2 text-sm"><ReceiptText size={16} /> Details</button><button onClick={() => navigate('/ride', { state: { trip } })} className="btn-secondary !min-h-10 !rounded-full !border-transparent !bg-slate-100 !px-4 !py-2 text-sm dark:!bg-white/5"><ArrowRightLeft size={16} /> Rebook</button></div></div><p className="text-2xl font-bold sm:text-right">${trip.price.toFixed(2)}</p></article>)}</div> : <div className="mt-8"><EmptyState title="No trips yet" text="Your completed and upcoming rides will appear here after your first booking." actionLabel="Request a ride" to="/ride" /></div>}
        </div>
        <aside className="w-full shrink-0 lg:w-72"><div className="overflow-hidden rounded-2xl bg-brand-50 p-5 dark:bg-brand-500/10"><div className="grid h-40 place-items-center rounded-xl bg-gradient-to-br from-sky-100 to-brand-100 text-7xl dark:from-slate-800 dark:to-brand-900/40">✈️</div><h2 className="mt-5 text-lg font-bold">Get A Ride In Just 1 Minute!</h2><p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">Tap, book and go. Your driver arrives quickly.</p><Link to="/ride" className="btn-primary mt-5 w-full">Request A Ride</Link></div></aside>
      </div>
    </section>
  );
}
