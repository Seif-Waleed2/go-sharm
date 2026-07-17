import { Heart, Plus, Sparkles, User as UserIcon, Users, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PlannerProgress from '../components/planner/PlannerProgress';
import VacationCalendar from '../components/planner/VacationCalendar';
import api from '../api/axios';

const tripKinds = [
  { value: 'Solo', icon: UserIcon, label: 'Solo' },
  { value: 'Partner Trip', icon: Heart, label: 'Partner Trip' },
  { value: 'Family Trip', icon: Users, label: 'Family Trip' },
  { value: 'Friends Trip', icon: UsersRound, label: 'Friends Trip' },
];
const interests = ['Beaches', 'Diving', 'Restaurants', 'Safari', 'Shopping', 'Nightlife', 'Water Sports', 'Historical Sites', 'Snorkeling', 'Hidden Gems'];

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [form, setForm] = useState({ tripType: 'Solo', interests: ['Safari', 'Diving'] });
  const [customInterest, setCustomInterest] = useState('');
  const [addingInterest, setAddingInterest] = useState(false);
  const navigate = useNavigate();

  const next = () => {
    if (step === 1 && !(dateRange.start && dateRange.end)) return toast.error('Select your trip dates');
    setStep((value) => Math.min(3, value + 1));
  };
  const toggleInterest = (item) => setForm((current) => ({ ...current, interests: current.interests.includes(item) ? current.interests.filter((value) => value !== item) : [...current.interests, item] }));
  const submit = async () => {
    if (!form.interests.length) return toast.error('Choose at least one interest');
    try {
      setGenerating(true);
      const { data } = await api.post('/ai/generate', {
        startDate: dateRange.start.toISOString().slice(0, 10),
        endDate: dateRange.end.toISOString().slice(0, 10),
        tripType: form.tripType,
        interests: form.interests,
      });
      await new Promise((resolve) => setTimeout(resolve, 1300));
      toast.success('Your vacation plan is ready');
      navigate('/planner/result', { state: { plan: data.plan } });
    } catch (error) { toast.error(error.response?.data?.message || 'Could not generate the plan'); }
    finally { setGenerating(false); }
  };

  if (generating) return <section className="container-page flex min-h-[calc(100vh-82px)] flex-col items-center justify-center py-16 text-center"><div className="relative grid h-44 w-44 place-items-center rounded-full bg-brand-50 dark:bg-brand-500/10"><span className="absolute inset-5 animate-ping rounded-full bg-brand-300/30" /><span className="grid h-24 w-24 place-items-center rounded-full bg-brand-600 text-white shadow-brand"><Sparkles size={38} /></span></div><h1 className="mt-8 text-xl font-semibold">Preparing Vacation Plan</h1><p className="mt-2 max-w-md text-sm text-slate-500">Matching your interests with local places and a practical day-by-day rhythm.</p></section>;

  return (
    <section className="container-page min-h-[calc(100vh-82px)] py-7 sm:py-10">
      <PlannerProgress current={step} />
      <div className="mx-auto mt-12 max-w-3xl text-center"><p className="flex items-center justify-center gap-2 text-xs text-slate-500"><Sparkles className="text-brand-500" size={17} /> Plan My Vacation With AI</p><p className="mt-3 text-sm font-semibold">Sharm El Sheikh Trip</p></div>

      {step === 1 && <div className="mx-auto mt-16 max-w-2xl"><h1 className="text-center text-3xl font-bold">When are you going?</h1><div className="mt-10"><VacationCalendar start={dateRange.start} end={dateRange.end} onChange={setDateRange} /></div></div>}

      {step === 2 && <div className="mx-auto mt-16 max-w-4xl"><h1 className="text-center text-3xl font-bold">What kind of trip are you planning?</h1><div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">{tripKinds.map((kind) => <button key={kind.value} onClick={() => setForm({ ...form, tripType: kind.value })} className={`relative flex min-h-40 flex-col items-center justify-center rounded-2xl border text-center transition ${form.tripType === kind.value ? 'border-2 border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/10' : 'border-slate-200 hover:border-brand-300 dark:border-white/10'}`}><kind.icon size={24} className="text-brand-600" /><span className="mt-4 font-medium">{kind.label}</span><span className={`absolute bottom-4 h-5 w-5 rounded-full border ${form.tripType === kind.value ? 'border-4 border-brand-500' : 'border-slate-400'}`} /></button>)}</div></div>}

      {step === 3 && <div className="mx-auto mt-14 max-w-3xl"><h1 className="text-center text-3xl font-bold">Tell us what you’re interested in</h1><p className="mt-4 text-center text-slate-500">Select all that apply.</p><div className="mt-8 flex flex-wrap justify-center gap-3">{interests.map((interest) => <button key={interest} onClick={() => toggleInterest(interest)} className={`min-w-40 rounded-full border px-6 py-3 text-sm font-medium transition ${form.interests.includes(interest) ? 'border-brand-600 bg-brand-600 text-white shadow-brand' : 'border-slate-300 hover:border-brand-400 dark:border-white/15'}`}>{interest}</button>)}{form.interests.filter((item) => !interests.includes(item)).map((item) => <button key={item} type="button" onClick={() => toggleInterest(item)} className="min-w-40 rounded-full border border-brand-600 bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-brand">{item}</button>)}{addingInterest ? <input autoFocus value={customInterest} onChange={(e) => setCustomInterest(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && customInterest.trim()) { toggleInterest(customInterest.trim()); setCustomInterest(''); setAddingInterest(false); } }} onBlur={() => setAddingInterest(false)} placeholder="Type & press Enter" className="input-field !h-11 !w-44 !rounded-full" /> : <button type="button" onClick={() => setAddingInterest(true)} className="flex min-w-40 items-center justify-center gap-1 rounded-full border border-dashed border-slate-300 px-6 py-3 text-sm font-medium text-slate-500 dark:border-white/15"><Plus size={14} /> Add Interest</button>}</div></div>}

      <div className="mx-auto mt-16 flex max-w-5xl items-center justify-between"><button className="btn-secondary !rounded-full !bg-slate-100 !px-8 dark:!bg-white/5" onClick={() => step > 1 ? setStep(step - 1) : history.back()}>Back</button>{step < 3 ? <button className="btn-primary !rounded-full !px-9" onClick={next}>Next</button> : <button className="btn-primary !rounded-full !px-9" onClick={submit}>Submit</button>}</div>
    </section>
  );
}
