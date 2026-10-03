import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <BookOpen className="h-7 w-7 text-slate-400" />
      </div>
      <p className="mt-5 text-base font-medium text-slate-500">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
