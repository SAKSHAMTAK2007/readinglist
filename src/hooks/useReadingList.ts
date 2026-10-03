import { useCallback, useEffect, useState } from 'react';
import type { Book, ReadingStatus } from '@/types';

const STORAGE_KEY = 'reading-list-books';

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
      // ignore quota errors
    }
  }, [books]);

  const isDuplicate = useCallback(
    (title: string) => {
      const normalized = title.trim().toLowerCase().replace(/\s+/g, ' ');
      return books.some(
        (book) =>
          book.title.trim().toLowerCase().replace(/\s+/g, ' ') === normalized,
      );
    },
    [books],
  );

  const addBook = useCallback((title: string, status: ReadingStatus) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setBooks((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        title: trimmed,
        status,
        addedAt: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  const updateStatus = useCallback((id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, status } : book)),
    );
  }, []);

  const removeBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  }, []);

  return { books, addBook, updateStatus, removeBook, isDuplicate };
}
