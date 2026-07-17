import { Heart, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlaceCard({ place }) {
  const [favorite, setFavorite] = useState(false);
  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-2xl bg-slate-200 aspect-[1.18/1] dark:bg-slate-800">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <button
          type="button"
          onClick={() => setFavorite((value) => !value)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/20 text-white backdrop-blur transition hover:bg-black/35"
        >
          <Heart className={favorite ? 'fill-white' : ''} size={21} />
        </button>
      </div>
      <div className="pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs italic text-slate-500 dark:text-slate-400">{place.category}</p>
            <Link to={`/places/${place._id || place.id}`} className="mt-1 block truncate text-[17px] font-semibold hover:text-brand-600">{place.name}</Link>
          </div>
          <p className="shrink-0 text-sm text-slate-500 dark:text-slate-400">from <span className="ml-1 text-base font-bold text-ink dark:text-white">${place.price || 0}</span></p>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-sm"><Star size={15} className="fill-amber-400 text-amber-400" /><span className="font-semibold">{place.rating}</span></div>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><MapPin size={13} /> {place.location}</p>
      </div>
    </article>
  );
}
