import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Umbrella,
  UtensilsCrossed,
  Palmtree,
  Store,
  Ship,
  Waves,
  Landmark,
  PartyPopper,
} from 'lucide-react';
import { fetchPlaces } from '../api/places';
import PlaceCard from '../components/PlaceCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = [
  { key: 'Beach', label: 'Beach', icon: Umbrella },
  { key: 'Restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { key: 'Safari Excursion', label: 'Safari Excursion', icon: Palmtree },
  { key: 'Bazar', label: 'Bazar', icon: Store },
  { key: 'Yacht Excursions', label: 'Yacht Excursions', icon: Ship },
  { key: 'Diving Centers', label: 'Diving Centers', icon: Waves },
  { key: 'Bank', label: 'Bank', icon: Landmark },
  { key: 'Entertainment', label: 'Entertainment', icon: PartyPopper },
];

export default function Explore() {
  const [category, setCategory] = useState('Beach');
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    fetchPlaces(params)
      .then((res) => setPlaces(res.data.places))
      .catch(() => setPlaces([]))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search places, events, beaches..."
          className="input-field sm:max-w-sm"
        />
      </div>

      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Categories</h2>
      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        {CATEGORIES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              category === key
                ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
                : 'border-slate-200 text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner label="Fetching places..." />
      ) : places.length === 0 ? (
        <p className="py-10 text-center text-slate-500">No places found for this filter yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((place) => (
            <PlaceCard key={place._id} place={place} onClick={() => navigate(`/explore/${place._id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}
