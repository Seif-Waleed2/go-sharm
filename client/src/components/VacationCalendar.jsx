import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const buildMonthGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  // Convert Sunday(0)-based getDay() to Monday-first index
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(year, month, d));
  return cells;
};

const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const isBetween = (day, start, end) => start && end && day > start && day < end;

function MonthGrid({ year, month, start, end, onSelect }) {
  const cells = buildMonthGrid(year, month);

  return (
    <div>
      <p className="mb-3 text-center font-semibold text-slate-800 dark:text-slate-100">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="mb-2 grid grid-cols-7 text-center text-xs text-slate-400">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <span key={`empty-${idx}`} />;
          const selectedStart = isSameDay(day, start);
          const selectedEnd = isSameDay(day, end);
          const inRange = isBetween(day, start, end);
          const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(day)}
              className={`aspect-square rounded-lg text-sm transition ${
                selectedStart || selectedEnd
                  ? 'bg-brand-600 font-semibold text-white'
                  : inRange
                    ? 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
                    : isPast
                      ? 'cursor-not-allowed text-slate-300 dark:text-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-brand-50 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function VacationCalendar({ start, end, onChange }) {
  const [cursor, setCursor] = useState(() => {
    const base = start || new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const handleSelect = (day) => {
    if (!start || (start && end)) {
      onChange({ start: day, end: null });
    } else if (day < start) {
      onChange({ start: day, end: start });
    } else {
      onChange({ start, end: day });
    }
  };

  const nextMonth = (offset) => {
    const total = cursor.month + offset;
    const year = cursor.year + Math.floor(total / 12);
    const month = ((total % 12) + 12) % 12;
    setCursor({ year, month });
  };

  const secondMonth = cursor.month === 11 ? 0 : cursor.month + 1;
  const secondYear = cursor.month === 11 ? cursor.year + 1 : cursor.year;

  return (
    <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <button
            type="button"
            onClick={() => nextMonth(-1)}
            className="mb-2 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft size={18} />
          </button>
          <MonthGrid year={cursor.year} month={cursor.month} start={start} end={end} onSelect={handleSelect} />
        </div>
        <div>
          <button
            type="button"
            onClick={() => nextMonth(1)}
            className="mb-2 ml-auto block rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight size={18} />
          </button>
          <MonthGrid year={secondYear} month={secondMonth} start={start} end={end} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
}
