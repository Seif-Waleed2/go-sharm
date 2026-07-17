import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

export default function PlannerResultPage() {
  const location = useLocation();
  const plan = location.state?.plan;
  const [activeDay, setActiveDay] = useState(1);

  if (!plan) {
    return <Navigate to="/planner" replace />;
  }

  const totalDays = plan.itinerary.length;
  const currentDay = plan.itinerary.find((d) => d.day === activeDay) || plan.itinerary[0];

  return (
    <section className="container-page py-8">
      <p className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-600">
        ✨ Review Our Recommendations For Your Trip
      </p>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative mb-6 h-56 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368"
              alt="Sharm El Sheikh"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                Your vacation in Sharm El Sheikh for {totalDays} day{totalDays > 1 ? 's' : ''}
              </h1>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {plan.itinerary.map((d) => (
              <button
                key={d.day}
                type="button"
                onClick={() => setActiveDay(d.day)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  activeDay === d.day
                    ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-500 dark:bg-brand-500/10 dark:text-brand-300'
                    : 'border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300'
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {currentDay?.activities.length === 0 && (
              <p className="text-slate-500">No activities matched your interests for this day yet.</p>
            )}
            {currentDay?.activities.map((activity, idx) => (
              <div key={`${activity.name}-${idx}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                    {idx + 1}
                  </span>
                  {idx < currentDay.activities.length - 1 && (
                    <span className="mt-1 h-full w-px flex-1 bg-slate-200 dark:bg-white/10" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-semibold text-ink dark:text-slate-100">{activity.name}</p>
                  <p className="mb-2 flex items-center gap-1 text-xs text-slate-400">
                    <MapPin size={12} /> {activity.category}
                  </p>
                  {activity.description && (
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-pattern hidden overflow-hidden rounded-2xl lg:block">
          <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-2 text-slate-400">
            <Star size={20} />
            <p className="text-sm">Map view of today's stops</p>
          </div>
        </div>
      </div>
    </section>
  );
}
