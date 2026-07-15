import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { fetchTrips } from '../api/trips';
import ProfileLayout from '../components/ProfileLayout';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips()
      .then((res) => setTrips(res.data.trips))
      .catch(() => setTrips([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h1 className="mb-6 text-3xl font-extrabold text-slate-900 dark:text-white">Trips</h1>

          {loading ? (
            <LoadingSpinner label="Loading your trips..." />
          ) : trips.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
              <p className="mb-4 text-slate-500">You haven't booked any rides yet.</p>
              <button type="button" onClick={() => navigate('/ride')} className="btn-primary">
                Request a Ride
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {trips.map((trip) => (
                <div key={trip._id}>
                  <p className="mb-2 text-sm font-medium text-slate-500">{formatDate(trip.date)}</p>
                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center">
                    <div className="h-24 w-full shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 sm:w-32" />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {trip.pickup} → {trip.destination}
                      </p>
                      <p className="text-sm text-slate-400">
                        {trip.rideType}, {trip.distanceKm?.toFixed(1)} km
                      </p>
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white">${trip.price.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm dark:border-slate-700"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate('/ride', {
                            state: { pickup: trip.pickup, dropoff: trip.destination },
                          })
                        }
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm dark:bg-slate-800"
                      >
                        Rebook
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 p-6 text-white">
          <Sparkles className="mb-3" />
          <h3 className="mb-2 text-lg font-bold">Get A Ride In Just 1 Minute!</h3>
          <p className="mb-4 text-sm text-brand-100">
            Need a ride fast? Tap, book, and go. Your driver arrives in just 1 minute.
          </p>
          <button
            type="button"
            onClick={() => navigate('/ride')}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-brand-700"
          >
            Request A Ride
          </button>
        </aside>
      </div>
    </ProfileLayout>
  );
}
