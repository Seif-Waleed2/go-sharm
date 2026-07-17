import { Banknote, Car, ChevronDown, Clock3, MapPin, Navigation, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const rideTypes = [
  { name: 'Smart X', seats: 4, base: 10, image: '🚙', description: 'Affordable everyday ride' },
  { name: 'Smart XL', seats: 8, base: 18, image: '🚐', description: 'Extra room for groups' },
  { name: 'Smart VIP', seats: 4, base: 30, image: '🚘', description: 'Premium comfort' },
];

const estimate = ({ pickup, destination, rideType, passengers }) => {
  const type = rideTypes.find((item) => item.name === rideType) || rideTypes[0];
  const distance = Math.max(3, Math.min(28, Math.round(((pickup?.length || 4) + (destination?.length || 5)) / 3)));
  const rate = rideType === 'Smart VIP' ? 2.7 : rideType === 'Smart XL' ? 1.8 : 1.2;
  return Math.round((type.base + distance * rate + Math.max(0, Number(passengers) - 1) * 2) * 100) / 100;
};

export default function RidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = location.state?.trip || location.state?.ride || {};
  const [form, setForm] = useState({ pickup: initial.pickup || '', destination: initial.destination || '', rideType: initial.rideType || 'Smart X', passengers: initial.passengers || 1, date: initial.date ? new Date(initial.date).toISOString().slice(0, 16) : '' });
  const [loading, setLoading] = useState(false);
  const price = useMemo(() => estimate(form), [form]);

  useEffect(() => {
    const selected = rideTypes.find((item) => item.name === form.rideType);
    if (selected && Number(form.passengers) > selected.seats) setForm((current) => ({ ...current, rideType: 'Smart XL' }));
  }, [form.passengers, form.rideType]);

  const submit = async () => {
    if (!form.pickup.trim() || !form.destination.trim()) return toast.error('Add pickup and drop-off locations');
    try {
      setLoading(true);
      const payload = { ...form, date: form.date || new Date().toISOString() };
      const { data } = await api.post('/rides', payload);
      toast.success(`Ride confirmed — $${data.trip.price}`);
      navigate('/trips');
    } catch (error) { toast.error(error.response?.data?.message || 'Could not book the ride'); }
    finally { setLoading(false); }
  };

  return (
    <section className="container-page py-8 lg:py-12">
      <div className="grid gap-8 xl:grid-cols-[310px_430px_1fr]">
        <aside>
          <h1 className="mb-5 flex items-center gap-2 text-3xl font-semibold"><span aria-hidden>←</span> Ride</h1>
          <div className="space-y-3">
            <label className="relative block"><Clock3 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-600" size={19} /><input type="datetime-local" className="input-field !h-14 !bg-brand-50 pl-12 dark:!bg-brand-500/10" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
            <label className="relative block"><Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} /><input className="input-field !h-14 pl-12" placeholder="Pickup Location" value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} /></label>
            <label className="relative block"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} /><input className="input-field !h-14 pl-12" placeholder="Drop-off Location" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} /></label>
            <label className="relative block"><Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} /><select className="input-field !h-14 appearance-none pl-12" value={form.passengers} onChange={(e) => setForm({ ...form, passengers: Number(e.target.value) })}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /></label>
          </div>
        </aside>

        <div>
          <h2 className="border-b border-slate-200 pb-4 text-3xl font-semibold dark:border-white/10">Select a ride</h2>
          <div className="mt-3 space-y-2">
            {rideTypes.map((ride) => {
              const selected = form.rideType === ride.name;
              const ridePrice = estimate({ ...form, rideType: ride.name });
              const unavailable = Number(form.passengers) > ride.seats;
              return <button key={ride.name} type="button" disabled={unavailable} onClick={() => setForm({ ...form, rideType: ride.name })} className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${selected ? 'border-brand-500 bg-brand-50 shadow-sm dark:bg-brand-500/10' : 'border-transparent hover:bg-slate-50 dark:hover:bg-white/5'}`}><span className="text-5xl" aria-hidden>{ride.image}</span><span className="min-w-0 flex-1"><span className="flex items-center gap-2 text-xl font-semibold">{ride.name} <Users size={17} /> {ride.seats}</span><span className="mt-1 block text-xs text-slate-500">{ride.description} · Drop off in ~12 min</span></span><span className="text-xl font-semibold">${ridePrice.toFixed(2)}</span></button>;
            })}
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex h-14 items-center gap-3 rounded-xl border border-slate-300 px-4 dark:border-white/15"><Banknote className="text-emerald-600" /><span>Cash</span><ChevronDown className="ml-auto" size={18} /></div>
            <div className="flex h-14 items-center rounded-xl border border-slate-300 px-4 text-sm dark:border-white/15"><span>Currency</span><span className="ml-auto font-semibold">$ Dollar</span></div>
            <button disabled={loading} onClick={submit} className="btn-primary w-full !h-14">{loading ? 'Confirming...' : `Select ${form.rideType} · $${price.toFixed(2)}`}</button>
          </div>
        </div>

        <div className="min-h-[430px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 xl:min-h-[600px] dark:border-white/10 dark:bg-slate-900">
          <iframe title="Ride route map" className="h-full min-h-[430px] w-full xl:min-h-[600px]" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=34.285%2C27.82%2C34.39%2C27.99&layer=mapnik&marker=27.915%2C34.33" />
        </div>
      </div>
    </section>
  );
}
