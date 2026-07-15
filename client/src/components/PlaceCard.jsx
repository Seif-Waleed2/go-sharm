import { useState } from 'react';
import { Heart, Star, MapPin } from 'lucide-react';

export default function PlaceCard({ place, onClick }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div
      onClick={() => onClick?.(place)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 dark:bg-slate-900"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFavorited((f) => !f);
          }}
          aria-label="Save to favorites"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow"
        >
          <Heart
            size={16}
            className={favorited ? 'fill-red-500 text-red-500' : 'text-slate-500'}
          />
        </button>
      </div>

      <div className="space-y-1 p-4">
        <p className="text-xs text-slate-400">{place.category}</p>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{place.name}</h3>
          {place.price > 0 ? (
            <p className="text-sm text-slate-500">
              from <span className="font-bold text-slate-900 dark:text-slate-50">£{place.price}</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-brand-600">Free</p>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-amber-500">
          <Star size={14} className="fill-amber-500" />
          <span className="font-medium">{place.rating?.toFixed(1) ?? '—'}</span>
        </div>
        {place.location && (
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <MapPin size={12} /> {place.location}
          </p>
        )}
      </div>
    </div>
  );
}
