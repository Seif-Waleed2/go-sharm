export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-4" role="status">
      <div className="h-11 w-11 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
