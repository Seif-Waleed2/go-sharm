import { Link } from 'react-router-dom';

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="inline-flex flex-col leading-none" aria-label="Go Sharm home">
      <span className={`font-black tracking-[-0.08em] text-ink dark:text-white ${compact ? 'text-2xl' : 'text-[31px]'}`}>
        <span className="text-brand-600">go</span> sharm<span className="text-brand-600">.</span>
      </span>
      {!compact && <span className="ml-9 mt-1 text-[8px] font-medium tracking-wide text-slate-500 dark:text-slate-400">Sharm elSheikh</span>}
    </Link>
  );
}
