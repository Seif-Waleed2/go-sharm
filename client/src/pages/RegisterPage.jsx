import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2) return toast.error('Enter your full name');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error('Enter a valid email address');
    if (form.password.length < 6) return toast.error('Password must contain at least 6 characters');
    try {
      setLoading(true);
      await register(form);
      toast.success('Your Go Sharm account is ready');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create your account');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-background grid min-h-screen place-items-center px-4 py-10">
      <div className="grid w-full max-w-[980px] overflow-hidden rounded-[38px] bg-white shadow-[0_25px_80px_rgba(39,45,76,.24)] md:grid-cols-2 dark:bg-slate-900">
        <aside className="purple-gradient hero-noise flex min-h-[260px] flex-col items-center justify-center rounded-b-[78px] px-8 text-center text-white md:min-h-[610px] md:rounded-bl-none md:rounded-br-[120px]">
          <h2 className="text-4xl font-extrabold">Welcome Back!</h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/90">Enter your personal details to use all of the site features.</p>
          <Link to="/login" className="mt-8 inline-flex min-w-48 justify-center rounded-xl border border-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:bg-white hover:text-brand-700">Sign In</Link>
        </aside>
        <section className="flex min-h-[560px] items-center justify-center px-7 py-12 md:px-16">
          <form onSubmit={submit} className="w-full max-w-sm">
            <h1 className="text-center text-4xl font-black tracking-tight">Create Account</h1>
            <div className="mt-8 flex justify-center gap-3">
              <button type="button" onClick={() => toast('Google registration is a UI placeholder')} className="icon-btn rounded-lg text-xl font-bold text-red-500">G</button>
              <button type="button" onClick={() => toast('Facebook registration is a UI placeholder')} className="icon-btn rounded-lg text-xl font-bold text-blue-700">f</button>
            </div>
            <p className="my-6 text-center text-sm text-slate-500">or use your email for registration</p>
            <div className="space-y-4">
              <input className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
              <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
              <label className="relative block">
                <input className="input-field pr-12" type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Show password">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </label>
            </div>
            <button disabled={loading} className="btn-primary mx-auto mt-6 flex min-w-48 uppercase" type="submit">{loading ? 'Creating...' : 'Sign Up'}</button>
            <p className="mt-8 text-center text-sm text-slate-500 md:hidden">Already registered? <Link to="/login" className="font-semibold text-brand-600">Sign in</Link></p>
          </form>
        </section>
      </div>
    </div>
  );
}
