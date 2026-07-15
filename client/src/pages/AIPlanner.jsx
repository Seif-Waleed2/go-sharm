import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sparkles, Users, Heart, UsersRound, User as UserIcon, Plus } from 'lucide-react';
import VacationCalendar from '../components/VacationCalendar';
import { generateVacationPlan } from '../api/ai';
import { useAuth } from '../context/AuthContext';

const TRIP_KINDS = [
  { key: 'Solo', label: 'Solo', icon: UserIcon },
  { key: 'Partner Trip', label: 'Partner Trip', icon: Heart },
  { key: 'Family Trip', label: 'Family Trip', icon: Users },
  { key: 'Friends Trip', label: 'Friends Trip', icon: UsersRound },
];

const INTEREST_OPTIONS = [
  'Great Food', 'Sea View', 'Nightlife', 'Desert Safari', 'Arabian Nights',
  'Water Sports', 'Hidden Gems', 'Historical Sites', 'Snorkeling',
  'Scuba Diving', 'Must-See', 'Tours',
];

const STEPS = ['trip length', 'trip kind', 'Interests'];

export default function AIPlanner() {
  const [step, setStep] = useState(1);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [tripType, setTripType] = useState('Solo');
  const [withPets, setWithPets] = useState(false);
  const [interests, setInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState('');
  const [addingInterest, setAddingInterest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const canProceedStep1 = dateRange.start && dateRange.end;

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to generate a vacation plan');
      navigate('/sign-in');
      return;
    }
    if (interests.length === 0) {
      toast.error('Select at least one interest');
      return;
    }
    setSubmitting(true);
    try {
      const res = await generateVacationPlan({
        startDate: dateRange.start,
        endDate: dateRange.end,
        tripType,
        interests,
        withPets,
      });
      navigate('/ai-planner/result', { state: { plan: res.data.plan } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to generate your plan');
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-brand-200 to-brand-500">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 text-white">
            <Sparkles size={28} />
          </span>
        </div>
        <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
          Preparing Vacation Plan
        </h2>
        <p className="max-w-sm text-slate-500">
          matching you interests with insights from our diverse community of travelers
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-10 flex items-center justify-center gap-4">
        {STEPS.map((label, idx) => {
          const num = idx + 1;
          const active = step >= num;
          return (
            <div key={label} className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    active ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'
                  }`}
                >
                  {num}
                </span>
                <span className={`text-xs ${active ? 'font-semibold text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>
                  {label}
                </span>
              </div>
              {idx < STEPS.length - 1 && <span className="h-px w-16 bg-slate-200 dark:bg-slate-700" />}
            </div>
          );
        })}
      </div>

      <div className="mb-8 text-center">
        <p className="mb-1 flex items-center justify-center gap-2 text-sm font-medium text-brand-600">
          <Sparkles size={16} /> Plan My Vacation With Ai
        </p>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Sharm El Sheikh Trip</h1>
      </div>

      {step === 1 && (
        <div>
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white">
            When are you going?
          </h2>
          <VacationCalendar
            start={dateRange.start}
            end={dateRange.end}
            onChange={setDateRange}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white">
            What kind of trip are you planning?
          </h2>
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRIP_KINDS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTripType(key)}
                className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition ${
                  tripType === key
                    ? 'border-brand-600'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon size={24} className="text-slate-600 dark:text-slate-300" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
                <span
                  className={`h-4 w-4 rounded-full border ${
                    tripType === key ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="mb-3 text-center font-medium text-slate-800 dark:text-slate-100">
            Are you traveling with pets?
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setWithPets(true)}
              className={`rounded-full px-6 py-2 text-sm font-semibold ${
                withPets ? 'bg-brand-600 text-white' : 'border border-slate-200 dark:border-slate-700'
              }`}
            >
              yes
            </button>
            <button
              type="button"
              onClick={() => setWithPets(false)}
              className={`rounded-full px-6 py-2 text-sm font-semibold ${
                !withPets ? 'bg-brand-600 text-white' : 'border border-slate-200 dark:border-slate-700'
              }`}
            >
              No
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="mb-1 text-center text-2xl font-bold text-slate-900 dark:text-white">
            Tell us what you're interested in
          </h2>
          <p className="mb-6 text-center text-sm text-slate-400">Select all that apply.</p>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {INTEREST_OPTIONS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  interests.includes(interest)
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200'
                }`}
              >
                {interest}
              </button>
            ))}
            {addingInterest ? (
              <input
                autoFocus
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customInterest.trim()) {
                    toggleInterest(customInterest.trim());
                    setCustomInterest('');
                    setAddingInterest(false);
                  }
                }}
                onBlur={() => setAddingInterest(false)}
                placeholder="Type & press Enter"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
              />
            ) : (
              <button
                type="button"
                onClick={() => setAddingInterest(true)}
                className="flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-500 dark:border-slate-700"
              >
                <Plus size={14} /> Add Interest
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {step < 3 ? (
          <button
            type="button"
            disabled={step === 1 && !canProceedStep1}
            onClick={() => setStep((s) => s + 1)}
            className="btn-primary"
          >
            Next
          </button>
        ) : (
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
