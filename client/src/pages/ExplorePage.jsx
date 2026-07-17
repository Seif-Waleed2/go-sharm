import { Compass, Search, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/common/Loader';
import PlaceCard from '../components/common/PlaceCard';
import { fallbackPlaces } from '../data/fallbackPlaces';

const categories = ['All', 'Beaches', 'Restaurants', 'Safari', 'Shopping', 'Diving', 'Entertainment'];
const emoji = { All: '✨', Beaches: '🏖️', Restaurants: '🍽️', Safari: '🌴', Shopping: '🛍️', Diving: '🤿', Entertainment: '🎭' };
// Maps the UI category labels above to the actual `category` enum values stored on the Place model.
const categoryToBackendValues = {
  Beaches: ['Beach'],
  Restaurants: ['Restaurant'],
  Safari: ['Safari Excursion'],
  Shopping: ['Shopping', 'Bazar'],
  Diving: ['Diving Centers'],
  Entertainment: ['Entertainment', 'Mountain Lounge'],
};

export default function ExplorePage() {
  const [places, setPlaces] = useState(fallbackPlaces);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => { api.get('/places').then(({ data }) => data.places?.length && setPlaces(data.places)).catch(() => {}).finally(() => setLoading(false)); }, []);
  const filtered = useMemo(() => places.filter((place) => (category === 'All' || (categoryToBackendValues[category] || [category]).includes(place.category)) && `${place.name} ${place.location} ${place.description}`.toLowerCase().includes(query.toLowerCase())), [places, query, category]);

  return (
    <>
      <section className="purple-gradient hero-noise text-white">
        <div className="container-page relative z-10 py-9 sm:py-12">
          <div className="flex flex-wrap gap-3"><Link className="chip !border-white/50 !bg-transparent !text-white" to="/ride">🚕 Ride</Link><Link className="chip !border-white/50 !bg-transparent !text-white" to="/ride">✈ Airport Pickup</Link><Link className="chip !border-white/50 !bg-transparent !text-white" to="/ride">🚐 Round Trip</Link><span className="chip !border-white !bg-white !text-ink"><Compass size={18} /> Explore Sharm</span></div>
          <h1 className="mt-7 text-3xl font-bold italic sm:text-4xl">Explore Sharm El Sheikh with us</h1>
          <Link to="/planner" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white px-5 py-2.5 font-semibold"><Sparkles size={18} /> Plan My Vacation With AI</Link>
          <p className="mt-3 text-sm text-white/80">Get personalized recommendations guided by your interests.</p>
          <label className="relative mt-6 block max-w-2xl"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} /><input className="h-14 w-full rounded-xl bg-white pl-12 pr-32 text-ink outline-none" placeholder="Places to go, events, parties, beaches" value={query} onChange={(e) => setQuery(e.target.value)} /><span className="absolute right-2 top-2 hidden h-10 items-center rounded-lg bg-ink px-7 text-sm font-semibold text-white sm:flex">Explore</span></label>
        </div>
      </section>
      <section className="container-page py-8 sm:py-10">
        <h2 className="section-title">Categories</h2>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-3">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`chip shrink-0 ${category === item ? '!border-brand-500 !bg-brand-50 !text-brand-700 dark:!bg-brand-500/15' : ''}`}><span>{emoji[item]}</span>{item}</button>)}</div>
        {loading ? <Loader label="Finding the best of Sharm..." /> : filtered.length ? <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((place) => <PlaceCard key={place._id || place.id} place={place} />)}</div> : <div className="surface mt-8 px-6 py-20 text-center"><Search className="mx-auto text-slate-400" size={36} /><h3 className="mt-4 text-xl font-bold">No places found</h3><p className="mt-2 text-sm text-slate-500">Try another category or search phrase.</p></div>}
      </section>
    </>
  );
}
