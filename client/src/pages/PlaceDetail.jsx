import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ArrowLeft } from 'lucide-react';
import { fetchPlaceById } from '../api/places';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchPlaceById(id)
      .then((res) => setPlace(res.data.place))
      .catch(() => setError('This place could not be found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen label="Loading place details..." />;
  if (error) return <p className="py-16 text-center text-slate-500">{error}</p>;
  if (!place) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/explore" className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <ArrowLeft size={16} /> Back to Explore
      </Link>
      <img src={place.image} alt={place.name} className="mb-6 h-72 w-full rounded-2xl object-cover" />
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{place.name}</h1>
        {place.price > 0 ? (
          <p className="text-lg font-bold text-brand-600">from £{place.price}</p>
        ) : (
          <p className="text-lg font-bold text-brand-600">Free</p>
        )}
      </div>
      <div className="mb-4 flex items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1 text-amber-500">
          <Star size={16} className="fill-amber-500" /> {place.rating?.toFixed(1)}
        </span>
        {place.location && (
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {place.location}
          </span>
        )}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">
          {place.category}
        </span>
      </div>
      <p className="leading-relaxed text-slate-600 dark:text-slate-300">{place.description}</p>
    </div>
  );
}
