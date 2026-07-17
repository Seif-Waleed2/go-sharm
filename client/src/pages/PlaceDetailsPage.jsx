import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';
import Loader from '../components/common/Loader';
import { fallbackPlaces } from '../data/fallbackPlaces';

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(fallbackPlaces.find((item) => item.id === id) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!/^[a-f\d]{24}$/i.test(id)) { setLoading(false); return; }
    api.get(`/places/${id}`).then(({ data }) => setPlace(data.place)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading && !place) return <Loader label="Opening place details..." />;
  if (!place) return <div className="container-page py-20 text-center"><h1 className="text-3xl font-bold">Place not found</h1><Link to="/explore" className="btn-primary mt-6">Back to Explore</Link></div>;

  return (
    <section className="container-page py-8 sm:py-12">
      <Link to="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-600"><ArrowLeft size={17} /> Back to Explore</Link>
      <div className="surface mt-5 overflow-hidden">
        <div className="relative h-[300px] sm:h-[480px]"><img src={place.image} alt={place.name} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" /><div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-10 sm:bottom-9"><span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">{place.category}</span><h1 className="mt-4 text-4xl font-bold sm:text-6xl">{place.name}</h1><p className="mt-3 flex items-center gap-2 text-white/85"><MapPin size={18} /> {place.location}</p></div></div>
        <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-10"><div><h2 className="text-2xl font-bold">About this place</h2><p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">{place.description}</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><Info label="Category" value={place.category} /><Info label="Location" value={place.location} /><Info label="Best for" value="Easy Sharm experience" /></div></div><aside className="rounded-2xl bg-slate-50 p-6 dark:bg-white/5"><p className="flex items-center gap-2 font-semibold text-amber-500"><Star fill="currentColor" size={19} /> {place.rating} traveler rating</p><p className="mt-7 text-sm text-slate-500">Starting price</p><p className="mt-1 text-4xl font-bold">${place.price || 0}</p><Link to="/planner" className="btn-primary mt-6 w-full">Add to my plan</Link><Link to="/ride" className="btn-secondary mt-3 w-full">Book a ride</Link></aside></div>
      </div>
    </section>
  );
}
function Info({ label, value }) { return <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10"><p className="text-xs uppercase tracking-wide text-slate-400">{label}</p><p className="mt-2 font-semibold">{value}</p></div>; }
