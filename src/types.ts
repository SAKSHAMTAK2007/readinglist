export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export type FilterType = 'all' | ReadingStatus;

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  addedAt: number;
}

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  'want-to-read': 'Want to Read',
  'reading': 'Reading',
  'finished': 'Finished',
};

export const STATUS_ORDER: ReadingStatus[] = ['want-to-read', 'reading', 'finished'];

export const FILTER_LABELS: Record<FilterType, string> = {
  'all': 'All',
  'want-to-read': 'Want to Read',
  'reading': 'Reading',
  'finished': 'Finished',
};
