const steps = ['trip length', 'trip kind', 'Interests'];
export default function PlannerProgress({ current }) {
  return (
    <div className="mx-auto flex w-full max-w-sm items-start justify-center">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const active = current >= stepNumber;
        return (
          <div key={step} className="flex flex-1 items-start last:flex-none">
            <div className="flex flex-col items-center">
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-white/10'}`}>{stepNumber}</span>
              <span className={`mt-1.5 whitespace-nowrap text-xs ${active ? 'font-semibold text-ink dark:text-white' : 'text-slate-400'}`}>{step}</span>
            </div>
            {index < steps.length - 1 && <span className={`mt-3 h-0.5 w-full min-w-10 ${current > stepNumber ? 'bg-brand-600' : 'bg-slate-200 dark:bg-white/10'}`} />}
          </div>
        );
      })}
    </div>
  );
}
