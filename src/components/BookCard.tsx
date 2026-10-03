import { useState } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_LABELS, STATUS_ORDER } from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

const statusStyles: Record<ReadingStatus, string> = {
  'want-to-read': 'bg-amber-100 text-amber-700',
  'reading': 'bg-sky-100 text-sky-700',
  'finished': 'bg-emerald-100 text-emerald-700',
};

const statusDot: Record<ReadingStatus, string> = {
  'want-to-read': 'bg-amber-500',
  'reading': 'bg-sky-500',
  'finished': 'bg-emerald-500',
};

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-800">
            {book.title}
          </h3>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[book.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[book.status]}`} />
            {STATUS_LABELS[book.status]}
          </span>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          className="shrink-0 rounded-lg p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Remove book"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative mt-3">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Change status
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
        </button>
        {menuOpen && (
          <div className="absolute bottom-full left-0 right-0 z-10 mb-1 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onStatusChange(book.id, s);
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition hover:bg-slate-50 ${
                  book.status === s ? 'text-emerald-600' : 'text-slate-600'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusDot[s]}`} />
                {STATUS_LABELS[s]}
                {book.status === s && (
                  <span className="ml-auto text-emerald-500">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
