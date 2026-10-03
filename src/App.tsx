import { useMemo, useState } from 'react';
import { BookMarked } from 'lucide-react';
import { useReadingList } from '@/hooks/useReadingList';
import { AddBookForm } from '@/components/AddBookForm';
import { BookCard } from '@/components/BookCard';
import { FilterBar } from '@/components/FilterBar';
import { EmptyState } from '@/components/EmptyState';
import { Summary } from '@/components/Summary';
import type { FilterType } from '@/types';

function App() {
  const { books, addBook, updateStatus, removeBook, isDuplicate } = useReadingList();
  const [filter, setFilter] = useState<FilterType>('all');

  const counts = useMemo(() => {
    const c: Record<FilterType, number> = {
      all: books.length,
      'want-to-read': 0,
      'reading': 0,
      'finished': 0,
    };
    for (const book of books) {
      c[book.status]++;
    }
    return c;
  }, [books]);

  const visibleBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === filter);
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Reading List</h1>
              <p className="text-sm text-slate-500">
                {books.length === 0
                  ? 'Track what you read'
                  : `${counts['finished']} finished · ${counts['reading']} reading · ${counts['want-to-read']} to read`}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-2xl px-4 py-6">
        <AddBookForm onAdd={addBook} isDuplicate={isDuplicate} />

        {books.length > 0 && (
          <div className="mt-6">
            <Summary
              total={books.length}
              reading={counts['reading']}
              finished={counts['finished']}
            />
          </div>
        )}

        {books.length > 0 && (
          <div className="mt-6">
            <FilterBar active={filter} onChange={setFilter} counts={counts} />
          </div>
        )}

        <div className="mt-6">
          {books.length === 0 ? (
            <EmptyState />
          ) : visibleBooks.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-400">
              No books in this category.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onStatusChange={updateStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-2xl px-4 pb-8 pt-2 text-center">
        <p className="text-xs text-slate-400">
          Your list is saved in your browser.
        </p>
      </footer>
    </div>
  );
}

export default App;
