import { ArrowRight, CalendarDays, Car, Compass, MapPin, Plane, Route, Search, Sparkles, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PlaceCard from '../components/common/PlaceCard';
import { fallbackPlaces } from '../data/fallbackPlaces';

const events = [
  { name: 'Taj Mahal', label: 'Friday Nights', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85' },
  { name: 'Space Sharm', label: 'Friday Nights', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85' },
  { name: 'Little Buddha', label: 'Live Music', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85' },
  { name: 'La Dolce Vita', label: 'Desert Party', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState(fallbackPlaces);
  const [ride, setRide] = useState({ pickup: '', destination: '', passengers: 1, date: '' });

  useEffect(() => { api.get('/places?limit=8').then(({ data }) => data.places?.length && setPlaces(data.places)).catch(() => {}); }, []);
  const popular = useMemo(() => places.slice(0, 4), [places]);

  const requestRide = (event) => {
    event.preventDefault();
    navigate('/ride', { state: { ride } });
  };

  return (
    <>
      <section className="purple-gradient hero-noise text-white">
        <div className="container-page relative z-10 py-8 sm:py-10">
          <div className="flex flex-wrap gap-3">
            <Link to="/ride" className="chip !border-white/70 !bg-white !text-ink"><Car size={19} /> Ride</Link>
            <Link to="/ride" className="chip !border-white/60 !bg-transparent !text-white"><Plane size={19} /> Airport Pickup</Link>
            <Link to="/ride" className="chip !border-white/60 !bg-transparent !text-white"><Route size={19} /> Round Trip</Link>
            <Link to="/explore" className="chip !border-white/60 !bg-transparent !text-white"><Compass size={19} /> Explore Sharm</Link>
          </div>
          <h1 className="mt-7 text-3xl font-bold sm:text-4xl">Request A Ride</h1>
          <p className="mt-2 text-white/80">Add your trip details, hop in, and go.</p>
          <form onSubmit={requestRide} className="mt-7 grid gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur sm:grid-cols-2 xl:grid-cols-[1.25fr_1.25fr_.9fr_.55fr_.85fr]">
            <label className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} /><input className="h-14 w-full rounded-xl bg-white pl-11 pr-3 text-ink outline-none" placeholder="Pickup Location" value={ride.pickup} onChange={(e) => setRide({ ...ride, pickup: e.target.value })} /></label>
            <label className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} /><input className="h-14 w-full rounded-xl bg-white pl-11 pr-3 text-ink outline-none" placeholder="Drop-off Location" value={ride.destination} onChange={(e) => setRide({ ...ride, destination: e.target.value })} /></label>
            <label className="relative"><CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} /><input className="h-14 w-full rounded-xl bg-white pl-11 pr-3 text-ink outline-none" type="datetime-local" value={ride.date} onChange={(e) => setRide({ ...ride, date: e.target.value })} /></label>
            <label className="relative"><Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} /><select className="h-14 w-full appearance-none rounded-xl bg-white pl-11 pr-3 text-ink outline-none" value={ride.passengers} onChange={(e) => setRide({ ...ride, passengers: Number(e.target.value) })}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n}>{n}</option>)}</select></label>
            <button className="min-h-14 rounded-xl bg-ink px-5 font-semibold text-white transition hover:bg-slate-800">Request A Ride</button>
          </form>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-6 flex items-end justify-between gap-4"><div><h2 className="section-title">Book your tickets in the best places</h2><p className="mt-2 text-sm text-slate-500">Hand-picked nightlife and local experiences.</p></div></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => <article key={event.name} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10"><div className="relative aspect-[1/1.05]"><img src={event.image} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/15" /><div className="absolute inset-x-5 bottom-5 text-white"><p className="text-3xl font-bold">{event.label}</p><p className="mt-2 text-xl">{event.name}</p></div></div><Link to="/explore" className="flex h-14 items-center justify-center gap-2 font-semibold hover:text-brand-600">Book Now <ArrowRight size={17} /></Link></article>)}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="mb-6 flex items-center justify-between"><h2 className="section-title">Most Popular Places in Sharm El Sheikh</h2><Link to="/explore" className="hidden items-center gap-2 text-sm font-semibold text-brand-600 sm:flex">View all <ArrowRight size={17} /></Link></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{popular.map((place) => <PlaceCard key={place._id || place.id} place={place} />)}</div>
      </section>

      <section className="container-page pb-16">
        <div className="purple-gradient grid overflow-hidden rounded-4xl px-6 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
          <div><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm"><Sparkles size={17} /> AI Vacation Planner</span><h2 className="mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">Build a Sharm itinerary around the things you actually love.</h2><p className="mt-4 max-w-xl text-white/80">Choose your dates, trip style and interests. Go Sharm turns them into a practical day-by-day plan.</p></div>
          <Link to="/planner" className="mt-7 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-7 font-bold text-brand-700 lg:mt-0">Plan my vacation <ArrowRight size={19} /></Link>
        </div>
      </section>
    </>
  );
}
