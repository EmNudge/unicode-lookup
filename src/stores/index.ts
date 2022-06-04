import { writable } from 'svelte/store';
import type { BoxSet } from './advancedSearch';
import type { UnicodeCharInfo } from '$src/worker/retrieval';
import { browser } from '$app/env';

// which type of search is currently in use
export enum SearchMode {
  SimpleSearch,
  AdvancedSearch,
}
export const searchMode = writable<SearchMode>(SearchMode.SimpleSearch);

export const resultsStore = writable<[number, UnicodeCharInfo][]>([]);
resultsStore.subscribe(results => {
  if (!results.length) return;
  console.log('results:\n', results);
})

export const currentQueryStore = writable<BoxSet[]>([]);
currentQueryStore.subscribe(query => {
  if (!query.length) return;
  console.log('query:\n', query);
})

export const workerStore = writable<Worker | null>(null);

export const workerIsReadyStore = writable(false);
export const hasFirstLoadedStore = writable(false);

// stores for searches. We want them to persist even when they're not visible
export const easySearchStore = writable<string>('');

export type Pattern = { exclude: boolean, category: string };
export const categorySearchStore = writable<Pattern[]>([]);

export const activeIndex = writable(-1);
resultsStore.subscribe(() => activeIndex.set(-1));

export const copiedCodepoint = writable(-1);

export type Block = { range: [number, number], name: string };
export const blockLookupStore = writable<Block[]>([]);

export const encodingMode = writable<'hex' | 'bin' | 'dec'>('hex');

export const themeStore = writable<'dark' | 'light'>((() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
    return savedTheme as 'dark' | 'light'
  };

  const isDark = (
    'matchMedia' in window
    && window.matchMedia("(prefers-color-scheme: dark)")?.matches
  );
  
  return isDark ? 'dark' : 'light';
})());
themeStore.subscribe(curTheme => {
  if (curTheme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
})

// advanced search data
export * from './advancedSearch';