import { Camera, Clock3, Edit3, Mail, MapPin, Phone, Route, Save, UserRound, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import ProfileSidebar from '../components/layout/ProfileSidebar';
import useAuth from '../hooks/useAuth';

export default function AccountPage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tripCount, setTripCount] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', dateOfBirth: '', address: '', avatar: '' });

  useEffect(() => { setForm({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', dateOfBirth: user?.dateOfBirth ? String(user.dateOfBirth).slice(0, 10) : '', address: user?.address || '', avatar: user?.avatar || '' }); }, [user]);
  useEffect(() => { api.get('/trips').then(({ data }) => setTripCount(data.count || 0)).catch(() => {}); }, []);
  const memberSince = useMemo(() => user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Recently', [user]);

  const save = async () => {
    if (form.name.trim().length < 2) return toast.error('Enter your full name');
    try { setSaving(true); await updateProfile(form); setEditing(false); toast.success('Profile updated'); }
    catch (error) { toast.error(error.response?.data?.message || 'Could not update profile'); }
    finally { setSaving(false); }
  };

  return (
    <section className="bg-slate-50 py-8 dark:bg-[#0b0f1a] lg:py-10">
      <div className="container-page flex flex-col gap-8 lg:flex-row lg:gap-10">
        <ProfileSidebar />
        <div className="min-w-0 flex-1"><h1 className="text-4xl font-semibold">My Account</h1>
          <section className="surface mt-6 p-5 sm:p-7">
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Profile Information</h2><button onClick={() => editing ? setEditing(false) : setEditing(true)} className="btn-primary !min-h-10 !px-4 !py-2 text-sm">{editing ? <><X size={16} /> Cancel</> : <><Edit3 size={16} /> Edit</>}</button></div>
            <div className="mt-7 grid gap-7 md:grid-cols-[140px_1fr]">
              <div className="text-center"><div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white">{form.avatar ? <img src={form.avatar} alt="Profile" className="h-full w-full object-cover" /> : <UserRound size={56} />}</div><button disabled={!editing} onClick={() => { const url = prompt('Paste an image URL'); if (url) setForm({ ...form, avatar: url }); }} className="btn-secondary mt-3 !min-h-9 !px-3 !py-1.5 text-xs disabled:opacity-40"><Camera size={14} /> Change Photo</button></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field icon={UserRound} label="Full Name" value={form.name} disabled={!editing} onChange={(value) => setForm({ ...form, name: value })} />
                <Field icon={Mail} label="Email Address" value={form.email} disabled={!editing} type="email" onChange={(value) => setForm({ ...form, email: value })} />
                <Field icon={Phone} label="Phone Number" value={form.phone} disabled={!editing} onChange={(value) => setForm({ ...form, phone: value })} />
                <Field icon={Clock3} label="Date of Birth" value={form.dateOfBirth} disabled={!editing} type="date" onChange={(value) => setForm({ ...form, dateOfBirth: value })} />
                <div className="sm:col-span-2"><Field icon={MapPin} label="Address" value={form.address} disabled={!editing} onChange={(value) => setForm({ ...form, address: value })} /></div>
                {editing && <button disabled={saving} onClick={save} className="btn-primary sm:col-span-2"><Save size={17} /> {saving ? 'Saving...' : 'Save Changes'}</button>}
              </div>
            </div>
          </section>

          <section className="surface mt-6 p-5 sm:p-7"><h2 className="text-xl font-bold">Travel preferences</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Setting label="Booking notifications" description="Receive updates about your rides" defaultChecked /><Setting label="Travel inspiration" description="Occasional tips for exploring Sharm" /><div className="rounded-xl bg-slate-50 p-4 dark:bg-white/5"><p className="font-semibold">Language</p><p className="mt-1 text-sm text-slate-500">English (US)</p></div><div className="rounded-xl bg-slate-50 p-4 dark:bg-white/5"><p className="font-semibold">Currency</p><p className="mt-1 text-sm text-slate-500">USD ($)</p></div></div></section>
        </div>
        <aside className="w-full shrink-0 lg:w-80"><section className="surface p-6"><h2 className="text-xl font-bold">Account Overview</h2><div className="mt-5 space-y-4"><Overview icon={Route} value={tripCount} label="Total Trips" /><Overview icon={Clock3} value="Active" label="Account status" /><Overview icon={UserRound} value={memberSince} label="Member Since" /></div></section><section className="purple-gradient mt-6 rounded-2xl p-7 text-center text-white"><div className="text-5xl">🎧</div><h2 className="mt-4 text-xl font-bold">Need Help?</h2><p className="mt-2 text-sm text-white/80">Our support team is here to assist you.</p><a href="mailto:support@gosharm.example" className="mt-5 flex h-12 items-center justify-center rounded-xl bg-white font-semibold text-brand-700">Contact Support</a></section></aside>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, value, onChange, disabled, type = 'text' }) { return <label><span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"><Icon size={15} /> {label}</span><input className="input-field disabled:cursor-default disabled:text-slate-700 dark:disabled:text-slate-200" type={type} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} /></label>; }
function Overview({ icon: Icon, value, label }) { return <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-white/5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white"><Icon size={22} /></span><span><strong className="block text-lg">{value}</strong><span className="text-xs text-slate-500">{label}</span></span></div>; }
function Setting({ label, description, defaultChecked = false }) { return <label className="flex cursor-pointer items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-white/5"><span className="min-w-0 flex-1"><strong className="block text-sm">{label}</strong><span className="mt-1 block text-xs text-slate-500">{description}</span></span><input type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5 accent-brand-600" /></label>; }
