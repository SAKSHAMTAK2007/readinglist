import type { FilterType } from '@/types';
import { FILTER_LABELS } from '@/types';

interface FilterBarProps {
  active: FilterType;
  onChange: (filter: FilterType) => void;
  counts: Record<FilterType, number>;
}

const filterOrder: FilterType[] = ['all', 'want-to-read', 'reading', 'finished'];

export function FilterBar({ active, onChange, counts }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filterOrder.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
            active === f
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {FILTER_LABELS[f]}
          <span
            className={`rounded-full px-1.5 text-xs ${
              active === f ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {counts[f]}
          </span>
        </button>
      ))}
    </div>
  );
}
