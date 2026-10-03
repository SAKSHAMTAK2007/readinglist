import { Library, BookOpen, CheckCircle2 } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export function Summary({ total, reading, finished }: SummaryProps) {
  const items = [
    {
      label: 'Total Books',
      value: total,
      icon: Library,
      bg: 'bg-slate-100',
      text: 'text-slate-600',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookOpen,
      bg: 'bg-sky-100',
      text: 'text-sky-600',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm sm:flex-row sm:gap-3 sm:text-left"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
              <Icon className={`h-4 w-4 ${item.text}`} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold leading-tight text-slate-800 sm:text-xl">
                {item.value}
              </p>
              <p className="truncate text-[11px] font-medium text-slate-400 sm:text-xs">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
