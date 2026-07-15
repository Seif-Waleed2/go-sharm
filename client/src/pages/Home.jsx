import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Plane, Repeat, Compass, Sparkles, Search, Star } from 'lucide-react';
import { fetchPlaces } from '../api/places';
import LoadingSpinner from '../components/LoadingSpinner';

const TABS = [
  { key: 'ride', label: 'Ride', icon: Car },
  { key: 'airport', label: 'Airport Pickup', icon: Plane },
  { key: 'round', label: 'Round Trip', icon: Repeat },
  { key: 'explore', label: 'Explore sharm Elsheikh', icon: Compass },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('ride');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces()
      .then((res) => setPlaces(res.data.places))
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false));
  }, []);

  const handleRideSubmit = (e) => {
    e.preventDefault();
    navigate('/ride', { state: { pickup, dropoff } });
  };

  const beaches = places.filter((p) => p.category === 'Beach').slice(0, 4);
  const popular = places.slice(0, 4);

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-500 to-brand-800 px-4 pb-16 pt-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeTab === key
                    ? 'border-white bg-white text-brand-700'
                    : 'border-white/60 text-white hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'explore' ? (
            <div>
              <h1 className="mb-4 max-w-xl text-4xl font-extrabold sm:text-5xl">
                Explore Sharm Elsheikh with us
              </h1>
              <button
                type="button"
                onClick={() => navigate('/ai-planner')}
                className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur"
              >
                <Sparkles size={16} /> Plan My Vacation With Ai
              </button>
              <p className="mb-6 max-w-md text-brand-100">
                Get Personalized Recs Just For You, Guided By Traveler Opinions.
              </p>
              <div className="flex max-w-2xl flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-4 py-3">
                  <Search size={18} className="text-slate-400" />
                  <input
                    placeholder="Places to go, Events , Parties , Beaches"
                    className="w-full text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  className="rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  Explore
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="mb-2 text-4xl font-extrabold sm:text-5xl">Request A Ride</h1>
              <p className="mb-6 text-brand-100">Add your trip details, hop in, and go.</p>
              <form
                onSubmit={handleRideSubmit}
                className="flex flex-col gap-3 rounded-2xl bg-white p-3 text-slate-800 shadow-card lg:flex-row lg:items-center"
              >
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup Location"
                  className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none"
                />
                <input
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder="Dropoff Location"
                  className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  Request A Ride
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSpinner label="Loading places..." />
        ) : activeTab === 'explore' ? (
          <>
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Categories</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {beaches.map((place) => (
                <div
                  key={place._id}
                  onClick={() => navigate('/explore')}
                  className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-card dark:bg-slate-900"
                >
                  <img src={place.image} alt={place.name} className="h-32 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{place.name}</p>
                    <p className="flex items-center gap-1 text-xs text-amber-500">
                      <Star size={12} className="fill-amber-500" /> {place.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              Most Popular Places in Sharm Elsheikh
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {popular.map((place) => (
                <div
                  key={place._id}
                  onClick={() => navigate('/explore')}
                  className="group relative h-40 cursor-pointer overflow-hidden rounded-2xl"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs opacity-80">{place.category}</p>
                    <p className="font-semibold">{place.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
