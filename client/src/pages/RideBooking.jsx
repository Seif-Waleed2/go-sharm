import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Clock, MapPin, Navigation, Users } from 'lucide-react';
import { fetchRideOptions, bookRide } from '../api/rides';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const RIDE_META = {
  'Smart X': { seats: 4 },
  'Smart XL': { seats: 10 },
  'Smart VIP': { seats: 4 },
};

export default function RideBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [pickup, setPickup] = useState(location.state?.pickup || '');
  const [dropoff, setDropoff] = useState(location.state?.dropoff || '');
  const [passengers, setPassengers] = useState(1);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('Smart X');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!pickup || !dropoff) return;
    setLoadingOptions(true);
    fetchRideOptions(pickup, dropoff)
      .then((res) => setOptions(res.data.options))
      .catch(() => toast.error('Could not load ride pricing'))
      .finally(() => setLoadingOptions(false));
  }, [pickup, dropoff]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      toast.error('Please enter both pickup and dropoff locations');
    }
  };

  const handleConfirm = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to book a ride');
      navigate('/sign-in', { state: { from: location } });
      return;
    }
    if (!pickup || !dropoff) {
      toast.error('Please enter pickup and dropoff locations');
      return;
    }
    setBooking(true);
    try {
      await bookRide({ pickup, destination: dropoff, rideType: selected, passengers });
      toast.success('Ride booked! Your driver is on the way.');
      navigate('/trips');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to book ride');
    } finally {
      setBooking(false);
    }
  };

  const selectedOption = options.find((o) => o.rideType === selected);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100"
        >
          <ArrowLeft size={20} /> Ride
        </button>

        <form onSubmit={handleSearch} className="mb-4 space-y-2">
          <div className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-brand-700 dark:bg-brand-950 dark:text-brand-200">
            <Clock size={18} />
            Pickup Now
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
            <Navigation size={18} className="text-slate-400" />
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup Location"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
            <MapPin size={18} className="text-slate-400" />
            <input
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Dropoff Location"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
            <Users size={18} className="text-slate-400" />
            <input
              type="number"
              min={1}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Search Rides
          </button>
        </form>
      </div>

      <div>
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Select a ride</h1>

        {loadingOptions ? (
          <LoadingSpinner label="Calculating fares..." />
        ) : options.length === 0 ? (
          <p className="text-slate-500">Enter a pickup and dropoff location to see ride options.</p>
        ) : (
          <div className="mb-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {options.map((opt) => (
              <button
                key={opt.rideType}
                type="button"
                onClick={() => setSelected(opt.rideType)}
                className={`flex w-full items-center justify-between px-5 py-4 text-left transition ${
                  selected === opt.rideType ? 'bg-brand-50 dark:bg-brand-950' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    🚗
                  </span>
                  <div>
                    <p className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-100">
                      {opt.rideType}
                      <span className="flex items-center gap-0.5 text-xs text-slate-400">
                        <Users size={12} /> {RIDE_META[opt.rideType]?.seats}
                      </span>
                    </p>
                    <p className="text-xs text-slate-400">{opt.distanceKm.toFixed(1)} km trip</p>
                  </div>
                </div>
                <p className="font-bold text-slate-900 dark:text-white">${opt.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        )}

        <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Payment</span>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="bg-transparent text-sm font-semibold outline-none"
          >
            <option>Cash</option>
            <option>Card</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={booking || !selectedOption}
          className="btn-primary w-full"
        >
          {booking
            ? 'Booking...'
            : selectedOption
              ? `Select ${selectedOption.rideType}`
              : 'Select a ride'}
        </button>
      </div>
    </div>
  );
}
