import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ title, text, actionLabel = 'Explore Sharm', to = '/explore' }) {
  return (
    <div className="surface flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
      <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15"><Compass /></span>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{text}</p>
      <Link className="btn-primary mt-6" to={to}>{actionLabel}</Link>
    </div>
  );
}
