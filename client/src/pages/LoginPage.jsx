import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) return toast.error('Enter your email and password');
    try {
      setLoading(true);
      await login(form);
      toast.success('Welcome back to Go Sharm');
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not sign in');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-background grid min-h-screen place-items-center px-4 py-10">
      <div className="grid w-full max-w-[980px] overflow-hidden rounded-[38px] bg-white shadow-[0_25px_80px_rgba(39,45,76,.24)] md:grid-cols-2 dark:bg-slate-900">
        <section className="order-2 flex min-h-[520px] items-center justify-center px-7 py-12 md:order-1 md:px-16">
          <form onSubmit={submit} className="w-full max-w-sm">
            <h1 className="text-center text-4xl font-black tracking-tight">Sign In</h1>
            <div className="mt-8 flex justify-center gap-3">
              <button type="button" onClick={() => toast('Google sign-in is a UI placeholder')} className="icon-btn rounded-lg text-xl font-bold text-red-500">G</button>
              <button type="button" onClick={() => toast('Facebook sign-in is a UI placeholder')} className="icon-btn rounded-lg text-xl font-bold text-blue-700">f</button>
            </div>
            <p className="my-6 text-center text-sm text-slate-500">or use your email password</p>
            <div className="space-y-4">
              <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
              <label className="relative block">
                <input className="input-field pr-12" type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Show password">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </label>
            </div>
            <button type="button" onClick={() => toast('Password recovery is not included in the PRD')} className="mx-auto mt-7 block text-sm tracking-[.16em] text-slate-500 hover:text-brand-600">Forget Your Password?</button>
            <button disabled={loading} className="btn-primary mx-auto mt-5 flex min-w-44" type="submit">{loading ? 'Signing in...' : 'Sign In'}</button>
            <p className="mt-8 text-center text-sm text-slate-500 md:hidden">New here? <Link to="/register" className="font-semibold text-brand-600">Create an account</Link></p>
          </form>
        </section>
        <aside className="purple-gradient hero-noise order-1 flex min-h-[260px] flex-col items-center justify-center rounded-b-[78px] px-8 text-center text-white md:order-2 md:min-h-[610px] md:rounded-bl-[120px] md:rounded-br-none">
          <h2 className="text-4xl font-extrabold">Hello, Friend!</h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/90">Register with your personal details to use all of the site features.</p>
          <Link to="/register" className="mt-8 inline-flex min-w-48 justify-center rounded-xl border border-white px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:bg-white hover:text-brand-700">Sign Up</Link>
        </aside>
      </div>
    </div>
  );
}
