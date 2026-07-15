import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(form);
      toast.success('Welcome back!');
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to sign in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-card dark:bg-slate-900 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5 p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Sign In</h1>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700"
              aria-label="Continue with Google"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-blue-600 dark:border-slate-700"
              aria-label="Continue with Facebook"
            >
              f
            </button>
          </div>
          <p className="text-center text-sm text-slate-400">or use your email password</p>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <p className="text-center text-sm text-slate-500">Forget Your Password?</p>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="hidden flex-col items-center justify-center bg-gradient-to-br from-brand-500 to-brand-800 p-12 text-center text-white md:flex">
          <h2 className="mb-4 text-3xl font-extrabold">Hello, Friend!</h2>
          <p className="mb-8 text-brand-100">
            Register with your personal details to use all of site features
          </p>
          <Link to="/register" className="btn-outline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
